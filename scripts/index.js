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

const gameStack = [];

const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");
const gameCanvas = document.getElementById("gameCanvas");
const gameCanvasCtx = backgroundCanvas.getContext("2d");
const btClica = document.getElementById("btPlay");

const errorModalContainer = document.createElement("div");
const errorModalContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems:'center',
  width: '300px',
  height: '100%',
  position:'absolute',
  top:'0',
  right:'0',
  zIndex: 99999,
}
Object.assign(errorModalContainer.style, errorModalContainerStyles);

gameContainer.appendChild(errorModalContainer);

const { keyboard } = GAME_CONTROLS;
backgroundCanvas.width = GAME_CONFIG.width;
backgroundCanvas.height = GAME_CONFIG.height;
backgroundCanvas.zIndex = "2";
gameCanvas.width = GAME_CONFIG.width;
gameCanvas.height = GAME_CONFIG.height;
gameCanvasCtx.zIndex = "1";

const background = new Background(backgroundCtx);

window.addEventListener("resize", handleResize);
window.addEventListener("play", start);

function handleMouseDown() {
  GAME_CONFIG.player.aircraft.fire();
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
  const keyCode = ev.code;
  if (keyboard[keyCode] !== undefined) {
    keyboard[keyCode] = true;
  }
}
function handleKeyUp(ev) {
  const keyCode = ev.code;
  if (keyboard[keyCode] !== undefined) {
    keyboard[keyCode] = false;
  }
}

function newGame(){
  const event = new Event('play');
   const modalPlayerName = new ModalUserPlayerName();
   const modalChooseAirCraft = new ModalChooseAirCraft();
    modalPlayerName.nextCb = (playerName)=>{
      GAME_CONFIG.player.name = playerName;
      modalChooseAirCraft.show();
    };
    modalChooseAirCraft.backCb = () => modalPlayerName.back();
    modalChooseAirCraft.nextCb = (aircraft) => {
   
      GAME_CONFIG.player.aircraft = aircraft.name === 'Alpha1' ? new Alpha1(gameCanvasCtx) : new Calister(gameCanvasCtx);   
      window.dispatchEvent(event);
    };        
     modalPlayerName.show();  
  // new ModalGameOver().show();
}



async function start() {
  
  btClica.style.display = "none";
  gameStack.push(new StatusBar(gameCanvasCtx));
  // GAME_CONFIG.player.name = "Vinicius";
  //GAME_CONFIG.player.aircraft = new Calister(gameCanvasCtx);
  GAME_CONFIG.game_speed = 4;
  GAME_CONFIG.status = enum_status.RUNNING;
  console.log(GAME_CONFIG.player.aircraft);
  gameStack.push(GAME_CONFIG.player.aircraft);

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  window.addEventListener("mousedown", handleMouseDown);
  new GamePlay(gameCanvasCtx).play();
   const startAudio = new Audio();
   startAudio.src = "../assets/sounds/voices/ready.ogg";
   startAudio.play();
  const music = new Audio();
  music.src = "../assets/sounds/track_03.ogg";
  music.volume = 0.2;
  music.play();
  music.loop = true;
 
}

function gameOver() {
  const startAudio = new Audio();
  startAudio.src = "../assets/sounds/voices/game_over.ogg";
  startAudio.play();
  // gameStack = [];
  // enemies =[];
  // enemiesProjectiles = [];
  GAME_CONFIG.status = enum_status.GAME_OVER;
  GAME_CONFIG.game_speed = 0.5;
  new ModalGameOver().show();
  
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
        console.log('vai remover');
        return;
      }
      item.draw();
    });

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

    lifes.forEach((life, i)=> {
      if(life.y > GAME_CONFIG.height){
        lifes.splice(i,1);
        return;        
      }
      life.draw();
      handleColisionLife(life, i);
    })
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

    if(GAME_CONFIG.player.life <= 0){
      gameOver();
      return;
    }

    if(GAME_CONFIG.player.life <= 20){
      const warningAudio = new Audio();
      warningAudio.src = "../assets/sounds/voices/warning.ogg";
      warningAudio.play();
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

function handleColisionLife(life, i){
  if (
    !(
      life.x > GAME_CONFIG.player.aircraft.x + GAME_CONFIG.player.aircraft.width ||
      life.x + GAME_CONFIG.player.aircraft.width <
        GAME_CONFIG.player.aircraft.x ||
      life.y > GAME_CONFIG.player.aircraft.y + GAME_CONFIG.player.aircraft.height ||
      life.y - 100 + GAME_CONFIG.player.aircraft.height <
        GAME_CONFIG.player.aircraft.y
    )
  ) {

    life.repairAircraft();

    lifes.splice(i, 1);   
  }
}


btClica.addEventListener("click", newGame);

runtime();
