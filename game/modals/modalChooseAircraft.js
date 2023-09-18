import { GAME_CONFIG } from "../config/globals.js";
import Button from "../components/button.js";
import Col from "../components/col.js";
import Row from "../components/row.js";
import Calister from "../aircrafts/calister.js";
import Alpha1 from "../aircrafts/alpha1.js";
import ErrorModal from "./errorModal.js";
import soundController from "../core/soundController.js";

export class ModalChooseAirCraft {
  constructor() {
    this.x = -500;
    this.y = GAME_CONFIG.height / 2;
    this.modalContainer = document.createElement("div");
    this.width = 700;
    this.height = 500;
    this.nextCb = null;
    this.backCb = null;

    this.col1 = new Col("aircrafts-container-1");
    this.col2 = new Col("aircrafts-container-2");
    this.col1.style.flexGrow = 1;
    this.col2.style.flexGrow = 2;
    this.createElement();
  }

  createElement() {
    const CalisterObj = new Calister();
    const Alpha1Obj = new Alpha1();
    //modalContainer
    const gameContainer = document.querySelector(
      "#" + GAME_CONFIG.game_container_id
    );
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
      padding: "10px",
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
    text.innerText = "Choose your Aircraft:";
    Object.assign(text.style, textStyle);
    this.modalContainer.appendChild(text);

    //aircraft-container
    const aircraftContainer = new Row("aircrafts-container");
    this.modalContainer.appendChild(aircraftContainer);

    const box1 = document.createElement("div");
    const box2 = document.createElement("div");
    const boxStyles = {
      border: "1px solid white",
      width: "160px",
      height: "150px",
      padding: "20px",
      marginBottom: "20px",
      transition: "0.6s",
      cursor: "pointer",
    };
    Object.assign(box1.style, boxStyles);
    Object.assign(box2.style, boxStyles);

    box1.addEventListener("mouseenter", () => {
      soundController.HOVER_AIRCRAFT.currentTime = 0;
      soundController.HOVER_AIRCRAFT.play();
      this.aircraftDetails(CalisterObj);
      box1.style.transform = "scale(1.2)";
    });
    box1.addEventListener("mouseleave", () => {
      box1.style.transform = "scale(1)";
    });
    box1.addEventListener("click", () => {
      box1.style.border = "3px solid blue";
      box2.style.border = "1px solid white";
      soundController.CHOOSE_AIRCRAFT.currentTime = 0;
      soundController.CHOOSE_AIRCRAFT.play();
      this.chooseAircraft = CalisterObj;
    });
    box2.addEventListener("mouseenter", () => {
      soundController.HOVER_AIRCRAFT.currentTime = 0;
      soundController.HOVER_AIRCRAFT.play();
      this.aircraftDetails(Alpha1Obj);
      box2.style.transform = "scale(1.2)";
    });
    box2.addEventListener("mouseleave", () => {
      box2.style.transform = "scale(1)";
    });
    box2.addEventListener("click", () => {
      box2.style.border = "3px solid blue";
      box1.style.border = "1px solid white";
      soundController.CHOOSE_AIRCRAFT.currentTime = 0;
      soundController.CHOOSE_AIRCRAFT.play();
      this.chooseAircraft = Alpha1Obj;
    });
    aircraftContainer.appendChild(this.col1);
    aircraftContainer.appendChild(this.col2);

    const calisterText = document.createElement("p");
    const calisterTextStyles = {
      fontSize: "20px",
      fontFamily: "arcade",
      color: "white",
    };

    Object.assign(calisterText.style, calisterTextStyles);
    calisterText.innerText = CalisterObj.name;
    const calisterImg = new Image();
    calisterImg.src = CalisterObj.thumb;

    const alpha1Text = document.createElement("p");
    const alpha1TextStyles = {
      fontSize: "20px",
      fontFamily: "arcade",
      color: "white",
    };
    Object.assign(alpha1Text.style, alpha1TextStyles);
    alpha1Text.innerText = Alpha1Obj.name;

    const alpha1Img = new Image();
    alpha1Img.src = Alpha1Obj.thumb;

    box1.appendChild(calisterText);
    box1.appendChild(calisterImg);
    box2.appendChild(alpha1Text);
    box2.appendChild(alpha1Img);

    this.col1.appendChild(box1);
    this.col1.appendChild(box2);

    this.aircraftDetails(CalisterObj);

    //Buttons
    const buttonsRow = new Row("buttons-container");
    this.modalContainer.appendChild(buttonsRow);

    const btNext = new Button("Play", "#00F");
    const btBack = new Button("Back", "#FF0");

    buttonsRow.appendChild(btBack);
    buttonsRow.appendChild(btNext);

    Object.assign(this.modalContainer.style, modalContainerStyle);
    gameContainer.appendChild(this.modalContainer);

    btNext.addEventListener("click", () => {
      soundController.BUTTON_HOVER.currentTime = 0;
      soundController.BUTTON_HOVER.play();
      this.next();
    });
    btBack.addEventListener("click", () => {
      soundController.BUTTON_HOVER.currentTime = 0;
      soundController.BUTTON_HOVER.play();
      soundController.MODAL_TRANSITION.play();
      this.back();
    });
  }

