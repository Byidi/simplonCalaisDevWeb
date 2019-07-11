/*jshint esversion: 9 */
var liste = [
    ['eaz1', 'aze1', 'F'],
    ['eaz2', 'aze2', 'M'],
    ['eaz3', 'aze3', 'F'],
    ['eaz4', 'aze4', 'M'],
    ['eaz5', 'aze5', 'F']
];

function insertInto(arr){
    var tbody = document.querySelector('tbody');
    for (var i = 0; i < arr.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < arr[i].length; j++) {
            let td = document.createElement('td');
            td.textContent = arr[i][j];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

function addEvent(){
    let tds = document.querySelectorAll('tbody td');
    tds.forEach(function(td){
        td.addEventListener('dblclick', function(e){
            text2input(e);
        });
    });
}

function text2input(e){
    let value = e.target.textContent;
    let input = document.createElement('input');
    input.value = value;
    e.target.textContent = "";
    e.target.appendChild(input);
    input.select();
    input.addEventListener('blur',function(){
        input2text(input);
    });
}

function input2text(input){
    input.parentNode.textContent = input.value;
}

insertInto(liste);
addEvent();
