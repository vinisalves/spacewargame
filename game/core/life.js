import { GAME_CONFIG } from "../config/globals.js";

export default class Life {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = (Math.random() * GAME_CONFIG.width) / 2;
    this.y = 0;
    this.speedY = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.percentsLife = [10, 20, 30, 40, 50];
    this.chosenPercent =
      this.percentsLife[Math.floor(Math.random() * this.percentsLife.length)];
  }

  repairAircraft() {
    GAME_CONFIG.player.life =
      GAME_CONFIG.player.life + this.chosenPercent > 100
        ? 100
        : GAME_CONFIG.player.life + this.chosenPercent;
    const sound = new Audio();
    sound.src = "game/assets/sounds/energy.ogg";
    sound.play();
  }

  draw() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.ctx.beginPath();
    const heartImage = new Image();
    heartImage.src = "game/assets/img/heart.png";
    this.ctx.drawImage(heartImage, this.x, this.y);
    this.ctx.font = "30px arcade";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`+${this.chosenPercent}`, this.x, this.y);
  }
}
