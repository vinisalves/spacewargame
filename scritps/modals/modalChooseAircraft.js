import { GAME_CONFIG } from "../config/globals.js";
import Button from "../utils/button.js";
import Col from "../utils/col.js";
import Row from "../utils/row.js";
import Calister from "../aircrafts/calister.js";
import Alpha1 from "../aircrafts/alpha1.js";

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

    const CalisterObj = new Calister();
    const Alpha1Obj =  new Alpha1();
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
      marginBottom:"20px",
      transition: '0.6s',
      cursor:'pointer'
    }
    Object.assign(box1.style, boxStyles);
    Object.assign(box2.style, boxStyles);

    box1.addEventListener('mouseenter', function(){
      box1.style.transform = 'scale(1.2)'
    })
    box1.addEventListener('mouseleave', function(){
      box1.style.transform = 'scale(1)'
    })

    box2.addEventListener('mouseenter', function(){
      box2.style.transform = 'scale(1.2)'
    })
    box2.addEventListener('mouseleave', function(){
      box2.style.transform = 'scale(1)'
    })
    aircraftContainer.appendChild(col1);
    aircraftContainer.appendChild(col2);

    const calisterText =  document.createElement("p");
    const calisterTextStyles ={
      fontSize:"20px",
      fontFamily:"arcade",
      color:"white"
    }

    Object.assign(calisterText.style, calisterTextStyles);    
    calisterText.innerText = CalisterObj.name;
    const calisterImg = new Image();
    calisterImg.src = CalisterObj.thumb;
    
    const alpha1Text =  document.createElement("p");
    const alpha1TextStyles ={
      fontSize:"20px",
      fontFamily:"arcade",
      color:"white"
    }
    Object.assign(alpha1Text.style, alpha1TextStyles);    
    alpha1Text.innerText = Alpha1Obj.name;

    const alpha1Img = new Image();
    alpha1Img.src = Alpha1Obj.thumb;
    
    box1.appendChild(calisterText);
    box1.appendChild(calisterImg);
    box2.appendChild(alpha1Text);
    box2.appendChild(alpha1Img);

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

    
    box3.appendChild(this.aircraftDetails(Alpha1Obj));
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

  aircraftDetails(aircraft){
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
    return rowDetail;  
    
  }
  next() {
    if (typeof this.nextCb === "function") {
      this.nextCb();
    }
    this.sound.play();
    this.modalContainer.style.opacity = 1;
    const animation = this.modalContainer.animate(
      [
        {
          top: this.y + "px",
        },
        {
          top: (this.y + GAME_CONFIG.height) * -1 + "px",
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
