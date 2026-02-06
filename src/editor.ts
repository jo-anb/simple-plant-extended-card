import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
import { html, LitElement } from 'lit';

import { INTEGRATION } from "./consts"

export class SimplePlantExtendedCardEditor extends LitElement {

    private _hass : HomeAssistant;
    private _config : LovelaceCardConfig;

    static schema = [
        {name: "mode", label: "Mode", selector: { select: { options: ["device", "overview"], custom_value: false } }},
        {name: "device", selector: { device: { integration: INTEGRATION} }},
        {name: "overview_filter", label: "Overview filter", selector: { select: { options: ["overdue", "today", "all"], custom_value: false } }},
        {name: "show_misting", label: "Show misting", selector: { boolean: {} }},
        {name: "show_cleaning", label: "Show cleaning", selector: { boolean: {} }},
        {name: "show_activity", label: "Show activity timeline", selector: { boolean: {} }},
        {name: "show_details", label: "Show details", selector: { boolean: {} }},
        {name: "show_notes", label: "Show notes", selector: { boolean: {} }},
    ]

    static properties = {
        _config: { state: true },
    }

    set hass(hass : HomeAssistant) {
        this._hass = hass
    }

    // setConfig works the same way as for the card itself
    setConfig(config: LovelaceCardConfig) {
        this._config = {
            mode: "device",
            overview_filter: "overdue",
            show_misting: true,
            show_cleaning: true,
            show_activity: true,
            show_details: true,
            show_notes: true,
            ...config,
        } as LovelaceCardConfig;
    }

    // This function is called when the input element of the editor loses focus
    _valueChanged(ev: CustomEvent) {
        if (!this._config || !this._hass) {
        return;
        }
        const _config = Object.assign({}, this._config);
        _config.mode = ev.detail.value.mode ?? "device";
        _config.device = ev.detail.value.device;
        _config.overview_filter = ev.detail.value.overview_filter ?? "overdue";
        _config.show_misting = ev.detail.value.show_misting ?? true;
        _config.show_cleaning = ev.detail.value.show_cleaning ?? true;
        _config.show_activity = ev.detail.value.show_activity ?? true;
        _config.show_details = ev.detail.value.show_details ?? true;
        _config.show_notes = ev.detail.value.show_notes ?? true;

        this._config = _config;

        const event = new CustomEvent("config-changed", {
        detail: { config: _config },
        bubbles: true,
        composed: true,
        });
        this.dispatchEvent(event);
    }

    private _computeLabel = (schema: any) => {
        let label = this.hass?.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
        if (label) return label;
        label = this.hass?.localize(`ui.panel.lovelace.editor.card.${schema.label}`);
        if (label) return label;
        return schema.label;
    };

    render() {
        if (!this._hass || !this._config) {
        return html`<div>Invalid</div>`;
        }

        return html`
            <ha-form
                .hass=${this._hass}
                .data=${this._config}
                .schema=${SimplePlantExtendedCardEditor.schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }
}

