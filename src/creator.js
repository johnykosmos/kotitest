import {currentDialogue, startCharacter, setStartCharacter, startCharDialogue, setCurrentDialogue} from "./dialogueLogic.js"



async function main(){
   if(localStorage.getItem("kreator")){
        switch(localStorage.getItem("kreator")){
            case '0':
                document.getElementById("startCharacter").style.visibility = "visible";
                await setCurrentDialogue("0creator");
                break;
            case '1':
                document.getElementById("startCharacter").style.visibility = "visible";
                await setCurrentDialogue("1creator");
                break;

        }
    }
    else{ 
        setStartCharacter("scifi");
        await setCurrentDialogue("firstTimeCreator");
    }

    startCharDialogue();
} 

main();
