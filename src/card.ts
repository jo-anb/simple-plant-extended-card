import { LovelaceCardConfig } from "custom-card-helpers";
import { html, LitElement } from 'lit';
import { CARD_TYPE, INTEGRATION } from "./consts"
import { styles } from "./styles";
import { daysBetween, isToday, isPast } from "./helpers";

import { HomeAssistant2, Dictionary, Entity, relativeDate } from "./helpers"


export interface SimplePlantExtendedCardConfig extends LovelaceCardConfig {
  device: string;
        mode?: "device" | "overview";
        overview_filter?: "overdue" | "today" | "all";
    show_misting?: boolean;
    show_cleaning?: boolean;
    show_activity?: boolean;
    show_details?: boolean;
        show_notes?: boolean;
}

export class SimplePlantExtendedCard extends LitElement {

    // properties
    private _hass : HomeAssistant2;
    private _config: SimplePlantExtendedCardConfig;

    // reactive
    private _device_id: string;
    private _translations_loaded: boolean = false;
    private _states_updated: boolean = true ;
    private _activity_dialog_open: boolean = false;
    private _notes_dialog_open: boolean = false;
    private _new_note: string = "";
    private _confirm_dialog_open: boolean = false;
    private _confirm_action: string | null = null;
    private _confirm_message: string = "";
    private _details_dialog_open: boolean = false;
    private _edit_acquisition_date: string = "";
    private _edit_distance_to_window: string = "";
    private _edit_pot_diameter: string = "";
    private _edit_humidity_sensor: string = "";
    private _edit_temperature_sensor: string = "";
    private _edit_light_sensor: string = "";
    private _overview_task_dialog_open: boolean = false;
    private _overview_task_type: string | null = null;
    private _overview_task_title: string | null = null;
    private _overview_task_items: Array<{
        deviceId: string;
        name: string;
        status: "overdue" | "today";
        actionEntityId?: string;
        taskLabel?: string;
    }> = [];
    private _plant_dialog_open: boolean = false;
    private _plant_dialog_device: string | null = null;
    private _plant_card_el: any = null;
    private _helpers: any = null;

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
            "status",
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
            "current_humidity",
            "current_temperature",
            "current_light",
            "size",
            "location",
            "soil_type",
            "distance_to_window",
            "pot_diameter",
            "species",
            "notes",
            "plant_age_days",
    ]

    set hass(hass : HomeAssistant2) {
        // Triggered everytime a state change and more
        this._hass = hass
        if (this._plant_card_el) {
            this._plant_card_el.hass = hass
        }
        this._update_entites()
    }

    // Reactive properties, a change on one of those triggers a re-render
    static properties = {
        _device_id: { type: String, state: true },
        _translations_loaded: { type: Boolean, state: true },
        _activity_dialog_open: { type: Boolean, state: true },
        _notes_dialog_open: { type: Boolean, state: true },
        _new_note: { type: String, state: true },
        _confirm_dialog_open: { type: Boolean, state: true },
        _confirm_action: { type: String, state: true },
        _confirm_message: { type: String, state: true },
        _details_dialog_open: { type: Boolean, state: true },
        _edit_acquisition_date: { type: String, state: true },
        _edit_distance_to_window: { type: String, state: true },
        _edit_pot_diameter: { type: String, state: true },
        _edit_humidity_sensor: { type: String, state: true },
        _edit_temperature_sensor: { type: String, state: true },
        _edit_light_sensor: { type: String, state: true },
        _overview_task_dialog_open: { type: Boolean, state: true },
        _overview_task_type: { type: String, state: true },
        _overview_task_title: { type: String, state: true },
        _overview_task_items: { type: Array, state: true },
        _plant_dialog_open: { type: Boolean, state: true },
        _plant_dialog_device: { type: String, state: true },
        _states_updated: {
            type: Boolean,
            state: true,
            hasChanged(newVal: boolean, _oldVal: boolean){
                return newVal // Only re-render if _states_updated is true
            }
        }
    };

    static styles =  styles;

    setConfig(config : SimplePlantExtendedCardConfig) {
        // Triggers everytime the config of the card change
        if (!config.device && config.mode !== "overview") {
            throw new Error("You need to define a name");
        }
        const merged = {
            mode: "device",
            overview_filter: "overdue",
            show_misting: true,
            show_cleaning: true,
            show_activity: true,
            show_details: true,
            show_notes: true,
            ...config,
        } as SimplePlantExtendedCardConfig;
        this._config = merged;
        this._device_id = merged.device;
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

    _openActivityDialog() {
        this._activity_dialog_open = true;
    }

    _closeActivityDialog() {
        this._activity_dialog_open = false;
    }

    _openNotesDialog() {
        this._notes_dialog_open = true;
    }

    _closeNotesDialog() {
        this._notes_dialog_open = false;
        this._new_note = "";
    }

    _openConfirm(action: string) {
        this._confirm_action = action;
        this._confirm_message = this._buildConfirmMessage(action);
        this._confirm_dialog_open = true;
    }

    _buildConfirmMessage(action: string) {
        const plant = this._device_name || "";
        const actionLabelMap: Record<string, string> = {
            water: this._translations["action_water"] || "watered",
            feed: this._translations["action_feed"] || "fertilized",
            mist: this._translations["action_mist"] || "misted",
            clean: this._translations["action_clean"] || "cleaned",
        };
        const actionLabel = actionLabelMap[action] || action;
        return `${plant} ${this._translations["confirm_mark"] || "mark as"} ${actionLabel}`;
    }

    _closeConfirm() {
        this._confirm_dialog_open = false;
        this._confirm_action = null;
        this._confirm_message = "";
    }

    _openDetailsDialog() {
        const getAttr = (key: string, attr: string) => this._entity_states.get(key)?.attributes?.[attr];
        const getState = (key: string) => this._entity_states.get(key)?.state;
        this._edit_acquisition_date = getAttr("status", "acquisition_date") || "";
        this._edit_distance_to_window = getState("distance_to_window") || "";
        this._edit_pot_diameter = getState("pot_diameter") || "";
        this._edit_humidity_sensor = getAttr("status", "humidity_sensor") || "";
        this._edit_temperature_sensor = getAttr("status", "temperature_sensor") || "";
        this._edit_light_sensor = getAttr("status", "light_sensor") || "";
        this._details_dialog_open = true;
    }

    _closeDetailsDialog() {
        this._details_dialog_open = false;
    }

    _updateConfigField(field: string, value: string) {
        const entityId = this._entity_ids["status"] || this._entity_ids["notes"];
        const payload: Record<string, string> = {
            device_id: this._device_id,
            [field]: value,
        };
        if (entityId) {
            payload.entity_id = entityId;
        }
        this._hass.callService("simple_plant_extended", "update_config", payload);
    }

    _updateNumberField(key: string, value: string) {
        const entityId = this._entity_ids[key];
        if (!entityId) return;
        const parsed = parseFloat(value);
        if (Number.isNaN(parsed)) return;
        this._hass.callService("number", "set_value", {
            entity_id: entityId,
            value: parsed,
        });
    }

    _confirmProceed() {
        if (this._confirm_action) {
            this._handleButton(this._confirm_action);
        }
        this._closeConfirm();
    }

    _updateNewNote(ev: Event) {
        this._new_note = (ev.target as HTMLInputElement).value;
    }

    async _addNote() {
        const note = this._new_note.trim();
        if (!note) return;
        this._hass.callService("simple_plant_extended", "add_note", {
            entity_id: this._entity_ids["notes"],
            note,
        });
        this._new_note = "";
    }


    // Create card and its content
    render() {
        const mode = this._config?.mode ?? "device";
        if (mode === "overview") {
            return this._renderOverview();
        }
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
        const show_misting = this._config?.show_misting ?? true;
        const show_cleaning = this._config?.show_cleaning ?? true;
        const show_activity = this._config?.show_activity ?? true;
        const show_details = this._config?.show_details ?? true;
        const show_notes = this._config?.show_notes ?? true;

        const getEntity = (key: string) => this._entity_states.get(key);
        const normalize = (value: string | undefined) => {
            if (!value || value === "unknown" || value === "unavailable") return "";
            return value;
        };
        const getState = (key: string) => normalize(getEntity(key)?.state);
        const getAttr = (key: string, attr: string) => getEntity(key)?.attributes?.[attr];
        const getStatusAttr = (attr: string) => getAttr("status", attr) as string | undefined;
        const titleCase = (value: string) => value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
        const localizeSelectState = (key: string, value: string) => {
            const translationKey = `component.${INTEGRATION}.entity.select.${key}.state.${value}`;
            const localized = this._hass.localize(translationKey);
            if (!localized || localized === translationKey) {
                return titleCase(value);
            }
            return localized;
        };
        const localizeEntityName = (domain: string, key: string, fallback: string) => {
            const translationKey = `component.${INTEGRATION}.entity.${domain}.${key}.name`;
            const localized = this._hass.localize(translationKey);
            if (!localized || localized === translationKey) {
                return fallback;
            }
            return localized;
        };
        const localizeConfigLabel = (key: string, fallback: string) => {
            const configKey = `component.${INTEGRATION}.config.step.user.data.${key}`;
            const optionsKey = `component.${INTEGRATION}.options.step.plant.data.${key}`;
            const configLocalized = this._hass.localize(configKey);
            if (configLocalized && configLocalized !== configKey) {
                return configLocalized;
            }
            const optionsLocalized = this._hass.localize(optionsKey);
            if (optionsLocalized && optionsLocalized !== optionsKey) {
                return optionsLocalized;
            }
            return fallback;
        };
        const formatAge = (daysValue: string) => {
            const days = parseInt(daysValue, 10);
            if (Number.isNaN(days) || days < 0) return "";
            const years = Math.floor(days / 365);
            const months = Math.floor((days % 365) / 30);
            const parts = [] as string[];
            if (years > 0) parts.push(`${years}y`);
            parts.push(`${months}m`);
            return parts.join(" ");
        };

        //HEALTH Constants
        const health_key_prefix = "component.simple_plant_extended.entity.select.health.state";
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
        const feed_method_state = String(this._entity_states.get("feed_method").state);
        const feed_method = localizeSelectState("feed_method", feed_method_state);
        const feed_interval = this._entity_states.get("days_between_fertilizations").state;
        const feed_icon_color = this._entity_states.get("next_fertilization").attributes.color; 
        const days_until_feed = daysBetween(new Date(), next_feed_date);

        const feed_todo = (isToday(next_feed_date) || this._entity_states.get("fertilization_problem").state === "on");

        //CARE Constants
        const next_clean_date = this._entity_states.get("next_cleaning").state;
        const next_mist_date = this._entity_states.get("next_misting").state;
        const mist = this._entity_states.get("misting_enabled").state;
        const clean = this._entity_states.get("cleaning_enabled").state;
        const mist_label = localizeEntityName("select", "misting_enabled", "Mist");
        const clean_label = localizeEntityName("select", "cleaning_enabled", "Clean");
        const mist_state_label = localizeSelectState("misting_enabled", String(mist));
        const clean_state_label = localizeSelectState("cleaning_enabled", String(clean));
        const mist_enabled = String(mist) === "on";
        const clean_enabled = String(clean) === "on";
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
        const light_key_prefix = "component.simple_plant_extended.entity.select.illumination.state";
        const light_key = `${light_key_prefix}.${this._entity_states.get("illumination").state}`;
        const light = this._hass.localize(light_key);  
        const light_color = light_state === "sunny" ? "gold" : light_state === "partly_sunny" ? "darkgoldenrod" : "dimgrey";
        const light_icon = light_state == 'sunny' ? "mdi:white-balance-sunny" : light_state == 'partly_sunny' ? "mdi:weather-partly-cloudy" : light_state == 'shade' ? "mdi:weather-cloudy" : "mdi:theme-light-dark";

        const activityLog = getEntity("status")?.attributes?.activity_log;
        const activityItems = Array.isArray(activityLog) ? activityLog : [];
        const formatAction = (action: string) => action.replace(/_/g, " ");

        const notesLog = getEntity("status")?.attributes?.notes_log;
        const notesItems = Array.isArray(notesLog) ? notesLog : [];

        const currentHumidity = this._edit_humidity_sensor || "";
        const currentTemperature = this._edit_temperature_sensor || "";
        const currentLight = this._edit_light_sensor || "";

        const otherHumiditySensors = new Set(
            [currentTemperature, currentLight].filter((value) => Boolean(value))
        );
        const otherTemperatureSensors = new Set(
            [currentHumidity, currentLight].filter((value) => Boolean(value))
        );
        const otherLightSensors = new Set(
            [currentHumidity, currentTemperature].filter((value) => Boolean(value))
        );

        const sensorStates = Object.values(this._hass.states || {})
            .filter((state) => state?.entity_id?.startsWith("sensor."));

        const toOption = (state: Entity) => ({
            id: state.entity_id,
            name: state.attributes?.friendly_name || state.entity_id,
        });

        const sensorOptionsHumidity = sensorStates
            .filter((state) => state.attributes?.device_class === "humidity")
            .filter((state) => !otherHumiditySensors.has(state.entity_id))
            .map(toOption)
            .sort((a, b) => a.name.localeCompare(b.name));

        const sensorOptionsTemperature = sensorStates
            .filter((state) => state.attributes?.device_class === "temperature")
            .filter((state) => !otherTemperatureSensors.has(state.entity_id))
            .map(toOption)
            .sort((a, b) => a.name.localeCompare(b.name));

        const sensorOptionsLight = sensorStates
            .filter((state) => state.attributes?.device_class === "illuminance")
            .filter((state) => !otherLightSensors.has(state.entity_id))
            .map(toOption)
            .sort((a, b) => a.name.localeCompare(b.name));

        const notSetLabel = this._translations["not_set"] || "—";

        const detailItems = [
            {
                label: localizeEntityName("text", "species", "Species"),
                key: "species",
                value: getState("species"),
                type: "readonly",
            },
            {
                label: localizeEntityName("select", "size", "Size"),
                key: "size",
                value: getState("size") ? localizeSelectState("size", getState("size")) : "",
                type: "editable",
            },
            {
                label: localizeEntityName("select", "location", "Location"),
                key: "location",
                value: getState("location") ? localizeSelectState("location", getState("location")) : "",
                type: "editable",
            },
            {
                label: localizeEntityName("select", "soil_type", "Soil"),
                key: "soil_type",
                value: getState("soil_type") ? localizeSelectState("soil_type", getState("soil_type")) : "",
                type: "editable",
            },
            {
                label: localizeEntityName("number", "distance_to_window", "Distance"),
                key: "distance_to_window",
                value: getState("distance_to_window"),
                unit: getAttr("distance_to_window", "unit_of_measurement"),
                type: "editable",
            },
            {
                label: localizeEntityName("number", "pot_diameter", "Pot"),
                key: "pot_diameter",
                value: getState("pot_diameter"),
                unit: getAttr("pot_diameter", "unit_of_measurement"),
                type: "editable",
            },
            {
                label: localizeEntityName("sensor", "current_humidity", "Humidity"),
                key: "current_humidity",
                value: getState("current_humidity"),
                unit: getAttr("current_humidity", "unit_of_measurement"),
                type: "readonly",
            },
            {
                label: localizeEntityName("sensor", "current_temperature", "Temperature"),
                key: "current_temperature",
                value: getState("current_temperature"),
                unit: getAttr("current_temperature", "unit_of_measurement"),
                type: "readonly",
            },
            {
                label: localizeEntityName("sensor", "current_light", "Light"),
                key: "current_light",
                value: getState("current_light"),
                unit: getAttr("current_light", "unit_of_measurement"),
                type: "readonly",
            },
            {
                label: localizeEntityName("sensor", "plant_age_days", "Age"),
                key: "plant_age_days",
                value: formatAge(getState("plant_age_days")),
                type: "readonly",
            },
        ].filter((item) => item.value);

        const detailItemsAll: Array<{ label: string; key: string; value: string; type: string; unit?: string }> = [
            {
                label: localizeEntityName("text", "species", "Species"),
                key: "species",
                value: getState("species"),
                type: "readonly",
            },
            {
                label: localizeEntityName("text", "notes", "Notes"),
                key: "notes",
                value: getState("notes"),
                type: "editable",
            },
            {
                label: localizeEntityName("select", "size", "Size"),
                key: "size",
                value: getState("size") ? localizeSelectState("size", getState("size")) : "",
                type: "editable",
            },
            {
                label: localizeEntityName("select", "location", "Location"),
                key: "location",
                value: getState("location") ? localizeSelectState("location", getState("location")) : "",
                type: "editable",
            },
            {
                label: localizeEntityName("select", "soil_type", "Soil"),
                key: "soil_type",
                value: getState("soil_type") ? localizeSelectState("soil_type", getState("soil_type")) : "",
                type: "editable",
            },
        ];

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
                        <ha-icon-button class="floating-icon-button"
                            .label=${days_between_label}
                            @click="${()=>this._moreInfo("days_between_waterings")}"
                        >
                            <ha-icon
                                data-days="${days_between_value}"
                                .icon=${"mdi:calendar-blank"}></ha-icon>
                        </ha-icon-button>
                    </div>
                    <div class="info">
                        <div class="title-row">
                            <h1 @click="${()=>this._navigateToDevice(this._device_id)}">
                                ${this._device_name}
                            </h1>
                            ${show_activity ? html`
                                <ha-icon-button class="activity-button" @click="${() => this._openActivityDialog()}">
                                    <ha-icon .icon=${"mdi:timeline"}></ha-icon>
                                </ha-icon-button>
                            ` : html``}
                        </div>
                        <div class="border_row">
                            <div class="row sub_content water_info">
                                <span class="action-icon clickable" @click=${() => this._openConfirm("water")}>
                                    <ha-icon
                                        data-color
                                        style="--color: ${watering_can_color};"
                                        .icon=${"mdi:watering-can"}
                                    ></ha-icon>
                                </span>
                                <div class="grow">
                                    <div class="content">
                                        <p class="">${this._translations["watering"] || "Watering"}</p>
                                    </div>
                                </div>
                                <div class="right-actions">
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button" @click="${() => this._moreInfo("days_between_waterings")}" 
                                            data-days="${String(days_between_value)}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${watering_can_color};"
                                            data-days="${late ? 0 - days_until_watering : days_until_watering}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                            </div>


                            <div class="row sub_content feed_info">
                                <span class="action-icon clickable" @click=${() => this._openConfirm("feed")}>
                                    <ha-icon
                                        data-color
                                        style="--color: ${feed_icon_color};"
                                        .icon=${"mdi:seed"}
                                    ></ha-icon>
                                </span>
                                <div class="grow">
                                    <div class="content" @click="${() => this._moreInfo("feed_method")}">
                                        <p class=" sub_icon_button">${feed_method}</p>
                                    </div>
                                </div>
                                <div class="sub_content_conditional right-actions">
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button" @click="${() => this._moreInfo("days_between_fertilizations")}" 
                                            data-days="${parseInt(feed_interval)}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${feed_icon_color};"
                                            data-days="${late_feed ? 0 - days_until_feed : days_until_feed}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                            </div>

                            ${show_misting ? html`
                            <div class="row sub_content mist_info ${mist_enabled ? "status-on" : "status-off"}">
                                <span class="action-icon clickable" @click=${() => this._openConfirm("mist")}>
                                    <ha-icon
                                        .icon=${"mdi:spray-bottle"}
                                        data-color
                                        style="--color: ${mist_icon_color};"
                                    ></ha-icon>
                                </span>
                                <div class="grow">
                                    <div class="content sub_icon_button" @click="${() => this._moreInfo("misting_enabled")}">
                                        <p class="">${mist_label}</p>
                                    </div>
                                    <span class="status-pill ${mist_enabled ? "is-on" : "is-off"}">
                                        ${mist_state_label}
                                    </span>
                                </div>
                                <div class="sub_content_conditional ${care_mist_class} right-actions">
                                    <sub-icon-content @click="${() => this._moreInfo("days_between_mistings")}">
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button"
                                            data-days="${late_mist ? 0 - mist_interval : mist_interval}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${mist_icon_color};"
                                            data-days="${days_until_mist}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                            </div>
                            ` : html``}

                            ${show_cleaning ? html`
                            <div class="row sub_content clean_info ${clean_enabled ? "status-on" : "status-off"}">
                                <span class="action-icon clickable" @click=${() => this._openConfirm("clean")}>
                                    <ha-icon
                                        .icon=${"mdi:liquid-spot"}
                                        data-color
                                        style="--color: ${clean_icon_color};"
                                    ></ha-icon>
                                </span>
                                <div class="grow">
                                    <div class="content sub_icon_button" @click="${() => this._moreInfo("cleaning_enabled")}">
                                        <p class="">${clean_label}</p>
                                    </div>
                                    <span class="status-pill ${clean_enabled ? "is-on" : "is-off"}">
                                        ${clean_state_label}
                                    </span>
                                </div>
                                <div class="sub_content_conditional ${care_clean_class} right-actions">
                                    <sub-icon-content @click="${() => this._moreInfo("days_between_cleanings")}">
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button"
                                            data-days="${late_clean ? 0 - clean_interval : clean_interval}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <sub-icon-content >
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${clean_icon_color};"
                                            data-days="${days_until_clean}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                            </div>
                            ` : html``}
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
                        ${show_notes ? html`
                        <div class="border_row">
                            <div class="row notes-row" @click=${this._openNotesDialog}>
                                <ha-icon .icon=${"mdi:note-text"}></ha-icon>
                                <div class="content">
                                    <p>${this._translations["notes"] || "Notes"}</p>
                                    <div class="notes-preview">
                                        ${getState("notes") || this._translations["no_notes"] || "No notes"}
                                    </div>
                                </div>
                                <ha-icon class="detail-edit-icon" .icon=${"mdi:chevron-right"}></ha-icon>
                            </div>
                        </div>
                        ` : html``}
                        ${show_details ? html`
                        <div class="border_row">
                            <div class="section-title">${this._translations["details"] || "Details"}</div>
                            <div class="details-grid">
                                ${detailItems.map((item) => html`
                                    <div class="detail-item">
                                        <div class="detail-label">${item.label}</div>
                                        <div
                                            class="detail-value ${item.type === "editable" ? "detail-value-editable" : ""}"
                                            @click=${() => item.type === "editable" ? this._moreInfo(item.key) : undefined}
                                        >
                                            ${item.value}${item.unit ? ` ${item.unit}` : ""}
                                            ${item.type === "editable" ? html`<ha-icon class="detail-edit-icon" .icon=${"mdi:pencil"}></ha-icon>` : html``}
                                        </div>
                                    </div>
                                `)}
                            </div>
                        </div>
                        ` : html``}
                        <mwc-button class="details-button" @click=${() => this._openDetailsDialog()}>
                            ${this._translations["more_details"] || "More details"}
                        </mwc-button>
                    </div>
                </div>
            </ha-card>
            <ha-dialog .open=${this._activity_dialog_open} @closed=${this._closeActivityDialog}>
                <div slot="heading">${this._translations["activity"] || "Activity"}</div>
                <div class="activity-list">
                    ${activityItems.length ? activityItems.map((item) => html`
                        <div class="activity-item">
                            <div class="activity-time">${relativeDate(item.timestamp, local, today)}</div>
                            <div class="activity-action">${formatAction(item.action || "")}</div>
                            ${item.note ? html`<div class="activity-note">${item.note}</div>` : html``}
                            ${item.old && item.new ? html`<div class="activity-change">${item.old} → ${item.new}</div>` : html``}
                        </div>
                    `) : html`<div class="activity-empty">${this._translations["no_activity"] || "No activity yet"}</div>`}
                </div>
                <mwc-button slot="primaryAction" @click=${this._closeActivityDialog}>
                    ${this._translations["close"] || "Close"}
                </mwc-button>
            </ha-dialog>
            <ha-dialog .open=${this._notes_dialog_open} @closed=${this._closeNotesDialog}>
                <div slot="heading">${this._translations["notes"] || "Notes"}</div>
                <div class="activity-list">
                    ${notesItems.length ? notesItems.map((item) => html`
                        <div class="activity-item">
                            <div class="activity-time">${relativeDate(item.timestamp, local, today)}</div>
                            <div class="activity-note">${item.note}</div>
                        </div>
                    `) : html`<div class="activity-empty">${this._translations["no_notes"] || "No notes"}</div>`}
                </div>
                <div class="notes-input">
                    <ha-textfield
                        .value=${this._new_note}
                        .label=${this._translations["add_note"] || "Add note"}
                        @input=${this._updateNewNote}
                    ></ha-textfield>
                    <mwc-button @click=${this._addNote}>${this._translations["add"] || "Add"}</mwc-button>
                </div>
                <mwc-button slot="primaryAction" @click=${this._closeNotesDialog}>
                    ${this._translations["close"] || "Close"}
                </mwc-button>
            </ha-dialog>
            <ha-dialog .open=${this._confirm_dialog_open} @closed=${this._closeConfirm}>
                <div slot="heading">${this._translations["confirm_title"] || "Confirm"}</div>
                <div class="confirm-body">${this._confirm_message}</div>
                <div class="confirm-actions">
                    <mwc-button class="confirm-button secondary" @click=${this._closeConfirm}>
                        ${this._translations["cancel"] || "Cancel"}
                    </mwc-button>
                    <mwc-button class="confirm-button primary" @click=${this._confirmProceed}>
                        ${this._translations["confirm"] || "Confirm"}
                    </mwc-button>
                </div>
            </ha-dialog>
            <ha-dialog .open=${this._details_dialog_open} @closed=${this._closeDetailsDialog}>
                <div slot="heading">${this._translations["details"] || "Details"}</div>
                <div class="details-edit">
                    <label class="details-select-label">
                        ${localizeConfigLabel("acquisition_date", "Acquisition date")}
                    </label>
                    <input
                        class="details-input"
                        type="date"
                        .value=${this._edit_acquisition_date}
                        @input=${(ev: Event) => {
                            this._edit_acquisition_date = (ev.target as HTMLInputElement).value;
                        }}
                        @change=${(ev: Event) => {
                            const value = (ev.target as HTMLInputElement).value;
                            this._edit_acquisition_date = value;
                            this._updateConfigField("acquisition_date", value);
                        }}
                    />
                    <label class="details-select-label">
                        ${localizeEntityName("number", "distance_to_window", "Distance")}
                    </label>
                    <input
                        class="details-input"
                        type="number"
                        .value=${this._edit_distance_to_window}
                        @input=${(ev: Event) => {
                            this._edit_distance_to_window = (ev.target as HTMLInputElement).value;
                        }}
                        @change=${(ev: Event) => {
                            const value = (ev.target as HTMLInputElement).value;
                            this._edit_distance_to_window = value;
                            this._updateNumberField("distance_to_window", value);
                        }}
                    />
                    <label class="details-select-label">
                        ${localizeEntityName("number", "pot_diameter", "Pot")}
                    </label>
                    <input
                        class="details-input"
                        type="number"
                        .value=${this._edit_pot_diameter}
                        @input=${(ev: Event) => {
                            this._edit_pot_diameter = (ev.target as HTMLInputElement).value;
                        }}
                        @change=${(ev: Event) => {
                            const value = (ev.target as HTMLInputElement).value;
                            this._edit_pot_diameter = value;
                            this._updateNumberField("pot_diameter", value);
                        }}
                    />
                    <label class="details-select-label">
                        ${localizeConfigLabel("humidity_sensor", "Humidity sensor")}
                    </label>
                    <select
                        class="details-select"
                        .value=${this._edit_humidity_sensor || ""}
                        @change=${(ev: Event) => {
                            const value = (ev.target as HTMLSelectElement).value;
                            this._edit_humidity_sensor = value;
                            this._updateConfigField("humidity_sensor", value);
                        }}
                    >
                        <option value="">${notSetLabel}</option>
                        ${sensorOptionsHumidity.map((opt) => html`
                            <option value=${opt.id}>${opt.name}</option>
                        `)}
                    </select>
                    <label class="details-select-label">
                        ${localizeConfigLabel("temperature_sensor", "Temperature sensor")}
                    </label>
                    <select
                        class="details-select"
                        .value=${this._edit_temperature_sensor || ""}
                        @change=${(ev: Event) => {
                            const value = (ev.target as HTMLSelectElement).value;
                            this._edit_temperature_sensor = value;
                            this._updateConfigField("temperature_sensor", value);
                        }}
                    >
                        <option value="">${notSetLabel}</option>
                        ${sensorOptionsTemperature.map((opt) => html`
                            <option value=${opt.id}>${opt.name}</option>
                        `)}
                    </select>
                    <label class="details-select-label">
                        ${localizeConfigLabel("light_sensor", "Light sensor")}
                    </label>
                    <select
                        class="details-select"
                        .value=${this._edit_light_sensor || ""}
                        @change=${(ev: Event) => {
                            const value = (ev.target as HTMLSelectElement).value;
                            this._edit_light_sensor = value;
                            this._updateConfigField("light_sensor", value);
                        }}
                    >
                        <option value="">${notSetLabel}</option>
                        ${sensorOptionsLight.map((opt) => html`
                            <option value=${opt.id}>${opt.name}</option>
                        `)}
                    </select>
                </div>
                <div class="details-list">
                    ${detailItemsAll.map((item) => html`
                        <div class="details-row ${item.type === "editable" ? "detail-clickable" : ""}" @click=${() => item.type === "editable" ? this._moreInfo(item.key) : undefined}>
                            <div class="details-row-label">${item.label}</div>
                            <div class="details-row-value">
                                ${item.value ? `${item.value}${item.unit ? ` ${item.unit}` : ""}` : (this._translations["not_set"] || "—")}
                            </div>
                        </div>
                    `)}
                </div>
                <mwc-button slot="primaryAction" @click=${this._closeDetailsDialog}>
                    ${this._translations["close"] || "Close"}
                </mwc-button>
            </ha-dialog>
        `;
    }

    _renderOverview() {
        if (!this._hass) return html``;
        this._loadTranslations();
        const filter = this._config?.overview_filter ?? "overdue";

        const deviceEntitiesMap = new Map<string, string[]>();
        for (const entity of Object.values(this._hass.entities || {})) {
            if (entity?.entity_id && entity?.device_id) {
                const list = deviceEntitiesMap.get(entity.device_id) || [];
                list.push(entity.entity_id);
                deviceEntitiesMap.set(entity.device_id, list);
            }
        }

        const taskDefs = this._getTaskDefs();
        const deviceStats = new Map<string, { overdue: number; today: number }>();
        const deviceTaskCounts = new Map<string, Map<string, { overdue: number; today: number }>>();
        const totals = { overdue: 0, today: 0 };
        const taskCounts = new Map<string, { overdue: number; today: number }>();

        const devices = Object.values(this._hass.devices || {});
        const findEntityId = (entities: string[], prefix: string) =>
            entities.find((id) => id.startsWith(prefix));

        const isTaskEnabled = (entities: string[], taskKey: string) => {
            if (taskKey === "mist") {
                const id = findEntityId(entities, "select.simple_plant_extended_misting_enabled_");
                return !id || this._hass.states[id]?.state === "on";
            }
            if (taskKey === "clean") {
                const id = findEntityId(entities, "select.simple_plant_extended_cleaning_enabled_");
                return !id || this._hass.states[id]?.state === "on";
            }
            return true;
        };

        for (const device of devices) {
            const entities = deviceEntitiesMap.get(device.id) || [];
            const stats = { overdue: 0, today: 0 };
            const perTask = new Map<string, { overdue: number; today: number }>();
            let hasTask = false;

            for (const def of taskDefs) {
                if (!isTaskEnabled(entities, def.key)) continue;
                const problemId = findEntityId(entities, def.problemPrefix);
                const todoId = findEntityId(entities, def.todoPrefix);
                const isProblem = problemId && this._hass.states[problemId]?.state === "on";
                const isTodo = todoId && this._hass.states[todoId]?.state === "on" && !isProblem;

                if (!isProblem && !isTodo) continue;
                hasTask = true;

                const taskStats = perTask.get(def.key) || { overdue: 0, today: 0 };
                const typeCounts = taskCounts.get(def.key) || { overdue: 0, today: 0 };

                if (isProblem) {
                    stats.overdue += 1;
                    totals.overdue += 1;
                    taskStats.overdue += 1;
                    typeCounts.overdue += 1;
                }
                if (isTodo) {
                    stats.today += 1;
                    totals.today += 1;
                    taskStats.today += 1;
                    typeCounts.today += 1;
                }

                perTask.set(def.key, taskStats);
                taskCounts.set(def.key, typeCounts);
            }

            if (hasTask) {
                deviceStats.set(device.id, stats);
                deviceTaskCounts.set(device.id, perTask);
            }
        }

        const imageEntityByDevice = new Map<string, string>();
        for (const entity of Object.values(this._hass.entities || {})) {
            if (
                entity?.device_id &&
                entity?.entity_id?.startsWith("image.simple_plant_extended_picture_")
            ) {
                imageEntityByDevice.set(entity.device_id, entity.entity_id);
            }
        }
        const rows = Array.from(deviceStats.entries())
            .map(([deviceId, stats]) => {
                if (filter === "overdue" && stats.overdue === 0) return null;
                if (filter === "today" && stats.today === 0) return null;
                const device = devices.find((d) => d.id === deviceId);
                const name = device?.name || deviceId;
                const imageEntityId = imageEntityByDevice.get(deviceId);
                const imageState = imageEntityId
                    ? this._hass.states[imageEntityId]
                    : undefined;
                const imageSrc = imageState?.attributes?.entity_picture
                    ? ((this._hass as any).hassUrl
                        ? (this._hass as any).hassUrl(imageState.attributes.entity_picture)
                        : imageState.attributes.entity_picture)
                    : "";
                const perTask = deviceTaskCounts.get(deviceId) || new Map();
                return { deviceId, name, stats, imageSrc, perTask };
            })
            .filter(Boolean) as Array<{ deviceId: string; name: string; stats: { overdue: number; today: number }; imageSrc: string; perTask: Map<string, { overdue: number; today: number }> }>;

        const taskPills = taskDefs
            .map((def) => {
                const counts = taskCounts.get(def.key) || { overdue: 0, today: 0 };
                const count =
                    filter === "overdue"
                        ? counts.overdue
                        : filter === "today"
                        ? counts.today
                        : counts.overdue + counts.today;
                if (!count) return null;
                return { ...def, count };
            })
            .filter(Boolean) as Array<{ key: string; label: string; icon: string; count: number }>;

        return html`
            <ha-card>
                <div class="card-content">
                    <div class="info">
                        <div class="section-title overview-title">${this._translations["plant_tasks"] || "Plant tasks"}</div>
                        <div class="overview-summary">
                            ${filter !== "today"
                                ? html`
                                      <button class="overview-total-pill status-pill is-on" @click=${() => this._openOverviewTotalsDialog("overdue")}>
                                          ${totals.overdue} ${this._translations["overdue"] || "Overdue"}
                                      </button>
                                  `
                                : html``}
                            ${filter !== "overdue"
                                ? html`
                                      <button class="overview-total-pill status-pill" @click=${() => this._openOverviewTotalsDialog("today")}>
                                          ${totals.today} ${this._translations["today"] || "Today"}
                                      </button>
                                  `
                                : html``}
                        </div>
                        <div class="overview-task-pills">
                            ${taskPills.map(
                                (pill) => html`
                                    <button class="overview-task-pill" @click=${() => this._openOverviewTaskDialog(pill.key)}>
                                        <ha-icon class="overview-task-icon" .icon=${pill.icon}></ha-icon>
                                        <span class="overview-task-count">${pill.count}</span>
                                    </button>
                                `
                            )}
                        </div>
                        <div class="details-list">
                            ${rows.length
                                ? rows.map(
                                      (row) => html`
                                          <div class="details-row detail-clickable overview-row">
                                              <div class="overview-row-main">
                                                  <div class="overview-row-label" @click=${() => this._openPlantDialog(row.deviceId)}>
                                                      ${row.imageSrc
                                                          ? html`<img class="overview-plant-image" src=${row.imageSrc} alt="" />`
                                                          : html`<ha-icon class="overview-plant-icon" .icon=${"mdi:flower"}></ha-icon>`}
                                                      <span class="overview-plant-name">${row.name}</span>
                                                  </div>
                                                  <div class="overview-subtitle">
                                                      <span class="overview-subtitle-text">
                                                          ${filter === "overdue"
                                                              ? `${row.stats.overdue} ${this._translations["overdue"] || "Overdue"}`
                                                              : filter === "today"
                                                              ? `${row.stats.today} ${this._translations["today"] || "Today"}`
                                                              : `${row.stats.overdue + row.stats.today} ${this._translations["tasks"] || "Tasks"}`}
                                                      </span>
                                                      <span class="overview-subtitle-line"></span>
                                                  </div>
                                                  <div class="overview-row-value">
                                                      ${taskDefs.map((def) => {
                                                          const counts = row.perTask.get(def.key) || { overdue: 0, today: 0 };
                                                          const count = filter === "overdue"
                                                              ? counts.overdue
                                                              : filter === "today"
                                                              ? counts.today
                                                              : counts.overdue + counts.today;
                                                          if (!count) return html``;
                                                          return html`
                                                              <button class="overview-task-pill" @click=${() => this._openOverviewTaskDialog(def.key, row.deviceId)}>
                                                                  <ha-icon class="overview-task-icon" .icon=${def.icon}></ha-icon>
                                                                  <span class="overview-task-count">${count}</span>
                                                              </button>
                                                          `;
                                                      })}
                                                  </div>
                                              </div>
                                          </div>
                                      `
                                  )
                                : html`<div class="activity-empty">${this._translations["no_activity"] || "No activity yet"}</div>`}
                        </div>
                    </div>
                </div>
                <ha-dialog .open=${this._overview_task_dialog_open} @closed=${this._closeOverviewTaskDialog}>
                    <div slot="heading">${this._overview_task_title || this._translations["tasks"] || "Tasks"}</div>
                    ${this._overview_task_items.length
                        ? html`
                              <div class="overview-dialog-actions">
                                  <mwc-button @click=${this._markAllOverviewTasks}>
                                      ${this._translations["confirm"] || "Confirm"} ${this._translations["all"] || "All"}
                                  </mwc-button>
                              </div>
                          `
                        : html``}
                    <div class="details-list">
                        ${this._overview_task_items.length
                            ? this._overview_task_items.map(
                                  (item) => html`
                                      <div class="details-row">
                                          <div class="details-row-label">
                                              ${item.name}
                                              ${item.taskLabel ? html`<span class="overview-task-row-label">${item.taskLabel}</span>` : html``}
                                          </div>
                                          <div class="details-row-value">
                                              <span class="status-pill ${item.status === "overdue" ? "is-on" : ""}">
                                                  ${item.status === "overdue"
                                                      ? this._translations["overdue"] || "Overdue"
                                                      : this._translations["today"] || "Today"}
                                              </span>
                                              <ha-icon-button
                                                  class="overview-task-action"
                                                  .label=${this._translations["confirm"] || "Confirm"}
                                                  .disabled=${!item.actionEntityId}
                                                  @click=${(ev: Event) => {
                                                      ev.stopPropagation();
                                                      if (item.actionEntityId) {
                                                          this._pressActionButton(item.actionEntityId);
                                                      }
                                                  }}
                                              >
                                                  <ha-icon .icon=${"mdi:check"}></ha-icon>
                                              </ha-icon-button>
                                          </div>
                                      </div>
                                  `
                              )
                            : html`<div class="activity-empty">${this._translations["no_activity"] || "No activity yet"}</div>`}
                    </div>
                    <mwc-button slot="primaryAction" @click=${this._closeOverviewTaskDialog}>
                        ${this._translations["close"] || "Close"}
                    </mwc-button>
                </ha-dialog>
                <ha-dialog .open=${this._plant_dialog_open} @closed=${this._closePlantDialog}>
                    <div slot="heading">${this._plant_dialog_device || ""}</div>
                    ${this._plant_card_el ? this._plant_card_el : html``}
                    <mwc-button slot="primaryAction" @click=${this._closePlantDialog}>
                        ${this._translations["close"] || "Close"}
                    </mwc-button>
                </ha-dialog>
            </ha-card>
        `;
    }

    async _openPlantDialog(deviceId: string) {
        const device = Object.values(this._hass.devices || {}).find((d) => d.id === deviceId);
        this._plant_dialog_device = device?.name || deviceId;
        this._plant_dialog_open = true;
        if (!this._helpers) {
            const loader = (window as any).loadCardHelpers;
            if (loader) {
                this._helpers = await loader();
            }
        }
        const config = {
            type: `custom:${CARD_TYPE}`,
            device: deviceId,
        } as LovelaceCardConfig;
        if (this._helpers?.createCardElement) {
            this._plant_card_el = this._helpers.createCardElement(config);
            this._plant_card_el.hass = this._hass;
        }
    }

    _closePlantDialog() {
        this._plant_dialog_open = false;
    }

    _openOverviewTaskDialog(taskKey: string, deviceId?: string) {
        this._overview_task_type = taskKey;
        const def = this._getTaskDef(taskKey);
        this._overview_task_title = def?.label || this._translations["tasks"] || "Tasks";
        this._overview_task_items = this._buildOverviewTaskItems(taskKey, undefined, deviceId);
        this._overview_task_dialog_open = true;
    }

    _openOverviewTotalsDialog(status: "overdue" | "today") {
        this._overview_task_type = status;
        this._overview_task_title = status === "overdue"
            ? this._translations["overdue"] || "Overdue"
            : this._translations["today"] || "Today";
        this._overview_task_items = this._buildOverviewTaskItems(undefined, status);
        this._overview_task_dialog_open = true;
    }

    _closeOverviewTaskDialog() {
        this._overview_task_dialog_open = false;
        this._overview_task_type = null;
        this._overview_task_title = null;
        this._overview_task_items = [];
    }

    _buildOverviewTaskItems(taskKey?: string, statusFilter?: "overdue" | "today", deviceIdFilter?: string) {
        if (!this._hass) return [];
        const filter = this._config?.overview_filter ?? "overdue";
        const taskDefs = this._getTaskDefs();
        const def = taskKey ? taskDefs.find((item) => item.key === taskKey) : null;

        const deviceEntitiesMap = new Map<string, string[]>();
        for (const entity of Object.values(this._hass.entities || {})) {
            if (entity?.entity_id && entity?.device_id) {
                const list = deviceEntitiesMap.get(entity.device_id) || [];
                list.push(entity.entity_id);
                deviceEntitiesMap.set(entity.device_id, list);
            }
        }

        const devices = Object.values(this._hass.devices || {});
        const deviceSlugMap = new Map<string, string>();
        for (const [deviceId, entities] of deviceEntitiesMap.entries()) {
            const pictureEntity = entities.find((id) => id.startsWith("image.simple_plant_extended_picture_"));
            if (pictureEntity) {
                deviceSlugMap.set(deviceId, pictureEntity.replace("image.simple_plant_extended_picture_", ""));
            }
        }
        const items: Array<{ deviceId: string; name: string; status: "overdue" | "today"; actionEntityId?: string; taskLabel?: string }> = [];

        const findEntityId = (entities: string[], prefix: string) =>
            entities.find((id) => id.startsWith(prefix));

        const isTaskEnabled = (entities: string[], key: string) => {
            if (key === "mist") {
                const id = findEntityId(entities, "select.simple_plant_extended_misting_enabled_");
                return !id || this._hass.states[id]?.state === "on";
            }
            if (key === "clean") {
                const id = findEntityId(entities, "select.simple_plant_extended_cleaning_enabled_");
                return !id || this._hass.states[id]?.state === "on";
            }
            return true;
        };

        for (const device of devices) {
            if (deviceIdFilter && device.id !== deviceIdFilter) continue;
            const entities = deviceEntitiesMap.get(device.id) || [];
            const defsToCheck = def ? [def] : taskDefs;
            for (const itemDef of defsToCheck) {
                if (!isTaskEnabled(entities, itemDef.key)) continue;
                const problemId = findEntityId(entities, itemDef.problemPrefix);
                const todoId = findEntityId(entities, itemDef.todoPrefix);
                let actionId = findEntityId(entities, itemDef.actionPrefix);
                if (!actionId) {
                    const slug = deviceSlugMap.get(device.id);
                    if (slug) {
                        actionId = `${itemDef.actionPrefix}${slug}`;
                    }
                }

                const isProblem = problemId && this._hass.states[problemId]?.state === "on";
                const isTodo = todoId && this._hass.states[todoId]?.state === "on" && !isProblem;

                if ((statusFilter === "overdue" || (statusFilter == null && (filter === "overdue" || filter === "all"))) && isProblem) {
                    items.push({ deviceId: device.id, name: device.name, status: "overdue", actionEntityId: actionId, taskLabel: itemDef.label });
                }
                if ((statusFilter === "today" || (statusFilter == null && (filter === "today" || filter === "all"))) && isTodo) {
                    items.push({ deviceId: device.id, name: device.name, status: "today", actionEntityId: actionId, taskLabel: itemDef.label });
                }
            }
        }

        return items;
    }

    _pressActionButton(entityId: string) {
        this._hass.callService("button", "press", {}, { entity_id: entityId });
    }

    _markAllOverviewTasks = () => {
        const unique = new Set(
            this._overview_task_items
                .map((item) => item.actionEntityId)
                .filter((id): id is string => Boolean(id))
        );
        for (const entityId of unique) {
            this._pressActionButton(entityId);
        }
    };

    _getTaskDefs() {
        return [
            {
                key: "water",
                label: this._translations["watering"] || "Watering",
                icon: "mdi:watering-can",
                problemPrefix: "binary_sensor.simple_plant_extended_problem_",
                todoPrefix: "binary_sensor.simple_plant_extended_todo_",
                actionPrefix: "button.simple_plant_extended_mark_watered_",
            },
            {
                key: "feed",
                label: this._translations["feed_button"] || "Fertilize",
                icon: "mdi:seed",
                problemPrefix: "binary_sensor.simple_plant_extended_fertilization_problem_",
                todoPrefix: "binary_sensor.simple_plant_extended_fertilization_todo_",
                actionPrefix: "button.simple_plant_extended_mark_fertilized_",
            },
            {
                key: "mist",
                label: this._translations["mark_mist"] || "Misting",
                icon: "mdi:spray-bottle",
                problemPrefix: "binary_sensor.simple_plant_extended_misting_problem_",
                todoPrefix: "binary_sensor.simple_plant_extended_misting_todo_",
                actionPrefix: "button.simple_plant_extended_mark_misted_",
            },
            {
                key: "clean",
                label: this._translations["mark_clean"] || "Cleaning",
                icon: "mdi:liquid-spot",
                problemPrefix: "binary_sensor.simple_plant_extended_cleaning_problem_",
                todoPrefix: "binary_sensor.simple_plant_extended_cleaning_todo_",
                actionPrefix: "button.simple_plant_extended_mark_cleaned_",
            },
        ];
    }

    _getTaskDef(taskKey: string) {
        return this._getTaskDefs().find((item) => item.key === taskKey);
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
            SimplePlantExtendedCard.keys.forEach((key) => {
                if (id.includes(key)) {
                // Associate the corresponding key with the matched string
                this._entity_ids[key] = id;
                }
            });
        });
    }


    async _loadTranslations(){
        if (!this._hass || this._translations_loaded)
            return
        if (typeof (this._hass as any).loadBackendTranslation === "function") {
            await (this._hass as any).loadBackendTranslation("config", INTEGRATION);
        }
        const localizeFirst = (keys: string[], fallback: string) => {
            for (const key of keys) {
                const localized = this._hass.localize(key);
                if (localized && localized !== key) {
                    return localized;
                }
            }
            return fallback;
        };
        const language = this._hass.language || "en";
        const fallbackMap: Record<string, { no_activity: string; more_details: string; plant_tasks: string; overdue: string; today: string; tasks: string; all: string; interval: string; method: string; no_notes: string }> = {
            nl: {
                no_activity: "Nog geen activiteit",
                more_details: "Meer details",
                plant_tasks: "Planttaken",
                overdue: "Te laat",
                today: "Vandaag",
                tasks: "Taken",
                all: "Alles",
                interval: "Elke",
                method: "Methode",
                no_notes: "Geen notities",
            },
            fr: {
                no_activity: "Aucune activité pour le moment",
                more_details: "Plus de détails",
                plant_tasks: "Tâches des plantes",
                overdue: "En retard",
                today: "Aujourd'hui",
                tasks: "Tâches",
                all: "Tout",
                interval: "Chaque",
                method: "Méthode",
                no_notes: "Aucune note",
            },
            ru: {
                no_activity: "Пока нет активности",
                more_details: "Подробнее",
                plant_tasks: "Задачи растений",
                overdue: "Просрочено",
                today: "Сегодня",
                tasks: "Задачи",
                all: "Все",
                interval: "Каждый",
                method: "Метод",
                no_notes: "Заметок нет",
            },
        };
        const fallbackFor = (key: "no_activity" | "more_details" | "plant_tasks" | "overdue" | "today" | "tasks" | "all" | "interval" | "method" | "no_notes", fallback: string) =>
            fallbackMap[language]?.[key] || fallback;

        const translation_key = `component.${INTEGRATION}.entity.button.mark_watered.name`
        const feed_translation_key = `component.${INTEGRATION}.entity.feed.name`;
        this._translations["button"] = this._hass.localize(translation_key) || "Mark as watered"
        this._translations["feed_button"] = this._hass.localize(feed_translation_key) || "Mark fertilized"
        this._translations["cancel"] = this._hass.localize("ui.dialogs.generic.cancel")
        this._translations["close"] = this._hass.localize("ui.common.close")
        this._translations["today"] = this._hass.localize("ui.components.calendar.today")
        this._translations["late"] = this._hass.localize(`component.${INTEGRATION}.entity.binary_sensor.problem.name`)
        this._translations["interval"] = localizeFirst(
            ["ui.common.interval", "ui.common.every"],
            fallbackFor("interval", "Every"),
        );
        this._translations["method"] = localizeFirst(
            ["ui.common.method"],
            fallbackFor("method", "Method"),
        );
        this._translations["watering"] = this._hass.localize(`component.${INTEGRATION}.entity.button.mark_watered.name`) || "Watering";
        this._translations["details"] = this._hass.localize("ui.common.details") || "Details";
        this._translations["activity"] = this._hass.localize("ui.panel.logbook") || "Activity";
        this._translations["no_activity"] = localizeFirst(
            [
                "ui.panel.logbook.no_entries",
                "ui.panel.logbook.no_entries_found",
                "ui.panel.logbook.empty",
                "ui.common.no_entries",
            ],
            fallbackFor("no_activity", "No activity yet"),
        );
        this._translations["plant_tasks"] = localizeFirst(
            ["ui.panel.lovelace.editor.card.generic.tasks", "ui.common.tasks"],
            fallbackFor("plant_tasks", "Plant tasks"),
        );
        this._translations["overdue"] = localizeFirst(
            ["ui.common.overdue"],
            fallbackFor("overdue", "Overdue"),
        );
        this._translations["today"] = localizeFirst(
            ["ui.components.calendar.today", "ui.common.today"],
            fallbackFor("today", "Today"),
        );
        this._translations["tasks"] = localizeFirst(
            ["ui.common.tasks"],
            fallbackFor("tasks", "Tasks"),
        );
        this._translations["all"] = localizeFirst(
            ["ui.common.all"],
            fallbackFor("all", "All"),
        );
        this._translations["notes"] = this._hass.localize("component.simple_plant_extended.entity.text.notes.name") || "Notes";
        this._translations["no_notes"] = this._hass.localize("component.simple_plant_extended.entity.text.notes.name")
            ? `${this._hass.localize("component.simple_plant_extended.entity.text.notes.name")}: ${this._translations["no_activity"]}`
            : fallbackFor("no_notes", "No notes");
        this._translations["add_note"] = this._hass.localize("ui.common.add") || "Add note";
        this._translations["add"] = this._hass.localize("ui.common.add") || "Add";
        this._translations["mark_mist"] = this._hass.localize(`component.${INTEGRATION}.entity.button.mark_misted.name`) || "Mark misted";
        this._translations["mark_clean"] = this._hass.localize(`component.${INTEGRATION}.entity.button.mark_cleaned.name`) || "Mark cleaned";
        this._translations["confirm_title"] = this._hass.localize("ui.dialogs.confirmation.title") || "Confirm";
        this._translations["confirm"] = this._hass.localize("ui.common.confirm") || "Confirm";
        this._translations["confirm_mark"] = this._hass.localize("ui.common.mark") || "mark as";
        this._translations["action_water"] = this._hass.localize(`component.${INTEGRATION}.entity.button.mark_watered.name`) || "watered";
        this._translations["action_feed"] = this._hass.localize(`component.${INTEGRATION}.entity.button.mark_fertilized.name`) || "fertilized";
        this._translations["action_mist"] = this._hass.localize(`component.${INTEGRATION}.entity.button.mark_misted.name`) || "misted";
        this._translations["action_clean"] = this._hass.localize(`component.${INTEGRATION}.entity.button.mark_cleaned.name`) || "cleaned";
        this._translations["more_details"] = localizeFirst(
            [
                "ui.panel.lovelace.editor.card.generic.show_more",
                "ui.common.show_more",
                "ui.common.more_info",
                "ui.common.more_details",
            ],
            fallbackFor("more_details", "More details"),
        );
        this._translations["not_set"] = this._hass.localize("ui.common.unavailable") || "—";
        this._translations_loaded = true
    }
}
