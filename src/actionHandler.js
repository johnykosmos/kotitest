import {currentDialogue, dialogueIndex, setDialogueIndex, showNextDialogue} from "./dialogueLogic.js"
let previousIndex;

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
    },
    "goOneBack" : function(){
        setDialogueIndex(previousIndex - 1);
        console.log(dialogueIndex);
        showNextDialogue(currentDialogue);
    },
    "goToAbyss" : function(){
        window.location.href = "abyss.html"; 
    },
    "beforeAbyss" : function(){
        previousIndex = dialogueIndex;
        setDialogueIndex(0);
        showNextDialogue(
[{text:"Niestety jeśli chcesz tam wejść musisz zrobić to w pojedynke. Cyberkoty nie są upoważnione żeby tu wchodzić i wcale nie dlatego, że to miejsce mnie okropnie przeraża! Zupełnie nie dlatego. Bywaj...", img:"stranding-koti", id:"koti",buttons:[
        {content: "Otchłań mnie wzywa...", action:"goToAbyss"},
        {content: "Wróć", action:"goOneBack"}
        ]}]
);
    }

};
