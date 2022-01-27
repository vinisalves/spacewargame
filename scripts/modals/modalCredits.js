import { GAME_CONFIG } from "../config/globals.js";

export class ModalCredits {
  constructor() {
    this.gameContainer = document.querySelector("#gameContainer");
    this.modalContainer = document.createElement("div");
    this.x = GAME_CONFIG.width / 2;
    this.y = -200;
    this.width = 700;
    this.height = 500;
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
      marginTop: "10px",
    };
    text.innerText = "Images";
    Object.assign(text.style, textStyle);
    this.modalContainer.appendChild(text);

    this.gameContainer.appendChild(this.modalContainer);
    this.y = GAME_CONFIG.height / 2;

    const animation = this.modalContainer.animate(
      [
        {
          top: "-200px",
        },
        {
          top: this.y + "px",
        },
      ],
      {
        duration: 5000,
        fill: "forwards",
        easing: "ease-in",
      }
    );
    animation.onfinish = () => {
      //   this.modalContainer.remove();
    };
  }
}
