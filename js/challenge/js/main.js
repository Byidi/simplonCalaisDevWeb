/*jshint esversion: 9 */

var shapesInfo = [];
var gameMode = [
    {'name': 'Noob', 'shapes': 20, 'bomb': 3, 'time': 60, 'speed': 20, 'desc': 'Le mode de jeu des petits joueur'},
    {'name': 'Hardcore', 'shapes': 80, 'bomb': 20, 'time': 45, 'speed': 15, 'desc': 'Presque un mode pour les vrais joueurs'},
    {'name': 'Ultraviolence', 'shapes': 200, 'bomb': 70, 'time': 30, 'speed': 10, 'desc': 'Enfin un vrai mode de jeu'},
    // TODO : {'name': 'Infini', 'shapes': 100, 'bomb': 30, 'time': 0, 'speed': 10, 'desc': 'Renouvellement continu, vitesse incrémentale, temps entre chaque cibles de plus en plus réduit.'}
];
var game = {
    'start': false,
    'mode': '',
    'scoreKilled': 0,
    'clickCount' : 0
};
var interval = {
    'moveShape': null,
    'timer': null,
    'gameStatus': null,
    'ufo': null
};
var sfx = {
    'pew': new Audio('./audio/pew.mp3'),
    'boom': new Audio('./audio/boom.mp3'),
    'clapclap': new Audio('./audio/clapclap.mp3')
};
var user = null;

init();

function calcAnimation(id){
    let moveLeft = Boolean(shapesInfo[id].moveLeft);
    let moveTop = Boolean(shapesInfo[id].moveTop);

    let end = [];
    end[0] = {'x': shapesInfo[id].x, 'y':shapesInfo[id].y};

    for(var i = 1; i <= 4; i++){
        end[i] = calcMove(moveLeft, moveTop, end[i-1]);

        let anim = '';
        anim += (moveTop)?'T':'B';
        anim += (moveLeft)?'L':'R';

        if(end[i].x == 0 || end[i].x == board.clientWidth){
            moveLeft = !moveLeft;
        }
        if(end[i].y == 0 || end[i].y == board.clientHeight){
            moveTop = !moveTop;
        }
    }

    return end;
}

function calcEndScore(){
    let div = document.querySelector('#endScoreTotalCalc');

    let scoreKill = calcEndSubScore('kill');
    let scoreTime = calcEndSubScore('time');
    let scoreClick = calcEndSubScore('click');
    let scoreBonus = calcEndSubScore('bonus');

    let scoreTotal = scoreKill + scoreTime + scoreClick + scoreBonus;

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

    updateEndScore(score, scoreField);

    return score;
}

function calcMove(moveLeft, moveTop, start){
    let end = {'x': -1, 'y': -1};
    let board = document.querySelector('#board');
    let dX = board.clientWidth - start.x;
    let dY = board.clientHeight - start.y;

    if(moveTop && moveLeft){
        if(start.x > start.y){
            end.x = start.x - start.y;
            end.y = 0;
        }else{
            end.x = 0;
            end.y = start.y - start.x;
        }
    }else if(moveTop && !moveLeft){
        if(dX > start.y){
            end.x = start.x + start.y;
            end.y = 0;
        }else{
            end.x = board.clientWidth;
            end.y = start.y - dX;
        }
    }else if(!moveTop && moveLeft){
        if(start.x < dY){
            end.x = 0;
            end.y = start.x + start.y;
        }else{
            end.x = start.x - dY;
            end.y = board.clientHeight;
        }
    }else if(!moveTop && !moveLeft){
        if(dX < dY){
            end.x = board.clientWidth;
            end.y = start.y + dX;
        }else{
            end.x = start.x + dY;
            end.y = board.clientHeight;
        }
    }
    return end;
}

