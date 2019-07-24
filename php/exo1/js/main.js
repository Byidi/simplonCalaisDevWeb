/* jshint esversion: 9 */

window.addEventListener("load", applyTheme);

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
