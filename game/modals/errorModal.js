import soundController from "../core/soundController.js";

export default class ErrorModal {
  constructor(message) {
    this.modalContainer = document.querySelector("#error-modal-container");

    this.addMessage(message);
  }
  addMessage(messageParam) {
    const modal = document.createElement("div");

    const ModalStyle = {
      position: "relative",
      backgroundColor: "rgba(255,0,0,0.3)",
      borderRadius: "10px",
      padding: "20px",
      margin: "10px",
    };
    Object.assign(modal.style, ModalStyle);
    const message = document.createElement("p");
    const messageStyles = {
      color: "white",
      fontSize: "2em",
      fontWeight: "700",
      fontFamily: "arcade",
    };

    Object.assign(message.style, messageStyles);
    message.textContent = messageParam;

    modal.appendChild(message);
    modal.animate(
      [
        {
          transform: "scale(0)",
        },
        {
          transform: "scale(1)",
        },
      ],
      {
        duration: 100,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
    this.modalContainer.appendChild(modal);
    soundController.ERROR.currentTime = 0;
    soundController.ERROR.play();

    setTimeout(() => {
      const animation = modal.animate(
        [
          {
            transform: "translateY(0px)",
          },
          {
            transform: "translateY(-300px)",
          },
        ],
        {
          duration: 300,
          fill: "forwards",
          easing: "ease-in-out",
        }
      );
      animation.onfinish = (event) => {
        modal.remove();
      };
    }, 3000);
  }
}
