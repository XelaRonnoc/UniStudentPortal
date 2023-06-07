import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export class WidgetBlock extends LitElement {
    static properties = {
        header: { type: String },
    };

    static styles = css`
        :host {
            width: 270px;
            height: 270px;
            background-color: azure;
            box-sizing: border-box;
            border-radius: 10px;
            border: 10px solid white;
        }
    `;

    constructor() {
        super();
        this.header = "Widget";
    }

    render() {
        return html` <h3>${this.header}</h3> `;
    }
}

customElements.define("widget-block", WidgetBlock);
