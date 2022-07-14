import Explosion from "../core/explosion.js";
import {
  enemiesProjectiles,
  explosions,
  GAME_CONFIG,
  GAME_CONTROLS,
} from "../config/globals.js";

export default class Enemy2 {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 90;
    this.height = 160;
    this.sprite = new Image();
    this.sprite.src = ".././assets/img/enemies/enemy2.png";
    this.x = Math.random() * GAME_CONFIG.width;
    this.y = -300;
    this.speed = 2;
    this.totalProjectiles = Math.floor(Math.random() * 10) + 10;
    this.isShooting = false;
    this.projectiles = [];
    this.frame_x = 0;
    this.acceleration = 2;
    this.explosions = [];
    this.life = 100;
    this.direction = 1;
    this.randomize = Math.floor(Math.random() * 100);
    this.max_y = Math.floor(
      (Math.random() * (GAME_CONFIG.height - this.height)) / 2
    );
  }

  fire() {
    this.totalProjectiles--;
    enemiesProjectiles.push(
      new Projectile(this.ctx, this.x + 20, this.y + this.height - 80)
    );
  }

  hit(hit, x, y) {
    explosions.push(new Explosion(this.ctx, x, y - 50, hit));
    this.life -= hit;

    if (this.life <= 0) {
      this.explode();
    }
  }

  explode() {
    explosions.push(
      new Explosion(this.ctx, this.x - 100, this.y - 150, 30, true)
    );
  }

  move() {
    if (this.y < this.max_y) {
      this.y++;
    }

    if (this.x + this.width >= GAME_CONFIG.width) {
      this.direction = -1;
    }
    if (this.x <= 0) {
      this.direction = 1;
    }

    this.x += 2 * this.direction;
  }

  async suicide() {
    this.y += 10;
  }

  draw() {
    if (this.totalProjectiles > 0) {
      this.move();
      if (GAME_CONFIG.frame % 10 === 0) {
        if (this.frame_x < 3) {
          this.frame_x++;
        } else {
          this.frame_x = 0;
        }
      }
    } else {
      if (GAME_CONFIG.frame % 10 === 0) {
        if (this.frame_x < 7) {
          this.frame_x++;
        } else {
          this.frame_x = 4;
        }
      }

      this.suicide();
    }

    if (
      GAME_CONFIG.frame % this.randomize === 0 &&
      this.y + this.height > 0 &&
      this.totalProjectiles > 0
    )
      this.fire();

    this.ctx.drawImage(
      this.sprite,
      this.width * this.frame_x,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width - 40,
      this.height - 40
    );
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(34, 66, 43, 0.6)";
    this.ctx.fillRect(this.x + 20, this.y + 20, this.life * 0.9, 10);
    this.ctx.closePath();
  }
}

class Projectile {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 61;
    this.speed = 10;
    this.sprite = new Image();
    this.sprite.src = ".././assets/img/fire2.png";
    this.strike_force = 5;
    this.sound = new Audio();
    this.sound.src = ".././assets/sounds/enemy2_fire.wav";
    this.sound.volume = 0.2;
    this.sound.play();
  }

  draw() {
    this.y += this.speed;
    this.ctx.drawImage(this.sprite, this.x, this.y);
  }
}
