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
        this.time = 1;
        this.timer();
    }

    timer() {
        setInterval(() => {

            this.time++;
            this.play();

        }, 1000);
    }
    randomLifes(){
        lifes.push( new Life(this.ctx));
        lifes.push( new Life(this.ctx));
        lifes.push( new Life(this.ctx));
        lifes.push( new Life(this.ctx));
        lifes.push( new Life(this.ctx));
        lifes.push( new Life(this.ctx));
    }
    play() {

        console.log(this.time, this.time % 30);
        if(this.time % 30 === 0){
            
            this.randomLifes();
        }
        if (this.time === 5) {
            enemies.push(new Enemy2(this.ctx));       
            enemies.push(new Enemy2(this.ctx));           
        }

        if (this.time === 10) {
            enemies.push(new Enemy1(this.ctx));
        }
        if (this.time === 15) {
            enemies.push(new Enemy1(this.ctx));
        }
        if (this.time === 20) {
            enemies.push(new Enemy1(this.ctx));
        }
        if (this.time === 25) {
            enemies.push(new Enemy1(this.ctx));
        }

        if (this.time === 30) {
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy3(this.ctx));            
        }

        if (this.time === 50) {
            enemies.push(new Enemy1(this.ctx));
            enemies.push(new Enemy1(this.ctx));
        }
        if (this.time === 55) {
            enemies.push(new Enemy1(this.ctx));
            enemies.push(new Enemy1(this.ctx));
            enemies.push(new Enemy1(this.ctx));
        }

        if(this.time === 70){
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy3(this.ctx));
            enemies.push(new Enemy3(this.ctx));
            enemies.push(new Enemy3(this.ctx));
        }
       
        if(this.time === 75){
            enemies.push(new Enemy1(this.ctx));
            enemies.push(new Enemy1(this.ctx));
            enemies.push(new Enemy1(this.ctx));
        }

        if(this.time === 90){
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy3(this.ctx));
            enemies.push(new Enemy3(this.ctx));
            enemies.push(new Enemy4(this.ctx));

        }


        if(this.time === 90){
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy2(this.ctx));
            enemies.push(new Enemy3(this.ctx));
            enemies.push(new Enemy3(this.ctx));
            enemies.push(new Enemy4(this.ctx));

        }

        if(this.time === 155){
             enemies.push(new Enemy2(this.ctx));
             enemies.push(new Enemy2(this.ctx));
             enemies.push(new Enemy3(this.ctx));
             enemies.push(new Enemy3(this.ctx));
             enemies.push(new Enemy5(this.ctx));

         }
    }

}