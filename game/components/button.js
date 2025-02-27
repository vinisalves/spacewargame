import soundController from "../core/soundController.js";

export default function Button(text, color) {
  const button = document.createElement("button");
  const buttonStyle = {
    textAlign: "center",
    borderRadius: "8px",
    border: "1px solid white",
    backgroundColor: "#000",
    color: color,
    fontFamily: "arcade",
    fontSize: "30px",
    width: "100px",
    height: "50px",
    cursor: "pointer",
    transition: "0.6s",
  };

  button.innerText = text;
  Object.assign(button.style, buttonStyle);

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });
  return button;
}
