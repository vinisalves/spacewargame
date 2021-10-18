import { GAME_CONFIG } from "../config/globals.js";
import { ModalChooseAirCraft } from "../modals/modalChooseAircraft.js";
import { ModalUserPlayerName } from "../modals/modalPlayerName.js";
import Iterator from "../utils/iterator.js";

export default class Controller{
    constructor(){}

    startNewGame(){
        let introRunning = true;
        const modalPlayerName = new ModalUserPlayerName();
        const modalChooseAirCraft = new ModalChooseAirCraft();
        modalPlayerName.nextCb = ()=> modalChooseAirCraft.show();
        modalChooseAirCraft.backCb = () => modalPlayerName.back();
        modalChooseAirCraft.nextCb = () => modalPlayerName.show();
        modalPlayerName.show();  
    }

    pause(){
        
    }

}