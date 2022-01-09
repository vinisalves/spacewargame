import Explosion from "../core/explosion.js";
import { enum_status, explosions, GAME_CONFIG, GAME_CONTROLS, playerProjectiles } from "../config/globals.js";
const { keyboard } = GAME_CONTROLS;

export default class Alpha1 {
    constructor(ctx) {
        this.name = "Alpha1";
        this.ctx = ctx;
        this.width = 80;
        this.height = 130;
        this.sprite = new Image();
        this.sprite.src = ".././assets/img/aircrafts/alpha1.png";
        this.thumb = "../../assets/img/aircrafts/alpha1_thumb.png";
        this.x = (GAME_CONFIG.width / 2) - this.width;
        this.y = GAME_CONFIG.height - this.height - 100;
        this.speed = 10;
        this.isShooting = false;
        this.projectiles = [];
        this.frame_x = 0;
        this.acceleration = 2;
        this.explosions = [];
        this.explosionAircraftSound = new Audio();
        this.explosionAircraftSound.src = ".././assets/sounds/explosionAircraftPlayer.wav";
        this.details = [{n:'speed',v:10}, {n:'guns', v:2}, {n:'damage',v:10}]
    }

    fire() {
        playerProjectiles.push(new Projectile(this.ctx, this.x + 5, this.y - 5));
        playerProjectiles.push(new Projectile(this.ctx, this.x + (this.width - 10), this.y - 5));
    }

    hit(hit, x, y) {
        explosions.push(new Explosion(this.ctx, x, y, hit));
        GAME_CONFIG.player.life -= hit;

        if (GAME_CONFIG.player.life === 0) {
            this.explode();
            GAME_CONFIG.status = enum_status.GAME_OVER;
        }
    }

    explode() {
        explosions.push(new Explosion(this.ctx, this.x - 100, this.y - 150, 50, true));
        this.explosionAircraftSound.play();
    }

    move() {
        if (keyboard.ArrowUp || keyboard.KeyW) {
            this.acceleration = 7;
            this.frame_x = 6;
            if (this.y > 0) {
                this.y -= this.speed;
            }
        } else {
            this.acceleration = 2
        }

        if (keyboard.ArrowRight || keyboard.KeyD) {
            if (this.x + this.width < GAME_CONFIG.width) {
                this.x += this.speed;
            }
        }

        if (keyboard.ArrowDown || keyboard.KeyS) {
            if (this.y + this.height < GAME_CONFIG.height) {
                this.y += this.speed;
            }
        }
        if (keyboard.ArrowLeft || keyboard.KeyA) {
            if (this.x > 0) {
                this.x -= this.speed;
            }
        }
    }
    draw() {
        this.move();

        if (GAME_CONFIG.frame % 10 === 0) {
            if (this.frame_x < this.acceleration) {
                this.frame_x++;
            } else {
                this.frame_x = 0;
            }
        }
        this.ctx.drawImage(this.sprite, 80 * this.frame_x, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

class Projectile {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 61;
        this.speed = 20;
        this.sprite = new Image();
        this.sprite.src = ".././assets/img/fire.png";
        this.strike_force = 5;
        this.sound = new Audio();
        this.sound.src = ".././assets/sounds/alpha1_fire.wav";
        this.sound.volume = 0.1;
        this.sound.play();
    }

    draw() {
        this.y -= this.speed;
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }
}


