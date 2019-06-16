/*jshint esversion: 9 */

var speed = 50;
var shapesInfo = [];
var gameMode = [
    {'name': 'Noob', 'shapes': 20, 'bomb': 3, 'time': 60, 'speed': 5, 'desc': 'Le mode de jeu des petits joueur'},
    {'name': 'Hardcore', 'shapes': 80, 'bomb': 20, 'time': 45, 'speed': 10, 'desc': 'Presque un mode pour les vrais joueurs'},
    {'name': 'Ultraviolence', 'shapes': 200, 'bomb': 70, 'time': 30, 'speed': 15, 'desc': 'Enfin un vrai mode de jeu'},
    {'name': 'Infini', 'shapes': 100, 'bomb': 30, 'time': 0, 'speed': 10, 'desc': 'Renouvellement continu, vitesse incrémentale, temps entre chaque cibles de plus en plus réduit.'}
];
var gameStart = false;
var selectedMode = null;

var moveShapeInterval = null;
var timerInterval = null;
//
// var time = timeMax;
// var timer = null;
//
// var move = true;
// var moveStep = 20;

var pew = new Audio('./audio/pew.mp3');
var boom = new Audio('./audio/boom.mp3');
var clapclap = new Audio('./audio/clapclap.mp3');

// document.getElementById("timer").firstElementChild.innerHTML = time;


// initGame();
//
// document.querySelector("body").addEventListener("click", function(){
//     if(gameStart == false){
//         timer = setInterval(updateTimer, 1000);
//         timerPosition = setInterval(moveShape, 100);
//
//         setTimeout(stopGame, timeMax*1000);
//
//         // var coeur = document.querySelectorAll(".coeur");
//         // coeur.forEach(function(c){
//         //     c.addEventListener("click",destroyCoeur, {capture:false});
//         // });
//
//         gameStart = true;
//     }else{
//         pew.play();
//     }
// });

init();

function init(){
    initBoard();
    initMenu();
}

function initMenu(){
    clearBoard();
    board.style.backgroundColor = '#000000';

    populateMenu();

    let menuItems = document.querySelectorAll('.menuItem h3');
    menuItems.forEach(function(item){
        item.addEventListener('click', function(e){
            let idSplit = e.target.parentNode.id.split('_');
            if(idSplit[0] == 'gameMode'){
                initGame(idSplit[1]);
            }else{
                // TODO: AFFICHE HIGHSCORE PAR MODE
                console.log('view score : ' + idSplit[1]);
            }
        });
    });
}

function populateMenu() {
    let menu = document.createElement("div");
    menu.id = 'menu';

    let menuMode = document.createElement("div");
    menuMode.id = 'menuMode';

    let menuScore = document.createElement("div");
    menuScore.id = 'menuScore';

    let menuModeTitle = document.createElement("h2");
    menuModeTitle.textContent = 'Mode de jeu';

    let menuScoreTitle = document.createElement("h2");
    menuScoreTitle.textContent = 'Hightscore';

    menuMode.appendChild(menuModeTitle);
    menuScore.appendChild(menuScoreTitle);
    menu.appendChild(menuMode);
    menu.appendChild(menuScore);
    board.appendChild(menu);

    populateMenuMode();
    populateMenuScore();
}

function populateMenuMode() {
    gameMode.forEach(function(gm){
        let menuModeItem = document.createElement("div");
        let menuModeName = document.createElement("h3");
        let menuModeDesc = document.createElement("span");
        menuModeItem.id = 'gameMode_'+gm.name;
        menuModeName.textContent = gm.name;
        menuModeItem.classList.add("menuItem");
        if(gm.name == 'Infini'){
            menuModeDesc.textContent = gm.desc;
        }else{
            menuModeDesc.textContent = gm.desc+' : '+gm.shapes+' cibles dont '+gm.bomb+' bombes, en '+gm.time+' secondes';
        }

        menuModeItem.appendChild(menuModeName);
        menuModeItem.appendChild(menuModeDesc);
        menuMode.appendChild(menuModeItem);
    });
}

function populateMenuScore(){
    gameMode.forEach(function(gm){
        let menuScoreItem = document.createElement("div");
        let menuScoreName = document.createElement("h3");
        menuScoreItem.id = 'score_'+gm.name;
        menuScoreItem.classList.add("menuItem");
        menuScoreName.textContent = gm.name;

        menuScoreItem.appendChild(menuScoreName);
        menuScore.appendChild(menuScoreItem);
    });
}

function initGame(mode){
    clearBoard();
    initGameInfo();

    selectedMode = gameMode.find(function(m){
        return m.name == mode;
    });

    for (var i = 0; i < selectedMode.shapes; i++) {
        createShape(i);
    }

    let timerCmp = document.querySelector("#info #timer span");
    timerCmp.textContent = selectedMode.time;
    document.title = "PuntaClick : "+selectedMode.time+"s";

    let board = document.querySelector('#board');
    board.style.cursor = 'crosshair';

    startGame();
}

