import Explosion from "../core/explosion.js";
import { enemiesProjectiles, explosions, GAME_CONFIG, GAME_CONTROLS } from "../config/globals.js";
const { keyboard, mouse } = GAME_CONTROLS;

export default class Enemy1 {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = 82;
        this.height = 190;
        this.sprite = new Image();
        this.sprite.src = ".././assets/img/enemies/enemy1.png";
        this.x = Math.random() * GAME_CONFIG.width,
        this.y = -300
        this.speed = 6;
        this.reloadTime = 1000;
        this.isShooting = false;
        this.projectiles = [];
        this.frame_x = 0;
        this.explosions = [];
        this.life = 100;
        this.direction = GAME_CONFIG.player.aircraft.x > this.x ? this.direction = 1 : this.direction = -1;
        this.randomize = Math.floor(Math.random() + 1) * 10;
       
    }

    fire() {
        if (GAME_CONFIG.player.aircraft.x > this.x) {
            enemiesProjectiles.push(new Projectile(this.ctx, this.x + 20, this.y + this.height - 80, 1));
        } else {
            enemiesProjectiles.push(new Projectile(this.ctx, this.x + 20, this.y + this.height - 80, -1));
        }

    }

    hit(hit, x, y) {
        explosions.push(new Explosion(this.ctx, x, y - 50, hit));
        this.life -= hit;

        if (this.life === 0) {
            this.explode();
        }
    }

    explode() {
        explosions.push(new Explosion(this.ctx, this.x - 100, this.y - 150, 30, true));
    }

    move() {
        this.y += this.speed - 2;
        this.x = this.x + this.speed  * this.direction;
    }

    draw() {
        this.move();
        if (GAME_CONFIG.frame % 30 === 0 && this.y + this.height > 0) {
            this.fire()
        };

        if (GAME_CONFIG.frame % 10 === 0) {
            if (this.frame_x < 7) {
                this.frame_x++;
            } else {
                this.frame_x = 0;
            }
        }

        this.ctx.drawImage(this.sprite, this.width * this.frame_x, 0, this.width, this.height, this.x, this.y, this.width - 40, this.height - 40);
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255, 0, 0, 0.6)";
        this.ctx.fillRect(this.x + 20, this.y + 20, this.life * 0.9, 10);
        this.ctx.closePath();
    }
}

class Projectile {
    constructor(ctx, x, y, direction) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 61;
        this.speed = 7;
        this.sprite = new Image();
        this.sprite.src = ".././assets/img/fire.png";
        this.strike_force = 5;
        this.direction = direction;
        this.sound = new Audio();
        this.sound.src = ".././assets/sounds/enemy1_fire.wav";
        this.sound.volume = 0.2;
        this.sound.play();
    }

    draw() {
        this.x += this.speed * this.direction;
        this.y += this.speed;

        this.ctx.drawImage(this.sprite, this.x, this.y)
    }
}


