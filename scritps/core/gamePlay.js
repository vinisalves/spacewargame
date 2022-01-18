import Enemy1 from "../enemies/Enemy1.js";
import Enemy2 from "../enemies/Enemy2.js";
import Enemy3 from "../enemies/Enemy3.js";
import Enemy4 from "../enemies/Enemy4.js";
import { enemies } from "../config/globals.js";

export default class GamePlay {
    constructor(ctx) {
        this.ctx = ctx;
        this.time = 0;
        this.timer();
    }

    timer() {
        setInterval(() => {

            this.time++;
            this.play();

        }, 1000);
    }
    play() {
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

        // if(enemies.length === 0 && this.time > 90){
        //     enemies.push(new Enemy2(this.ctx));
        //     enemies.push(new Enemy2(this.ctx));
        //     enemies.push(new Enemy3(this.ctx));
        //     enemies.push(new Enemy3(this.ctx));
        //     enemies.push(new Enemy4(this.ctx));

        // }
    }

}