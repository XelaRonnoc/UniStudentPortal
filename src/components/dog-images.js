import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { WidgetBlock } from "./widget-block.js";

class DogImages extends WidgetBlock {
    static properties = {
        _url: { type: String, state: true },
        _data: { state: true },
        _loadingMessage: { type: String, state: true },
    };

    static styles = css`

    :host{
        display: block;
        width: 340px;
        height: 340px;
        background-color: azure;
        background-image: url(https://images.unsplash.com/photo-1533460004989-cef01064af7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3Jhc3N8ZW58MHx8MHx8&w=1000&q=80);
        background-size: 500px 340px;
        background-repeat: no-repeat;
        font-family: sans-serif;
        font-weight: bold;
        box-sizing: border-box;
        border-radius: 10px;
        border: 10px solid white;
        margin-bottom: 10%;
        margin-left: 5%;      
    }

    img {
        width: 75%;
        height: 60%;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
        border-radius: 10px;
    }

    img:hover {
        transform: scale(1.1);
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

    h6 {
        margin-top: 5px;
        font-size: 18px;
        text-align: center;
        text-transform: capitalize;
        background-color: rgba(255,255,255,0.7);
        border-radius: 10px;
        margin-top: 7%;
        margin-left: 10px;
        margin-right: 10px;
        padding: 5px;
    `;

    constructor() {
        super();
        this.header = "Dog Images";
        this._url = "https://dog.ceo/api/breeds/image/random?_=" + new Date().getTime();
        this._loadingMessage = "Loading Cuteness";
    }

    connectedCallback() {
        super.connectedCallback();
        this._fetch();
    }

    _fetch () {
        fetch(this._url)
        .then(response => response.json())
        .then(data => { 
            this._data = data;
        })
        .catch(error => {
            console.error(error);
        })
    }

    render() {
        //Splits URL to find the Breed of Dog
        const breed = this._data?.message?.split("/")[4];
        return html` 
        <h3>${this.header}</h3>
        <img src="${this._data?.message}" alt="dog image">
        <h6>Breed: ${breed}</h6>
        `;
    }
}

customElements.define("dog-images", DogImages);