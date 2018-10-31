window.console.warn("Loaded test.js");

//page setup
document.getElementsByTagName("html")[0].style.height = "100%";
document.body.id = "body";
document.body.style.margin = "0px";
document.body.style.overflow = "hidden";
document.body.style.height = "100%";
document.body.style.backgroundColor = "grey";
document.body.style.borderWidth = "1px";
document.body.style.borderStyle = "solid";
document.body.style.borderColor = "black";



var myDiv = document.createElement("div");
myDiv.id = "myDiv";
myDiv.myVal = "myVal";
myDiv.style.position = "absolute";
myDiv.style.top = "100px";
myDiv.style.left = "10px";
myDiv.style.width = "100px";
myDiv.style.height = "100px";
myDiv.style.backgroundColor = "blue";
document.body.appendChild(myDiv);
//myDiv.addEventListener("click", function(){ console.warn("myDiv: click"); });
//myDiv.addEventListener("mouseover", function(){ console.warn("myDiv: mouseover"); });
//myDiv.addEventListener("mouseout", function(){ console.warn("myDiv: mouseout"); });



var myDiv2 = document.createElement("div");
myDiv2.id = "myDiv2";
myDiv2.style.position = "absolute";
myDiv2.style.top = "200px";
myDiv2.style.left = "210px";
myDiv2.style.width = "100px";
myDiv2.style.height = "100px";
myDiv2.style.backgroundColor = "red";
document.body.appendChild(myDiv2);
myDiv2.addEventListener("click", function(){ console.warn("myDiv2 click"); });
myDiv2.addEventListener("mouseover", function(){ console.warn("myDiv2: mouseover"); });
myDiv2.addEventListener("mouseout", function(){ console.warn("myDiv2: mouseout"); });


//objectMap.print();

var divs = document.getElementsByTagName("div");
DKWARN(String(divs.length));
DKWARN(divs[0].id);
DKWARN(divs[0].myVal);

function myDivClicked(){
	DKWARN("myDiv clicked!!!!!!!!!!!");
}

myDiv.onclick = myDivClicked;

myDiv.onclick();

document.body.onclick = function(){ DKWARN("body clicked !!!!") }


//allert("this will error");  
	  
	  
//objectMap.print();
//var ele = document.getElementById("myDiv");
//DKWARN("ele = "+ele+"\n");

/*
//test duktape object
if(typeof Duktape === "object"){
   console.warn("Duktape.version: "+Duktape.version);
   console.warn("Duktape.env: "+Duktape.env);
}


//CheckFileSupport();

//console tests
//console.log(console.clear());
console.log(console.assert(false, "console.assert() false"));
console.log(console.assert(true, "console.assert() true"));
console.log(console.debug("console.debug()"));
console.log(console.error("console.error()"));
console.log(console.info("console.info()"));
console.log(console.log("console.log()"));
console.log(console.trace("console.trace()"));
console.log(console.warn("console.warn()"));

//window object tests
//console.log(window.alert("window.alert()"));
console.log("window.innerWidth: "+window.innerWidth);
console.log("window.innerHeight: "+window.innerHeight);
console.log("window.name: "+window.name);
console.log("window['innerWidth']: "+window['innerWidth']);
console.log("window['innerHeight']: "+window['innerHeight']);
console.log("window['name']: "+window['name']);
console.log("window.noFunc: "+window.noFunc);

//location object tests
//TODO

//screen object tests
//TODO

//document object tests
var new_div = document.createElement('div');
new_div.id = "new_div";
new_div.style.position = "absolute";
new_div.style.backgroundColor = "blue";
new_div.style.top = "100px";
new_div.style.left = "10px";
new_div.style.width = "100px";
new_div.style.height = "100px";
document.body.appendChild(new_div);

//script object tests
var script = document.createElement("script");
console.log("script: "+script+"\n");
script.id = "test_script";
console.log("script.id: "+script.id+"\n");
document.body.appendChild(script);
*/


