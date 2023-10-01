import Col from "../components/col.js";
import Row from "../components/row.js";
import { GAME_CONFIG } from "../config/globals.js";
import soundController from "../core/soundController.js";

export class ModalControlls {
  constructor() {
    this.gameContainer = document.querySelector("#game-container");
    this.modalContainer = document.createElement("div");
    this.x = GAME_CONFIG.width / 2;
    this.y = -200;
    this.width = 700;
    this.height = 500;
    this.counter = 10;
    this.nextCb = null;
  }
  show(cb) {
    const modalContainerStyle = {
      width: this.width + "px",
      height: this.height + "px",
      backgroundColor: "rgba(0,0,0,0.6)",
      border: "2px solid white",
      top: this.y + "px",
      left: this.x + "px",
      transform: "translate(-50%,-50%)",
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      zIndex: 9999999,
    };

    Object.assign(this.modalContainer.style, modalContainerStyle);
    //Text
    const title = document.createElement("p");
    const textStyle = {
      fontFamily: "arcade",
      fontSize: "4em",
      color: "blue",
      marginTop: "10px",
    };
    title.innerText = "Controlls";
    Object.assign(title.style, textStyle);

    const row = document.createElement("div");

    const row2 = document.createElement("div");

    const moveText = document.createElement("p");

    const moveTextStyles = {
      color: "white",
      fontFamily: "arcade",
      fontSize: "30px",
    };
    Object.assign(moveText.style, moveTextStyles);
    moveText.innerText = "Move:";

    const moveKeysImg = new Image();
    moveKeysImg.src = "game/assets/img/awsd.png";
    const moveKeysTextStyles = {
      width: "100px",
      height: "100px",
    };
    Object.assign(moveKeysImg.style, moveKeysTextStyles);

    row.appendChild(moveText);
    row.appendChild(moveKeysImg);

    const fireText = document.createElement("p");

    const fireTextStyles = {
      color: "white",
      fontFamily: "arcade",
      fontSize: "30px",
      paddingTop: "40px",
    };
    Object.assign(fireText.style, fireTextStyles);
    fireText.innerText = "Fire:";

    const fireControllImg = new Image();
    fireControllImg.src = "game/assets/img/mouse-left-click.png";

    const fireControllImgStyles = {
      width: "100px",
      height: "100px",
    };
    Object.assign(fireControllImg.style, fireControllImgStyles);

    row2.appendChild(fireText);
    row2.appendChild(fireControllImg);

    this.y = GAME_CONFIG.height / 2;

    this.modalContainer.animate(
      [
        {
          top: "-200px",
        },
        {
          top: GAME_CONFIG.height / 2 + "px",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "linear",
      }
    );

    const counterText = document.createElement("p");
    const counterTextStyle = {
      fontFamily: "arcade",
      fontSize: "5em",
      color: "#FFF",
      marginTop: "30px",
    };
    Object.assign(counterText.style, counterTextStyle);

    counterText.textContent = this.counter;

    this.modalContainer.appendChild(title);
    this.modalContainer.appendChild(row);
    this.modalContainer.appendChild(row2);
    this.modalContainer.appendChild(counterText);
    this.gameContainer.appendChild(this.modalContainer);

    const counterFunction = setInterval(() => {
      this.counter--;
      counterText.textContent = this.counter;
      if (this.counter === 0) {
        if (typeof this.nextCb === "function") {
          this.nextCb();
        }
        soundController.MODAL_TRANSITION.play();
        soundController.BACKGROUND_GAME_PLAY.pause();
        soundController.BACKGROUND_GAME_PLAY_BOSS.pause();
        soundController.BACKGROUND_GAME_PLAY_END.pause();
        soundController.BACKGROUND.play();

        this.modalContainer.animate(
          [
            {
              top: this.y,
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
        clearInterval(counterFunction);
      }
    }, 1000);
  }
  next() {
    if (this.inputName.value === "") {
      new ErrorModal("Please, type your pilot name.");
      return;
    }
    if (typeof this.nextCb === "function") {
      this.nextCb();
    }
    soundController.BUTTON_HOVER.currentTime = 0;
    soundController.BUTTON_HOVER.play();
    soundController.MODAL_TRANSITION.play();
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
}
