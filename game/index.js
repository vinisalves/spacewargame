import {
  GAME_CONFIG,
  GAME_CONTROLS,
  enum_status,
  enemiesProjectiles,
  playerProjectiles,
  enemies,
  explosions,
  lifes,
} from "./config/globals.js";
import Background from "./core/background.js";
import StatusBar from "./core/statusBar.js";
import Alpha1 from "./aircrafts/alpha1.js";
import Calister from "./aircrafts/calister.js";
import GamePlay from "./core/gamePlay.js";
import { ModalChooseAirCraft } from "./modals/modalChooseAircraft.js";
import { ModalUserPlayerName } from "./modals/modalPlayerName.js";
import { ModalGameOver } from "./modals/modalGameOver.js";
import { ModalCredits } from "./modals/modalCredits.js";
import soundController from "./core/soundController.js";
import { ModalControlls } from "./modals/controllsModal.js";

const gameStack = [];

const gameContainer = document.querySelector("#game-container");

const backgroundCanvas = document.createElement("canvas");

backgroundCanvas.id = "game-background";
gameContainer.appendChild(backgroundCanvas);

const gameCanvas = document.createElement("canvas");
gameContainer.id = GAME_CONFIG.game_container_id;
gameContainer.appendChild(gameCanvas);

const backgroundCtx = backgroundCanvas.getContext("2d");
const gameCanvasCtx = backgroundCanvas.getContext("2d");
const btClica = document.getElementById("bt-play");

let fireInterval, reloadInterval;
const animateOutBtClica = [
  {
    right: 0,
  },
  {
    right: "-300px",
  },
];
const animateInBtClica = [
  {
    right: "-300px",
  },
  {
    right: 0,
  },
];
const animateTimeBtClica = {
  duration: 200,
  fill: "forwards",
  easing: "linear",
};

const errorModalContainer = document.createElement("div");
errorModalContainer.id = "error-modal-container";
Object.assign(errorModalContainer.style, {
  display: "flex",
  flexDirection: "column",
  width: "300px",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 99999,
});
gameContainer.appendChild(errorModalContainer);

const { keyboard } = GAME_CONTROLS;
backgroundCanvas.width = GAME_CONFIG.width;
backgroundCanvas.height = GAME_CONFIG.height;
backgroundCanvas.zIndex = "2";
gameCanvas.width = GAME_CONFIG.width;
gameCanvas.height = GAME_CONFIG.height;
gameCanvasCtx.zIndex = "1";

const background = new Background(backgroundCtx);
const soundControl = document.querySelector("#soundControl");
let soundEnabled = false;
soundControl.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    soundControl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
    `;
  } else {
    soundControl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
    `;
  }

  soundController.muteAll();
});

if (window.innerWidth <= 800 || window.innerHeight <= 673) {
  btClica.style.display = "none";
  soundControl.style.display = "none";
}

window.addEventListener("resize", handleResize);
window.addEventListener("play", start);
console.log("**** events liseteners set ********¨");

function handleMouseUp() {
  clearInterval(fireInterval);
  if ((GAME_CONFIG.status = enum_status.RUNNING)) {
    reloadInterval = setInterval(() => {
      if (GAME_CONFIG.player.bullets < GAME_CONFIG.bullets_default) {
        GAME_CONFIG.player.bullets = GAME_CONFIG.player.bullets + 10;
        if (GAME_CONFIG.player.bullets > GAME_CONFIG.bullets_default)
          GAME_CONFIG.player.bullets = GAME_CONFIG.bullets_default;
      }
    }, 500);
  }
}
function handleMouseDown() {
  clearInterval(reloadInterval);
  if ((GAME_CONFIG.status = enum_status.RUNNING)) {
    if (GAME_CONFIG.player.bullets > 0) {
      GAME_CONFIG.player.aircraft.fire();
      GAME_CONFIG.player.bullets--;
      fireInterval = setInterval(() => {
        if (GAME_CONFIG.player.bullets > 0) {
          GAME_CONFIG.player.aircraft.fire();
          GAME_CONFIG.player.bullets--;

          if (GAME_CONFIG.player.bullets === 0) {
            soundController.NO_BULLETS.play();
          }
        }
      }, 200);
    }
  }
}

function handleResize() {
  GAME_CONFIG.width = window.innerWidth;
  GAME_CONFIG.height = window.innerHeight;
  backgroundCanvas.width = GAME_CONFIG.width;
  backgroundCanvas.height = GAME_CONFIG.height;
  gameCanvas.width = GAME_CONFIG.width;
  gameCanvas.height = GAME_CONFIG.height;
}
function handleKeyDown(ev) {
  if (ev.repeat) {
    ev.preventDefault();
    return;
  }
  const keyCode = ev.code;
  if (keyboard[keyCode] !== undefined) {
    keyboard[keyCode] = true;
  }
}
function handleKeyUp(ev) {
  if (ev.repeat) {
    ev.preventDefault();
    return;
  }
  const keyCode = ev.code;
  if (keyboard[keyCode] !== undefined) {
    keyboard[keyCode] = false;
  }
}

