//*** 1 ***\\

var myNumber = 15;
if(myNumber > 10){
    console.log("Inférieur à 10");
}

//*** 2 ***\\

var array = [0,1,2,3,4,6,8,15,23,36,54];
array.forEach(function(val){
    console.log(val);
});

//*** 3 ***\\

var notes = [10, 14, 12, 20, 1, 2];
var total = 0;
notes.forEach(function(note){
    total += note;
})
var moyenne = total/notes.length;
console.log("Moyenne : "+moyenne);

//*** 4 ***\\

var noms = ["machin", "truc", "bidulle", "trucmuche", "l'autre"];
var body = document.getElementsByTagName("body")[0];
body.innerHTML += "<ul id='nameList'></ul>";
nameList = document.getElementById("nameList");
noms.forEach(function(nom){
    nameList.innerHTML += "<li>"+nom+"</li>";
});

//*** 5 ***\\

var annee = 2014;

if((annee % 4 == 0 && annee % 100 != 0) || annee % 400 == 0){
    console.log(annee+" est bissextile");
}else{
    console.log(annee+" n'est pas bissextile");
}

//*** 6 ***\\

// var continuer = true;
var continuer = false;
while( continuer ){
    var prp = prompt("Entrer : abcdef");
    if(prp == "abcdef"){
        continuer = false;
    }
}

//*** 7 ***\\

var noms = ["Machin", "Truc", "Bidulle", "Trucmuche", "L'autre"];
var verbes = ["mange", "frappe", "fabrique", "lance", "saute sur"];
var cods = ["un bébé", "un ordinateur", "une chaussure", "une autruche", "un écran"];

var min = 0;
var max = noms.length - 1;
var rdm = Math.floor(Math.random() * (max - min + 1)) + min;
phrase = noms[rdm];


var max = verbes.length - 1;
var rdm = Math.floor(Math.random() * (max - min + 1)) + min;
phrase += " "+verbes[rdm];

var max = cods.length - 1;
var rdm = Math.floor(Math.random() * (max - min + 1)) + min;
phrase += " "+cods[rdm];

console.log(phrase);

//*** 8 ***\\

// var word = prompt("Entre un mot");
word = "Ananas";

document.getElementsByTagName("body")[0].innerHTML = "\
    <p>"+word.bold().fontcolor("red")+"</p> \
    <p'>"+word.toLowerCase()+"</p> \
    <p'>"+word.toUpperCase()+"</p> \
";

var voyelle = ['a','e','i','o','u'];
var count = [0,0];
for (var c of word.toLowerCase()){
    if(voyelle.indexOf(c) != -1){
        count[0]++;
    }else{
        count[1]++;
    }
}

document.getElementsByTagName("body")[0].innerHTML += "<p>Ce mot contient "+count[0]+" voyelles et "+count[1]+" consonnes.</p>";

var reverse = "";
for(var i=word.length-1; i>=0; i--){
    reverse +=word[i];
}
document.getElementsByTagName("body")[0].innerHTML += "<p>"+reverse+"</p>";

var wordArray = word.toLowerCase().split("");
var reverseArray = reverse.toLowerCase().split("");
var palindrome = true;
for(var i=0; i<wordArray.length; i++){
    if(wordArray[i] != reverseArray[i]){
        palindrome = false;
        i = wordArray.length;
    }
}

if(palindrome){
    document.getElementsByTagName("body")[0].innerHTML += "<p>"+word+" est un palindrome</p>";
}else{
    document.getElementsByTagName("body")[0].innerHTML += "<p>"+word+" n'est pas un palindrome</p>";
}
