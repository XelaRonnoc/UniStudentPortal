/**
 * A Blog widget that displays blog posts pulled from
 * an API
 *
 * <blog-block></blog-block>
 */

import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { BASE_URL } from "../config.js";

class BlockBlock extends LitElement {
    static properties = {
        _posts: { state: true },
        _updated: { type: Number, state: true },
        _curBlogIndex: { type: Number, state: true },
        _pageLength: { type: Number, state: true },
        _fetching: { type: Boolean, state: true },
    };

    static styles = css`
        :host {
            display: flex;
            background-color: #fffff1;
            border-radius: 10px;
            border: 10px solid white;
            width: 80%;
            max-width: 3000px;
            background-image: url(https://background-tiles.com/overview/blue/textures/large/5006.png);
        }

        .blogpost {
            text-align: left;
            padding: 15px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            margin-bottom: 20px;
            margin-left: 5%;
            margin-right: 5%;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
            padding-bottom: 50px;
            overflow: auto;
            word-wrap: break-word;
        }

        .blogpost h2 {
            background-color: skyblue;
            text-transform: capitalize;
            padding-left: 5px;
            border-radius: 10px 10px 0 0;
            word-wrap: break-word;
        }


        .profile{
            display: grid;
            grid-template-columns: 10% 90%;
            gap: 10px;
        }

        .profile-pic{
            border-radius: 50%;
            background-image: url(https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg);
            background-size: 100%;
        }

        h4 {
            text-transform: capitalize;
            font-size: 25px;
            color: #222;
            text-align: center;
            letter-spacing: 1px;
            margin-left: 45%;
        }

        .blogNavButtons {
            text-align: center;
            font-size: 18px;
            color: #222;
            font-family: sans-serif;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: skyblue;
            border: 3px solid white;
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
        }

        .blog-post-container {
            width: 100%;
        }
    `;

    constructor() {
        super();
        const url = `${BASE_URL}blog`;
        fetch(url)
            .then((response) => response.json())
            .then((posts) => {
                this._posts = posts.posts;
            });
        this._curBlogIndex = 1;
        this._pageLength = 10;
        this._fetching = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.realtimeUpdate();
    }

    realtimeUpdate = async () => {
        if (!this._fetching) {
            await this.getData(this._curBlogIndex);
        }
        setTimeout(() => {
            this.realtimeUpdate();
        }, 60000); // made this fairly long as not sure server was handling whole cohorts requests
    };

    getData = async (startIndex) => {
        this._fetching = true;
        if (startIndex < 1 || startIndex === undefined) {
            this._curBlogIndex = 1;
        } else {
            this._curBlogIndex = startIndex;
        }
        const url = `${BASE_URL}blog?start=${this._curBlogIndex}&count=${this._pageLength}`;
        await fetch(url)
            .then((response) => response.json())
            .then((posts) => {
                this._posts = posts.posts;
            });
        this.requestUpdate();
        this._fetching = false;
    };

    // A simple formatter that just splits text into paragraphs and
    // wraps each in a <p> tag
    // a fancier version could use markdown and a third party markdown
    // formatting library
    static formatBody(text) {
        if (!text) {
            text = "No Body";
        }
        const paragraphs = text.split("\r\n");
        return paragraphs.map((paragraph) => html`<p>${paragraph}</p>`);
    }

    nextPage = () => {
        this._posts = undefined;
        this.getData(this._curBlogIndex + this._pageLength);
    };

    previousPage = () => {
        this._posts = undefined;
        const index =
            this._curBlogIndex - this._pageLength >= 1
                ? (this._curBlogIndex = this._curBlogIndex - this._pageLength)
                : 1;
        this.getData(index);
    };

    render() {
        if (!this._posts) {
            return html`<h4>Loading...</h4>`;
        }

        return html`
            <p class="blog-post-container">
                ${this._posts.map(
                    (post) => html`<div class="blogpost">
                        <h2>
                            ${!post.title
                                ? (post.title = "No Title")
                                : (post.title = post.title)}
                        </h2>
                        <div class="profile">
                            <div class="profile-pic"></div>
                            <h3>By ${post.name}</h3>
                        </div>
                        ${BlockBlock.formatBody(post.content)}
                    </div> `
                )}
                <button class="blogNavButtons" @click="${this.previousPage}">
                    Previous
                </button>
                <button class="blogNavButtons" @click="${this.nextPage}">
                    Next
                </button>
            </p>
        `;
    }
}

customElements.define("blog-block", BlockBlock);