function newGame() {
  const event = new Event("play");
  const modalPlayerName = new ModalUserPlayerName();
  const modalChooseAirCraft = new ModalChooseAirCraft();
  const modalControlls = new ModalControlls();
  modalPlayerName.backCb = () => {
    btClica.animate(animateInBtClica, animateTimeBtClica);
  };
  modalPlayerName.nextCb = (playerName) => {
    GAME_CONFIG.player.name = playerName;
    modalChooseAirCraft.show();
  };
  modalControlls.nextCb = () => {
    window.dispatchEvent(event);
  };
  modalChooseAirCraft.backCb = () => modalPlayerName.back();
  modalChooseAirCraft.nextCb = (aircraft) => {
    GAME_CONFIG.player.aircraft =
      aircraft.name === "Alpha1"
        ? new Alpha1(gameCanvasCtx)
        : new Calister(gameCanvasCtx);
    modalControlls.show();
  };
  modalPlayerName.show();
  // new ModalGameOver().show();
}

const gamePlay = new GamePlay(gameCanvasCtx);

async function start() {
  window.addEventListener("keydown", handleKeyDown, true);
  window.addEventListener("keyup", handleKeyUp, true);
  window.addEventListener("mousedown", handleMouseDown, true);
  window.addEventListener("mouseup", handleMouseUp, true);
  gameStack.push(new StatusBar(gameCanvasCtx));
  // GAME_CONFIG.player.name = "Vinicius";
  //GAME_CONFIG.player.aircraft = new Calister(gameCanvasCtx);
  GAME_CONFIG.player.life = 100;
  // GAME_CONFIG.player.aircraft.x = GAME_CONFIG.width / 2 - this.width;

  GAME_CONFIG.status = enum_status.RUNNING;

  gameStack.push(GAME_CONFIG.player.aircraft);
  enemies.length = 0;

  GAME_CONFIG.game_speed = 5;

  // new PlayButton();
}

function gameOver() {
  window.removeEventListener("keydown", handleKeyDown, true);
  window.removeEventListener("keyup", handleKeyUp, true);
  window.removeEventListener("mousedown", handleMouseDown, true);
  window.removeEventListener("mouseup", handleMouseUp, true);

  if (GAME_CONFIG.status !== enum_status.END) {
    GAME_CONFIG.status = enum_status.END;
    gameStack.length = 0;
    enemies.length = 0;
    explosions.length = 0;
    lifes.length = 0;
    enemiesProjectiles.length = 0;
    playerProjectiles.length = 0;
    // GAME_CONFIG.player = {
    //   name: "Anonymous",
    //   score: 0,
    //   life: 100,
    //   aircraft: null,
    //   bullets: GAME_CONFIG.bullets_default,
    // };
    gamePlay.restart();
    keyboard["KeyW"] = false;
    keyboard["KeyD"] = false;
    keyboard["KeyS"] = false;
    keyboard["KeyA"] = false;
    GAME_CONFIG.player.score = 0;

    soundController.BACKGROUND_GAME_PLAY.currentTime = 0;
    soundController.BACKGROUND_GAME_PLAY.pause();
    soundController.BACKGROUND_GAME_PLAY_BOSS.currentTime = 0;
    soundController.BACKGROUND_GAME_PLAY_BOSS.pause();
    soundController.BACKGROUND.currentTime = 0;
    soundController.BACKGROUND.play();

    clearInterval(reloadInterval);
    clearInterval(fireInterval);
    soundController.GAME_OVER.play();
    new ModalGameOver().show(() =>
      btClica.animate(animateInBtClica, animateTimeBtClica)
    );
  }

  GAME_CONFIG.game_speed = 0.5;
}

function endGame() {
  window.removeEventListener("keydown", handleKeyDown, true);
  window.removeEventListener("keyup", handleKeyUp, true);
  window.removeEventListener("mousedown", handleMouseDown, true);
  window.removeEventListener("mouseup", handleMouseUp, true);
  gameStack.length = 0;
  enemies.length = 0;
  explosions.length = 0;
  lifes.length = 0;
  enemiesProjectiles.length = 0;
  playerProjectiles.length = 0;
  gamePlay.restart();
  keyboard["KeyW"] = false;
  keyboard["KeyD"] = false;
  keyboard["KeyS"] = false;
  keyboard["KeyA"] = false;

  GAME_CONFIG.player.score = 0;
  clearInterval(reloadInterval);
  clearInterval(fireInterval);
  new ModalCredits().show(() => {
    btClica.animate(animateInBtClica, animateTimeBtClica);
  });
  GAME_CONFIG.status = enum_status.END;
}

