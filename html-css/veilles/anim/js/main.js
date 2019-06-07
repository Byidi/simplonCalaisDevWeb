/*jshint esversion: 9 */

var coeur = document.querySelector(".coeur");
var body = document.querySelector("body");

for (var i = 0; i < 100; i++) {
    nc = coeur.cloneNode(true);
    body.appendChild(nc);
    setAttr(nc);
}

function setAttr(node){
    let attrVal = randomAttr();
    nc.style.top = attrVal[0]+"%";
    nc.style.left = attrVal[1]+"%";
    nc.firstElementChild.style.transform = "rotate("+attrVal[2]+"deg)";
    nc.childNodes[1].childNodes[1].style.backgroundColor = "rgb("+attrVal[3]+", "+attrVal[4]+", "+attrVal[5]+")";
    nc.childNodes[1].childNodes[3].style.backgroundColor = "rgb("+attrVal[3]+", "+attrVal[4]+", "+attrVal[5]+")";
    nc.childNodes[1].childNodes[5].style.backgroundColor = "rgb("+attrVal[3]+", "+attrVal[4]+", "+attrVal[5]+")";
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
