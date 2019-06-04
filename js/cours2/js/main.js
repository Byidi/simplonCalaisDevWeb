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
