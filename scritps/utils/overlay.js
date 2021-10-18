export default class Overlay {
  constructor() {
    this.gameContainer = document.getElementById("gameContainer");
    this.overlay = document.createElement("div");
  }

  show() {
    overlay.id = "overlay-2021";
    const overlayStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 99999,
    };
    Object.assign(overlay.style, overlayStyle);
    this.gameContainer.appendChild(overlay);
    return this.overlay;
  }
  hide() {
    this.overlay.remove();
  }
}
