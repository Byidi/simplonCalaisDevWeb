// Les opérateurs : Déterminer si une année est bissextile.
// Rappel : une année est bissextile si elle est divisible par 4 sans être divisible par 100 ou si elle est divisible par 400.
// L'opérateur Modulo ( % ) permet d'obtenir le reste d'une  division. Si le reste vaut 0, c'est que la division est complète.


/*pseudo code
Si modulo 4 de l'année = 0 ET modulo 100 de l'année != 0 ou modulo 400 de l'année = 0
    Alors l'année est bissextile
Sinon
    Alors l'année n'est pas bissextile
*/

// On demande a l'utilisateur d'entrée l'année
var annee = prompt("Entre l'année");

//On test si modulo 4 de l'année = 0 ET modulo 100 de l'année != 0 ou modulo 400 de l'année = 0
if ((annee % 4 == 0 && annee % 100 != 0) || annee % 400 == 0) {
    //On affiche que l'année est bissextile
    document.querySelector("body").textContent = annee + " est bissextile";
}else{
    //On affiche que l'annee n'est pas bissextile
    document.querySelector("body").textContent = annee + " n'est pas bissextile";
}
