import { GAME_CONFIG } from "../config/globals.js";
import Button from "../utils/button.js";
import { Overlay } from "../utils/overlay.js";

export class ModalUserPlayerName {
  constructor() {
    this.x = GAME_CONFIG.width / 2;
    this.y = -200;
    this.sound = new Audio();
    this.sound.src = "../../assets/sounds/newGame.wav";
    this.buttonSound = new Audio();
    this.buttonSound.src = "../../assets/sounds/menu_onbutton.wav";
  }

  showModal() {
    return new Promise((resolve, reject) => {
      this.sound.play();
      const overlay = new Overlay();
      console.log(overlay);
      //modalContainer
      const modalContainer = document.createElement("div");
      const modalContainerStyle = {
        width: "500px",
        height: "250px",
        backgroundColor: "#000",
        border: "2px solid white",
        top: this.y + "px",
        left: this.x + "px",
        transform: "translate(-50%,-50%)",
        position: "relative",
        textAlign: "center",
        opacity: 0.7,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
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
      modalContainer.appendChild(text);

      //Input
      const inputName = document.createElement("input");
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
      Object.assign(inputName.style, inputStyle);
      
      modalContainer.appendChild(inputName);
     
      //Row
      const row = document.createElement("div");
      const rowStyle = {
        display: "flex",
        justifyContent: "space-around",
        width:'100%'
      };
      Object.assign(row.style, rowStyle);
      modalContainer.appendChild(row);

      const btNext = new Button('Next','#0F0');
      const btCancel = new Button('Cancel','#F00');

      row.appendChild(btCancel);
      row.appendChild(btNext);
     

      Object.assign(modalContainer.style, modalContainerStyle);
      overlay.appendChild(modalContainer);
      inputName.focus();

      const animation = modalContainer.animate(
        [
          {
            top: "-200px",
          },
          {
            top: GAME_CONFIG.height / 2 + "px",
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
          easing: "ease-in-out",
        }
      );

      btNext.addEventListener("click", () => {
        this.buttonSound.play();
        this.sound.play();
        animation.reverse();
        resolve(inputName.value)
        overlay.style.opacity = 0;
      });
      btCancel.addEventListener("click", () => {
        this.buttonSound.play();
        this.sound.play();
        animation.reverse();     
        overlay.style.opacity = 0;
        reject()
      });
    });
  }
}
