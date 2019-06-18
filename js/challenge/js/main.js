/*jshint esversion: 9 */

var shapesInfo = [];
var gameMode = [
    {'name': 'Noob', 'shapes': 20, 'bomb': 3, 'time': 100, 'speed': 5, 'desc': 'Le mode de jeu des petits joueur'},
    {'name': 'Hardcore', 'shapes': 80, 'bomb': 20, 'time': 45, 'speed': 10, 'desc': 'Presque un mode pour les vrais joueurs'},
    {'name': 'Ultraviolence', 'shapes': 200, 'bomb': 70, 'time': 30, 'speed': 15, 'desc': 'Enfin un vrai mode de jeu'},
    {'name': 'Infini', 'shapes': 100, 'bomb': 30, 'time': 0, 'speed': 10, 'desc': 'Renouvellement continu, vitesse incrémentale, temps entre chaque cibles de plus en plus réduit.'}
];
var gameStart = false;
var selectedMode = null;

var moveShapeInterval = null;
var timerInterval = null;
var gameStatusInterval = null;

var playAudioPew = null;

var pew = new Audio('./audio/pew.mp3');
var boom = new Audio('./audio/boom.mp3');
var clapclap = new Audio('./audio/clapclap.mp3');


init();


function clearBoard(){
    let board = document.querySelector("#board");
    removeChild(board);
}

function createShape(i, shape){
    let newShape = document.createElement('div');

    newShape.classList.add('shape');
    newShape.classList.add(shape);
    newShape.id = "shape_"+i;

    document.querySelector('#board').appendChild(newShape);

    setAttr(newShape);

    shapesInfo[i] = {
        'x' : parseInt(newShape.style.left.slice(0, -2), 10),
        'y' : parseInt(newShape.style.top.slice(0, -2), 10),
        'size' : parseInt(newShape.style.height.slice(0, -2), 10),
        'moveTop' : random(0, 1),
        'moveLeft' : random(0, 1),
        'type' : shape
    };

    newShape.addEventListener("click",destroyShape, {capture:false});

}

function destroyShape(node){
    if (gameStart){
        playAudio(boom);
        let shape = node.target.closest(".shape");
        shape.style.width = "500px";
        shape.style.height = "500px";
        shape.style.opacity = "0";
        shape.style.zIndex = "1";
        if(shape.classList.contains('bomb')){
            stopGame();
        }
        updateScore();
        setTimeout(removeNode, 1000, shape);
    }
}

function gamePlay(){
    gameStart = true;
    timerInterval = setInterval(updateTimer, 1000);
    gameStatusInterval = setInterval(gameStatus, 100);
    let board = document.querySelector('#board');
    board.addEventListener('click', playAudioPew = function (){playAudio(pew);});
}

function gameStatus(){
    let shapes = document.querySelectorAll("#board .shape");
    let finish = true;
    shapes.forEach(function(shape){
        if(!shape.classList.contains('bomb')) {
            finish = false;
            return;
        }
    });

    if(finish){
        stopGame();
    }
}

function init(){
    initBoard();
    initMenu();
}

function initBoard(){
    let info = document.createElement('div');
    info.id = 'info';
    let board = document.createElement('div');
    board.id = 'board';

    document.querySelector('body').appendChild(info);
    document.querySelector('body').appendChild(board);
}

function initEndGame(){
    clearBoard();
    let board = document.querySelector('#board');
    let endGameBack = document.createElement("div");
    let endGameMenu = document.createElement("div");

    endGameBack.id = "popBack";
    endGameMenu.id = "menu";

    endGameBack.appendChild(endGameMenu);
    board.appendChild(endGameBack);


    board.removeEventListener("click", playAudioPew);

    endGameMenu.textContent = "FINI !!!";

    var endScoreKill = document.createElement("div");
    endScoreKill.id = "endScoreKill";
    var endScoreTime = document.createElement('div');

    // TODO: Calcul et affiche resultat
}

function initGame(mode){
    clearBoard();
    initGameInfo();

    selectedMode = gameMode.find(function(m){
        return m.name == mode;
    });

    for (var i = 0; i < selectedMode.shapes; i++) {
        if(i < selectedMode.bomb){
            createShape(i, 'bomb');
        }else{
            createShape(i, 'coeur');
        }
    }

    let timerCmp = document.querySelector("#info #timer span");
    timerCmp.textContent = selectedMode.time;
    document.title = "PuntaClick : "+selectedMode.time+"s";

    let board = document.querySelector('#board');
    board.style.cursor = 'crosshair';

    startGame();
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

function initMenu(){
    clearBoard();
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

function playAudio(audio){
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0;
    }
}

function populateMenu() {
    let menuBack = document.createElement("div");
    menuBack.id = 'popBack';

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
    menuBack.appendChild(menu);
    board.appendChild(menuBack);

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

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeChild(node){
    node.childNodes.forEach(function(child){
        if(child.childElementCount == 0){
            setTimeout(function(){child.remove();}, 1);
        }else{
            removeChild(child);
            setTimeout(function(){child.remove();}, 1);
        }
    });
}

function removeNode(node){
    removeChild(node);
    node.remove();
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

function startGame(){
    let board = document.querySelector("#board");

    /*
    startTimer = wrapper
    startTimerSpin = spinner
    startTimerFiller = filler
    startTimerMask = mask
     */

    let startTimer = document.createElement("div");
    let spinner = document.createElement("div");
    let filler = document.createElement("div");
    let mask = document.createElement("div");
    let startTimerBack = document.createElement("div");
    let startTimerText = document.createElement("div");

    startTimer.id = "startTimer";
    spinner.classList.add("spinner", "pie");
    filler.classList.add("filler", "pie");
    mask.classList.add("mask");
    startTimerBack.id = "popBack";
    startTimerText.id = "startTimerText";

    startTimer.appendChild(spinner);
    startTimer.appendChild(filler);
    startTimer.appendChild(mask);
    startTimerBack.appendChild(startTimer);
    board.appendChild(startTimerText);
    board.appendChild(startTimerBack);
    startTimerText.textContent = 5;
    
    let decompte = setInterval(function(){
        let time = parseInt(startTimerText.textContent, 10);
        time --;
        startTimerText.textContent = time;
    }, 1000);

    setTimeout(function(){
        moveShapeInterval = setInterval(moveShape, 100);
    }, 1000);

    setTimeout(function(){
        clearInterval(decompte);
        removeChild(startTimerBack);
        removeNode(startTimerBack);
        removeNode(startTimerText);
        gamePlay();
    }, 6000);

}

function stopGame(){
    gameStart = false;
    clearInterval(timerInterval);
    clearInterval(moveShapeInterval);
    clearInterval(gameStatusInterval);
    playAudio(clapclap);
    initEndGame();
}

function updateScore(){
    var score = parseInt(document.querySelector("#score span").textContent, 10);
    score++;
    document.querySelector("#score span").textContent = score;
}

function updateTimer(){
    let timerCmp = document.querySelector("#info #timer span");
    let time = parseInt(timerCmp.textContent, 10);
    time--;
    timerCmp.textContent = time;
    document.title = "PuntaClick : "+time+"s";
    if(time == 0){
        stopGame();
    }
}