function startGame(){
    let board = document.querySelector("#board");

    let startTimerBack = document.createElement("div");
    let startTimer = document.createElement("div");
    startTimerBack.id = "startTimerBack";
    startTimer.id = "startTimer";
    startTimer.textContent = 5;

    startTimerBack.appendChild(startTimer);
    board.appendChild(startTimerBack);

    let decompte = setInterval(function(){
        let time = parseInt(startTimer.textContent, 10);
        time --;
        startTimer.textContent = time;
    }, 1000);

    setTimeout(function(){
        moveShapeInterval = setInterval(moveShape, 100);
    }, 1000);

    setTimeout(function(){
        clearInterval(decompte);
        removeNode(startTimerBack);
        gamePlay();
    },4500);

}

function gamePlay(){
    gameStart = true;
    timerInterval = setInterval(updateTimer, 1000);
    let board = document.querySelector('#board');
    board.addEventListener('click',function(){playAudio(pew);});
}

function updateTimer(){
    let timerCmp = document.querySelector("#info #timer span");
    let time = parseInt(timerCmp.textContent, 10);
    time--;
    timerCmp.textContent = time
    document.title = "PuntaClick : "+time+"s";
}

function initGameInfo(){
    let info = document.querySelector("#info");
    let timer = document.createElement('div');
    timer.id = 'timer';
    let timerCmp = document.createElement('span');
    let score = document.createElement('div');
    let scoreCmp = document.createElement('span');
    score.id = 'score';

    timer.textContent = 'Timer : ';
    timer.appendChild(timerCmp);
    info.appendChild(timer);

    score.textContent = 'Score : ';
    scoreCmp.textContent = 0;
    score.appendChild(scoreCmp);
    info.appendChild(score);
}

function initBoard(){
    let info = document.createElement('div');
    info.id = 'info';
    let board = document.createElement('div');
    board.id = 'board';

    document.querySelector('body').appendChild(info);
    document.querySelector('body').appendChild(board);
}

function createShape(i){
    let shape = document.createElement('div');

    shape.classList.add('shape');

    shape.classList.add('coeur');

    newShape = shape.cloneNode(true);
    newShape.id = "shape_"+i;

    document.querySelector('#board').appendChild(newShape);

    setAttr(newShape);

    shapesInfo[i] = {
        'x' : parseInt(newShape.style.left.slice(0, -2), 10),
        'y' : parseInt(newShape.style.top.slice(0, -2), 10),
        'size' : parseInt(newShape.style.height.slice(0, -2), 10),
        'moveTop' : random(0, 1),
        'moveLeft' : random(0, 1)
    };

    newShape.addEventListener("click",destroyShape, {capture:false});

}

function setAttr(node){
    let size = random(10,30);

    node.style.width = size+"px";
    node.style.height = size+"px";

    node.style.top = random(0, board.clientHeight)+"px";
    node.style.left = random(0, board.clientWidth)+"px";

    node.style.transform = 'rotate('+random(0,360)+'deg)';

    node.style.backgroundColor = "rgb("+random(0,255)+", "+random(0,255)+", "+random(0,255)+")";

    setTimeout(function(){node.style.transition = 'top .1s, left .1s, width 1s, height 1s, opacity 1s';},1000);
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveShape(){
    let shapes = document.querySelectorAll(".shape");
    shapes.forEach(function(shape){
        let i = shape.id.slice(6);

        shapesInfo[i].x += (shapesInfo[i].moveLeft)?-selectedMode.speed:selectedMode.speed;
        shapesInfo[i].y += (shapesInfo[i].moveTop)?-selectedMode.speed:selectedMode.speed;

        if(shapesInfo[i].x <= shapesInfo[i].size){
            shapesInfo[i].moveLeft = 0;
        }else if(shapesInfo[i].x >= board.clientWidth - shapesInfo[i].size){
            shapesInfo[i].moveLeft = 1;
        }

        if(shapesInfo[i].y <= shapesInfo[i].size){
            shapesInfo[i].moveTop = 0;
        }else if(shapesInfo[i].y >= board.clientHeight - shapesInfo[i].size){
            shapesInfo[i].moveTop = 1;
        }

        shape.style.left =  shapesInfo[i].x+"px";
        shape.style.top = shapesInfo[i].y+"px";
    });
}

function clearBoard(){
    let board = document.querySelector("#board");
    removeChild(board);
}

function removeChild(node){
    node.childNodes.forEach(function(child){
        if(child.childNodes.length == 0){
            child.remove();
        }else{
            removeChild(child);
            child.remove();
        }
    });
}

function destroyShape(node){
    if (gameStart){
        playAudio(boom);
        let shape = node.target.closest(".coeur");
        shape.style.width = "500px";
        shape.style.height = "500px";
        shape.style.opacity = "0";
        shape.style.zIndex = "1";
        // incScore();
        setTimeout(removeNode, 1000, shape);
    }
}

function playAudio(audio){
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}

function removeNode(node){
    removeChild(node);
    node.remove();
}

/////////////////////////////////////////////////////////////////////////////

function incScore(){
    var scoreStr = document.querySelector("#score").firstElementChild.innerHTML;
    var score = parseInt(scoreStr, 10);
    score++;
    document.querySelector("#score").firstElementChild.innerHTML = score;
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
    console.log(shapesInfo);
}
