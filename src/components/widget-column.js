import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class WidgetColumn extends LitElement {
    static properties = {
        header: { type: String },
    };

    static styles = css`
        :host {
            display: flex;
        }

        .widget-carosel {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
    `;

    constructor() {
        super();
        this.header = "Widgets";
    }

    render() {
        return html`
            <div class="widget-carosel">
                <h2>${this.header}</h2>
                <slot></slot>
            </div>
        `;
    }
}

customElements.define("widget-column", WidgetColumn);
