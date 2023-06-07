import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { WidgetBlock } from "./widget-block.js";
import { currencyValues } from "./currencys.js";

class CurrencyConverter extends WidgetBlock {
    static properties = {
        _data: { type: String, state: true },
        _amount: { type: String, state: true },
        _curIn: { type: String, state: true },
        _curOut: { type: String, state: true },
        _url: { type: String, state: true },
        _loadingMessage: { type: String, state: true },
        _displayCurOut: { type: String, state: true },
    };

    static styles = css`
        :host {
            display: block;
            width: 340px;
            height: 340px;
            background-image: url("src/components/weather-images/money.jpg");
            background-size: 500px 340px;
            background-repeat: no-repeat;
            font-family: sans-serif;
            box-sizing: border-box;
            border-radius: 10px;
            border: 10px solid white;
            margin-bottom: 10%;
            margin-left: 5%;
            font-weight: bold;
        }

        h3 {
            margin-top: 10px;
            margin-right: 20px;
            margin-left: 20px;
            padding: 2px;
            font-size: 22px;
            text-align: center;
            background-color: rgba(255,255,255,0.7);
            border-radius: 10px;
        }

        form {
            display: flex;
            margin: 5px;
            margin-top: -10px;
            gap: 5px;
        }

        form label {
            font-size: 16px;
        }

        form select {
            text-align: center;
            font-size: 14px;
            height: 40px;
            width: 200px;
            border: 3px solid white;
            border-radius: 10px;
            margin-bottom: 5%;
        }

        form input {
            width: 150px;
            height: 40px;
            box-sizing: border-box;
            text-align: center;
            font-size: 10px;
            font-family: sans-serif;
            font-weight: bold;
            background: skyblue;
            border: 3px solid white;
            border-radius: 10px;
        }

        .select-container__select-bar {
            flex-direction: column;
            align-items: center;
            padding: 2px;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.7);
            margin-right: 50px;
            margin-left: 50px;
            margin-bottom: 15px;
        }

        .select-container {
            display: flex;
            flex-direction: column;
        }

        #inputForm {
            align-items: center;
            justify-content: space-around;
            padding: 2px;
            font-size: 10px;
        }

        #inputForm input {
            font-size: 16px;
            color: #222;
        }

        .label-input {
            display: flex;
            align-items: center;
            gap: 3px;
        }

        #submitBtn:hover {
            background-color: cornflowerblue;
            cursor: pointer;
        }

        #curOutput {
            padding: 5px;
            margin-right: 10px;
            margin-left: 10px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 10px;
        }
    `;

    constructor() {
        super();
        this.header = "Currency Converter";
        this._url = "https://api.exchangerate.host/";
        this._amount = "0";
        this._curIn = "";
        this._curOut = "";
        this._loadingMessage = "Awaiting Input...";
    }

    getData() {
        if (+this._amount && this._curIn && this._curOut) {
            const url = `${this._url}convert?from=${this._curIn}&to=${this._curOut}&amount=${this._amount}&places=2`;
            fetch(url)
                .then((response) => response.json())
                .then((result) => (this._data = result))
                .finally((this._displayCurOut = this._curOut));
        } else if (!this._curIn || !this._curOut) {
            this._loadingMessage = "Select two currencies";
        } else {
            this._loadingMessage =
                "Ensure amount is a number greater or equal to 1";
        }
    }

    calculate() {
        this.getData();
    }

    formTemplate() {
        return html`
            <div class="select-container">
                <form
                    class="select-container__select-bar"
                    @change="${this._handleChangeCurIn}"
                >
                    <label for="curInput">Input Currency</label>
                    ${currencyValues()}
                </form>

                <form
                    class="select-container__select-bar"
                    @change="${this._handleChangeCurOut}"
                >
                    <label for="curInput">Output Currency</label>
                    ${currencyValues()}
                </form>
            </div>

            <form id="inputForm" method="get" @submit="${this._handleSubmit}">
                <div class="label-input">
                    <input
                        id="curInput"
                        type="number"
                        placeholder="Amount"
                        min="1"
                        required
                        @change="${this._handleChangeAmount}"
                    />
                </div>
                <input type="submit" id="submitBtn" value="Convert" />
            </form>
        `;
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._data = "";
        this._loadingMessage = "Loading";
        this.calculate();
    }

    _handleChangeAmount(e) {
        e.preventDefault();
        this._amount = e.target.value;
    }

    _handleChangeCurIn(e) {
        e.preventDefault();
        this._curIn = e.target.value;
    }

    _handleChangeCurOut(e) {
        e.preventDefault();
        this._curOut = e.target.value;
    }

    render() {
        return html` <h3>${this.header}</h3>
            ${this.formTemplate()}
            <p id="curOutput">
                ${this._data?.result ?? this._loadingMessage}
                ${this._displayCurOut}
            </p>`;
    }
}

customElements.define("currency-converter", CurrencyConverter);