function checkUfo(){
    let rdm = random(1, 100);
    if(rdm % 10 == 0){
        let ufos = document.querySelectorAll('.ufo');
        if(ufos.length == 0){
            if(interval.ufo != null){
                clearTimeout(interval.ufo);
            }
            ufos.forEach(function(ufo){
                ufo.remove();
            });
        }
        let lastId = document.querySelector('.shape:last-child').id.split('_')[1];
        let newId = parseInt(lastId,10) + 1;

        createShape(newId, 'ufo');
        interval.ufo = setTimeout(function(){
            let ufos = document.querySelectorAll('.ufo');
            ufos.forEach(function(ufo){
                ufo.remove();
            });
            clearTimeout(interval.ufo);
        }, 5000);
    }
}

function clearBoard(){
    let board = document.querySelector("#board");
    removeChild(board);
}

function createShape(i, shape){
    let newShape;

    switch(shape){
        case 'invader':
            newShape = createShapeInvader();
        break;
        case 'squid':
            newShape = createShapeSquid();
        break;
        case 'meeple':
            newShape = createShapeMeeple();
        break;
        case 'octopus':
            newShape = createShapeOctopus();
        break;
        case 'spider':
            newShape = createShapeSpider();
        break;
        case 'ufo':
            newShape = createShapeUfo();
        break;
        case 'ghost':
            newShape = createShapeGhost();
            newShape.classList.add('bomb');
        break;
    }
    newShape.classList.add('shape');
    newShape.id = "shape_"+i;

    document.querySelector('#board').appendChild(newShape);

    setAttr(newShape);

    shapesInfo[i] = {
        'x' : parseInt(newShape.style.left.slice(0, -2), 10),
        'y' : parseInt(newShape.style.top.slice(0, -2), 10),
        'size' : parseInt(newShape.style.height.slice(0, -2), 10),
        'moveTop' : random(0, 1),
        'moveLeft' : random(0, 1),
        'type' : shape,
        'animations' : null,
        'currentAnimation' : null,
        'animListener' : null
    };

    newShape.addEventListener("click", destroyShape, {capture:false});
    generateAnime(i);
}

function createShapeGhost(){
    let ghost =  document.createElement('div');
    let nose = document.createElement('div');
    let headbot = document.createElement('div');
    let headtop = document.createElement('div');
    let shoulderLeft = document.createElement('div');
    let shoulderRight = document.createElement('div');
    let body = document.createElement('div');
    let footLL = document.createElement('div');
    let footL = document.createElement('div');
    let footM = document.createElement('div');
    let footR = document.createElement('div');
    let footRR = document.createElement('div');

    ghost.classList.add('ghost');
    nose.classList.add('nose');
    headbot.classList.add('headbot');
    headtop.classList.add('headtop');
    shoulderLeft.classList.add('shoulder', 'left');
    shoulderRight.classList.add('shoulder', 'right');
    body.classList.add('body');
    footLL.classList.add('foot', 'fullleft');
    footL.classList.add('foot', 'left');
    footM.classList.add('foot', 'middle');
    footR.classList.add('foot', 'right');
    footRR.classList.add('foot', 'fullright');

    ghost.appendChild(nose);
    ghost.appendChild(headbot);
    ghost.appendChild(headtop);
    ghost.appendChild(shoulderLeft);
    ghost.appendChild(shoulderRight);
    ghost.appendChild(body);
    ghost.appendChild(footLL);
    ghost.appendChild(footL);
    ghost.appendChild(footM);
    ghost.appendChild(footR);
    ghost.appendChild(footRR);

    return ghost;
}

