var annee = 2019;
console.log(((annee % 4 == 0 && annee % 100 != 0) || annee % 400 == 0)?annee+" est bissextile":annee+" n'est pas bissextile");

var retour = (machin == truc)?"ok":"pasok";

if(machin == truc){
    retour = "ok";
}else{
    retour = "pok";
}
//------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------//

if(isBisextile(annee)){
    console.log(annee+" est bissextile");
}else{
    console.log(annee+" n'est pas bissextile");
}

function isBisextile(annee){
    if(annee % 4 == 0 && annee % 100 != 0) {
        return true;
    }
    if(annee % 400 == 0){
        return true;
    }
    return false;
}
