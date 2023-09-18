import Enemy1 from "../enemies/Enemy1.js";
import Enemy2 from "../enemies/Enemy2.js";
import Enemy3 from "../enemies/Enemy3.js";
import Enemy4 from "../enemies/Enemy4.js";
import { enemies, lifes } from "../config/globals.js";
import Enemy5 from "../enemies/Enemy5.js";
import Life from "./life.js";
import { GAME_CONFIG } from "../config/globals.js";
import soundController from "./soundController.js";

export default class GamePlay {
  constructor(ctx) {
    this.ctx = ctx;
    this.level = 1;
    this.stack = {
      1: () => {
        soundController.READY.play();
        soundController.BACKGROUND_GAME_PLAY.play();
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        setTimeout(() => {
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
        }, 7000);
      },
      2: () => {
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
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy4(this.ctx));
        setTimeout(() => {
          enemies.push(new Enemy1(this.ctx));
          enemies.push(new Enemy1(this.ctx));
        }, 1000);
        this.randomLifes();
      },
      5: () => {
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy4(this.ctx));
      },
      6: () => {
        soundController.BACKGROUND_GAME_PLAY.pause();
        soundController.BACKGROUND_GAME_PLAY_BOSS.play();
        enemies.push(new Enemy5(this.ctx));
      },
      7: () => {
        enemies.push(new Enemy5(this.ctx));
        enemies.push(new Enemy2(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy3(this.ctx));
        enemies.push(new Enemy4(this.ctx));
        this.randomLifes();
      },
      8: () => {
        enemies.push(new Enemy1(this.ctx));
        enemies.push(new Enemy1(this.ctx));
      },
      9: () => {
        enemies.push(new Enemy1(this.ctx));
        enemies.push(new Enemy1(this.ctx));
      },
      10: () => {
        enemies.push(new Enemy1(this.ctx));
        enemies.push(new Enemy1(this.ctx));
        enemies.push(new Enemy1(this.ctx));
        enemies.push(new Enemy1(this.ctx));
      },
      11: () => {
        enemies.push(new Enemy1(this.ctx));
        enemies.push(new Enemy1(this.ctx));
        enemies.push(new Enemy1(this.ctx));
        enemies.push(new Enemy1(this.ctx));
      },
      12: () => {
        enemies.push(new Enemy5(this.ctx));
        enemies.push(new Enemy5(this.ctx));
      },
      13: () => {
        soundController.BACKGROUND_GAME_PLAY_BOSS.pause();
        soundController.BACKGROUND_GAME_PLAY_END.play();
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
    this.level = 1;
  }
}
