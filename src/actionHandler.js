import {currentDialogue, showNextDialogue} from "./dialogueLogic.js"

export const actionHandler = {
    "introYesButton" : function(){
        showNextDialogue(currentDialogue); 
        localStorage.setItem('akt', 0);
    },
    "introNoButton" : function(){
        const x = Math.floor(Math.random() * window.innerWidth); 
        const y = Math.floor(Math.random() * window.innerHeight); 
        this.style.position = 'absolute'; 
        this.style.left = x + 'px'; 
        this.style.top = y + 'px';
    }
};
