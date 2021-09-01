import { GAME_CONFIG, GAME_CONTROLS } from "../globals.js";
const {keyboard, mouse} = GAME_CONTROLS;

export default class Alpha1 {
    constructor(ctx){
        this.ctx = ctx;
        this.width = 80;
        this.height = 130;
        this.sprite =  new Image();
        this.sprite.src = ".././assets/img/aircrafts/alpha1.png";
        this.x =  (GAME_CONFIG.width / 2) - this.width,
        this.y = GAME_CONFIG.height - this.height - 100;
        this.speed = 10;
        this.reloadTime = 1000;
        this.isShooting = false;
        this.projectiles = [];     
        this.frame_x = 0;
        this.acceleration = 2;
        
    }

    fire(){
        this.projectiles.push(new Projectile(this.ctx, this.x + 5, this.y - 5));
        this.projectiles.push(new Projectile(this.ctx, this.x + (this.width - 10), this.y - 5));       
    }

    draw(){
        
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

        for(let i = 0; i < this.projectiles.length; i++){
            if(this.projectiles[i].y + this.projectiles[i].sprite.height  <  0){
                this.projectiles.splice(i, 1);
                i--;               
            }else{
                this.projectiles[i].draw();            }
        }
       
        if(GAME_CONFIG.frame % 10 === 0){
            if(this.frame_x < this.acceleration){
                this.frame_x++;                
            }else{
                this.frame_x = 1;
            }                       
        }
        
        this.ctx.drawImage(this.sprite,80 * this.frame_x , 0, this.width , this.height, this.x ,this.y, this.width, this.height);
    }
}

class Projectile{
    constructor(ctx,x,y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = 20;
        this.sprite =  new Image();
        this.sprite.src = ".././assets/img/fire.png";
        this.strike_force = 5;
    }

    draw(){        
        this.y -= this.speed;
        this.ctx.fillStyle = 'yellow';        
        this.ctx.drawImage(this.sprite, this.x, this.y)
        this.ctx.fill();
    }
}
