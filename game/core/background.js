import { enum_status, GAME_CONFIG } from "../config/globals.js";
import soundController from "./soundController.js";

export default class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.sprite = new Image();
    this.sprite.src = "game/assets/img/Stars.png";
    this.width = GAME_CONFIG.width;
    this.height = GAME_CONFIG.height;
    this.y = 0;
    this.objects = [];

    const sound = soundController.BACKGROUND.play();
    sound.then(() => console.log("auto play running"));

    Array(2)
      .fill()
      .forEach(() => {
        this.objects.push(
          new Nebula(
            this.ctx,
            Math.floor(Math.random() * this.width),
            -100,
            Math.floor(Math.random() * 3) + 1
          )
        );
        if (GAME_CONFIG.frame % 7 === 0) {
          this.objects.push(
            new Planet(
              this.ctx,
              Math.floor(Math.random() * this.width),
              -100,
              Math.floor(Math.random() * 35) + 1
            )
          );
        }
        if (GAME_CONFIG.frame % 9 === 0) {
          this.objects.push(
            new Giant(
              this.ctx,
              Math.floor(Math.random() * this.width),
              -100,
              Math.floor(Math.random() * 7) + 1
            )
          );
        }
      });
  }

  draw() {
    if (!this.sprite.complete) return;
    this.y = this.y + GAME_CONFIG.game_speed;

    this.ctx.drawImage(
      this.sprite,
      0,
      -this.y,
      this.sprite.width,
      this.sprite.height,
      0,
      0,
      this.width,
      this.sprite.height
    );
    this.ctx.drawImage(
      this.sprite,
      0,
      -this.y + 1024,
      this.sprite.width,
      this.sprite.height,
      0,
      0,
      this.width,
      this.sprite.height
    );
    const randomize = Math.floor(Math.random() * 1000) + 1000;

    if (
      (GAME_CONFIG.frame * randomize) % 500 === 0 &&
      this.objects.length <= 7
    ) {
      if (GAME_CONFIG.frame % 2 === 0) {
        this.objects.push(
          new Nebula(
            this.ctx,
            Math.floor(Math.random() * this.width),
            -(this.height + 600),
            Math.floor(Math.random() * 3) + 1
          )
        );
      }
      if (GAME_CONFIG.frame % 4 === 0) {
        this.objects.push(
          new Planet(
            this.ctx,
            Math.floor(Math.random() * this.width),
            -(this.height + 600),
            Math.floor(Math.random() * 35) + 1
          )
        );
      }
      if (GAME_CONFIG.frame % 6 === 0) {
        this.objects.push(
          new Giant(
            this.ctx,
            Math.floor(Math.random() * this.width),
            -(this.height + 600),
            Math.floor(Math.random() * 7) + 1
          )
        );
      }
    }

    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].y > GAME_CONFIG.height) {
        this.objects.splice(i, 1);
        i--;
      } else {
        this.objects[i].draw();
      }
    }

    if (this.y >= this.sprite.height) {
      this.y = 0;
    }
  }
}

class Nebula {
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

class Planet {
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

class Giant {
  constructor(ctx, x, y, type) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.sprite = new Image();
    this.sprite.src = `game/assets/img/giants/giant${type}.png`;
    this.width = Math.floor(Math.random() * 1000) + 30;
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
