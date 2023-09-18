import soundController from "./soundController.js";

export default class Explosion {
  constructor(ctx, x, y, hit, explode) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.hit = hit;
    this.sprite = new Image();
    this.sprite.src = "game/assets/img/explosion.png";
    this.width = 64;
    this.height = 64;
    this.frame_x = 3;
    this.frame_y = 3;
    this.isDone = false;

    if (explode) {
      soundController.EXPLOSION_AIRCRAFT.play();
    } else {
      soundController.EXPLOSION.play();
    }
  }
  draw() {
    this.ctx.drawImage(
      this.sprite,
      this.width * this.frame_x,
      this.height * this.frame_y,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * (this.hit * 0.2),
      this.height * (this.hit * 0.2)
    );
    if (this.frame_y === 0 && this.frame_x === 0) {
      setTimeout(() => {
        this.isDone = true;
      }, 100);
      return;
    }

    if (this.frame_x === 0) {
      this.frame_y--;
      this.frame_x = 3;
    }
    this.frame_x--;
  }
}
