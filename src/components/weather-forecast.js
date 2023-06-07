import {
    LitElement,
    html,
    css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import { WidgetBlock } from "./widget-block.js";

class Weather extends WidgetBlock {
    static properties = {
        _url: { type: String, state: true },
        _data: { state: true },
    };
    

    static styles = css`


    :host{
        display: block;
        width: 340px;
        height: 340px;
        background-color: azure;
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
    `;
    
    constructor() {
        super();
        this.header = "Weather forecast";
        this._url = "https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&current_weather=true";
        
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
        if (this._data) {
            const code = this._data.current_weather.weathercode;
            const isDay = this._data.current_weather.is_day;
            const weatherCode = getWeather(code);

            return html`
             <div style="background-color: ${getDayOrNight(isDay)}; width: 100%; height: 100%; padding-top: 0.1%">  
                <h3>${this.header}</h3>
                <p>Current temp: ${this._data.current_weather.temperature}\u00b0c</p>
                <p>${weatherCode}</p>
                <img src="${"src/components/weather-images/" + isDay + weatherCode + ".png"}" alt="weather image" 
                style="width: 30%; height: 30%;">
            </div>
            `;
        } else {
            return html`<p>loading...</p>`;
        }
    }
}

function getDayOrNight(isDay) {
    if (isDay == 1) {
        return "#96c6d9";
    }
    else {
        return "#5e6dab";
    }
}

function getWeather(code) {
    if (code == 0) {
        return "Clear"
    }
    if (code == 2 || code == 1) {
        return "Partly-Cloudy"
    }
    if (code == 3) {
        return "Overcast"
    }
    if (code == 45 || code == 48) {
        return "Fog"
    }
    if (code == 51 || code == 53 || code == 55 || code == 82 || code == 81 
        || code == 80 || code == 61 || code == 63 || code == 65) {
        return "Rain"
    }
    if (code == 95) {
        return "Thunderstorm"
    }
    //if weather code not recognised
    return "Freak weather idk dawg"
}

customElements.define("weather-forecast", Weather);
