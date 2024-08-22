import {showNextDialogue, setCurrentDialogue} from "./dialogueLogic.js"


const kotiPlayer = document.getElementById("player");
const iga = document.getElementById("iga");
const ball = document.getElementById("ball");
const DOMpointsCounter = document.getElementById("points-counter");
const kort = document.getElementById("kort");

let gameOver = false;
let velocity = 5;
let ballDirectionX = -1;
let ballDirectionY = 1;
let igaPoints = -1;
let kotiPoints = 0;


function moveBall() {
    const kortRect = kort.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    let currentX = parseFloat(ball.style.left) || 0;
    let currentY = parseFloat(ball.style.top) || 0;

    let newX = currentX + ballDirectionX * velocity;
    let newY = currentY + ballDirectionY * velocity;

    if(currentY + newY < kortRect.top || (currentY + newY - ballRect.height) > kortRect.bottom){
        ballDirectionY *= -1;
        newY = currentY;
    }

    const kotiPlayerRect = kotiPlayer.getBoundingClientRect();
    const igaRect = iga.getBoundingClientRect();
    
    if (newX <= kotiPlayerRect.x + kotiPlayerRect.width &&
        newY + ballRect.height > kotiPlayerRect.top &&
        newY < kotiPlayerRect.bottom) {
        ballDirectionX *= -1;
        newX = kotiPlayerRect.right;
    }

    if (newX - igaRect.width >= igaRect.x - igaRect.width &&
        newY + ballRect.height > igaRect.top - 50 &&
        newY < igaRect.bottom) {  
        ballDirectionX *= -1;
        velocity += 3;
        newX = igaRect.x - igaRect.width;
    }   

    if (newX <= kortRect.left) {
        igaPoints++;
        resetBall();
    } else if (newX + ballRect.width >= kortRect.right) {
        kotiPoints++;
        resetBall();
    } else {
        ball.style.top = newY + "px";
        ball.style.left = newX + "px";
    }
}

function resetBall() {
    const kortRect = kort.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    ball.style.top = (kortRect.height / 2) - (ballRect.height / 2) + "px";
    ball.style.left = (kortRect.width / 2) - (ballRect.width / 2) + "px";
    ballDirectionX *= -1; // Reset direction
    velocity = 5; // Reset speed
}

function movePlayer(player, y){
    const currentY = parseFloat(player.style.top);
    const newY = y + currentY; 

    const kortRect = kort.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if(playerRect.top + newY >= kortRect.top && (playerRect.top + newY - playerRect.height) <= kortRect.bottom){
        player.style.top = newY + "px";
    }
}

function igaFollowBall() {
    const ballRect = ball.getBoundingClientRect();
    const igaRect = iga.getBoundingClientRect();

    const ballCenterY = ballRect.top + ballRect.height / 2;
    const igaCenterY = igaRect.top + igaRect.height / 2;

    if (ballCenterY > igaCenterY) {
        movePlayer(iga, 10); 
    } else {
        movePlayer(iga, -10); 
    }
}
export function playPong(){
    kotiPlayer.style.top = iga.style.top = (kort.getBoundingClientRect().height / 2) + "px"; 
    kotiPlayer.style.visibility = iga.style.visibility = DOMpointsCounter.style.visibility = "visible";    
    
    const keyDownHandler = function(event){
        switch(event.key){
             case "ArrowDown":
                movePlayer(kotiPlayer, 15); 
                break;
             case "ArrowUp":
                movePlayer(kotiPlayer, -15); 
                break;
        }
    }

    document.addEventListener("keydown", keyDownHandler);

   const gameInterval = setInterval(function(){
        DOMpointsCounter.textContent = `${kotiPoints}:${igaPoints}`;
        if(!gameOver){
            igaFollowBall();
            moveBall(); 
            if(kotiPoints === 5 || igaPoints === 5){
                gameOver = true;
            }
        }
       else
           clearInterval(gameInterval);
    }, 15);


}


