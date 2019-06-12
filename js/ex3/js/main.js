document.querySelector("#go").addEventListener("click",demandeInfo);

function demandeInfo(){
    let prenom = prompt("prenom ?");
    let age = prompt("age ?");

    document.querySelector("#tableau").innerHTML += '<tr><td>'+prenom+'</td><td>'+age+'</td><td>'+checkAge(age)+'</td><td><button class="delete btn btn-danger">Supprimer</button></td></tr>';
    addDeleteEvent();
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


function deleteRow(d){
    d.parentNode.parentNode.remove();
}

function addDeleteEvent(){
    var deletes = document.querySelectorAll(".delete");
    deletes.forEach(function(d){
        d.removeEventListener("click",deleteRow);
        d.addEventListener("click",function(){deleteRow(d);});
    });
}