let lastTime = new Date();
function runtime() {
  if (GAME_CONFIG.status === enum_status.PAUSED) return;
  const currentTime = new Date();
  const fps = Math.floor(1000 / (currentTime - lastTime));
  if (GAME_CONFIG.frame % 11 === 0) {
    GAME_CONFIG.fps = fps;
  }
  lastTime = currentTime;
  GAME_CONFIG.frame++;
  gameCanvasCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  background.draw();

  if (GAME_CONFIG.status === enum_status.RUNNING) {
    gameStack.forEach((item, i) => {
      if (item.y > GAME_CONFIG.height) {
        gameStack.splice(i, 1);

        return;
      }
      item.draw();
    });

    if (enemies.length === 0 && gamePlay.hasNext()) {
      gamePlay.nextLevel();
    } else if (enemies.length === 0 && !gamePlay.hasNext()) {
      endGame();
    }

    enemies.forEach((enemy, i) => {
      if (enemy.y > GAME_CONFIG.height) {
        enemies.splice(i, 1);
        return;
      }
      enemy.draw();
      handleColisionAirCrafts(enemy, i);
    });

    enemiesProjectiles.forEach((projectile, i) => {
      if (projectile.y > GAME_CONFIG.height) {
        enemiesProjectiles.splice(i, 1);
        return;
      }
      projectile.draw();
      handleColisionEnemyProjectile(projectile, i);
    });

    playerProjectiles.forEach((projectile, i) => {
      if (projectile.y < 0) {
        playerProjectiles.splice(i, 1);
        return;
      }
      projectile.draw();
      handleColisionPlayerProjectile(projectile, i);
    });

    explosions.forEach((explosion, i) => {
      if (explosion.isDone) {
        explosions.splice(i, 1);
      }
      explosion.draw();
    });

    lifes.forEach((life, i) => {
      if (life.y > GAME_CONFIG.height) {
        lifes.splice(i, 1);
        return;
      }
      life.draw();
      handleColisionLife(life, i);
    });
  }
  requestAnimationFrame(runtime);
}

function handleColisionEnemyProjectile(projectile, i) {
  if (
    !(
      projectile.x >
        GAME_CONFIG.player.aircraft.x + GAME_CONFIG.player.aircraft.width ||
      projectile.x + projectile.width < GAME_CONFIG.player.aircraft.x ||
      projectile.y >
        GAME_CONFIG.player.aircraft.y + GAME_CONFIG.player.aircraft.height ||
      projectile.y + projectile.height < GAME_CONFIG.player.aircraft.y
    )
  ) {
    GAME_CONFIG.player.aircraft.hit(
      projectile.strike_force,
      projectile.x,
      projectile.y
    );

    if (GAME_CONFIG.player.life <= 0) {
      gameOver();
      return;
    }

    if (GAME_CONFIG.player.life <= 20) {
      soundController.WARNING.currentTime = 0;
      soundController.WARNING.play();
    }
    enemiesProjectiles.splice(i, 1);
  }
}

function handleColisionPlayerProjectile(projectile, i) {
  enemies.forEach((enemy, j) => {
    if (
      !(
        projectile.x > enemy.x + enemy.width ||
        projectile.x + projectile.width < enemy.x ||
        projectile.y > enemy.y + enemy.height ||
        projectile.y + projectile.height < enemy.y
      )
    ) {
      enemy.hit(projectile.strike_force, projectile.x, projectile.y);
      GAME_CONFIG.player.score += 5;
      if (enemy.life <= 0) {
        enemies.splice(j, 1);
      }
      playerProjectiles.splice(i, 1);
    }
  });
}

function handleColisionAirCrafts(enemy, i) {
  if (
    !(
      GAME_CONFIG.player.aircraft.x > enemy.x + enemy.width ||
      GAME_CONFIG.player.aircraft.x + GAME_CONFIG.player.aircraft.width <
        enemy.x ||
      GAME_CONFIG.player.aircraft.y > enemy.y + enemy.height ||
      GAME_CONFIG.player.aircraft.y + GAME_CONFIG.player.aircraft.height <
        enemy.y
    )
  ) {
    enemy.explode();
    enemies.splice(i, 1);
    GAME_CONFIG.player.aircraft.explode();
    setTimeout(() => {
      gameOver();
    }, 100);
  }
}

function handleColisionLife(life, i) {
  if (
    !(
      life.x >
        GAME_CONFIG.player.aircraft.x + GAME_CONFIG.player.aircraft.width ||
      life.x + GAME_CONFIG.player.aircraft.width <
        GAME_CONFIG.player.aircraft.x ||
      life.y >
        GAME_CONFIG.player.aircraft.y + GAME_CONFIG.player.aircraft.height ||
      life.y - 100 + GAME_CONFIG.player.aircraft.height <
        GAME_CONFIG.player.aircraft.y
    )
  ) {
    life.repairAircraft();

    lifes.splice(i, 1);
  }
}

btClica.addEventListener("click", () => {
  btClica.animate(animateOutBtClica, animateTimeBtClica);

  newGame();
});

runtime();
