import { LovelaceCardConfig } from "custom-card-helpers";``
import { html, LitElement } from 'lit';
import { CARD_TYPE, INTEGRATION } from "./consts"
import { styles } from "./styles";
import { daysBetween, isToday, isPast } from "./helpers";

import { HomeAssistant2, Dictionary, Entity, relativeDate } from "./helpers"


export interface SimplePlantCardConfig extends LovelaceCardConfig {
  device: string;
}

export class SimplePlantCard extends LitElement {

    // properties
    private _hass : HomeAssistant2;

    // reactive
    private _device_id: string;
    private _translations_loaded: boolean = false;
    private _states_updated: boolean = true ;

    // other private
    private _device_name: string;
    private _entity_ids: Dictionary<string> = {} ;
    private _entity_states: Map<string, Entity> = new Map() ;
    private _config_updated: boolean = true ;
    private _translations : Dictionary<string> = {
        "button": "Mark as Watered",
        "feed_button": "Mark Fertilized",
        "cancel": "Cancel",
        "today": "today"
    }

    static keys : Array<string> = [
            "mark_watered",
            "todo",
            "problem",
            "last_watered",
            "picture",
            "days_between_waterings",
            "health",
            "next_watering",
            "mark_fertilized",
            "fertilization_problem",
            "fertilization_todo",
            "feed_method",
            "days_between_fertilizations",
            "last_fertilized",
            "next_fertilization",
            "misting_enabled", 
            "cleaning_enabled",
            "misting_problem",
            "cleaning_problem",
            "misting_todo",
            "cleaning_todo",
            "next_misting",
            "next_cleaning",
            "days_between_mistings",
            "days_between_cleanings",
            "illumination",
            "mark_misted",
            "mark_cleaned",
            "last_misted",
            "last_cleaned",
    ]

    set hass(hass : HomeAssistant2) {
        // Triggered everytime a state change and more
        this._hass = hass
        this._update_entites()
    }

    // Reactive properties, a change on one of those triggers a re-render
    static properties = {
        _device_id: { type: String, state: true },
        _translations_loaded: { type: Boolean, state: true },
        _states_updated: {
            type: Boolean,
            state: true,
            hasChanged(newVal: boolean, _oldVal: boolean){
                return newVal // Only re-render if _states_updated is true
            }
        }
    };

    static styles =  styles;

    setConfig(config : SimplePlantCardConfig) {
        // Triggers everytime the config of the card change
        if (!config.device) {
            throw new Error("You need to define a name");
        }
        this._device_id = config.device;
        // while editing the entity in the card editor
        if (this._hass) {
            this.hass = this._hass
        }
        this._config_updated = true;
    }

