import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class AdWidget extends LitElement {
  static properties = {
    adUrl: { type: String },
  }

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

  img {
    width: 75%;
    height: 65%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
    border-radius: 10px;
  }

  img:hover {
      transform: scale(1.1);
  }

  `;

  constructor() {
    super();
    this.adUrl = `${BASE_URL}adserver`;
  }

  render() {
    return html`
  <div>
        <h3>Advertisment</h3>
        <img src=${this.adUrl} alt="Advertisment">
  </div>
    `;
  }
}

customElements.define('ad-widget',  AdWidget);