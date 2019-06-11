/*jshint esversion: 9 */
var timeMax = 30;

var gameStart = false;
var time = timeMax;
var timer = null;

var move = true;
var moveStep = 10;

var coeur = document.querySelector(".coeur");
var content = document.querySelector("#content");

var pew = new Audio('./audio/pew.mp3');
var boom = new Audio('./audio/boom.mp3');
var clapclap = new Audio('./audio/clapclap.mp3');

document.getElementById("timer").firstElementChild.innerHTML = time;

setAttr(coeur);

for (var i = 0; i < 100; i++) {
    newCoeur = coeur.cloneNode(true);
    content.appendChild(newCoeur);
    setAttr(newCoeur);
}

content.addEventListener("click", function(){
    if(gameStart == false){
        timer = setInterval(updateTimer, 1000);
        timerPosition = setInterval(updatePosition, 1000);
        setTimeout(stopGame, timeMax*1000);

        var coeur = document.querySelectorAll(".coeur");
        coeur.forEach(function(c){
            c.addEventListener("click",destroyCoeur, {capture:false});
        });

        gameStart = true;
    }else{
        pew.play();
    }
});

function setAttr(node){
    let attrVal = randomAttr();
    node.style.top = attrVal[0]+"%";
    node.style.left = attrVal[1]+"%";
    node.firstElementChild.style.transform = "rotate("+attrVal[2]+"deg)";

    var parts = node.firstElementChild.children;
    for (var part of parts) {
        part.style.backgroundColor = "rgb("+attrVal[3]+", "+attrVal[4]+", "+attrVal[5]+")";
    }
    node.firstElementChild.style.backgroundColor = "rgb("+attrVal[3]+", "+attrVal[4]+", "+attrVal[5]+")";
}

function randomAttr(){
    let min = 0;
    let max = 100;
    let top = Math.floor(Math.random() * (max - min + 1)) + min;
    let left = Math.floor(Math.random() * (max - min + 1)) + min;
    let rotateMin = 0;
    let rotateMax= 360;
    let rotate = Math.floor(Math.random() * (rotateMax - rotateMin + 1)) + rotateMin;
    let colorMin = 0;
    let colorMax = 255;
    let red = Math.floor(Math.random() * (colorMax - colorMin + 1)) + colorMin;
    let green = Math.floor(Math.random() * (colorMax - colorMin + 1)) + colorMin;
    let blue = Math.floor(Math.random() * (colorMax - colorMin + 1)) + colorMin;
    return [top, left, rotate, red, green, blue];
}

function destroyCoeur(node){
    console.log(node);
    boom.play();
    let coeur = node.target.closest(".coeur");
    coeur.style.width = "500px";
    coeur.style.height = "500px";
    coeur.style.opacity = "0";
    coeur.style.zIndex = "1";
    incScore();
    setTimeout(removeNode, 1000, coeur);
}

function removeNode(node){
    node.remove();
}

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
            let rdmTop = Math.floor(Math.random() * (max - min + 1)) + min;
            let rdmLeft = Math.floor(Math.random() * (max - min + 1)) + min;

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
