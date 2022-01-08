export const enum_status = {
    PAUSED: "PAUSED",
    RUNNING: "RUNNING",
    GAME_OVER:"GAME_OVER"
}

export const GAME_CONFIG = {
    level:1,
    status: enum_status.RUNNING,
    width: window.innerWidth,
    height: window.innerHeight,
    frame:0,
    game_speed: 2,    
    fps: 0,
    player: {
        name:'Anonymous',
        score:0,
        life:100,
        aircraft: null,
    }
}
export const GAME_CONTROLS ={
    mouse: {
        y:0,
        x:0,
        clicked: false
    },
    keyboard:{
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
        ArrowLeft: false,
        KeyW: false,
        KeyD: false,
        KeyS: false,
        KeyA: false
    }
}

export const enemiesProjectiles = [];
export const playerProjectiles = [];
export const enemies = [];
export const explosions = [];
