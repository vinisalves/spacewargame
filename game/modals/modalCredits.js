import { GAME_CONFIG } from "../config/globals.js";
import soundController from "../core/soundController.js";

export class ModalCredits {
  constructor() {
    this.gameContainer = document.querySelector("#game-container");
    this.modalContainer = document.createElement("div");
    this.x = GAME_CONFIG.width / 2;
    this.y = -200;
    this.width = 700;
    this.height = 500;
    this.counter = 20;
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

    const madeByMySelfStyle = {
      fontFamily: "arcade",
      fontSize: "2em",
      color: "green",
      marginTop: "10px",
    };
    const madeByMySelf = document.createElement("p");
    madeByMySelf.textContent = "Made By MySelf with Vanilla Js";
    Object.assign(madeByMySelf.style, madeByMySelfStyle);

    const thankYouStyle = {
      fontFamily: "arcade",
      fontSize: "2.5em",
      color: "purple",
      marginTop: "10px",
    };
    const thankYou = document.createElement("p");
    thankYou.textContent = "Thank you for playing my game =)";
    Object.assign(thankYou.style, thankYouStyle);

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
        duration: 2000,
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
    this.modalContainer.appendChild(imagesText);
    this.modalContainer.appendChild(artist1);
    this.modalContainer.appendChild(artist2);
    this.modalContainer.appendChild(soundsText);
    this.modalContainer.appendChild(artist3);
    this.modalContainer.appendChild(artist4);
    this.modalContainer.appendChild(artist5);
    this.modalContainer.appendChild(madeByMySelf);
    this.modalContainer.appendChild(thankYou);
    this.modalContainer.appendChild(counterText);
    this.gameContainer.appendChild(this.modalContainer);

    const counterFunction = setInterval(() => {
      this.counter--;
      counterText.textContent = this.counter;
      if (this.counter === 0) {
        if (typeof cb === "function") cb();
        soundController.MODAL_TRANSITION.play();
        soundController.BACKGROUND_GAME_PLAY.pause();
        soundController.BACKGROUND_GAME_PLAY_BOSS.pause();
        soundController.BACKGROUND_GAME_PLAY_END.pause();
        soundController.BACKGROUND.play();
        GAME_CONFIG.game_speed = 0.5;
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
}
