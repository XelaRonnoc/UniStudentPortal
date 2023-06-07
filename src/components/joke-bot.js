import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { WidgetBlock } from "./widget-block.js";

class jokeBot extends LitElement {
    static properties = {
        _joke: { type: String, state: true },
        _data: { state: true },
    };
    static styles = css `
    :host {
        display: block;
        width: 340px;
        height: 340px;
        //background-color: azure;
        background-image: url(https://img.freepik.com/premium-vector/chattering-teeth-joke-background-april-fools-day-concept-colorful-design-vector-illustration_24908-9280.jpg?w=2000);
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
        font-family: sans-serif;
        box-sizing: border-box;
        border-radius: 10px;
        border: 10px solid white;
        margin-left: 5%; 
        font-weight: bold;  
        overflow-y: auto;     
    }

    .content{
        display: grid;
        grid-template-rows: 25 65% 25%;
        gap: 5px;
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

    .text {
        margin-top: 10%;
        max-height: 250px;
        font-size: 20px;
        overflow-y: auto;
        background-color: rgba(255,255,255,0.6);
    }

    button {
        text-align: center;
        font-size: 18px;
        color: #1A2B42;
        font-family: sans-serif;
        font-weight: bold;
        background: skyblue;
        border: none;;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        margin: 10px;
    }

        button:hover {
            background-color: #1A2B42;
            color: skyblue;
        }
    `;

    static BASE_URL = "https://v2.jokeapi.dev/joke/Any?format=json&safe-mode";
    constructor() {
        super();
        this._joke = this.makeRandom();
        this.header = "Joke Bot";
    }

    connectedCallback() {
        super.connectedCallback();
        this.getData();
    }

    makeRandom() {
        return Math.floor(Math.random() * (1368 - 1));
    }

    getData() {
        const url = jokeBot.BASE_URL;
        +`&idRange=${this._joke}`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => (this._data = result));
        // console.log("fetching URL: ${url}");
    }

    showJoke() {
        if (this._data?.type === "twopart") {
            return html`
                <p>${this._data.setup}</p>
                <p>${this._data.delivery}</p>
            `;
        } else {
            return html` <p>${this._data?.joke}</p> `;
        }
    }

    playLaugh() {
        const laugh = new Audio(
            "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-three/human_audience_laughter_comedy_club_x200_people_komedia_brighton_comic_boom_018.mp3"
        );
        laugh.play();
    }


    render(){
        return html`
        <div class="content">
            <h3>${this.header}<h3>
            <div class="text">${this.showJoke()}</div>
            <button @click=${this.updateJoke}>New Joke</button>
        </div>`;
    }

    updateJoke(event) {
        this._joke = this.makeRandom();
        this.getData();
        this.playLaugh();
    }
}
customElements.define("joke-bot", jokeBot);
