// Super commentaire
console.log("Hello");
var myName="Youplaboom";
console.log(myName);
myName+=" ahahaha";
var prp = prompt("coucou");

if (prp == "" || prp == null){
    alert("Not cool");
}else{
    console.log("youpi : "+prp);
}

document.getElementById("list").style.backgroundColor = "red";

let lis = document.getElementsByTagName("li");
for (let i = 0; i < lis.length; i++) {
    lis[i].style.backgroundColor = "blue";
}

let items = document.getElementsByClassName("item");
for (let i = 0; i < items.length; i++) {
    items[i].style.backgroundColor = "yellow";
}