  aircraftDetails(aircraft) {
    const box3 = document.createElement("div");
    const box3Styles = {
      border: "1px solid white",
      minWidth: "100%",
      minHeight: "100%",
      padding: "20px",
      marginBottom: "20px",
    };
    Object.assign(box3.style, box3Styles);

    const rowTitle = new Row(`detail-title`);
    const titleText = document.createElement("p");
    const titleTextStyles = {
      color: "white",
      fontFamily: "arcade",
      fontSize: "40px",
    };
    Object.assign(titleText.style, titleTextStyles);
    titleText.innerText = "Details";
    box3.appendChild(titleText);

    aircraft.details.forEach((detail, i) => {
      const rowDetail = new Row(`detail-row-${i}`);

      const detailText = document.createElement("p");
      const detailTextStyles = {
        color: "white",
        fontFamily: "arcade",
        fontSize: "30px",
      };
      Object.assign(detailText.style, detailTextStyles);
      detailText.innerText = detail.n;

      const delimiter = document.createElement("span");
      const delimiterStyles = {
        color: "white",
        fontFamily: "arcade",
        fontSize: "30px",
      };
      Object.assign(delimiter.style, delimiterStyles);
      delimiter.innerText = "...........";

      const detailValue = document.createElement("p");
      const detailValueStyles = {
        color: "white",
        fontFamily: "arcade",
        fontSize: "30px",
      };
      Object.assign(detailValue.style, detailValueStyles);
      detailValue.innerText = detail.v;
      rowDetail.appendChild(detailText);
      rowDetail.appendChild(delimiter);
      rowDetail.appendChild(detailValue);
      box3.appendChild(rowDetail);
    });
    while (this.col2.childNodes[0]) {
      this.col2.removeChild(this.col2.childNodes[0]);
    }
    this.col2.appendChild(box3);
  }
  next() {
    if (!this.chooseAircraft) {
      new ErrorModal("Please, choose your aircraft.");
      return;
    }
    if (typeof this.nextCb === "function") {
      this.nextCb(this.chooseAircraft);
    }
    soundController.MODAL_TRANSITION.play();
    this.modalContainer.style.opacity = 1;
    this.modalContainer.animate(
      [
        {
          top: this.y + "px",
          opacity: 1,
        },
        {
          top: (this.y + GAME_CONFIG.height) * -1 + "px",
          opacity: 0,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
    // animation.finish()
  }

  show() {
    soundController.MODAL_TRANSITION.play();
    this.modalContainer.style.opacity = 1;
    this.x = GAME_CONFIG.width / 2;
    this.modalContainer.animate(
      [
        {
          left: -this.width + "px",
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
  back() {
    if (typeof this.backCb === "function") {
      this.backCb();
    }
    soundController.MODAL_TRANSITION.play();
    this.modalContainer.style.opacity = 1;
    this.modalContainer.animate(
      [
        {
          left: this.x + "px",
          opacity: 1,
        },
        {
          left: -this.width + "px",
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
