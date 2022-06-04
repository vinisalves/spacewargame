import Enemy1 from "../enemies/Enemy1.js";
import Enemy2 from "../enemies/Enemy2.js";
import Enemy3 from "../enemies/Enemy3.js";
import Enemy4 from "../enemies/Enemy4.js";
import { enemies, lifes } from "../config/globals.js";
import Enemy5 from "../enemies/Enemy5.js";
import Life from "./life.js";

export default class GamePlay {
  constructor(ctx) {
    this.ctx = ctx;
    this.level = 1;
    this.readySound = new Audio();
    this.readySound.src = "../assets/sounds/voices/ready.ogg";
    this.backgroundMusic = new Audio();
    this.backgroundMusic.src = "../assets/sounds/track_03.ogg";
    this.backgroundMusic.volume = 0.2;
    this.backgroundMusic.loop = true;
    this.backgroundBossMusic = new Audio();
    this.backgroundBossMusic.src = "../assets/sounds/track_08.ogg";
    this.backgroundBossMusic.volume = 0.2;
    this.backgroundBossMusic.loop = true;
    this.stack = {
      1: () => {
        this.readySound.play();
        this.backgroundMusic.play();
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        setTimeout(() => {
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
        }, 7000);
      },
      2: () => {
        this.backgroundMusic.pause();

        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        setTimeout(() => {
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
        }, 8000);
      },
      3: () => {
        enemies.push(new Enemy3(this.ctx));
        setTimeout(() => {
          enemies.push(new Enemy2(this.ctx));
          enemies.push(new Enemy2(this.ctx));
          enemies.push(new Enemy2(this.ctx));
          enemies.push(new Enemy2(this.ctx));
        }, 5000);
      },
      4: () => {
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        setTimeout(() => {
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
        }, 1000);
        this.randomLifes();
      },
      5: () => {
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy3(this.ctx));
      },
      6: () => {
        enemies.push(new Enemy5(this.ctx));
      },
      7: () => {
        enemies.push(new Enemy5(this.ctx));
        this.randomLifes();
      },
      8: () => {
        enemies.push(new Enemy5(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        setTimeout(() => {
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
        }, 8000);
      },
      9: () => {
        this.backgroundBossMusic.play();
        enemies.push(new Enemy5(this.ctx));
      },
    };
  }

  randomLifes() {
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
  }
  nextLevel() {
    this.hasNext() ? this.stack[this.level]() : false;
    this.level++;
  }
  hasNext() {
    return typeof this.stack[this.level] === "function";
  }

  restart() {
    this.level = 0;
  }
}
