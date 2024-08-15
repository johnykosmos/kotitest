import {currentDialogue, startCharacter, startCharDialogue, setCurrentDialogue} from "./dialogueLogic.js"


async function main(){
    localStorage.clear();
    if(localStorage.getItem("akt")){
        switch(localStorage.getItem("akt")){
            case '0':
                startCharacter.src = "./img/characters/missyou-koti.gif"; 
                break;
        }
    }
    else 
        await setCurrentDialogue("intro");

    startCharDialogue(currentDialogue);
}

main();
