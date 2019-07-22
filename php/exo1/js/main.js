/* jshint esversion: 9 */
window.addEventListener("load", hideBurger);
window.addEventListener("load", applyTheme);

document.querySelector('#menu .title i').addEventListener('click', toggleBurger);
document.addEventListener('click', hideBurger);

function toggleBurger(){
    let burger = document.querySelector('#menu .link');
    if(burger.classList.contains('show')){
        burger.style.top = - burger.children.length * burger.firstElementChild.clientHeight+"px";
        burger.classList.remove('show');
    }else{
        burger.style.top = burger.firstElementChild.clientHeight+"px";
        burger.classList.add('show');
        console.log("ok");
    }
}

function hideBurger(evt){
    let burgerIcon = document.querySelector('#menu .title i');
    if(evt.target != burgerIcon ){
        let burger = document.querySelector('#menu .link');
        if(burger.classList.contains('show')){
            burger.classList.remove('show');
        }
        burger.style.top = - burger.children.length * burger.firstElementChild.clientHeight+"px";
    }
}

function applyTheme(){
    let theme = (document.querySelector('#couverture'))?document.querySelector('#couverture').getAttribute('rel'):0;
    if(theme != 0){
        document.querySelector("#couverture").style.backgroundImage = 'url("./images/theme'+theme+'/couverture.jpg")';
        document.querySelector("#couverture #avatar").style.backgroundImage = 'url("./images/theme'+theme+'/avatar.jpg")';
    }else{
        document.querySelector("#couverture").remove();
        document.querySelector('#content').style.minHeight = "93vh";
    }
}
