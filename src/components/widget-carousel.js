import { LitElement, html, css, } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class carousel extends LitElement{

    static properties = {
    }

    static styles = css`
      .wrapper{
        padding-top: 50px;
        display: grid;
        justify-items: center;
        grid-template-areas: "left mid right";
        grid-template-columns: 10% 80% 10%;
      }

      .carousel-container{
        grid-area: mid;
        max-width: 100%;
        margin: auto;
        overflow-x: scroll;
        scroll-behavior: smooth;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }


      .carousel-container::-webkit-scrollbar {
        display: none;
    }

      .slots{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 100px;
      }

      .arrow{
        font-weight: bold;
        font-size: 100px;
        font-family: sans-serif;
        border: none;
        background: none;
        opacity: 50%;
        align-self: center;
      }

      .arrow:hover {
        opacity: 100%
      }

      #prev {
        grid-area: left;
        justify-self: end;
      }

      #next {
        grid-area: right;
        justify-self: start;      
      }
      `;

      constructor(){
        super();
    }

    static widgetWidth = 440;

    /* Used construct of shadowRoot from https://web.dev/shadowdom-v1/ to fix widget carousel buttons*/

    slidePrev(event) {
      const prev = this.shadowRoot.querySelector("#carousel-container").scrollLeft -= carousel.widgetWidth;
    }
    
    slideNext(event) {
      const next = this.shadowRoot.querySelector("#carousel-container").scrollLeft += carousel.widgetWidth;
    }

    render(){
        return html`
        <section class="wrapper">
          <button class="arrow" id="prev" @click=${this.slidePrev}> &#8249; </button>
          <button class="arrow" id="next" @click=${this.slideNext}> &#8250; </button>  
          <section class="carousel-container" id="carousel-container">
            <div class="slots">
              <slot></slot>
            </div>
          </section>
        </section>`;
    }
}
customElements.define("widget-carousel", carousel);