import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { BASE_URL } from "../config.js";
import { getUser } from "../auth.js";
import "./blog-block.js";

class BlogForm extends LitElement {
    static properties = {
        user: { type: String, state: true },
        posted: { type: Boolean, state: true },
        _posting: { type: Boolean, state: true },
    };

    static styles = css`
        :host {
            display: block;
            margin-top: 25px;
            box-sizing: border-box;
            border: 10px solid white;
            border-radius: 10px;
            margin-bottom: 20px;
            padding: 10px;
            background-image: url(https://background-tiles.com/overview/blue/textures/large/5006.png);
            width: 80%;
            max-width: 80%;
        }

        .header {
            padding-bottom: 10px;
            padding-left: 5px;
        }

        h3 {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background-color: skyblue;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
            font-size: 24px;
            letter-spacing: 1px;
        }

        #headerInput {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            letter-spacing: 1px;
            font-size: 18px;
            color: #333;
            padding: 12px;
            border-radius: 10px;
            border: none;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
            width: 80%;
        }

        label {
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            display: block;
        }

        .body {
            padding-bottom: 10px;
            padding-left: 10px;
        }

        #bodyInput {
            font-size: 18px;
            color: #333;
            padding: 12px;
            border-radius: 10px;
            border: none;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease-in-out;
            width: 1000px;
            max-width: 90%;
        }

        #submit {
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

        #submit:hover {
            opacity: 0.8;
        }
    `;

    constructor() {
        super();
        this.user = getUser();
    }

    postData(body, header) {
        this._posting = true;
        const parent = document.querySelector("comp2110-portal");
        const sibling = parent.shadowRoot.querySelector("blog-block");
        console.log(sibling);
        const postURL = `${BASE_URL}blog`;
        fetch(postURL, {
            method: "POST",
            body: JSON.stringify({
                title: `${header}`,
                content: `${body}`,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Basic ${this.user.token}`,
            },
        })
            .then(() => sibling.getData(1))
            .then(() => this.updateState(true))
            .then(() => (this._posting = false));
    }

    updateState(newState) {
        this._loggedIn = newState;
        const event = new CustomEvent("blog-post", {
            detail: { newState },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    _handleSubmit = async (e) => {
        e.preventDefault();
        const header = e.target.header.value;
        const body = e.target.body.value;
        await this.postData(body, header);
        this.posted = true;
        e.target.header.value = "";
        e.target.body.value = "";
    };

    posting = (posting) => {
        if (posting) {
            return html`<span>posting...</span>`;
        }
    };

    formTemplate() {
        return html`
            <form @submit=${this._handleSubmit}>
                <div class="header">
                    <label for="headerInput">Blog Header</label>
                    <input
                        id="headerInput"
                        name="header"
                        <textarea
                        placeholder="Enter post title here"
                        required
                    />
                </div>
                <div class="body">
                    <label for="bodyInput">Blog Body</label>
                    <textarea
                        id="bodyInput"
                        name="body"
                        rows
                        10
                        cols
                        20
                        placeholder="Enter post body here"
                        required
                    ></textarea>
                </div>
                <input type="submit" id="submit" value="Post" />
                ${this.posting(this._posting)}
            </form>
        `;
    }

    render() {
        return html`
            <h3>New Blog Post</h3>
            ${this.formTemplate()}
        `;
    }
}

customElements.define("blog-form", BlogForm);
