import { GAME_CONFIG } from "../config/globals.js";
import Button from "../utils/button.js";
import Col from "../utils/col.js";
import Row from "../utils/row.js";

export class ModalChooseAirCraft {
  constructor() {
    this.x = -500;
    this.y = GAME_CONFIG.height / 2;
    this.sound = new Audio();
    this.sound.src = "../../assets/sounds/newGame.wav";
    this.buttonSound = new Audio();
    this.buttonSound.src = "../../assets/sounds/menu_onbutton.wav";
    this.modalContainer = document.createElement("div");
    this.width = 700;
    this.height = 500;
    this.nextCb = null;
    this.backCb = null;
    this.createElement();
  }

  createElement() {
    //modalContainer
    const gameContainer = document.querySelector("#gameContainer");
    const modalContainerStyle = {
      width: this.width + "px",
      height: this.height + "px",
      backgroundColor: 'rgba(0,0,0,0.6)',
      border: "2px solid white",
      top: this.y + "px",
      left: this.x + "px",
      transform: "translate(-50%,-50%)",
      position: "absolute",
      textAlign: "center",
      padding:"10px",
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
    const aircraftContainer =  new Row("aircrafts-container");
    this.modalContainer.appendChild(aircraftContainer);
    const col1 = new Col("aircrafts-container-1");
    col1.style.flexGrow = 1;
    const col2 = new Col("aircrafts-container-2");
    col2.style.flexGrow = 2;

    const box1 = document.createElement("div");
    const box2 = document.createElement("div");
    const boxStyles = {
      border:'1px solid white',
      width: "160px",
      height: "150px",
      padding: "20px",
      marginBottom:"20px"
    }
    Object.assign(box1.style, boxStyles);
    Object.assign(box2.style, boxStyles);

    aircraftContainer.appendChild(col1);
    aircraftContainer.appendChild(col2);

    const calisterText =  document.createElement("p");
    const calisterTextStyles ={
      fontSize:"20px",
      fontFamily:"arcade",
      color:"white"
    }
    Object.assign(calisterText.style, calisterTextStyles);    
    calisterText.innerText = "Calister"
    const calisterImg = new Image();
    calisterImg.src = "../../assets/img/aircrafts/calister_thumb.png";
    
    const alpha1Text =  document.createElement("p");
    const alpha1TextStyles ={
      fontSize:"20px",
      fontFamily:"arcade",
      color:"white"
    }
    Object.assign(alpha1Text.style, alpha1TextStyles);    
    alpha1Text.innerText = "Alpha1"

    const alpha1 = new Image();
    alpha1.src = "../../assets/img/aircrafts/alpha1_thumb.png";
    
    box1.appendChild(calisterText);
    box1.appendChild(calisterImg);
    box2.appendChild(alpha1Text);
    box2.appendChild(alpha1);

    col1.appendChild(box1);
    col1.appendChild(box2);

    //details-container

    const box3 =  document.createElement("div");
    const box3Styles = {
      border:'1px solid white',      
      minWidth:"100%",
      minHeight: "100%",
      padding: "20px",
      marginBottom:"20px"
    }
    Object.assign(box3.style, box3Styles);

    const rowDetail = new Row("detail-row");
    

    const gunsText = document.createElement("p");
    const gunsTextStyles = {
      color:"white",     
      fontFamily:"arcade",
      fontSize:"30px"
    }
    Object.assign(gunsText.style, gunsTextStyles);    
    gunsText.innerText = "GUNS";
    
    const delimiter = document.createElement("span");    
    const delimiterStyles = {
      color:"white",    
      fontFamily:"arcade",
      fontSize:"30px"
      
    }
    Object.assign(delimiter.style, delimiterStyles);    
    delimiter.innerText= "...........";
    
    const gunsValue = document.createElement("p");
    const gunsValueStyles = {
      color:"white",    
      fontFamily:"arcade",
      fontSize:"30px"  
    }
    Object.assign(gunsValue.style, gunsValueStyles);    
    gunsValue.innerText = "2";
    rowDetail.appendChild(gunsText);
    rowDetail.appendChild(delimiter);
    rowDetail.appendChild(gunsValue);
    box3.appendChild(rowDetail);
    col2.appendChild(box3);
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
      this.buttonSound.play();
      this.sound.play();
      this.next();
    });
    btBack.addEventListener("click", () => {
      this.buttonSound.play();
      this.sound.play();
      this.back();
    });
  }

  next(cb) {
    if (typeof this.nextCb === "function") {
      this.nextCb();
    }
  }

  show() {
    this.sound.play();
    this.modalContainer.style.opacity = 1;
    this.x = GAME_CONFIG.width / 2;
    const animation = this.modalContainer.animate(
      [
        {
          left: -this.width + "px",
        },
        {
          left: this.x + "px",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
  }
  back(){
    if(typeof this.backCb ===  "function"){
      this.backCb();
    }
    this.sound.play();
    this.modalContainer.style.opacity = 1;
    this.modalContainer.animate(
      [
        {
          left: this.x + "px",
        },
        {
          left: -this.width + "px",
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
