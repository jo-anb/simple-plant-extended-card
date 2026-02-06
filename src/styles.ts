import { css } from "lit";

export const styles = css`
    .hidden {
        display: none !important;
    }

    .card-content {
        padding: 0px;
        position: relative;
    }

    .info {
        padding: 16px;
    }

    .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .activity-button {
        margin-top: 8px;
        position: static;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }
    .border_row {
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
    }

    .content {
        position: relative;
        overflow: hidden;
    }

    .mark-action-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
    }

    .mark-action {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        padding: 2px;
        border: 1px solid var(--divider-color);
        background: rgba(var(--rgb-card-background-color), 0.2);
        color: var(--secondary-text-color);
    }

    .mark-action.is-due {
        color: var(--warning-color);
        border-color: rgba(var(--rgb-warning-color, 255, 193, 7), 0.6);
        background: rgba(var(--rgb-warning-color, 255, 193, 7), 0.15);
    }

    .mark-action.is-done {
        opacity: 0.75;
    }

    .content p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .sub_content {
        font-size: 14px;
        flex-grow: 2;
        gap: 8px;
        align-items: center;
        justify-content: flex-between;
    }

    .grow {
        flex-grow: 2;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 4px;
    }
    .sub_content_conditional {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0px;
    }

    .right-actions {
        margin-left: auto;
        justify-content: flex-end;
        align-self: center;
        display: flex;
        align-items: center;
        gap: 0px;
    }

    .right-actions sub-icon-content {
        display: inline-flex;
        align-items: center;
    }

    .right-align {
        margin-left: auto;
        justify-content: flex-end;
    }

    .status-pill {
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 999px;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        border: 1px solid var(--divider-color);
    }

    .status-pill.is-on {
        background: rgba(var(--rgb-primary-color), 0.12);
        color: var(--primary-color);
        border-color: rgba(var(--rgb-primary-color), 0.35);
    }

    .status-pill.is-off {
        opacity: 0.6;
    }

    .status-off {
        opacity: 0.7;
    }

    .sub {
        position: absolute;
        top:0;
        left: 0;
        transform: translateY(100%);
        color: var(--secondary-text-color);
        font-size: 12px;
    }


    h1 {
        font-weight: normal;
        font-size: 24px;

        margin-top: 8px;
        margin-bottom: 0px;
        line-height: 24px;
        height: 48px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .section-title {
        padding: 12px 0 8px;
        font-weight: 600;
        font-size: 14px;
    }

    .overview-title {
        font-size: clamp(12px, 2.2vw, 16px);
    }

    .overview-summary {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
    }

    .overview-total-pill {
        cursor: pointer;
        background: var(--secondary-background-color);
    }

    .overview-task-pills {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
    }

    .overview-task-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: clamp(10px, 1.8vw, 12px);
        cursor: pointer;
    }

    .overview-subtitle {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: clamp(10px, 1.8vw, 12px);
        color: var(--secondary-text-color);
    }

    .overview-subtitle-text {
        white-space: nowrap;
    }

    .overview-subtitle-line {
        flex: 1;
        height: 1px;
        background: var(--divider-color);
    }

    .overview-task-pill:hover {
        border-color: rgba(var(--rgb-primary-color), 0.45);
        background: rgba(var(--rgb-primary-color), 0.12);
    }

    .overview-task-icon {
        width: 16px;
        height: 16px;
    }

    .overview-task-count {
        font-weight: 600;
    }

    .details-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        padding-bottom: 12px;
    }

    .detail-item {
        padding: 8px;
        border-radius: 8px;
        background: var(--secondary-background-color);
    }

    .detail-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .detail-value {
        font-size: 13px;
        margin-top: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .detail-value-editable {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .detail-edit-icon {
        width: 14px;
        height: 14px;
        color: var(--secondary-text-color);
    }

    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 8px 0 16px;
        max-height: 380px;
        overflow: auto;
    }

    .activity-item {
        border-left: 2px solid var(--divider-color);
        padding-left: 12px;
    }

    .activity-time {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
    }

    .activity-action {
        font-size: 13px;
        font-weight: 600;
        text-transform: capitalize;
    }

    .activity-note,
    .activity-change {
        font-size: 12px;
        color: var(--secondary-text-color);
    }

    .activity-empty {
        font-size: 12px;
        color: var(--secondary-text-color);
    }

    .notes-row {
        cursor: pointer;
        gap: 12px;
    }

    .notes-preview {
        font-size: 12px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .notes-input {
        display: flex;
        gap: 8px;
        align-items: center;
        padding-top: 8px;
    }

    .notes-input ha-textfield {
        flex: 1;
    }

    .details-button {
        width: 100%;
        margin-top: 12px;
        --mdc-theme-primary: var(--primary-color);
    }

    .details-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 4px 0 12px;
    }

    .details-edit {
        display: grid;
        gap: 8px;
        padding: 4px 0 12px;
    }

    .details-select-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .details-select {
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
    }

    .details-input {
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
    }

    .details-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 8px;
        border-radius: 8px;
        background: var(--secondary-background-color);
    }

    .details-row-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .overview-row-label {
        display: flex;
        align-items: center;
        gap: 8px;
        text-transform: none;
        letter-spacing: 0;
        font-size: clamp(11px, 2vw, 14px);
        color: var(--primary-text-color);
        cursor: pointer;
    }

    .overview-row {
        flex-direction: column;
        align-items: stretch;
    }

    .overview-row-main {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .overview-plant-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .overview-plant-image {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
        flex-shrink: 0;
    }

    .overview-plant-icon {
        width: 28px;
        height: 28px;
        color: var(--secondary-text-color);
        flex-shrink: 0;
    }

    .overview-row-value {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: flex-start;
        font-size: clamp(10px, 1.8vw, 12px);
    }

    .overview-dialog-actions {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 8px;
    }

    .overview-task-row-label {
        display: block;
        font-size: 11px;
        color: var(--secondary-text-color);
        text-transform: none;
        letter-spacing: 0;
        margin-top: 2px;
    }

    .overview-task-action {
        margin-left: 4px;
    }

    .details-row-value {
        font-size: 13px;
        text-align: right;
    }

    .detail-clickable {
        cursor: pointer;
    }

    .confirm-body {
        padding: 4px 0 12px;
        color: var(--secondary-text-color);
        font-size: 14px;
    }

    .confirm-actions {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding-top: 8px;
    }

    .confirm-button {
        flex: 1;
    }

    .confirm-button.primary {
        --mdc-theme-primary: var(--primary-color);
    }

    hui-image {
        aspect-ratio: 1 / 1;
        border-radius: var(--ha-card-border-radius,12px);
        overflow: hidden;
    }

    ha-button {
        width: 100%;
        margin-top: 8px;
    }


    ha-icon {
        // display: flex;
        position: relative;
    }

    .action-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
    }

    .action-icon.clickable:hover {
        background: rgba(var(--rgb-primary-color), 0.18);
        border-color: rgba(var(--rgb-primary-color), 0.45);
    }

    .action-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
    }

    ha-icon[data-color] {
        color: var(--color);
    }



    .floating-icon-button {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background-color: rgba(var(--rgb-card-background-color), 0.2);
        border-radius: 48px;
    }

    ha-icon-button,
    mwc-button,
    .clickable {
        cursor: pointer;
    }

    ha-icon-button ha-icon::after {
        content: attr(data-days, "");
        position: absolute;
        top: calc( 50% + 5px );
        left: 0px;
        transform: translateY(-50%);
        width: 100%;
        font-size: 10px;
    }
    
    .sub_icon {
        width: 28px;
        height: 28px;
        display: block !important;
    }
    sub-icon-content ha-icon::after {
        content: attr(data-days, "");
        position: absolute;
        top: calc( 50% - 2px );
        left: -2px;
        transform: translateY(-50%);
        width: 100%;
        font-size: 8px;
        text-align: center;
    }
    .sub_icon_button {
        // display: block;
        cursor: pointer;
        // background-color: rgb(0,0,0);
        // border-radius: 50%;
    }
    .sub_icon_button:hover {
        color: green;
    }
    .repeat_icon {
        color: var(--secondary-text-color);
        width: 28px;
        height: 28px;
        display: block !important;
    }
`