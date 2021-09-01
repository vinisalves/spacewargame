import {GAME_CONFIG, GAME_CONTROLS, enum_status} from "./globals.js";
import Background from "./background.js";
import StatusBar from "./statusBar.js";
import Alpha1 from "./aircrafts/alpha1.js";
import Calister from "./aircrafts/calister.js";

const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundCtx =  backgroundCanvas.getContext("2d");
const gameCanvas = document.getElementById("gameCanvas");
const gameCanvasCtx =  backgroundCanvas.getContext("2d");
const btClica = document.getElementById("btPlay");
btClica.addEventListener('click', startNewGame );
const gameStack = [];
const {keyboard, mouse} = GAME_CONTROLS; 
backgroundCanvas.width = GAME_CONFIG.width;
backgroundCanvas.height = GAME_CONFIG.height;
backgroundCanvas.zIndex = "2";
gameCanvas.width = GAME_CONFIG.width;
gameCanvas.height = GAME_CONFIG.height;
gameCanvasCtx.zIndex = "1";

const background = new Background(backgroundCtx);


function handleMouseDown(){
    GAME_CONFIG.player.aircraft.fire();    
}

function handleResize(){
    console.log("resize");
    GAME_CONFIG.width = window.innerWidth;
    GAME_CONFIG.height = window.innerHeight;
    backgroundCanvas.width = GAME_CONFIG.width;
    backgroundCanvas.height = GAME_CONFIG.height;
    gameCanvas.width = GAME_CONFIG.width;
    gameCanvas.height = GAME_CONFIG.height;
}
function handleKeyDown(ev){
    const keyCode = ev.code;   
    if(keyboard[keyCode] !== undefined){
        keyboard[keyCode] = true;        
    }  
}
function handleKeyUp(ev){
    const keyCode = ev.code;   
    if(keyboard[keyCode] !== undefined){
        keyboard[keyCode] = false;        
    }  
}

function startNewGame(){
    gameStack.push(new StatusBar(gameCanvasCtx));
    GAME_CONFIG.player.name = 'Vinicius',
    GAME_CONFIG.player.aircraft =  new Alpha1(gameCanvasCtx);
    GAME_CONFIG.status = enum_status.RUNNING;
    gameStack.push(GAME_CONFIG.player.aircraft);
    btClica.style.display = "none";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleMouseDown);
}

let lastTime = new Date();
function runtime(){
    if(GAME_CONFIG.status === enum_status.PAUSED) return;
    const currentTime = new Date();
    const fps = Math.floor(1000 / (currentTime - lastTime));
    if(GAME_CONFIG.frame % 11 === 0){
        GAME_CONFIG.fps = fps;
    }
    lastTime = currentTime;
    GAME_CONFIG.frame++;    
    gameCanvasCtx.clearRect(0,0,gameCanvas.width, gameCanvas.height);
    backgroundCtx.clearRect(0,0,backgroundCanvas.width, backgroundCanvas.height);
    
    background.draw();
    if(GAME_CONFIG.status === enum_status.RUNNING){
        for(let i = 0; i < gameStack.length; i++){
            gameStack[i].draw();
        }  
     }          
    requestAnimationFrame(runtime);
}



runtime();
startNewGame();


