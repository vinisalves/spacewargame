import { GAME_CONFIG } from "../config/globals.js";
export default class Giant {
  constructor(ctx, x, y) {
    this.totalGiants = 11;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.sprite = new Image();
    this.sprite.src = `game/assets/img/giants/giant${
      Math.floor(Math.random() * this.totalGiants) + 1
    }.png`;
    this.width = Math.floor(Math.random() * 2000) + 30;
    this.height = this.width;
    this.randomize = Math.floor(Math.random() * 3) - 1;
  }

  draw() {
    if (!this.sprite.complete) return;
    this.y = this.y + GAME_CONFIG.game_speed;
    this.x = this.x + GAME_CONFIG.game_speed * 0.02 * this.randomize;
    this.ctx.drawImage(
      this.sprite,
      0,
      0,
      this.sprite.width,
      this.sprite.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
