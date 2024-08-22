import {actionHandler} from "./actionHandler.js"

const characterImg = document.getElementById("character");
const dialogue = document.getElementById("dialogue-screen");
const dialogueTitle = document.getElementById("dialogue-title");
const dialogueContent = document.getElementById("dialogue-content");
const enterInfo = document.getElementById("next-dialogue-info");
const choiceButtons = document.getElementById("choice-buttons");
export let startCharacter = document.getElementById("startCharacter");


export let dialogueIndex = 0;
let isTyping = false;
let isChoice = false;
let currentPhoto; 
export let currentDialogue;


export function setStartCharacter(newStartCharacter){
    startCharacter = document.getElementById(`${newStartCharacter}`);
}

export function setDialogueIndex(index){
    dialogueIndex = index;
}

export async function setCurrentDialogue(filename){
    const response = await fetch(`../dialogues/${filename}.json`);
    const data = await response.json();
    currentDialogue = data;
    dialogueIndex = 0;
}

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

export function startCharDialogue(dialogues = null){
    const startCharacterDialogue = () => {
        startCharacter.removeEventListener("click", startCharacterDialogue);
        startCharacter.style.cursor = "default";
        dialogue.style.visibility = "visible";
        document.addEventListener("keydown", event => dialogueEvent(event, dialogues));
        if(dialogues)
            showNextDialogue(dialogues);
        else
            showNextDialogue(currentDialogue);
    };
    startCharacter.addEventListener("click", startCharacterDialogue);
}

export function endDialogue(dialogues){
    dialogueIndex = 0;
    startCharacter.style.cursor = "pointer";
    dialogue.style.visibility = "hidden";
    document.removeEventListener("keydown", dialogueEvent);
    startCharDialogue(dialogues);
}

export function killDialogue(dialogues){
    dialogueIndex = 0;
    dialogue.style.visibility = "hidden";
    document.removeEventListener("keydown", dialogueEvent);
}

export function showNextDialogue(dialogues){
    if(dialogueIndex < dialogues.length){
        const dialogue = dialogues[dialogueIndex];
        isChoice = false;

        if(dialogue.img){
            if(currentPhoto !== dialogue.img){
                currentPhoto = dialogue.img;
                characterImg.src = `./img/characters/${currentPhoto}.gif`;
            }
        }
        else
            characterImg.src = ' ';
        
        choiceButtons.innerHTML = '';
        dialogueTitle.textContent = dialogue.id;
        dialogueContent.innerHTML = '';
        displayDialogue(dialogue.text);

        if(dialogue.buttons){
            (dialogue.buttons).forEach((button) => {
                const newButton = document.createElement("button");
                newButton.textContent = button.content;
                newButton.addEventListener("click", () => {
                    if(!isTyping)
                        actionHandler[button.action].call(newButton); 
                });
                choiceButtons.appendChild(newButton);
            });
            isChoice = true;
        }
        else if(dialogue.input){
                const newInput = document.createElement("input");
                newInput.type = "text";
                newInput.autocomplete = "off";
                newInput.addEventListener("keydown", (event) => {
                    if(!isTyping && event.key === "Enter")
                        actionHandler[dialogue.input].call(newInput); 
                });
                choiceButtons.appendChild(newInput);

            isChoice = true;
        }
        dialogueIndex++;
    }
    else{
        endDialogue(dialogues);
    }
}

function dialogueEvent(event, dialogues){
    if(dialogue.style.visibility === "visible" && !isTyping && !isChoice &&
        event.key === "Enter"){
            if(dialogues)
                showNextDialogue(dialogues);
            else
                showNextDialogue(currentDialogue);
            enterInfo.style.visibility = "hidden";
    }
}

