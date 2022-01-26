import Explosion from "../core/explosion.js";
import {
  enemiesProjectiles,
  explosions,
  GAME_CONFIG,
} from "../config/globals.js";
export default class Enemy5 {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 312.5;
    this.height = 353;
    this.sprite = new Image();
    this.sprite.src = "../assets/img/enemies/enemy5.png";
    this.x = Math.random() * GAME_CONFIG.width;
    this.y = -600;
    this.speed = 10;
    this.explosion = [];
    this.life = 300;
    this.direction = 1;
    this.bullets = 5;
  }

  explode() {
    explosions.push(
      new Explosion(this.ctx, (this.x + this.width) / 2, this.y - 150, 50, true)
    );
  }

  fire() {
    enemiesProjectiles.push(
      new Projectile(
        this.ctx,
        this.x + this.width / 2 - 18,
        this.y + this.height - 18
      )
    );
  }

  hit(hit, x, y) {
    explosions.push(new Explosion(this.ctx, x, y - 50, hit));
    this.life -= hit;

    if (this.life === 0) {
      this.explode();
    }
  }

  move() {
    if (this.y < 0) {
      this.y++;
    }

    if (this.x + this.width >= GAME_CONFIG.width) {
      this.direction = -1;
    }
    if (this.x <= 0) {
      this.direction = 1;
    }

    this.x += 5 * this.direction;
  }

  draw() {
    this.move();
    if (GAME_CONFIG.frame % 10 === 0) {
      if (this.frame_x < 3) {
        this.frame_x++;
      } else {
        this.frame_x = 0;
      }
    }

    if (GAME_CONFIG.frame % 20 === 0 && this.y + this.height > 0) {
      this.bullets--;

      if (this.bullets > 0) {
        this.fire();
      } else {
        setTimeout(() => {
          this.bullets = 5;
        }, 1000);
      }
    }

    this.ctx.drawImage(
      this.sprite,
      this.width * this.frame_x,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 48, 52, 0.6)";
    this.ctx.fillRect(this.x + 20, this.y + 50, this.life * 0.9, 10);
    this.ctx.closePath();
  }
}

class Projectile {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 34;
    this.height = 64;
    this.speed = 15;
    this.sprite = new Image();
    this.sprite.src = ".././assets/img/fire3.png";
    this.strike_force = 20;
    this.sound = new Audio();
    this.sound.src = ".././assets/sounds/enemy5_fire.ogg";
    this.sound.volume = 0.2;
    this.sound.play();
  }

  draw() {
    this.y += this.speed;
    this.ctx.drawImage(this.sprite, this.x, this.y);
  }
}
