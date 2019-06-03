//***** 1 *****\\

// var prenom = prompt("Entre ton prénom");
// alert("Bonjour "+prenom);

//***** 2 *****\\

// console.log("Coucou "+prenom);

//***** 3 *****\\

document.styleSheets[0].insertRule(".colorBlue{background-color:blue;}");
document.styleSheets[0].insertRule(".colorRed{background-color:red;}");
var div = document.getElementsByClassName("bordure");
div[0].classList.add('colorBlue');
div[1].classList.add('colorRed');

//***** 4 *****\\

// var password = "admin"
// var essai = 0;
// var pseudo = "";
// var pass = "";
//
// while(pseudo != "admin" || pass != password){
//     var pseudo = prompt("Pseudo :");
//     var pass = prompt("Password :");
//
//     document.getElementsByClassName("colorRed")[0].innerHTML = "Erreur recommence !!!";
//     if( essai != password.length || essai != 0){
//         essai++;
//         console.log("Indice : "+password.substring(0, essai));
//     }
// }
//
// document.getElementsByClassName("colorRed")[0].innerHTML = "";
// document.getElementsByClassName("colorBlue")[0].innerHTML ="Connexion réussi !!!";

//***** 5 *****\\

var i = 0;
var div5 = document.querySelectorAll(".flex div").forEach(function(div){
    div.innerHTML = "<img src='./image/"+(i+1)+".png' alt='Platypus "+(i+1)+"' width='100px'>";
    div.firstChild.addEventListener('click',function(e){
        alert("Description : "+this.getAttribute("alt"));
    });
    i++;
});

//***** 6 *****\\

// var birthday = prompt("Date de naissance : ");
// var today = prompt("Date du jour : ");
//
// var birthdaySplit = birthday.split("/");
// var todaySplit = today.split("/");
// var age = parseInt(todaySplit[2],10) - parseInt(birthdaySplit[2],10);
// if(todaySplit[1] < birthdaySplit[1]){
//     age--;
// }else if(todaySplit[1] == birthdaySplit[1] && todaySplit[0] < todaySplit[0]){
//     age--;
// }
//
//     console.log(birthdaySplit[1] - todaySplit[1]);
// if(todaySplit[1] == birthdaySplit[1] && todaySplit[0] > birthdaySplit[0]){
//     alert("Bientôt ton anniversaire !!!");
// }else if (birthdaySplit[1] - todaySplit[1] <= 0 && birthdaySplit[1] - todaySplit[1] >= -2) {
//     alert("Un peu de patience.");
// }else{
//     alert("T'as encore le temps.");
// }

//***** 7 *****\\

var ex7 = document.getElementById("ex7");
ex7.addEventListener('mouseenter',function(){
    this.style.color = "red";
});
ex7.addEventListener('mouseleave',function(){
    this.style.color = "black";
});
ex7.addEventListener('click',function(){
    this.style.color = "green";
});
ex7.addEventListener('dblclick',function(){
    this.style.color = "blue";
});
