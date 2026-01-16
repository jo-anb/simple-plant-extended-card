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
        gap: 4px;
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

    ha-icon[data-color] {
        color: var(--color);
    }



    ha-icon-button {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background-color: rgba(var(--rgb-card-background-color), 0.2);
        border-radius: 48px;
    }

    ha-icon-button ha-icon::after {
        content: attr(data-days, "");
        position: absolute;
        top: calc( 50% + 1px );
        left: 0px;
        transform: translateY(-50%);
        width: 100%;
        font-size: 10px;
    }
    
    .sub_icon {
        width: 28px;
        height: 28px;
    }
    sub-icon-content ha-icon::after {
        content: attr(data-days, "");
        position: absolute;
        top: calc( 50% + 1px );
        left: 8px;
        transform: translateY(-50%);
        width: 100%;
        font-size: 8px;
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
        width: 34px;
        height: 34px;
    }
`