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
    this.level = 1;
    this.stack = {
      // 1: () => {
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   setTimeout(() => {
      //     enemies.push(new Enemy1(this.ctx));
      //     enemies.push(new Enemy1(this.ctx));
      //   }, 7000);
      // },
      // 2: () => {
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   setTimeout(() => {
      //     enemies.push(new Enemy1(this.ctx));
      //     enemies.push(new Enemy1(this.ctx));
      //     enemies.push(new Enemy1(this.ctx));
      //     enemies.push(new Enemy1(this.ctx));
      //   }, 8000);
      // },
      // 3: () => {
      //   enemies.push(new Enemy3(this.ctx));
      //   setTimeout(() => {
      //     enemies.push(new Enemy2(this.ctx));
      //     enemies.push(new Enemy2(this.ctx));
      //     enemies.push(new Enemy2(this.ctx));
      //     enemies.push(new Enemy2(this.ctx));
      //   }, 5000);
      // },
      // 4: () => {
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy3(this.ctx));
      //   setTimeout(() => {
      //     enemies.push(new Enemy1(this.ctx));
      //     enemies.push(new Enemy1(this.ctx));
      //   }, 1000);
      //   this.randomLifes();
      // },
      // 5: () => {
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy3(this.ctx));
      //   enemies.push(new Enemy3(this.ctx));
      //   enemies.push(new Enemy3(this.ctx));
      // },
      // 6: () => {
      //   enemies.push(new Enemy5(this.ctx));
      // },
      // 7: () => {
      //   enemies.push(new Enemy5(this.ctx));
      //   this.randomLifes();
      // },
      // 8: () => {
      //   enemies.push(new Enemy5(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy2(this.ctx));
      //   enemies.push(new Enemy3(this.ctx));
      //   enemies.push(new Enemy3(this.ctx));
      //   enemies.push(new Enemy3(this.ctx));
      //   setTimeout(() => {
      //     enemies.push(new Enemy1(this.ctx));
      //     enemies.push(new Enemy1(this.ctx));
      //     enemies.push(new Enemy1(this.ctx));
      //     enemies.push(new Enemy1(this.ctx));
      //   }, 8000);
      // },
      // 9: () => {
      //   enemies.push(new Enemy5(this.ctx));
      // },
    };
  }

  randomLifes() {
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
    lifes.push(new Life(this.ctx));
  }
  nextLevel() {
    this.hasNext() ? this.stack[this.level]() : false;
    this.level++;
  }
  hasNext() {
    return typeof this.stack[this.level] === "function";
  }
  play() {
    // if(this.level % 3 === 0){wA
    //     this.randomLifes();
    // }
    // if (this.level === 5) {
    // }
    // if (this.level === 10) {
    // }
    // if (this.level === 15) {
    //     enemies.push(new Enemy1(this.ctx));
    // }
    // if (this.level === 20) {
    //     enemies.push(new Enemy1(this.ctx));
    // }
    // if (this.level === 25) {
    //     enemies.push(new Enemy1(this.ctx));
    // }
    // if (this.level === 30) {
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy3(this.ctx));
    // }
    // if (this.level === 50) {
    //     enemies.push(new Enemy1(this.ctx));
    //     enemies.push(new Enemy1(this.ctx));
    // }
    // if (this.level === 55) {
    //     enemies.push(new Enemy1(this.ctx));
    //     enemies.push(new Enemy1(this.ctx));
    //     enemies.push(new Enemy1(this.ctx));
    // }
    // if(this.level === 70){
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy3(this.ctx));
    //     enemies.push(new Enemy3(this.ctx));
    //     enemies.push(new Enemy3(this.ctx));
    // }
    // if(this.level === 75){
    //     enemies.push(new Enemy1(this.ctx));
    //     enemies.push(new Enemy1(this.ctx));
    //     enemies.push(new Enemy1(this.ctx));
    // }
    // if(this.level === 90){
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy3(this.ctx));
    //     enemies.push(new Enemy3(this.ctx));
    //     enemies.push(new Enemy4(this.ctx));
    // }
    // if(this.level === 90){
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy2(this.ctx));
    //     enemies.push(new Enemy3(this.ctx));
    //     enemies.push(new Enemy3(this.ctx));
    //     enemies.push(new Enemy4(this.ctx));
    // }
    // if(this.level === 155){
    //      enemies.push(new Enemy2(this.ctx));
    //      enemies.push(new Enemy2(this.ctx));
    //      enemies.push(new Enemy3(this.ctx));
    //      enemies.push(new Enemy3(this.ctx));
    //      enemies.push(new Enemy5(this.ctx));
    //  }
  }
}
