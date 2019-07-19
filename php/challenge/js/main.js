/* jshint esversion: 9 */

document.querySelector('#menu .title i').addEventListener('click', toggleBurger);

document.querySelectorAll('#gallery .item').forEach(function(item){
    item.addEventListener('click', toggleImg);
});

document.querySelector('#formContact #cancel').addEventListener('click', clearForm);

document.querySelector('#formContact #send').addEventListener('click', checkForm);

hideBurger();

function toggleBurger(){
    document.querySelector('#menu .link').classList.toggle('show');
}

function initPopupBack(){
    let popupBack = document.createElement('div');
    popupBack.id = 'popupBack';
    document.querySelector('body').appendChild(popupBack);
    popupBack.addEventListener('click', removePopupBack);
    return popupBack;
}

function removePopupBack(){
    let popupBack = document.querySelector('#popupBack');
    popupBack.remove();
}

function toggleImg(){
    let popupBack = initPopupBack();
    let item = this.cloneNode();
    let src = this.firstChild.getAttribute('src');
    popupBack.appendChild(item);
    item.style.backgroundImage = "url('"+src+"')";
}

function hideBurger(){
    document.addEventListener('click', function(){
        let menu = document.querySelector('#menu .link');
        if(menu.offsetTop > -150){
            menu.classList.remove('show');
        }
    });
}

function clearForm(e){
    e.preventDefault();
    let form = this.form;
    form.reset();
}

function checkForm(e){
    // e.preventDefault();

}
