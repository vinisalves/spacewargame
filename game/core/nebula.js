import { GAME_CONFIG } from "../config/globals.js";
export default class Nebula {
  constructor(ctx, x, y, type) {
    this.sprite = new Image();
    this.sprite.src = `game/assets/img/Nebula${type}.png`;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.randomize = Math.floor(Math.random() * 0.5) - 1;
    this.width = Math.floor(Math.random() * 500) + 1000;
    this.height = Math.floor(Math.random() * 500) + 1000;
  }
  draw() {
    if (!this.sprite.complete) return;
    this.y = this.y + GAME_CONFIG.game_speed;
    this.x = this.x + this.randomize * 0.1;
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}
