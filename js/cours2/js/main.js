var drink = "tea";

if(drink == "coffee"){
    console.log("what else !");
}else if(drink == "tea"){
    console.log("A cup of tea.");
}else{
    console.log("Whatever ...");
}

switch (drink) {
    case "coffee":
        console.log("what else !");
    break;
    case "tea":
        console.log("A cup of tea.");
    break;
    default:
        console.log("Whatever ...");
}

var array = ['Clement', 'Vianney', 'Marie', 12, false, 1.2, true];
console.log(array);
console.log(array.length);
console.log(array[0]);

console.log("-------------------------");
for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

console.log("-------------------------");
for (var a in array) {
    console.log(array[a]);
}

console.log("-------------------------");
for (a of array) {
    console.log(a);
}

console.log("-------------------------");
array.forEach(function(a){
    console.log(a);
});

var max = 100;
var min = 0;
var find_min = 999;
var find_max = 0;
for (var i = 0; i < 500; i++) {
    var rdm = Math.floor(Math.random() * (max - min + 1)) + min;
    if (rdm < find_min){
        find_min = rdm;
    }
    if (rdm > find_max){
        find_max = rdm;
    }
}
console.log("min : "+find_min);
console.log("max : "+find_max);