function createShapeMeeple(){
    let meeple= document.createElement('div');
    let nose= document.createElement('div');
    let eyebrow = document.createElement('div');
    let earBL= document.createElement('div');
    let earBR= document.createElement('div');
    let earTL = document.createElement('div');
    let earTR = document.createElement('div');
    let shoulderLeft= document.createElement('div');
    let shoulderRight = document.createElement('div');
    let mouth = document.createElement('div');
    let armLeft = document.createElement('div');
    let armRight = document.createElement('div');
    let body = document.createElement('div');
    let legLeft = document.createElement('div');
    let legRight = document.createElement('div');
    let footLeft = document.createElement('div');
    let footRight = document.createElement('div');

    meeple.classList.add('meeple');
    nose.classList.add('nose');
    eyebrow.classList.add('eyebrow');
    earBL.classList.add('ear', 'bottom', 'left');
    earBR.classList.add('ear', 'bottom', 'right');
    earTL.classList.add('ear', 'top', 'left');
    earTR.classList.add('ear', 'top', 'right');
    shoulderLeft.classList.add('shoulder', 'left');
    shoulderRight.classList.add('shoulder', 'right');
    mouth.classList.add('mouth');
    armLeft.classList.add('arm', 'left');
    armRight.classList.add('arm', 'right');
    body.classList.add('body');
    legLeft.classList.add('leg', 'left');
    legRight.classList.add('leg', 'right');
    footLeft.classList.add('foot', 'left');
    footRight.classList.add('foot', 'right');

    meeple.appendChild(nose);
    meeple.appendChild(eyebrow);
    meeple.appendChild(earBL);
    meeple.appendChild(earBR);
    meeple.appendChild(earTL);
    meeple.appendChild(earTR);
    meeple.appendChild(shoulderLeft);
    meeple.appendChild(shoulderRight);
    meeple.appendChild(mouth);
    meeple.appendChild(armLeft);
    meeple.appendChild(armRight);
    meeple.appendChild(body);
    meeple.appendChild(legLeft);
    meeple.appendChild(legRight);
    meeple.appendChild(footLeft);
    meeple.appendChild(footRight);

    return meeple;
}

function createShapeOctopus(){
    let octopus = document.createElement('div');
    let nose = document.createElement('div');
    let eyebrow = document.createElement('div');
    let head = document.createElement('div');
    let shoulderL = document.createElement('div');
    let shoulderR = document.createElement('div');
    let body = document.createElement('div');
    let tentacleTL = document.createElement('div');
    let tentacleTR = document.createElement('div');
    let tentacleML = document.createElement('div');
    let mouth = document.createElement('div');
    let tentacleMR = document.createElement('div');
    let tentacleBL = document.createElement('div');
    let tentacleBR = document.createElement('div');

    octopus.classList.add('octopus');
    nose.classList.add('nose');
    eyebrow.classList.add('eyebrow');
    head.classList.add('head');
    shoulderL.classList.add('shoulder', 'left');
    shoulderR.classList.add('shoulder', 'right');
    body.classList.add('body');
    tentacleTL.classList.add('tentacle', 'top', 'left');
    tentacleTR.classList.add('tentacle', 'top', 'right');
    tentacleML.classList.add('tentacle', 'middle', 'left');
    mouth.classList.add('mouth');
    tentacleMR.classList.add('tentacle', 'middle', 'right');
    tentacleBL.classList.add('tentacle', 'bottom', 'left');
    tentacleBR.classList.add('tentacle', 'bottom', 'right');

    octopus.appendChild(nose);
    octopus.appendChild(eyebrow);
    octopus.appendChild(head);
    octopus.appendChild(shoulderL);
    octopus.appendChild(shoulderR);
    octopus.appendChild(body);
    octopus.appendChild(tentacleTL);
    octopus.appendChild(tentacleTR);
    octopus.appendChild(tentacleML);
    octopus.appendChild(mouth);
    octopus.appendChild(tentacleMR);
    octopus.appendChild(tentacleBL);
    octopus.appendChild(tentacleBR);

    return octopus;
}

