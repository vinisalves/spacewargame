import { GAME_CONFIG } from "../config/globals.js";
import Button from "../components/button.js";
import ErrorModal from "../components/errorModal.js";

export class ModalUserPlayerName {
  constructor() {
    this.x = GAME_CONFIG.width / 2;
    this.y = -200;
    this.sound = new Audio();
    this.sound.src = "../../assets/sounds/newGame.wav";
    this.buttonSound = new Audio();
    this.buttonSound.src = "../../assets/sounds/menu_onbutton.wav";
    this.modalContainer = document.createElement("div");
    this.width = "500px";
    this.height = "250px";
    this.nextCb = null;
    this.inputName = document.createElement("input");
    this.createElement();
  }

  createElement() {
    //modalContainer
    const gameContainer = document.querySelector("#gameContainer");
    const modalContainerStyle = {
      width: this.width,
      height: this.height,
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

    //Text
    const text = document.createElement("p");
    const textStyle = {
      fontFamily: "arcade",
      fontSize: "45px",
      color: "#FFF",
      marginTop: "30px",
    };
    text.innerText = "Type your pilot name:";
    Object.assign(text.style, textStyle);
    this.modalContainer.appendChild(text);

    //Input

    const inputStyle = {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      borderBottom: "1px solid white",
      width: "80%",
      bottom: "0px",
      color: "#FFF",
      fontFamily: "arcade",
      fontSize: "40px",
      marginTop: "30px",
    };
    Object.assign(this.inputName.style, inputStyle);

    this.modalContainer.appendChild(this.inputName);

    //Row
    const row = document.createElement("div");
    const rowStyle = {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
    };
    Object.assign(row.style, rowStyle);
    this.modalContainer.appendChild(row);

    const btNext = new Button("Next", "#0F0");
    const btCancel = new Button("Cancel", "#F00");

    row.appendChild(btCancel);
    row.appendChild(btNext);

    Object.assign(this.modalContainer.style, modalContainerStyle);
    gameContainer.appendChild(this.modalContainer);
    this.inputName.focus();

    btNext.addEventListener("click", () => {
      this.next();
    });
    btCancel.addEventListener("click", () => {
      this.buttonSound.play();
      this.sound.play();
      this.cancel();
    });
  }

  cancel() {
    this.modalContainer.animate(
      [
        {
          top: this.y + "px",
          opacity: 1,
        },
        {
          top: -200 + "px",
          opacity: 0,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
  }
  next() {
    if (this.inputName.value === "") {
      new ErrorModal("Please, type your pilot name.");
      return;
    }
    if (typeof this.nextCb === "function") {
      this.nextCb(this.inputName.value);
    }
    this.buttonSound.play();
    this.sound.play();
    this.modalContainer.style.opacity = 1;
    this.modalContainer.animate(
      [
        {
          left: this.x + "px",
          opacity: 1,
        },
        {
          left: this.x + GAME_CONFIG.width + "px",
          opacity: 0,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
  }

  back() {
    this.modalContainer.animate(
      [
        {
          left: this.x + GAME_CONFIG.width + "px",
          opacity: 0,
        },
        {
          left: this.x + "px",
          opacity: 1,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
  }

  show() {
    this.sound.play();
    this.modalContainer.style.opacity = 1;
    this.y = GAME_CONFIG.height / 2;
    this.modalContainer.animate(
      [
        {
          top: "-200px",
          opacity: 0,
        },
        {
          top: this.y + "px",
          opacity: 1,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
  }
}
