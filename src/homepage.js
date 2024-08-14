import {startDialogue} from "./dialogueLogic.js"

const introDialogues = 
[
    { text: "meow meow meow meow meowmeow meow meow meow meomeow meow meow meow meomeow meow meow meow meomeow meow meow meow meomeowmeow meow meow meomeomeow meow meow meomeoww meow meow meow meowwwww", img: "crying-koti", id: "???", buttons: null },
    { text: "...", img: "crying-koti", id: "???", buttons: null },
    { text: "meeeeeooooooooow", img: "sad-talk", id: "koti", buttons: [{content: "meow", action: () => alert("POLSKA")}, {content: "meow!", action: () => alert("meow!")}] }
];

function main(){
    startDialogue(introDialogues);
}

main();