    _moreInfo(entity_key: string){
        const event = new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: {
                entityId: this._entity_ids[entity_key],
                view: 'info',
            }
        });


        this.dispatchEvent(event);
    }

    _navigateToDevice(deviceId: string) {
        window.history.pushState(null, "", `/config/devices/device/${deviceId}`);
        window.dispatchEvent(new Event("location-changed"));
    }

    // Create card and its content
    render() {
        if(this._config_updated) {
            // Re fetching device specific information
            this._get_friendly_name();
            this._fetch_entities();
            this._config_updated = false;
        }
        // Updating states
        if(!this._entity_states.size)
            this._update_entites()
        this._states_updated = false; // resetting for future use
        this._loadTranslations()
        // compute strings
        const local = this._hass.language;
        const today = this._translations["today"];

        //HEALTH Constants
        const health_key_prefix = "component.simple_plant.entity.select.health.state";
        const health_key = `${health_key_prefix}.${this._entity_states.get("health").state}`;
        const health = this._hass.localize(health_key);
        const healthColor = this._entity_states.get("health").attributes.color;

        //WATERING Constants
        const days_between_label = this._entity_states.get("days_between_waterings").attributes.friendly_name;
        const days_between_value = parseInt(this._entity_states.get("days_between_waterings").state);
        const next_date = this._entity_states.get("next_watering").state;
        const watering_can_color = this._entity_states.get("next_watering").attributes.color;
        const late = this._entity_states.get("problem").state === "on";
        const days_until_watering = daysBetween(new Date(), next_date);
        const water_todo = this._entity_states.get("todo").state === "on";

        //FEED Constants
        const next_feed_date = this._entity_states.get("next_fertilization").state;
        const late_feed = this._entity_states.get("fertilization_problem").state === "on";
        const feed_method = String(this._entity_states.get("feed_method").state).charAt(0).toUpperCase() + String(this._entity_states.get("feed_method").state).slice(1);
        const feed_interval = this._entity_states.get("days_between_fertilizations").state;
        const feed_icon_color = this._entity_states.get("next_fertilization").attributes.color; 
        const days_until_feed = daysBetween(new Date(), next_feed_date);

        const feed_todo = (isToday(next_feed_date) || this._entity_states.get("fertilization_problem").state === "on");

        //CARE Constants
        const next_clean_date = this._entity_states.get("next_cleaning").state;
        const next_mist_date = this._entity_states.get("next_misting").state;
        const mist = this._entity_states.get("misting_enabled").state;
        const clean = this._entity_states.get("cleaning_enabled").state;
        const care_mist_class = mist == 'on' ? "" : "hidden";
        const care_clean_class = clean == 'on' ? "" : "hidden";
        const mist_interval = parseInt(this._entity_states.get("days_between_mistings").state);
        const clean_interval = parseInt(this._entity_states.get("days_between_cleanings").state);
        const now = new Date();
        const days_until_clean = daysBetween(now, next_clean_date);
        const days_until_mist = daysBetween(now, next_mist_date);
        const late_clean = this._entity_states.get("cleaning_problem").state === "on";
        const late_mist = this._entity_states.get("misting_problem").state === "on";
        const clean_icon_color = late_clean ? "Tomato" : (isToday(next_clean_date)) ? "Goldenrod" : "white";
        const mist_icon_color = late_mist ? "Tomato" : (isToday(next_mist_date)) ? "Goldenrod" : "white";
        const clean_todo = this._entity_states.get("cleaning_todo").state === "on";
        const mist_todo = this._entity_states.get("misting_todo").state === "on";
        
        //DETAILS Constants
        const light_state = this._entity_states.get("illumination").state.toLowerCase();
        const light_key_prefix = "component.simple_plant.entity.select.illumination.state";
        const light_key = `${light_key_prefix}.${this._entity_states.get("illumination").state}`;
        const light = this._hass.localize(light_key);  
        const light_color = light_state === "sunny" ? "gold" : light_state === "partly_sunny" ? "darkgoldenrod" : "dimgrey";
        const light_icon = light_state == 'sunny' ? "mdi:white-balance-sunny" : light_state == 'partly_sunny' ? "mdi:weather-partly-cloudy" : light_state == 'shade' ? "mdi:weather-cloudy" : "mdi:theme-light-dark";

        // return card
        return html`
            <ha-card>
                <div class="card-content">
                    <div class="img-header"></div>
                        <hui-image
                            .hass=${this._hass}
                            .entity=${this._entity_ids["picture"]}
                            .fitMode=${"cover"}
                            @click="${()=>this._moreInfo("picture")}"
                        ></hui-image>
                        <ha-icon-button
                            .label=${days_between_label}
                            @click="${()=>this._moreInfo("days_between_waterings")}"
                        >
                            <ha-icon
                                data-days="${days_between_value}"
                                .icon=${"mdi:calendar-blank"}></ha-icon>
                        </ha-icon-button>
                    </div>
                    <div class="info">
                        <h1 @click="${()=>this._navigateToDevice(this._device_id)}">
                            ${this._device_name}
                        </h1>
                        <div class="border_row">
                            <div class="row sub_content water_info">
                                <ha-icon 
                                    data-color
                                    style="--color: ${watering_can_color};"
                                    .icon=${"mdi:watering-can"}></ha-icon>
                                <div class="grow">
                                    <div class="content">
                                        <p class="">Watering</p>
                                    </div>
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button" @click="${() => this._moreInfo("days_between_waterings")}"
                                            data-days="${parseInt(days_between_value)}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                                <sub-icon-content>
                                    <ha-icon class="sub_icon"
                                        data-color
                                        style="--color: ${watering_can_color};"
                                        data-days="${late ? 0 - days_until_watering : days_until_watering}"
                                        .icon=${"mdi:calendar-blank"}>
                                    </ha-icon>
                                </sub-icon-content>
                                <div class="content" @click="${()=>this._handleButton("water")}">
                                    <ha-icon class="sub_icon_button sub_icon "
                                        data-color
                                        style="--color: ${water_todo ? "goldenrod": "dimgray"};" 
                                        .icon=${water_todo ? "mdi:checkbox-blank-outline": "mdi:checkbox-marked"}></ha-icon>
                                </div>
                            </div>


                            <div class="row sub_content feed_info">
                                <ha-icon 
                                    data-color
                                    style="--color: ${feed_icon_color};"
                                    .icon=${"mdi:seed"}></ha-icon>
                                <div class="grow">
                                    <div class="content" @click="${() => this._moreInfo("feed_method")}">
                                        <p class=" sub_icon_button">${feed_method}</p>
                                    </div>
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button" @click="${() => this._moreInfo("days_between_fertilizations")}"
                                            data-days="${parseInt(feed_interval)}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                                <div class="sub_content_conditional ">
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${feed_icon_color};"
                                            data-days="${late_feed ? 0 - days_until_feed : days_until_feed}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <div class="content" @click="${()=>this._handleButton("feed")}">
                                        <ha-icon class="sub_icon_button sub_icon " 
                                            data-color
                                            style="--color: ${feed_todo ? "goldenrod": "dimgray"};" 
                                            .icon=${feed_todo ? "mdi:checkbox-blank-outline": "mdi:checkbox-marked"}></ha-icon>
                                    </div>
                                </div>
                            </div>

                            <div class="row sub_content mist_info">
                                <ha-icon class="" 
                                    .icon=${"mdi:spray-bottle"}
                                    data-color
                                    style="--color: ${mist_icon_color};"></ha-icon>
                                <div class="grow">
                                    <div class="content sub_icon_button" @click="${() => this._moreInfo("misting_enabled")}">
                                        <p class="">Mist ${String(mist).charAt(0).toUpperCase() + String(mist).slice(1)}</p>
                                    </div>
                                    <sub-icon-content class="${care_mist_class}" @click="${() => this._moreInfo("days_between_mistings")}">
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button"
                                            data-days="${late_mist ? 0 - mist_interval : mist_interval}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                                <div class="sub_content_conditional ${care_mist_class}">
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${mist_icon_color};"
                                            data-days="${days_until_mist}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <div class="content" @click="${()=>this._handleButton("mist")}">
                                        <ha-icon class="sub_icon_button sub_icon "
                                            data-color
                                            style="--color: ${mist_todo ? "goldenrod": "dimgray"};" 
                                            .icon=${mist_todo ? "mdi:checkbox-blank-outline": "mdi:checkbox-marked"}></ha-icon>
                                    </div>
                                </div>
                            </div>

                            <div class="row sub_content clean_info">
                                <ha-icon class="" 
                                    .icon=${"mdi:liquid-spot"}
                                    data-color
                                    style="--color: ${clean_icon_color};"></ha-icon>
                                <div class="grow">
                                    <div class="content sub_icon_button" @click="${() => this._moreInfo("cleaning_enabled")}">
                                        <p class="">Clean ${String(clean).charAt(0).toUpperCase() + String(clean).slice(1)}</p>
                                    </div>
                                    <sub-icon-content class="${care_clean_class}" @click="${() => this._moreInfo("days_between_cleanings")}">
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button"
                                            data-days="${late_clean ? 0 - clean_interval : clean_interval}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                                <div class="sub_content_conditional ${care_clean_class}">
                                    <sub-icon-content >
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${clean_icon_color};"
                                            data-days="${days_until_clean}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <div class="content" @click="${()=>this._handleButton("clean")}">
                                        <ha-icon class="sub_icon_button sub_icon " 
                                            data-color
                                            style="--color: ${clean_todo ? "goldenrod": "dimgray"};" 
                                            .icon=${clean_todo ? "mdi:checkbox-blank-outline": "mdi:checkbox-marked"}></ha-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="border_row">
                            <div class="row">
                                <ha-icon
                                    .icon=${light_icon}
                                    data-color
                                    style="--color: ${light_color};"
                                ></ha-icon>
                                <div class="content sub_icon_button" @click="${()=>this._moreInfo("illumination")}">
                                    <p>${light}</p>
                                </div>
                            </div>
                        </div>
                        <div class="border_row">
                            <div class="row">
                                <ha-icon
                                    .icon=${"mdi:heart-pulse"}
                                    data-color
                                    style="--color: ${healthColor};"
                                ></ha-icon>
                                <div class="content sub_icon_button" @click="${()=>this._moreInfo("health")}">
                                    <p>${health}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `;
    }


    static getConfigElement() {
        // Create and return an editor element for UI card edition
        return document.createElement(`${CARD_TYPE}-editor`);
    }

    getCardSize() {
        return 10;
    }

    // The rules for sizing your card in the grid in sections view
    // https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/#sizing-in-sections-view
    getGridOptions() {
        return {
            columns: 6,
            min_columns: 6,
            max_columns: 9,
            min_rows: 8,
            max_rows: 8,
        };
    }

    // Specific to Simple Plant

    _handleButton(type: string) {
        if (type == "water") {
            this._hass.callService("button", "press", {}, {
                entity_id: this._entity_ids["mark_watered"]
            });
        }
        if (type == "feed") {
            this._hass.callService("button", "press", {}, {
                entity_id: this._entity_ids["mark_fertilized"]
            });
        }
        if (type == "clean") {
            this._hass.callService("button", "press", {}, {
                entity_id: this._entity_ids["mark_cleaned"]
            });
        }
        if (type == "mist") {
            this._hass.callService("button", "press", {}, {
                entity_id: this._entity_ids["mark_misted"]
            });
        }
    }

    _update_entites() {
        // Update values of entities that got updated
        var trigger_update = false;
        if (!this._entity_ids || !this._hass)
            return
        for (const [key, id] of Object.entries(this._entity_ids)) {

            if (
                (!this._entity_states.has(key))
                || (this._entity_states.get(key).state != this._hass.states[id].state)
            ) {
                trigger_update = true
            }
            this._entity_states.set(key, this._hass.states[id])
        }
        if(trigger_update)
            this._states_updated = true
    }

    _get_friendly_name() {
        if(!this._device_id || !this._hass)
            return
        const device = Object.values(this._hass.devices).find(
            (device) => device.id == this._device_id
        );

        if (device)
            this._device_name = device.name;
        else
            throw new Error("Couldn't find selected device");
    }

    _fetch_entities() {
        // Get entities from given device
        if(!this._device_id || !this._hass)
            return
        const entities = Object.values(this._hass.entities)
        const device_entities = entities.filter((entity) => entity.device_id == this._device_id);
        const entity_ids = device_entities.map(({entity_id}) => (entity_id))
        // parse entities
        entity_ids.forEach(id => {
            SimplePlantCard.keys.forEach((key) => {
                if (id.includes(key)) {
                // Associate the corresponding key with the matched string
                this._entity_ids[key] = id;
                }
            });
        });
    }


    async _loadTranslations(){
        if (!this._entity_states.size || this._translations_loaded)
            return
        const translation_key = `component.${INTEGRATION}.entity.button.mark_watered.name`
        const feed_translation_key = `component.${INTEGRATION}.entity.feed.name`;
        this._translations["button"] = `${this._hass.localize(translation_key)} !`
        this._translations["feed_button"] = `${this._hass.localize(feed_translation_key)} !`
        this._translations["cancel"] = this._hass.localize("ui.dialogs.generic.cancel")
        this._translations["today"] = this._hass.localize("ui.components.calendar.today")
        this._translations["late"] = this._hass.localize(`component.${INTEGRATION}.entity.binary_sensor.problem.name`)
        this._translations["interval"] = 'Every';
        this._translations["method"] = 'Method';
        this._translations_loaded = true
    }
}
