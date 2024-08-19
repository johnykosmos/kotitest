import {currentDialogue, startCharacter, startCharDialogue, setCurrentDialogue} from "./dialogueLogic.js"


async function main(){
    if(localStorage.getItem("key") === '2'){
        localStorage.setItem("akt", 3);
        localStorage.setItem("key", -1);
    }

    if(localStorage.getItem("akt")){
        if(localStorage.getItem("akt") < 3){
            startCharacter.src = "./img/characters/missyou-koti.gif"; 
            await setCurrentDialogue("act0home");
        }
    }
    else 
        await setCurrentDialogue("intro");

    if(localStorage.getItem("keyDialogue")){
        await setCurrentDialogue("keyDialogue");
        localStorage.removeItem("keyDialogue")
    }

    startCharDialogue();
}

main();
