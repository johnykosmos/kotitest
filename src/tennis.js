import {currentDialogue, startCharacter, setStartCharacter, startCharDialogue, setCurrentDialogue} from "./dialogueLogic.js"


async function main(){
    setStartCharacter("kort");
    await setCurrentDialogue("tennis");

    startCharDialogue();
} 

main();
