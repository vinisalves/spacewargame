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
    title.innerText = "Special Thanks";
    Object.assign(title.style, textStyle);

    const subTitleStyle = {
      fontFamily: "arcade",
      fontSize: "3em",
      color: "yellow",
      marginTop: "10px",
    };

    const imagesText = document.createElement("p");

    imagesText.textContent = "Images:";
    Object.assign(imagesText.style, subTitleStyle);

    const artistStyle = {
      fontFamily: "arcade",
      fontSize: "2em",
      color: "brown",
      marginTop: "10px",
    };
    const artist1 = document.createElement("a");
    artist1.textContent = "Viktor Hahn (Viktor.Hahn@web.de)";
    artist1.href = "https://opengameart.org/users/unnamed";
    artist1.target = "_blank";

    Object.assign(artist1.style, artistStyle);

    const artist2 = document.createElement("a");
    artist2.textContent = "Skorpio";
    artist2.href = "https://opengameart.org/users/skorpio";
    artist2.target = "_blank";
    Object.assign(artist2.style, artistStyle);

    const soundsText = document.createElement("p");

    soundsText.textContent = "Sounds/Music:";
    Object.assign(soundsText.style, subTitleStyle);

    const artist3 = document.createElement("a");
    artist3.textContent = "yewbic";
    artist3.href = "https://opengameart.org/users/qubodup";
    artist3.target = "_blank";
    Object.assign(artist3.style, artistStyle);

    const artist4 = document.createElement("a");
    artist4.textContent = "Kenney";
    artist4.href = "https://opengameart.org/users/kenney";
    artist4.target = "_blank";
    Object.assign(artist4.style, artistStyle);

    const artist5 = document.createElement("a");
    artist5.textContent = "Red Eclipse";
    artist5.href = "https://www.redeclipse.net/";
    artist5.target = "_blank";
    Object.assign(artist5.style, artistStyle);

    this.modalContainer.appendChild(title);
    this.modalContainer.appendChild(imagesText);
    this.modalContainer.appendChild(artist1);
    this.modalContainer.appendChild(artist2);
    this.modalContainer.appendChild(soundsText);
    this.modalContainer.appendChild(artist3);
    this.modalContainer.appendChild(artist4);
    this.modalContainer.appendChild(artist5);

    this.gameContainer.appendChild(this.modalContainer);
    this.y = GAME_CONFIG.height / 2;

    const animation = this.modalContainer.animate(
      [
        {
          top: "-200px",
        },
        {
          top: GAME_CONFIG.height + this.height + "px",
        },
      ],
      {
        duration: 15000,
        fill: "forwards",
        easing: "linear",
      }
    );
    animation.onfinish = () => {
      //   this.modalContainer.remove();
    };
  }
}
