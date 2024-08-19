import {currentDialogue, dialogueIndex, setDialogueIndex, showNextDialogue, setCurrentDialogue, startCharacter, endDialogue} from "./dialogueLogic.js"
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
    "showNext" : function(){
        showNextDialogue(currentDialogue);
    },
    "goOneBack" : function(){
        setDialogueIndex(previousIndex - 1);
        showNextDialogue(currentDialogue);
    },
    "goToTennis" : function(){
        window.location.href = "tennis.html";
    },
    "goToCreator" : function(){
        window.location.href = "creator.html";
        },
    "goTest" : async function(){
        await setCurrentDialogue("testCreator");
        showNextDialogue(currentDialogue);
        localStorage.setItem("kreator", 0);
    },
    "changeTextQuestion?" : function(){
        this.textContent = "serio?-.-";
    },
    "deleteButton" : function(){
        this.style.visibility = "hidden";
    },
    "rickRoll" : function(){
        window.open("https://r.mtdv.me/6BodKxhISq");
    },
    "refreshTest" : function(){
        window.location.reload();
        localStorage.setItem("kreator", 1);
    },
    "notNowCreator": async function(){
        endDialogue();
        localStorage.setItem("kreator", 0);
    },
    "onlyPiotrek" : function(){
        previousIndex = dialogueIndex;
        setDialogueIndex(0);
        showNextDialogue(
[{text: "Okej, czy napewno chcesz żeby miał na imię Piotrek?",img: "question-psycholog",id: "koti",buttons: [{content: "Tak", action: "showNext"},{content: "NIE, WRÓĆ", action: "goOneBack"}]}]);
        setDialogueIndex(previousIndex);

    },
    "goBackHomespaceCreator" : function(){
        if(!localStorage.getItem("key"))
            localStorage.setItem("key", 1);
        else if(localStorage.getItem("akt") === '1')
            localStorage.setItem("key", 2);
        localStorage.setItem("akt", 2);
        localStorage.setItem("keyDialogue", 1);
        window.location.href = "index.html"; 
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