function createShapeInvader(){
    let invader = document.createElement('div');
    let nose = document.createElement('div');
    let eyebrow = document.createElement('div');
    let mouth = document.createElement('div');
    let legLeft = document.createElement('div');
    let legRight = document.createElement('div');
    let shoulderLeft = document.createElement('div');
    let shoulderRight = document.createElement('div');
    let armLeft = document.createElement('div');
    let armRight = document.createElement('div');
    let footLeft = document.createElement('div');
    let footRight = document.createElement('div');
    let earBotLeft = document.createElement('div');
    let earBotRight = document.createElement('div');
    let earTopLeft = document.createElement('div');
    let earTopRight = document.createElement('div');

    invader.classList.add('invader');
    nose.classList.add('nose');
    eyebrow.classList.add('eyebrow');
    mouth.classList.add('mouth');
    legLeft.classList.add('leg', 'left');
    legRight.classList.add('leg', 'right');
    shoulderLeft.classList.add('shoulder', 'left');
    shoulderRight.classList.add('shoulder', 'right');
    armLeft.classList.add('arm', 'left');
    armRight.classList.add('arm', 'right');
    footLeft.classList.add('foot', 'left');
    footRight.classList.add('foot', 'right');
    earBotLeft.classList.add('ear', 'bottom', 'left');
    earBotRight.classList.add('ear', 'bottom', 'right');
    earTopLeft.classList.add('ear', 'top', 'left');
    earTopRight.classList.add('ear', 'top', 'right');

    invader.appendChild(nose);
    invader.appendChild(eyebrow);
    invader.appendChild(mouth);
    invader.appendChild(legLeft);
    invader.appendChild(legRight);
    invader.appendChild(shoulderLeft);
    invader.appendChild(shoulderRight);
    invader.appendChild(armLeft);
    invader.appendChild(armRight);
    invader.appendChild(footLeft);
    invader.appendChild(footRight);
    invader.appendChild(earBotLeft);
    invader.appendChild(earBotRight);
    invader.appendChild(earTopLeft);
    invader.appendChild(earTopRight);

    return invader;
}

function createShapeSpider(){
    let spider = document.createElement('div');
    let nose = document.createElement('div');
    let eyebrow = document.createElement('div');
    let earL = document.createElement('div');
    let earR = document.createElement('div');
    let mouth = document.createElement('div');
    let shoulderL= document.createElement('div');
    let shoulderR = document.createElement('div');
    let legL = document.createElement('div');
    let legR = document.createElement('div');
    let handL = document.createElement('div');
    let handR = document.createElement('div');
    let footL = document.createElement('div');
    let footR = document.createElement('div');
    let toothL = document.createElement('div');
    let toothR = document.createElement('div');

    spider.classList.add('spider');
    nose.classList.add('nose');
    eyebrow.classList.add('eyebrow');
    earL.classList.add('ear', 'left');
    earR.classList.add('ear', 'right');
    mouth.classList.add('mouth');
    shoulderL.classList.add('shoulder', 'left');
    shoulderR.classList.add('shoulder', 'right');
    legL.classList.add('leg', 'left');
    legR.classList.add('leg', 'right');
    handL.classList.add('hand', 'left');
    handR.classList.add('hand', 'right');
    footL.classList.add('hand', 'left');
    footR.classList.add('hand', 'right');
    toothL.classList.add('tooth', 'left');
    toothR.classList.add('tooth', 'right');

    spider.appendChild(nose);
    spider.appendChild(eyebrow);
    spider.appendChild(earL);
    spider.appendChild(earR);
    spider.appendChild(mouth);
    spider.appendChild(shoulderL);
    spider.appendChild(shoulderR);
    spider.appendChild(legL);
    spider.appendChild(legR);
    spider.appendChild(handL);
    spider.appendChild(handR);
    spider.appendChild(footL);
    spider.appendChild(footR);
    spider.appendChild(toothL);
    spider.appendChild(toothR);

    return spider;
}

