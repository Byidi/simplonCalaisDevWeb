/*jshint esversion: 9 */

var coeur = document.querySelector(".coeur");
var body = document.querySelector("body");

for (var i = 0; i < 500; i++) {
    newCoeur = coeur.cloneNode(true);
    body.appendChild(newCoeur);
    setAttr(newCoeur);
}

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
