import { GAME_CONFIG } from "../config/globals.js";
export class ModalGameOver {
  constructor() {
    this.gameContainer = document.querySelector("#game-container");
    this.modalContainer = document.createElement("div");
    this.x = GAME_CONFIG.width / 2;
    this.y = -200;
    this.modalContainer = document.createElement("div");
    this.width = 700;
    this.height = 500;
    this.counter = 15;
  }

  show() {
    const modalContainerStyle = {
      width: this.width + "px",
      height: this.height + "px",
      backgroundColor: "rgba(0,0,0,0.6)",
      border: "2px solid white",
      top: this.y + "px",
      left: this.x + "px",
      transform: "translate(-50%,-50%)",
      position: "absolute",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      zIndex: 9999999,
    };

    Object.assign(this.modalContainer.style, modalContainerStyle);
    //Text
    const text = document.createElement("p");
    const textStyle = {
      fontFamily: "arcade",
      fontSize: "10em",
      color: "#FFF",
      marginTop: "30px",
    };
    text.innerText = "GAME OVER";
    Object.assign(text.style, textStyle);
    this.modalContainer.appendChild(text);

    const counterText = document.createElement("p");
    const counterTextStyle = {
      fontFamily: "arcade",
      fontSize: "5em",
      color: "#FFF",
      marginTop: "30px",
    };
    Object.assign(counterText.style, counterTextStyle);

    counterText.textContent = this.counter;

    const counterFn = setInterval(() => {
      this.counter--;
      counterText.textContent = this.counter;
      if (this.counter === 0) {
        this.modalContainer.animate(
          [
            {
              top: this.y + "px",
            },
            {
              top: "-500px",
            },
          ],
          {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out",
          }
        );
        clearInterval(counterFn);
        const event = new Event("play");
        window.dispatchEvent(event);
      }
    }, 1000);

    this.modalContainer.appendChild(counterText);

    this.gameContainer.appendChild(this.modalContainer);
    this.y = GAME_CONFIG.height / 2;
    this.modalContainer.animate(
      [
        {
          top: "-200px",
        },
        {
          top: this.y + "px",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
  }

  counter() {
    setInterval(() => {
      this.counter--;
    }, 1000);
  }
}