function createShapeSquid(){
    let squid = document.createElement('div');
    let nose = document.createElement('div');
    let eyebrow = document.createElement('div');
    let headbot = document.createElement('div');
    let headtop = document.createElement('div');
    let shoulderLeft = document.createElement('div');
    let shoulderRight = document.createElement('div');
    let mouth = document.createElement('div');
    let tentacleTopLeft = document.createElement('div');
    let tentacleTopRight = document.createElement('div');
    let tentacleMidLeft = document.createElement('div');
    let tentacleMidMid = document.createElement('div');
    let tentacleMidRight = document.createElement('div');
    let tentacleBotFullLeft = document.createElement('div');
    let tentacleBotLeft = document.createElement('div');
    let tentacleBotRight = document.createElement('div');
    let tentacleBotFullRight = document.createElement('div');

    squid.classList.add('squid');
    nose.classList.add('nose');
    eyebrow.classList.add('eyebrow');
    headbot.classList.add('headbot');
    headtop.classList.add('headtop');
    shoulderLeft.classList.add('shoulder', 'left');
    shoulderRight.classList.add('shoulder', 'right');
    mouth.classList.add('mouth');
    tentacleTopLeft.classList.add('tentacle', 'top', 'left');
    tentacleTopRight.classList.add('tentacle', 'top', 'right');
    tentacleMidLeft.classList.add('tentacle', 'middle', 'left');
    tentacleMidMid.classList.add('tentacle', 'middle', 'mid');
    tentacleMidRight.classList.add('tentacle', 'middle', 'right');
    tentacleBotFullLeft.classList.add('tentacle', 'bottom', 'fullleft');
    tentacleBotLeft.classList.add('tentacle', 'bottom', 'left');
    tentacleBotRight.classList.add('tentacle', 'bottom', 'right');
    tentacleBotFullRight.classList.add('tentacle', 'bottom', 'fullright');

    squid.appendChild(nose);
    squid.appendChild(eyebrow);
    squid.appendChild(headbot);
    squid.appendChild(headtop);
    squid.appendChild(shoulderLeft);
    squid.appendChild(shoulderRight);
    squid.appendChild(mouth);
    squid.appendChild(tentacleTopLeft);
    squid.appendChild(tentacleTopRight);
    squid.appendChild(tentacleMidLeft);
    squid.appendChild(tentacleMidMid);
    squid.appendChild(tentacleMidRight);
    squid.appendChild(tentacleBotFullLeft);
    squid.appendChild(tentacleBotLeft);
    squid.appendChild(tentacleBotRight);
    squid.appendChild(tentacleBotFullRight);

    return squid;
}

function createShapeUfo(){
    let ufo = document.createElement('div');
    let middleM = document.createElement('div');
    let middleL = document.createElement('div');
    let middleR = document.createElement('div');
    let middleLL = document.createElement('div');
    let middleRR = document.createElement('div');
    let head = document.createElement('div');
    let topsideL = document.createElement('div');
    let topsideR = document.createElement('div');
    let top = document.createElement('div');
    let body = document.createElement('div');
    let botsideL = document.createElement('div');
    let botsideR = document.createElement('div');
    let reactorL = document.createElement('div');
    let reactorM = document.createElement('div');
    let reactorR = document.createElement('div');
    let fireL = document.createElement('div');
    let fireR = document.createElement('div');

    ufo.classList.add('ufo');
    middleM.classList.add('middle', 'mid');
    middleL.classList.add('middle', 'left');
    middleR.classList.add('middle', 'right');
    middleLL.classList.add('middle', 'fullleft');
    middleRR.classList.add('middle', 'fullright');
    head.classList.add('head');
    topsideL.classList.add('topside', 'left');
    topsideR.classList.add('topside', 'right');
    top.classList.add('top');
    body.classList.add('body');
    botsideL.classList.add('botside', 'left');
    botsideR.classList.add('botside', 'right');
    reactorL.classList.add('reactor', 'left');
    reactorM.classList.add('reactor', 'middle');
    reactorR.classList.add('reactor', 'right');
    fireL.classList.add('fire', 'left');
    fireR.classList.add('fire', 'right');

    ufo.appendChild(middleM);
    ufo.appendChild(middleL);
    ufo.appendChild(middleR);
    ufo.appendChild(middleLL);
    ufo.appendChild(middleRR);
    ufo.appendChild(head);
    ufo.appendChild(topsideL);
    ufo.appendChild(topsideR);
    ufo.appendChild(top);
    ufo.appendChild(body);
    ufo.appendChild(botsideL);
    ufo.appendChild(botsideR);
    ufo.appendChild(reactorL);
    ufo.appendChild(reactorM);
    ufo.appendChild(reactorR);
    ufo.appendChild(fireL);
    ufo.appendChild(fireR);

    return ufo;
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
    if (game.start){
        playAudio(sfx.boom);
        let shape = node.target.closest(".shape");
        shape.style.transition = 'all 1s';
        shape.style.width = "200px";
        shape.style.height = "200px";
        shape.style.opacity = "0";
        shape.style.zIndex = "1";
        if(shape.classList.contains('bomb')){
            stopGame('bomb');
        }else if(shape.classList.contains('ufo')){
            let time = parseInt(document.querySelector('#timer span').textContent, 10);
            time += 5
            document.querySelector('#timer span').textContent = time;
        }
        updateScore();
        setTimeout(removeNode, 1000, shape);
    }
}

