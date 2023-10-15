const BACKGROUND = new Audio();
BACKGROUND.src = "game/assets/sounds/background.wav";
BACKGROUND.loop = true;
BACKGROUND.volume = 0.2;
BACKGROUND.autoplay = true;
BACKGROUND.muted = true;

const MODAL_TRANSITION = new Audio();
MODAL_TRANSITION.src = "game/assets/sounds/newGame.wav";
MODAL_TRANSITION.muted = true;

const BUTTON_HOVER = new Audio();
BUTTON_HOVER.src = "game/assets/sounds/menu_onbutton.wav";
BUTTON_HOVER.muted = true;

const HOVER_AIRCRAFT = new Audio();
HOVER_AIRCRAFT.src = "game/assets/sounds/hover_aircraft.wav";
HOVER_AIRCRAFT.muted = true;

const CHOOSE_AIRCRAFT = new Audio();
CHOOSE_AIRCRAFT.src = "game/assets/sounds/chooseAircraft.wav";
CHOOSE_AIRCRAFT.muted = true;

const EXPLOSION = new Audio();
EXPLOSION.src = "game/assets/sounds/explosion.wav";
EXPLOSION.muted = true;

const EXPLOSION_AIRCRAFT = new Audio();
EXPLOSION_AIRCRAFT.src = "game/assets/sounds/explosionAircraft.wav";
EXPLOSION_AIRCRAFT.muted = true;

const READY = new Audio();
READY.src = "game/assets/sounds/voices/ready.ogg";
READY.muted = true;

const BACKGROUND_GAME_PLAY = new Audio();
BACKGROUND_GAME_PLAY.src = "game/assets/sounds/track_11.ogg";
BACKGROUND_GAME_PLAY.volume = 0.2;
BACKGROUND_GAME_PLAY.loop = true;
BACKGROUND_GAME_PLAY.muted = true;

const BACKGROUND_GAME_PLAY_BOSS = new Audio();
BACKGROUND_GAME_PLAY_BOSS.src = "game/assets/sounds/track_08.ogg";
BACKGROUND_GAME_PLAY_BOSS.volume = 0.2;
BACKGROUND_GAME_PLAY_BOSS.loop = true;
BACKGROUND_GAME_PLAY_BOSS.muted = true;

const BACKGROUND_GAME_PLAY_END = new Audio();
BACKGROUND_GAME_PLAY_END.src = "game/assets/sounds/track_01.ogg";
BACKGROUND_GAME_PLAY_END.volume = 0.2;
BACKGROUND_GAME_PLAY.loop = true;
BACKGROUND_GAME_PLAY_END.muted = true;

const NEW_LIFE = new Audio();
NEW_LIFE.src = "game/assets/sounds/energy.ogg";
NEW_LIFE.muted = true;

const ALPHA1_FIRE = new Audio();
ALPHA1_FIRE.src = "game/assets/sounds/alpha1_fire.wav";
ALPHA1_FIRE.muted = true;
ALPHA1_FIRE.volume = 0.1;

const CALISTER_FIRE = new Audio();
CALISTER_FIRE.src = "game/assets/sounds/calister_fire.wav";
CALISTER_FIRE.volume = 0.2;
CALISTER_FIRE.muted = true;

const ENEMY1_FIRE = new Audio();
ENEMY1_FIRE.src = "game/assets/sounds/enemy1_fire.wav";
ENEMY1_FIRE.volume = 0.2;
ENEMY1_FIRE.muted = true;

const ENEMY2_FIRE = new Audio();
ENEMY2_FIRE.src = "game/assets/sounds/enemy2_fire.wav";
ENEMY2_FIRE.volume = 0.2;
ENEMY2_FIRE.muted = true;

const ENEMY3_FIRE = new Audio();
ENEMY3_FIRE.src = "game/assets/sounds/enemy3_fire.wav";
ENEMY3_FIRE.volume = 0.2;
ENEMY3_FIRE.muted = true;

const ENEMY4_FIRE = new Audio();
ENEMY4_FIRE.src = "game/assets/sounds/enemy4_fire.wav";
ENEMY4_FIRE.volume = 0.2;
ENEMY4_FIRE.muted = true;

const ENEMY5_FIRE = new Audio();
ENEMY5_FIRE.src = "game/assets/sounds/enemy5_fire.ogg";
ENEMY5_FIRE.volume = 0.4;
ENEMY5_FIRE.muted = true;

const ERROR = new Audio();
ERROR.src = "game/assets/sounds/error.wav";
ERROR.muted = true;

const GAME_OVER = new Audio();
GAME_OVER.src = "game/assets/sounds/voices/game_over.ogg";
GAME_OVER.volume = 1;
GAME_OVER.muted = true;

const WARNING = new Audio();
WARNING.src = "game/assets/sounds/voices/warning.ogg";
WARNING.volume = 0.6;
WARNING.muted = true;

const NO_BULLETS = new Audio();
NO_BULLETS.src = "game/assets/sounds/no_bullets.wav";
NO_BULLETS.volume = 1;
NO_BULLETS.muted = true;

const muteAll = () => {
  const AllAudios = [
    BACKGROUND,
    MODAL_TRANSITION,
    BUTTON_HOVER,
    CHOOSE_AIRCRAFT,
    HOVER_AIRCRAFT,
    EXPLOSION,
    EXPLOSION_AIRCRAFT,
    READY,
    BACKGROUND_GAME_PLAY,
    BACKGROUND_GAME_PLAY_BOSS,
    BACKGROUND_GAME_PLAY_END,
    NEW_LIFE,
    ALPHA1_FIRE,
    CALISTER_FIRE,
    ENEMY1_FIRE,
    ENEMY2_FIRE,
    ENEMY3_FIRE,
    ENEMY4_FIRE,
    ENEMY5_FIRE,
    ERROR,
    GAME_OVER,
    WARNING,
    NO_BULLETS,
  ].forEach((audio) => (audio.muted = !audio.muted));
};
export default {
  BACKGROUND,
  MODAL_TRANSITION,
  BUTTON_HOVER,
  CHOOSE_AIRCRAFT,
  HOVER_AIRCRAFT,
  EXPLOSION,
  EXPLOSION_AIRCRAFT,
  READY,
  BACKGROUND_GAME_PLAY,
  BACKGROUND_GAME_PLAY_BOSS,
  BACKGROUND_GAME_PLAY_END,
  NEW_LIFE,
  ALPHA1_FIRE,
  CALISTER_FIRE,
  ENEMY1_FIRE,
  ENEMY2_FIRE,
  ENEMY3_FIRE,
  ENEMY4_FIRE,
  ENEMY5_FIRE,
  ERROR,
  GAME_OVER,
  WARNING,
  NO_BULLETS,
  muteAll,
};
