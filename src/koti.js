const koti = document.getElementById("koti")
const dialogue = document.getElementById("dialogue-window");
const dialogueContent = document.getElementById("dialogue-content");


const dialogues = [["meow meow meow meow meowmeow meow meow meow meomeow meow meow meow meomeow meow meow meow meomeow meow meow meow meomeowmeow meow meow meomeomeow meow meow meomeoww meow meow meow meowwwww", "crying-koti"],
    ["...", "crying-koti"],
    ["meeeeeooooooooow", "sad-talk"]];
let dialogueIndex = 0;
let isTyping = false;
let currentPhoto = "crying-koti"; 


function displayDialogue(text, index = 0){
    if(index < text.length){
        isTyping = true;
        dialogueContent.innerHTML += text.charAt(index);
        index++;
        setTimeout(() => displayDialogue(text, index), 15);
    }
    else
        isTyping = false;
}

function startKotiDialogue(){
    const kotiDialogue = () => {
        koti.removeEventListener("click", kotiDialogue);
        koti.style.cursor = "default";
        dialogue.style.visibility = "visible";
        showNextDialogue(dialogues);
    };
    koti.addEventListener("click", kotiDialogue);
}

function endKotiDialogue(){
    koti.style.cursor = "pointer";
    dialogue.style.visibility = "hidden";
    startKotiDialogue();
}

function showNextDialogue(dialogues){
    if(dialogueIndex < dialogues.length){
        if(currentPhoto !== dialogues[dialogueIndex][1]){
            currentPhoto = dialogues[dialogueIndex][1];
            koti.src = `./sprites/koti/${currentPhoto}.gif`;
        }
        dialogueContent.innerHTML = '';
        displayDialogue(dialogues[dialogueIndex][0]);
        dialogueIndex++;
    }
    else{
        dialogueIndex = 0;
        endKotiDialogue();
    }
}

function main(){
    startKotiDialogue();

    document.addEventListener("keydown", (event) => {
        if(dialogue.style.visibility === "visible" && !isTyping && event.key === "Enter")
            showNextDialogue(dialogues);
    });

}

main();
