//COLOR background
function symboleAleatoire(){
    var symbole = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    return symbole[Math.floor(Math.random()*symbole.length)];
}

function getCouleur(type){
    var couleur = "";
    switch(type){
        case 'win':
            var couleurs = ['green','yellow','blue'];
            couleur = couleurs[Math.floor(Math.random()*couleurs.length)];
        break;
        case 'loose':
            var couleurs = ['red','black','brown'];
            couleur = couleurs[Math.floor(Math.random()*couleurs.length)];
        break;
        case 'white':
            couleur = "white";
        break;
        default:
            couleur = "#";
            for (var i = 0; i <= 5; i++){
                    couleur += symboleAleatoire();
            }
    }
    return couleur;
}

function createHtml(col,row){
    var bgcontent = "<table>";
    for (var i = 0; i <=  col; i++) {
        bgcontent += "<tr>";
            for (var j = 0; j <= row; j++) {
                bgcontent += "<td></td>";
            }
        bgcontent += "</tr>";
    }
    bgcontent += "</table>";

    document.getElementById("background").innerHTML = bgcontent;
}

function colorTable(type){
    tdArray = document.getElementsByTagName("td");
    for (var i = 0; i < tdArray.length; i++){
        tdArray[i].style.backgroundColor = getCouleur(type);
    }
    return true;
}

//PLUS-MOINS
function getNumber(min, max){
    return Math.floor((Math.random() * max) + min);
}

function setHistory(choix, type){
    var p = document.createElement("p");
    switch(type){
        case 'sup':
            p.innerHTML = essai+" : Sup&eacute;rieur &agrave; "+choix;
        break;
        case 'inf':
            p.innerHTML = essai+" : Inf&eacute;rieur &agrave; "+choix;
        break;
    }
    document.getElementById("history").appendChild(p);
}

function compare(number, choix){
    playSound('tambour.mp3', 1500, false);
    setTimeout(function(){
      if(number > choix){
          document.getElementById("choix").style.backgroundImage = 'url("./img/plus.png")';
          setHistory(choix,"sup");
      }else if(number < choix){
          document.getElementById("choix").style.backgroundImage = 'url("./img/moins.png")';
          setHistory(choix,"inf");
      }else{
          gameEnd("win");
          fini = true;
      }
      essai++;
    }, 1);
}

function gameEnd(status){
    document.getElementById("choix").style.background = "transparent";
    document.getElementById("content").style.background = "#FFFFFFCC";
    document.getElementById("choix").readOnly = true;

    var cmp = 0;

    createHtml(35,51);
    colorTable('random');

    if(status == "win"){
        document.getElementById("nyancat_1").style.display = "visible";
        document.getElementById("nyancat_2").style.display = "block";
        document.getElementById("nyancat_3").style.display = "block";
        document.getElementById("nyancat_1").style.left = "2500px";
        document.getElementById("nyancat_2").style.right = "2500px";
        document.getElementById("nyancat_3").style.left = "2500px";

        playSound('nyan.ogg', 0, true);

        var boucle = setInterval(function(){
          colorTable();
          (cmp%2 == 0) ? colorTable('random') : colorTable('win');
          cmp ++;
          (cmp > 10000) ? clearInterval(boucle):"";
        }, 100);

        document.getElementById("resultat").innerHTML = "Victoire !!!";
    }else{
        playSound('loose.mp3', 0, false);

        var boucle = setInterval(function(){
          colorTable();
          (cmp%2 == 0) ? colorTable('random') : colorTable('loose');
          cmp ++;
          (cmp > 10000) ? clearInterval(boucle):"";
        }, 100);

        document.getElementById("resultat").innerHTML = "Defaite ...";
    }
}

function playSound(file, duration, loop){
  var audio = document.createElement("audio");
  document.body.appendChild(audio);
  audio.setAttribute("src","./audio/"+file);
  audio.setAttribute("loop","true");
  if(duration > 0){
    setTimeout(function(){audio.pause();},duration);
  }
  if(loop){
    audio.loop = true;
  }else{
    audio.loop = false;
  }
  audio.play();
}

var essai = 1;
var fini = false;
var number = getNumber(1, 100);
console.log(number);

document.getElementById("choix").focus();
document.getElementById("choix").value = "";

document.getElementById("choix").addEventListener('keypress',function(e){
    if(e.keyCode == 13 && !fini){
        var choix = document.getElementById("choix").value;
        document.getElementById("choix").focus();
        document.getElementById("choix").select();

        if(!isNaN(choix) && choix != ""){
          if(choix >= 1 && choix <= 100){
            console.log("essai "+essai+" : "+choix);
            compare(number,choix);
            console.log(essai);
          }else{
            alert("C'est un nombre entre 1 et 100 ...");
            document.getElementById("choix").value = "";
            document.getElementById("choix").focus();
          }
        }else{
          alert("Avec un nombre c'est mieux !!!");
          document.getElementById("choix").value = "";
          document.getElementById("choix").focus();
        }


        if(!fini && essai == 5){
            var max_hint = (number.toString().slice(-1) != 0)?(10 - number.toString().slice(-1)) + number:number;
            var min_hint = max_hint - 9;
            console.log("C'est compris entre : "+min_hint+" et "+max_hint);
        }else if(!fini && essai == 10){
            gameEnd("loose");
            fini = true;
        }
    }
});
