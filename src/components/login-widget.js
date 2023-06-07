import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { getUser, storeUser, deleteUser } from "../auth.js";
import { BASE_URL } from "../config.js";
import "./blog-form.js";
import "../comp2110-portal.js";

class LoginWidget extends LitElement {
    static properties = {
        loginUrl: { type: String },
        user: { type: String, state: true },
        _loggedIn: { type: Boolean, state: true },
        _failedLogin: { type: Boolean, state: true },
        _loading: { type: Boolean, state: true },
    };

    static styles = css`
        :host {
            display: block;
            width: 500px;
            height: 350px;
            background-color: azure;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            border-radius: 10px;
            border: 10px solid white;
            overflow: hidden;
            margin-bottom: 20px;
        }

        .login {
            font-family: sans-serif;
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 20px;
        }

        h2 {
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            margin: 0 auto;
            margin-top: 10px;
            margin-bottom: 30px;
            background-color: skyblue;
            width: 80%;
            border-radius: 10px;
        }

        .username {
            font-size: 16px;
            text-transform: uppercase;
        }

        #userInput {
            padding: 10px;
            font-size: 16px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            background: transparent;
            border: none;
            border-bottom: 2px solid skyblue;
            border-radius: 0;
            width: 80%;
            box-sizing: border-box;
        }

        #userInput:focus {
            outline: none;
            border-bottom-color: skyblue;
        }

        .password {
            padding-top: 30px;
            padding-bottom: 10px;
            font-size: 16px;
            text-transform: uppercase;
            margin-bottom: 0px;
        }

        #passInput {
            padding: 10px;
            font-size: 16px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            letter-spacing: 2px;
            background: transparent;
            border: none;
            border-bottom: 2px solid skyblue;
            border-radius: 0;
            width: 80%;
            box-sizing: border-box;
            border-color: ;
        }

        #passInput:focus {
            outline: none;
            border-bottom-color: skyblue;
        }

        #login {
            text-align: center;
            font-size: 18px;
            color: #222;
            font-family: sans-serif;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: skyblue;
            padding: 10px 20px;
            border: 3px solid white;
            border-radius: 10px;
            cursor: pointer;
        }

        #logout {
            text-align: center;
            font-size: 18px;
            color: #222;
            font-family: sans-serif;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: skyblue;
            padding: 10px 20px;
            border: 3px solid white;
            border-radius: 10px;
            cursor: pointer;
        }

        #login:hover {
            background-color: #1a2b42;
            color: skyblue;
        }

        p {
            margin-top: 20%;
            text-align: center;
            font-size: 24px;
            color: #333;
            font-family: Arial, sans-serif;
            font-weight: bold;
            line-height: 1.5;
        }

        .login-feedback {
            margin-top: 0px;
            margin-bottom: 5px;
            color: red;
            font-size: 14px;
            font-family: sans-serif;
        }

        .loading {
            margin-top: 0px;
            margin-bottom: 5px;
            font-size: 14px;
            font-family: sans-serif;
        }
    `;

    constructor() {
        super();
        this.loginUrl = `${BASE_URL}users/login`;
        this.user = getUser();
        this._loggedIn = false;
        this._failedLogin = false;
        this._loading = false;
    }

    submitForm(event) {
        event.preventDefault();
        this._loading = true;
        this._failedLogin = false;
        const username = event.target.username.value;
        const password = event.target.password.value;
        fetch(this.loginUrl, {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        })
            .then((result) => result.json())
            .then((response) => {
                this.user = response;
                storeUser(response);
                this._loading = false;
                if (this.user?.name) {
                    this._failedLogin = false;
                    this.updateState(true);
                } else {
                    this._failedLogin = true;
                }
            });
    }

    updateState(newState) {
        this._loggedIn = newState;
        const event = new CustomEvent("state-changed", {
            detail: { newState },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    logout() {
        deleteUser();
        this.user = null;
        this.updateState(false);
    }

    loginFeeback(loginFailed) {
        if (loginFailed) {
            return html`<p class="login-feedback">
                Username or password incorrect please try again
            </p>`;
        }
    }

    loading(loadingState) {
        if (loadingState) {
            return html`<p class="loading">Logging in...</p>`;
        }
    }

    render() {
        if (this.user?.name) {
            return html`<p>Logged in as ${this.user.name}</p>
                <button id="logout" @click=${this.logout}>Logout</button> `;
        }
        return html` <div class="login">
            <h2>Login</h2>
            <form @submit=${this.submitForm}>
                <div class="username">
                    Username: <input name="username" id="userInput" required />
                </div>
                <div class="password">
                    Password:
                    <input
                        type="password"
                        name="password"
                        id="passInput"
                        required
                    />
                </div>
                ${this.loading(this._loading)}
                ${this.loginFeeback(this._failedLogin)}
                <input type="submit" value="Login" id="login" />
            </form>
        </div>`;
    }
}

customElements.define("login-widget", LoginWidget);
