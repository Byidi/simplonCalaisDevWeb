/*jshint esversion: 9 */

var shapesInfo = [];
var gameMode = [
    {'name': 'Noob', 'shapes': 20, 'bomb': 3, 'time': 100, 'speed': 5, 'desc': 'Le mode de jeu des petits joueur'},
    {'name': 'Hardcore', 'shapes': 80, 'bomb': 20, 'time': 45, 'speed': 10, 'desc': 'Presque un mode pour les vrais joueurs'},
    {'name': 'Ultraviolence', 'shapes': 200, 'bomb': 70, 'time': 30, 'speed': 30, 'desc': 'Enfin un vrai mode de jeu'},
    {'name': 'Infini', 'shapes': 100, 'bomb': 30, 'time': 0, 'speed': 10, 'desc': 'Renouvellement continu, vitesse incrémentale, temps entre chaque cibles de plus en plus réduit.'}
];
var gameStart = false;
var selectedMode = null;
var score = [0, 0];

var moveShapeInterval = null;
var timerInterval = null;
var gameStatusInterval = null;

var playAudioPew = null;

var pew = new Audio('./audio/pew.mp3');
var boom = new Audio('./audio/boom.mp3');
var clapclap = new Audio('./audio/clapclap.mp3');

init();

function calcEndScore(){
    let div = document.querySelector('#endScoreTotalCalc');

    let scoreKill = calcEndSubScore('kill');
    let scoreTime = calcEndSubScore('time');
    let scoreClick = calcEndSubScore('click');

    console.log("kill " + scoreKill);
    console.log("time " + scoreTime);
    console.log("click " + scoreClick);


    let scoreTotal = scoreKill + scoreTime - scoreClick;

    updateEndScore(scoreTotal, div.childNodes[4]);
}

function calcEndSubScore(line){
    let lineFirstUpper = uppercaseFirstLetter(line);

    let div = document.querySelector('#endScore'+lineFirstUpper+'Calc');
    let scoreField = div.childNodes[4];

    let nb = parseInt(div.childNodes[0].textContent, 10);
    let mul = parseInt(div.childNodes[2].textContent, 10);

    scoreField.textContent = 0;

    let score = nb * mul;

    console.log('line');
    console.log(nb);
    console.log(mul);

    updateEndScore(score, scoreField);

    return score;

    // TODO:
    // IF BOMB DIE MALUS
    // MALUS BY CLICK
    // BONUS IF ALL CLEAR
}

function updateEndScore(score, resultChild){
    let affScore = 0;
    let scoreInterval = setInterval(function(){
        if(affScore == score){
            clearInterval(scoreInterval);
        }else{
            if(score >= 10000){
                affScore += 10;
            }else if( score >= 1000){
                affScore += 5;
            }else{
                affScore++;
            }
            resultChild.textContent = affScore;
        }
    }, 5);
}

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

    newShape.addEventListener("click", destroyShape, {capture:false});

}

