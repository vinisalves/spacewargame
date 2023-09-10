import Explosion from "../core/explosion.js";
import {
  enemiesProjectiles,
  explosions,
  GAME_CONFIG,
} from "../config/globals.js";

export default class Enemy4 {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 116;
    this.height = 190;
    this.sprite = new Image();
    this.sprite.src = "game/assets/img/enemies/enemy4.png";
    this.x = Math.random() * GAME_CONFIG.width;
    this.y = -300;
    this.speed = 5;
    this.frame_x = 0;
    this.explosions = [];
    this.life = 200;
    this.direction = 1;
    this.randomize = Math.floor(Math.random() + 1) * 10;
  }

  fire() {
    enemiesProjectiles.push(
      new Projectile(this.ctx, this.x + 5, this.y + this.height - 80)
    );
    enemiesProjectiles.push(
      new Projectile(this.ctx, this.x + 50, this.y + this.height - 80)
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
    if (this.y < 0) {
      this.y++;
    }

    if (GAME_CONFIG.player.aircraft.x > this.x) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }

    const distance = GAME_CONFIG.player.aircraft.x - this.x;
    if (distance * this.direction > 10) {
      this.x = this.x + this.direction * this.speed;
    }
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

    if (GAME_CONFIG.frame % 20 === 0 && this.y + this.height > 0) this.fire();

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
    this.ctx.fillStyle = "rgba(0, 48, 52, 0.6)";
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
    this.sprite.src = "game/assets/img/fire.png";
    this.strike_force = 5;
    this.sound = new Audio();
    this.sound.src = "game/assets/sounds/enemy4_fire.wav";
    this.sound.volume = 0.2;
    this.sound.play();
  }

  draw() {
    this.y += this.speed;
    this.ctx.drawImage(this.sprite, this.x, this.y);
  }
}
