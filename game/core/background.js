import { GAME_CONFIG } from "../config/globals.js";
import soundController from "./soundController.js";
import Nebula from "./nebula.js";
import Planet from "./planet.js";
import Giant from "./giant.js";

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
            -500,
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
