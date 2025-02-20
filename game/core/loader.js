import { GAME_CONFIG } from "../config/globals.js";
import { sleep } from "../lib/utils.js";

export default class Loader {
  range = 10;
  constructor(ctx) {
    this.ctx = ctx;
  }

  async draw() {
    const loadingTotal = 100;
    const range = GAME_CONFIG.width / loadingTotal; // Calculate the width increment for the progress bar

    for (let i = 0; i <= loadingTotal; i++) {
      // Clear the canvas
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      // Draw the percentage text
      this.ctx.font = "30px arcade";
      this.ctx.fillStyle = "red"; // Set fill style for text
      this.ctx.fillText(`${i}%`, GAME_CONFIG.width / 2, GAME_CONFIG.height / 2); // Display the percentage

      // Draw the progress bar
      this.ctx.fillStyle = "red"; // Set fill style for the progress bar
      this.ctx.fillRect(0, GAME_CONFIG.height / 2, i * range, 2); // Draw the progress bar

      // Wait for a short duration before updating
      await sleep(20);
    }
  }
}
