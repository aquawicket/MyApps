console.warn("Loaded test.js");

document.getElementsByTagName("html")[0].style.height = "100%";
document.body.id = "body";
document.body.style.margin = "0px";
document.body.style.overflow = "hidden";
document.body.style.height = "100%";
document.body.style.backgroundColor = "grey";
document.body.style["border-width"] = "1px";
document.body.style["border-style"] = "solid";
document.body.style["border-color"] = "black";

console.warn("window.innerWidth = "+window.innerWidth);
console.warn("window.innerHeight = "+window.innerHeight);

var nodes = document.getElementsByClassName("test")
console.log(nodes);
console.log(nodes.length);


/*
console.trace();
console.assert(document.getElementById("Thor"), "this assert is Thor");
console.assert(document.getElementById("body"), "this assert is body");
*/


/*
var button = document.createElement("button");
button.innerHTML = "button";
button.style.position = "absolute";
document.body.appendChild(button);
*/