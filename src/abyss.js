import {currentDialogue, startCharacter, setStartCharacter, startCharDialogue, setCurrentDialogue} from "./dialogueLogic.js"

const holeDialogues = [ {text: "czujesz zew otchłani", img: "", buttons:null},
    {text: "patrzysz się w nią tak długo, że ona zaczęła patrzeć się w ciebie", img: "", buttons:null}
]

async function main(){
    setStartCharacter("hole");
    startCharDialogue(holeDialogues);
}

main();