function gamePlay(){
    game.start = true;
    interval.timer = setInterval(updateTimer, 1000);
    interval.gameStatus = setInterval(gameStatus, 100);
    let board = document.querySelector('#board');
    board.addEventListener('click', function(e){
        if(game.start){
            playAudio(sfx.pew);
            if(!e.target.classList.contains('cible')){
                game.clickCount++;
            }
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
        stopGame('clear');
    }
}

function generateAnime(id){
    let end = calcAnimation(id);

    document.querySelector('style').innerHTML += generateKeyframes(end, id);

    let shapeDiv = document.querySelector("#shape_"+id);
    shapeDiv.style.animation = 'anim_'+id+' '+game.mode.speed+'s linear infinite';
}

function generateKeyframes(end, id){
    let distance = [];
    let distanceTotal = 0;
    for (let i = 0; i < end.length; i++) {
        let s = end[i];
        let e = (i == end.length - 1)?end[0]:end[i+1];
        let dx = (s.x > e.x)?s.x-e.x:e.x-s.x;
        let dy = (s.y > e.y)?s.y-e.y:e.y-s.y;
        distance[i] = Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2));
        distanceTotal += distance[i];
    }

    let percentTotal = 0;

    let keyframes = '@keyframes anim_'+id+' { ';
    keyframes += '0% {left: '+end[0].x+'px; top: '+end[0].y+'px;}';

    for (let i = 1; i < distance.length; i++) {
        let percent = Math.floor((distance[i-1]*100)/distanceTotal);
        percentTotal += percent;
        keyframes += percentTotal+'% {left: '+end[i].x+'px; top: '+end[i].y+'px;}';
    }

    keyframes += '}';
    return keyframes;
}

function generateRandomPseudo(){
    let voyelles = ['a', 'e', 'i', 'o', 'u', 'y'];
    let consonnes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    let randomPseudo = '';
    for (var i = 0; i < 8; i++) {
        randomPseudo += (i%2 == 0)?consonnes[random(0, consonnes.length-1)]:voyelles[random(0, voyelles.length-1)];
    }
    return randomPseudo;
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
    let style = document.createElement('style');

    document.querySelector('body').appendChild(info);
    document.querySelector('body').appendChild(board);
    document.querySelector('head').appendChild(style);
}

function initEndGame(reason){
    clearBoard();
    let board = document.querySelector('#board');
    let endGameBack = document.createElement("div");
    let endGameMenu = document.createElement("div");

    endGameBack.id = "popBack";
    endGameMenu.id = "menu";
    endGameMenu.classList.add('endGame');

    endGameBack.appendChild(endGameMenu);
    board.appendChild(endGameBack);

    populateEndGameMenu(reason);
    calcEndScore();
}