function createTimer(){
    let board = document.querySelector("#board");

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
    board.addEventListener('click', function(e){
        if(gameStart){
            playAudio(pew);
            score[1]++;
        }
    });
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
    endGameMenu.classList.add('endGame');

    endGameBack.appendChild(endGameMenu);
    board.appendChild(endGameBack);

    board.removeEventListener("click", playAudioPew);

    populateEndGameMenu();
    calcEndScore();
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

function populateEndGameMenu(){
    let endGameMenu = document.querySelector('#menu.endGame');

    let endTitle = document.createElement("h2");
    endTitle.textContent = 'Résultats';

    let endScoreKill = document.createElement("div");
    endScoreKill.id = 'endScoreKill';

    let endScoreTime = document.createElement('div');
    endScoreTime.id = 'endScoreTime';

    let endScoreTotal = document.createElement('div');
    endScoreTotal.id = 'endScoreTotal';

    let endScoreClick = document.createElement('div');
    endScoreClick.id = 'endScoreClick';

    endGameMenu.appendChild(endTitle);

    endGameMenu.appendChild(endScoreKill);
    endGameMenu.appendChild(endScoreTime);
    endGameMenu.appendChild(endScoreClick);
    endGameMenu.appendChild(endScoreTotal);

    populateEndGameMenuLine('time');
    populateEndGameMenuLine('kill');
    populateEndGameMenuLine('click');
    populateEndGameMenuLine('total');
}

function populateEndGameMenuLine(line){
    let lineFirstUpper = uppercaseFirstLetter(line);

    let text =  document.createElement('div');
    text.id = 'endScore'+lineFirstUpper+'Text';
    let value = document.createElement('div');
    value.id = 'endScore'+lineFirstUpper+'Value';
    let calc = document.createElement('div');
    calc.id = 'endScore'+lineFirstUpper+'Calc';

    let nb = document.createElement('span');
    let x = document.createElement('span');
    let mul = document.createElement('span');
    let eq = document.createElement('span');
    let result = document.createElement('span');

    let filler = document.createElement('div');
    filler.classList.add('filler');

    let parent = document.querySelector('#endScore'+lineFirstUpper);

    calc.appendChild(nb);
    calc.appendChild(x);
    calc.appendChild(mul);
    calc.appendChild(eq);
    calc.appendChild(result);

    parent.appendChild(text);
    parent.appendChild(filler);
    parent.appendChild(value);
    parent.appendChild(calc);

    x.textContent = 'x';
    eq.textContent = '=';

    switch(line){
        case 'time':
            text.textContent = 'Temps restant : ';
            nb.textContent = document.querySelector('#timer span').textContent;
            mul.textContent = 100;
        break;
        case 'kill':
            text.textContent = 'Cibles détruites : ';
            nb.textContent = score[0];
            mul.textContent = 50;
        break;
        case 'click':
            text.textContent = 'Nombres de click : ';
            nb.textContent = score[1];
            mul.textContent = 10;
        break;
        case 'total':
            text.textContent = 'Total : ';
            x.textContent = '';
            eq.textContent = '';
        break;
    }
}

// function populateEndGameMenuScoreTime(){
//     let endScoreTime = document.querySelector('#endScoreTime');
//
//     let endScoreTimeText = document.createElement('div');
//     endScoreTimeText.id = 'endScoreTimeText';
//     endScoreTimeText.textContent = 'Temps restant';
//     let endScoreTimeValue = document.createElement('div');
//     endScoreTimeValue.id = 'endScoreTimeValue';
//     let endScoreTimeCalc =  document.createElement('div');
//     endScoreTimeCalc.id = 'endScoreTimeCalc';
//     let endScoreTimeNb = document.createElement('span');
//     let endScoreTimeX = document.createElement('span');
//     let endScoreTimeMul = document.createElement('span');
//     let endScoreTimeEq = document.createElement('span');
//     let endScoreTimeResult = document.createElement('span');
//
//     endScoreTimeNb.textContent = document.querySelector("#timer span").textContent;
//     endScoreTimeX.textContent = " x ";
//     endScoreTimeMul.textContent = 100;
//     endScoreTimeEq.textContent = ' = ';
//
//     endScoreTimeCalc.appendChild(endScoreTimeNb);
//     endScoreTimeCalc.appendChild(endScoreTimeX);
//     endScoreTimeCalc.appendChild(endScoreTimeMul);
//     endScoreTimeCalc.appendChild(endScoreTimeEq);
//     endScoreTimeCalc.appendChild(endScoreTimeResult);
//
//     endScoreTime.appendChild(endScoreTimeText);
//     endScoreTime.appendChild(createFiller());
//     endScoreTime.appendChild(endScoreTimeValue);
//     endScoreTime.appendChild(endScoreTimeCalc);
// }
//
// function populateEndGameMenuScoreKill(){
//     let endScoreKill = document.querySelector('#endScoreKill');
//
//     let endScoreKillText = document.createElement('div');
//     endScoreKillText.id = 'endScoreKillText';
//     endScoreKillText.textContent = 'Cibles détruites';
//     let endScoreKillValue = document.createElement('div');
//     endScoreKillValue.id = 'endScoreKillValue';
//     let endScoreKillCalc =  document.createElement('div');
//     endScoreKillCalc.id = 'endScoreKillCalc';
//     let endScoreKillNb = document.createElement('span');
//     let endScoreKillX = document.createElement('span');
//     let endScoreKillMul = document.createElement('span');
//     let endScoreKillEq = document.createElement('span');
//     let endScoreKillResult = document.createElement('span');
//
//     // endScoreKillNb.textContent = document.querySelector("#score span").textContent;
//     endScoreKillNb.textContent = '20';
//     endScoreKillX.textContent = "x ";
//     endScoreKillMul.textContent = 10;
//     endScoreKillEq.textContent = ' = ';
//
//     endScoreKillCalc.appendChild(endScoreKillNb);
//     endScoreKillCalc.appendChild(endScoreKillX);
//     endScoreKillCalc.appendChild(endScoreKillMul);
//     endScoreKillCalc.appendChild(endScoreKillEq);
//     endScoreKillCalc.appendChild(endScoreKillResult);
//
//     endScoreKill.appendChild(endScoreKillText);
//     endScoreKill.appendChild(createFiller());
//     endScoreKill.appendChild(endScoreKillValue);
//     endScoreKill.appendChild(endScoreKillCalc);
// }
//
// function populateEndGameMenuScoreTotal(){
//     let endScoreTotal = document.querySelector('#endScoreTotal');
//
//     let endScoreTotalText = document.createElement('div');
//     endScoreTotalText.id = 'endScoreKillText';
//     endScoreTotalText.textContent = 'Total';
//
//     let endScoreTotalCalc =  document.createElement('div');
//     endScoreTotalCalc.id = 'endScoreTotalCalc';
//     let endScoreTotalResult = document.createElement('span');
//
//     endScoreTotalCalc.appendChild(endScoreTotalResult);
//     let filler = document.createElement('div');
//     filler.classList.add('filler');
//     endScoreTotal.appendChild(endScoreTotalText);
//     endScoreTotal.appendChild(filler);
//     endScoreTotal.appendChild(endScoreTotalCalc);
// }

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
    if(node.childElementCount == 0){
        return;
    }
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
    createTimer();
    let startTimerText = document.querySelector('#startTimerText');

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
        let startTimerBack = document.querySelector('#popBack');
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
    score[0]++;
    document.querySelector("#score span").textContent = score[0];
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

function uppercaseFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
