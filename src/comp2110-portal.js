import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { getUser } from "./auth.js";
import "./components/widget-block.js";
import "./components/blog-block.js";
//import "./components/widget-column.js";
import "./components/ad-widget.js";
import "./components/login-widget.js";
import "./components/currency-converter.js";
import "./components/dog-images.js";
import "./components/weather-forecast.js";
import "./components/joke-bot.js";
import "./components/widget-carousel.js";

class Comp2110Portal extends LitElement {
    static properties = {
        header: { type: String },
        _loggedIn: { type: Boolean, state: true },
        _updated: { type: Number, state: true },
    };

    static styles = css`
        :host {
            min-height: 100vh;
            font-size: 14pt;
            color: #1a2b42;
            max-width: 960px;
            margin: 0 auto;
            text-align: center;
            background-color: lightgoldenrodyellow;  
        }
        section {
            display: flex;
            justify-content: center;
        }
        section {
            display: flex;
            justify-content: center;
        }

        main {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        @media screen and (max-width: 999px) {
            main {
                max-width: 600px;
            }
        }

        @media screen and (max-width: 1800px) and (min-width: 1000px) {
            main {
                max-width: 1000px;
            }
        }
        @media screen and (min-width: 1801px) {
            main {
                max-width: 1600px;
            }
        }

        .app-footer {
            font-size: calc(12px + 0.5vmin);
            align-items: center;
        }

        .app-footer a {
            margin-left: 5px;
        }

        .center-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            width: 100%;
        }

        header {
            background:#87CEEB;
            padding-top: 25px;
            padding-bottom:50px;
                --mask:
                  radial-gradient(57.88px at 50% calc(100% - 79.50px),#000 99%,#0000 101%) calc(50% - 60px) 0/120px 100%,
                  radial-gradient(57.88px at 50% calc(100% + 49.50px),#0000 99%,#000 101%) 50% calc(100% - 30px)/120px 100% repeat-x;
                -webkit-mask: var(--mask);
                        mask: var(--mask);
        }

        h1 {
            color: white;
            font-size: 80pt;
            letter-spacing: 15px;
            margin: 0px 20%;
            padding: 20px;
            font-size: 40px;
        }
    `;

    constructor() {
        super();
        this.header = "COMP2110 Portal";
        this._loggedIn = false;
    }

    handleLoginStateChange(event) {
        const { newState } = event.detail;
        this._loggedIn = newState;
        this.requestUpdate();
    }

    handleBlogStateChange(event) {
        const { newState } = event.detail;
        this._updated = newState;
        this.requestUpdate();
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("state-changed", this.handleLoginStateChange);
        this.addEventListener("blog-post", this.handleBlogStateChange);
    }

    displayBlogForm() {
        if (getUser()?.name) {
            return html`<blog-form user="${getUser()}"></blog-form>`;
        } else {
            return html``;
        }
    }

    render() {
        return html`
            <header>
                <h1>${this.header}</h1>
            </header>

            <section>
                <main>
                    <widget-carousel>
                        <weather-forecast header="Weather"></weather-forecast>
                        <joke-bot header="jokeBot"></joke-bot>
                        <currency-converter
                            header="Currency Conversion"
                        ></currency-converter>
                        <dog-images header="Dog Images"></dog-images>
                        <ad-widget></ad-widget>
                    </widget-carousel>

                    <div class="center-col">
                        <login-widget></login-widget>
                        ${this.displayBlogForm()}
                        <blog-block></blog-block>
                    </div>
                </main>
            </section>

            <p class="app-footer">
                A product of the COMP2110 Web Development Collective &copy; 2023
            </p>
        `;
    }
}

customElements.define("comp2110-portal", Comp2110Portal);