function initGame(mode){
    clearBoard();
    initGameInfo();

    game.mode = gameMode.find(function(m){
        return m.name == mode;
    });

    for (var i = 0; i < game.mode.shapes; i++) {
        if(i < game.mode.bomb){
            createShape(i, 'ghost');
        }else{
            let shapes = ['invader', 'squid', 'meeple', 'octopus', 'spider'];
            let shape = shapes[random(0, shapes.length - 1)];
            createShape(i, shape);
        }
    }

    let timerCmp = document.querySelector("#info #timer span");
    timerCmp.textContent = game.mode.time;
    document.title = "PuntaClick : "+game.mode.time+"s";

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
                user = document.querySelector("#menuPseudoInput").value;
                initGame(idSplit[1]);
            }
        });
    });
    populateHightScore();
}

function playAudio(audio){
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0;
    }
}

function populateEndGameMenu(reason){
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

    let endScoreBonus = document.createElement('div');
    endScoreBonus.id = 'endScoreBonus';

    endGameMenu.appendChild(endTitle);

    endGameMenu.appendChild(endScoreKill);
    endGameMenu.appendChild(endScoreTime);
    endGameMenu.appendChild(endScoreClick);
    endGameMenu.appendChild(endScoreBonus);
    endGameMenu.appendChild(endScoreTotal);

    populateEndGameMenuLine('time');
    populateEndGameMenuLine('kill');
    populateEndGameMenuLine('click');
    if(reason != ''){
        populateEndGameMenuLine('bonus', reason);
    }
    populateEndGameMenuLine('total');
}

function populateEndGameMenuLine(line, reason=''){
    let lineFirstUpper = uppercaseFirstLetter(line);

    let text =  document.createElement('div');
    text.id = 'endScore'+lineFirstUpper+'Text';
    let value = document.createElement('div');
    value.id = 'endScore'+lineFirstUpper+'Value';
    let calc = document.createElement('div');
    calc.id = 'endScore'+lineFirstUpper+'Calc';
    calc.classList.add('endScoreCalc');

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
            nb.textContent = game.scoreKilled;
            mul.textContent = 50;
        break;
        case 'click':
            text.textContent = 'Tirs loupés : ';
            nb.textContent = game.clickCount;
            mul.textContent = -10;
        break;
        case 'bonus':
            switch(reason){
                case 'clear':
                    text.textContent = 'Toutes les cibles détruites : ';
                    nb.textContent = game.mode.shapes - game.mode.bomb;
                    mul.textContent = game.mode.speed;
                break;
                case 'bomb':
                    text.textContent = 'Fantôme tué : ';
                    nb.textContent = 1;
                    mul.textContent = -100 * game.mode.time;
                break;
                case 'time':
                    text.textContent = 'Temps écoulé : ';
                    nb.textContent = 1;
                    mul.textContent = -20 * game.mode.time;
                break;
            }
        break;
        case 'total':
            text.textContent = 'Total : ';
            x.textContent = '';
            eq.textContent = '';
        break;
    }
}

function sortByScore(a, b){
    if(a.score < b.score){
        return 1;
    }
    if(a.score > b.score){
        return -1;
    }
    return 0;
}

function populateHightScore(){
    if(typeof localStorage!='undefined') {
        let scoreDiv = document.querySelectorAll('#menuScore div');
        scoreDiv.forEach(function(div){
            let mode = div.id.split('_')[1];
            let scores = (localStorage.getItem(mode) == null)?[]:JSON.parse(localStorage.getItem(mode));
            scores.sort(sortByScore);
            let list = document.createElement('ol');
            if(scores.length == 0){
                let li = document.createElement('li');
                li.textContent = 'Aucun score enregistré';
                list.appendChild(li);
            }else{
                for (var i = 0; i < 3; i++) {
                    let li = document.createElement('li');
                    if(scores.length > i){
                        let userTxt = scores[i].user.bold();
                        if(i == 0){userTxt = userTxt.fontcolor('gold');}
                        else if( i == 1){userTxt = userTxt.fontcolor('silver');}
                        else if( i == 2){userTxt = userTxt.fontcolor('bronze');}
                        li.innerHTML = userTxt + ' : '+ scores[i].score;
                        list.appendChild(li);
                    }
                }
                div.appendChild(list);
            }
        });
    }else{
        console.log('localStorage n\'est pas supporté');
    }
}

