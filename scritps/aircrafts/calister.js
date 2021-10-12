import { GAME_CONFIG, GAME_CONTROLS, playerProjectiles } from "../config/globals.js";
const {keyboard} = GAME_CONTROLS;
import Explosion from "../core/explosion.js";

export default class Calister {
    constructor(ctx){
        this.ctx = ctx;
        this.width = 100;
        this.height = 91;
        this.sprite =  new Image();
        this.sprite.src = ".././assets/img/aircrafts/calister.png";
        this.x =  (GAME_CONFIG.width / 2) - this.width,
        this.y = GAME_CONFIG.height - this.height - 100;
        this.speed = 15;
        this.reloadTime = 1000;
        this.isShooting = false;
        this.projectiles = [];     
        this.frame_x = 0;
        this.acceleration = 2;        
        this.explosions = [];
    }

    fire(){
        playerProjectiles.push(new Projectile(this.ctx, (this.x + this.width  / 2) - 2, this.y - 30 ));            
    }

    hit(hit, x, y){
        this.explosions.push(new Explosion(this.ctx, x, y, hit));
        GAME_CONFIG.player.life -= hit;
        
        if(GAME_CONFIG.player.life === 0){
           this.explode();
        }
    }

    explode(){
        this.explosions.push(new Explosion(this.ctx, this.x - 100, this.y - 150 , 30));        
    }
    

    move(){
        
        if(keyboard.ArrowUp || keyboard.KeyW ){
            this.acceleration = 7;
            this.frame_x = 6;
            if(this.y > 0 ){
                this.y -= this.speed; 
            }            
        }else{
            this.acceleration = 2
        }

        if(keyboard.ArrowRight || keyboard.KeyD ){
            if(this.x + this.width < GAME_CONFIG.width){
                this.x += this.speed;
            }
        }

        if(keyboard.ArrowDown || keyboard.KeyS ){
            if(this.y + this.height < GAME_CONFIG.height){
                this.y += this.speed;
            }
        }
        if(keyboard.ArrowLeft || keyboard.KeyA ){
            if(this.x > 0){
                this.x -= this.speed;
            }
        }      
    }

    draw(){        
      
        this.move();
       
       
        if(GAME_CONFIG.frame % 10 === 0){
            if(this.frame_x < this.acceleration){
                this.frame_x++;                
            }else{
                this.frame_x = 1;
            }                       
        }
        
        this.ctx.drawImage(this.sprite,this.width * this.frame_x , 0, this.width , this.height, this.x ,this.y, this.width, this.height);


        this.projectiles.forEach((projectile, i)=> {
            if(projectile.y + projectile.sprite.height  <  0){
                this.projectiles.splice(i,1);
            }
            projectile.draw();
        })


        this.explosions.forEach((explosion,i)=> {
            if(explosion.isDone){
                this.explosions.splice(i,1);
                return;
            }
            explosion.draw();
        })
       
    }
}

class Projectile{
    constructor(ctx,x,y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 61;
        this.speed = 20;
        this.sprite =  new Image();
        this.sprite.src = ".././assets/img/aircrafts/calister_fire.png";
        this.strike_force = 5;
    }

    draw(){        
        this.y -= this.speed;
        this.ctx.drawImage(this.sprite, this.x, this.y)
       
    }
}


