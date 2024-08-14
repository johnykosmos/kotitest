const characterImg = document.getElementById("character");
const dialogue = document.getElementById("dialogue-screen");
const dialogueTitle = document.getElementById("dialogue-title");
const dialogueContent = document.getElementById("dialogue-content");
const enterInfo = document.getElementById("next-dialogue-info");
const choiceButtons = document.getElementById("choice-buttons");
const startCharacter = document.getElementById("startCharacter");

const dialogues = 
[
    { text: "meow meow meow meow meowmeow meow meow meow meomeow meow meow meow meomeow meow meow meow meomeow meow meow meow meomeowmeow meow meow meomeomeow meow meow meomeoww meow meow meow meowwwww", img: "crying-koti", id: "???", buttons: null },
    { text: "...", img: "crying-koti", id: "???", buttons: null },
    { text: "meeeeeooooooooow", img: "sad-talk", id: "koti", buttons: [{content: "meow", action: () => alert("POLSKA")}, {content: "meow!", action: () => alert("meow!")}] }
];

let dialogueIndex = 0;
let isTyping = false;
let isChoice = false;
export let currentPhoto; 


function displayDialogue(text, index = 0){
    if(index < text.length){
        isTyping = true;
        dialogueContent.innerHTML += text.charAt(index);
        index++;
        setTimeout(() => displayDialogue(text, index), 15);
    }
    else{
        isTyping = false;
        if(!isChoice)
            enterInfo.style.visibility = "visible";
    }
}

export function startDialogue(dialogues){
    const startCharacterDialogue = () => {
        startCharacter.removeEventListener("click", startCharacterDialogue);
        startCharacter.style.cursor = "default";
        dialogue.style.visibility = "visible";
        document.addEventListener("keydown", dialogueEvent);
        showNextDialogue(dialogues);
    };
    startCharacter.addEventListener("click", startCharacterDialogue);
}

export function endDialogue(){
    startCharacter.style.cursor = "pointer";
    dialogue.style.visibility = "hidden";
    document.removeEventListener("keydown", dialogueEvent);
    startDialogue();
}

function showNextDialogue(dialogues){
    if(dialogueIndex < dialogues.length){
        const dialogue = dialogues[dialogueIndex];
        isChoice = false;

        if(currentPhoto !== dialogue.img){
            currentPhoto = dialogue.img;
            characterImg.src = `./img/characters/${currentPhoto}.gif`;
        }
        
        choiceButtons.innerHTML = '';
        dialogueTitle.textContent = dialogue.id;
        dialogueContent.innerHTML = '';
        displayDialogue(dialogue.text);

        if(dialogue.buttons){
            (dialogue.buttons).forEach((button) => {
                const newButton = document.createElement("button");
                newButton.textContent = button.content;
                newButton.addEventListener("click", button.action);
                choiceButtons.appendChild(newButton);
            });
            isChoice = true;
        }

        dialogueIndex++;
    }
    else{
        dialogueIndex = 0;
        endDialogue();
    }
}

function dialogueEvent(event){
    if(dialogue.style.visibility === "visible" && !isTyping && !isChoice &&
        event.key === "Enter"){
            showNextDialogue(dialogues);
            enterInfo.style.visibility = "hidden";
    }
}

