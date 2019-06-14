/*jshint esversion: 9 */
var timeMax = 30;

var gameStart = false;
var time = timeMax;
var timer = null;

var move = true;
var moveStep = 20;

var pew = new Audio('./audio/pew.mp3');
var boom = new Audio('./audio/boom.mp3');
var clapclap = new Audio('./audio/clapclap.mp3');

// document.getElementById("timer").firstElementChild.innerHTML = time;


initGame();

document.querySelector("body").addEventListener("click", function(){
    if(gameStart == false){
        timer = setInterval(updateTimer, 1000);
        timerPosition = setInterval(updatePosition, 1000);
        setTimeout(stopGame, timeMax*1000);

        // var coeur = document.querySelectorAll(".coeur");
        // coeur.forEach(function(c){
        //     c.addEventListener("click",destroyCoeur, {capture:false});
        // });

        gameStart = true;
    }else{
        pew.play();
    }
});


function initGame(){
    initBoard();

    for (var i = 0; i < 100; i++) {
        createCoeur();
    }

}

function initBoard(){
    let info = document.createElement('div');
    info.id = 'info';
    let board = document.createElement('div');
    board.id = 'board';
    let timer = document.createElement('div');
    timer.id = 'timer';
    let timerCmp = document.createElement('span');
    let score = document.createElement('div');
    let scoreCmp = document.createElement('span');
    score.id = 'score';

    timer.textContent = 'Timer : ';
    timerCmp.textContent = timeMax;
    timer.appendChild(timerCmp);
    info.appendChild(timer);

    score.textContent = 'Score : ';
    scoreCmp.textContent = 0;
    score.appendChild(scoreCmp);
    info.appendChild(score);

    document.querySelector('body').appendChild(info);
    document.querySelector('body').appendChild(board);
}

function createCoeur(){
    let coeur = document.createElement('div');
    let carre = document.createElement('div');
    let rondL = document.createElement('div');
    let rondT = document.createElement('div');
    coeur.classList.add('coeur');
    carre.classList.add('carre', 'coeurPart');
    rondL.classList.add('rondLeft', 'coeurPart');
    rondT.classList.add('rondTop', 'coeurPart');

    carre.appendChild(rondL);
    carre.appendChild(rondT);
    coeur.appendChild(carre);

    newCoeur = coeur.cloneNode(true);
    document.querySelector('#board').appendChild(newCoeur);

    setAttr(newCoeur);

    newCoeur.addEventListener("click",destroyCoeur, {capture:false});
}

function setAttr(node){
    let size = random(10,30);
    node.style.width = size+"px";
    node.style.height = size+"px";
    node.style.top = random(5,95)+"%";
    node.style.left = random(5,95)+"%";
    node.firstElementChild.style.transform = "rotate("+random(0,360)+"deg)";

    let parts = node.firstElementChild.children;

    let red = random(0,255);
    let green = random(0,255);
    let blue = random(0,255);

    for (let part of parts) {
        part.style.backgroundColor = "rgb("+red+", "+green+", "+blue+")";
    }
    node.firstElementChild.style.backgroundColor = "rgb("+red+", "+green+", "+blue+")";
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function destroyCoeur(node){
    if (gameStart){
        boom.play();
        let coeur = node.target.closest(".coeur");
        coeur.style.width = "500px";
        coeur.style.height = "500px";
        coeur.style.opacity = "0";
        coeur.style.zIndex = "1";
        incScore();
        setTimeout(removeNode, 1000, coeur);
    }
}

function removeNode(node){
    node.remove();
}

////////////////////////






function incScore(){
    var scoreStr = document.querySelector("#score").firstElementChild.innerHTML;
    var score = parseInt(scoreStr, 10);
    score++;
    document.querySelector("#score").firstElementChild.innerHTML = score;
}

function updatePosition(){
    if (move == true){
        let coeurs = document.querySelectorAll(".coeur");
        coeurs.forEach(function(coeur){
            let top = parseInt(coeur.style.top.split("%")[0],10);
            let left = parseInt(coeur.style.left.split("%")[0],10);
            let min = -moveStep;
            let max = moveStep;
            let rdmTop = random(-moveStep, moveStep);
            let rdmLeft = random(-moveStep, moveStep);

            if (top + rdmTop > 100 - moveStep){
                newTop = top - moveStep;
            }else if (top - rdmTop < 0 + moveStep){
                newTop = top + moveStep;
            }else{
                newTop = top + rdmTop;
            }

            if (left + rdmLeft > 100 - moveStep){
                newLeft = left - moveStep;
            }else if (left - rdmLeft < 0 + moveStep){
                newLeft = left + moveStep;
            }else{
                newLeft = left + rdmLeft;
            }

            coeur.style.top = newTop+"%";
            coeur.style.left = newLeft+"%";
        });
    }
}

function updateTimer(){
    time--;
    document.querySelector("#timer").firstElementChild.innerHTML = time;
    document.title = "Timer : "+time;
}

function stopGame(){
    clearInterval(timer);
    clearInterval(timerPosition);
    document.getElementById("timer").innerHTML = "0";
    document.title = "Resultat : "+document.getElementById("score").innerHTML;
    let coeur = document.querySelectorAll(".coeur");
    coeur.forEach(function(c){
        c.removeEventListener("click",destroyCoeur);
    });
    document.querySelector("#score").style.color = "red";
    clapclap.play();
}
