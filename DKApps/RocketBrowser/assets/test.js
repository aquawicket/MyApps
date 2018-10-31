console.warn("Loaded test.js");


window.addEventListener("error", function(err){
	var errorText = [
        err.message,
        'URL: ' + err.filename,
        'Line: ' + err.lineno + ', Column: ' + err.colno,
        'Stack: ' + (err.error && err.error.stack || '(no stack trace)')
    ].join('\n');
	console.error(errorText);
});


var myDiv = document.createElement("div");
myDiv.style.position = "absolute";
myDiv.style.top = "100px";
myDiv.style.left = "10px";
myDiv.style.width = "100px";
myDiv.style.height = "100px";
myDiv.style.backgroundColor = "blue";
document.body.appendChild(myDiv);
myDiv.addEventListener("click", function(){ console.warn("myDiv: click"); });
myDiv.addEventListener("mouseover", function(){ console.warn("myDiv: mouseover"); });
myDiv.addEventListener("mouseout", function(){ console.warn("myDiv: mouseout"); });

allert("test error");

/*
try{
	allert("test error");
}
catch(err){
	var err_error = {stack:err.stack};
	var err_event = {type:'error', name:err.name, message:err.message, filename:err.fileName, lineno:err.lineNumber, colno:'0', error:err_error};
	EventFromRocket("window", err);
}
*/



/*
//test duktape object
if(typeof Duktape === "object"){
   console.warn("Duktape.version: "+Duktape.version);
   console.warn("Duktape.env: "+Duktape.env);
}

//page setup
document.getElementsByTagName("html")[0].style.height = "100%";
console.log(document.getElementsByTagName("html")[0].style.height);
document.body.id = "body";
document.body.style["margin"] = "0px";
document.body.style["overflow"] = "hidden";
document.body.style["height"] = "100%";
document.body.style["backgroundColor"] = "grey";
document.body.style["border-width"] = "1px";
document.body.style["border-style"] = "solid";
document.body.style["border-color"] = "black";

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