function populateMenu() {
    let menuBack = document.createElement("div");
    menuBack.id = 'popBack';

    let menu = document.createElement("div");
    menu.id = 'menu';

    let menuPseudo = document.createElement('div');
    menuPseudo.id = 'menuPseudo';
    let menuPseudoTxt = document.createElement('h2');
    menuPseudoTxt.textContent = "Votre pseudo";
    let menuPseudoInput = document.createElement('input');
    menuPseudoInput.id = 'menuPseudoInput';
    let randomPseudo = generateRandomPseudo();
    menuPseudoInput.value = uppercaseFirstLetter(randomPseudo);

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

    menuPseudo.appendChild(menuPseudoTxt);
    menuPseudo.appendChild(menuPseudoInput);

    menu.appendChild(menuPseudo);
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

function saveScore(){
    if(typeof localStorage!='undefined') {
        let scores = null;
        scores = (localStorage.getItem(game.mode.name) == null)?[]:JSON.parse(localStorage.getItem(game.mode.name));

        let scoreAct = parseInt(document.querySelector('#endScoreTotalCalc span:last-child').textContent, 10);

        newScore = {user: user, score: scoreAct};
        scores.push(newScore);

        localStorage.setItem(game.mode.name, JSON.stringify(scores));
    }else{
        console.log('localStorage n\'est pas supporté');
    }
}

function setAttr(node){
    let size = random(4,10);

    node.style.width = size+"px";
    node.style.height = size+"px";

    node.style.top = random(0, board.clientHeight)+"px";
    node.style.left = random(0, board.clientWidth)+"px";

    node.style.transform = 'rotate('+random(0,360)+'deg)';

    let color = "rgb("+random(0,255)+", "+random(0,255)+", "+random(0,255)+")";
    node.style.backgroundColor = color;
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
        clearInterval(decompte);
        let startTimerBack = document.querySelector('#popBack');
        removeChild(startTimerBack);
        removeNode(startTimerBack);
        removeNode(startTimerText);
        gamePlay();
    }, 6000);

}

function stopGame(reason){
    game.start = false;
    clearInterval(interval.timer);
    clearInterval(interval.moveShape);
    clearInterval(interval.gameStatus);
    playAudio(sfx.clapclap);
    initEndGame(reason);
}

function updateEndScore(score, resultChild){
    let affScore = 0;
    let scoreInterval = setInterval(function(){
        if(affScore == score){
            resultChild.textContent = affScore;
            clearInterval(scoreInterval);
            if(resultChild.parentNode.id == 'endScoreTotalCalc'){
                saveScore();
            }
        }else{
            if(score >= 10000){
                affScore += 10;
            }else if( score >= 1000){
                affScore += 5;
            }else if(score <= -10000){
                affScore -= 10;
            }else if(score <= -1000){
                affScore -=5;
            }else if(score < 0){
                affScore--;
            }else{
                affScore++;
            }

            resultChild.textContent = affScore;
        }
    }, 5);
}

function updateScore(){
    game.scoreKilled++;
    document.querySelector("#score span").textContent = game.scoreKilled;
}

function updateTimer(){
    checkUfo();
    let timerCmp = document.querySelector("#info #timer span");
    let time = parseInt(timerCmp.textContent, 10);
    time--;
    timerCmp.textContent = time;
    document.title = "PuntaClick : "+time+"s";
    if(time == 0){
        stopGame('time');
    }
}

function uppercaseFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
