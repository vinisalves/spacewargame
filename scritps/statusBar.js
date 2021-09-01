import {GAME_CONFIG} from "./globals.js";
export default class StatusBar {
    constructor(ctx){
        this.ctx = ctx;
    }
    draw(){
       
        const heartImage = new Image();
        heartImage.src = ".././assets/img/heart.png";
        this.ctx.drawImage(heartImage, 10,5);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(50,10, GAME_CONFIG.player.life * 2, 20);
        this.ctx.font = "30px arcade";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`${GAME_CONFIG.player.life}%` , 120, 32);

        this.ctx.font = "30px arcade";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(GAME_CONFIG.player.name , 360, 30);

        this.ctx.font = "40px arcade";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("SCORE : " + GAME_CONFIG.player.score  , GAME_CONFIG.width - 300, 35);

        this.ctx.font = "15px arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("fps: " + GAME_CONFIG.fps + "/s" , 10, GAME_CONFIG.height - 10);
    }
}
