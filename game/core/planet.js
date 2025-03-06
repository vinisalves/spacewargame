import { GAME_CONFIG } from "../config/globals.js";
export default class Planet {
  constructor(ctx, x, y, type) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.sprite = new Image();
    this.sprite.src = `game/assets/img/planets/planet${type}.png`;
    this.width = Math.floor(Math.random() * 400) + 10;
    this.height = this.width;
    this.randomize = Math.floor(Math.random() * 3) - 1;
  }

  draw() {
    if (!this.sprite.complete) return;
    this.y = this.y + GAME_CONFIG.game_speed;
    this.x = this.x + GAME_CONFIG.game_speed * 0.1 * this.randomize;
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
