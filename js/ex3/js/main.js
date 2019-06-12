document.querySelector("#go").addEventListener("click",demandeInfo);

function demandeInfo(){
    let prenom = prompt("prenom ?");
    let age = prompt("age ?");

    document.querySelector("#tableau").innerHTML += '<tr><td>'+prenom+'</td><td>'+age+'</td><td>'+checkAge(age)+'</tr>';
}

function checkAge(age){
    if (age < 18){
        return 'Tu es bien trop jeune petit.e';
    }else if(age <= 19){
        return 'Bientôt la vingtaine';
    }else if(age <= 29){
        return 'La vingtaine il n\'y a que ça de vrai';
    }else if(age <= 39){
        return 'Les trentenaires sont les meilleurs';
    }else if(age <= 40){
        return 'Tu es trop vieux pour jouer désolé papy';
    }else{
        return 'Vive les extra-terrestre';
    }
}
