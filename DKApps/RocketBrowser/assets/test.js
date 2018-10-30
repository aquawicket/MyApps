console.warn("Loaded test.js");

/*
//test duktape object
if(typeof Duktape === "object"){
   console.warn("Duktape.version: "+Duktape.version);
   console.warn("Duktape.env: "+Duktape.env);
}
*/


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
/*
console.log(console.debug("console.debug()"));
console.log(console.error("console.error()"));
console.log(console.info("console.info()"));
console.log(console.log("console.log()"));
console.log(console.trace("console.trace()"));
console.log(console.warn("console.warn()"));
*/

//window object tests
//console.log(window.alert("window.alert()"));
console.log("window.innerWidth: "+window.innerWidth);
console.log("window.innerHeight: "+window.innerHeight);
console.log("window.name: "+window.name);
console.log("window['innerWidth']: "+window['innerWidth']);
console.log("window['innerHeight']: "+window['innerHeight']);
console.log("window['name']: "+window['name']);
console.log("window.noFunc: "+window.noFunc);

/*
//location object tests
//TODO
*/

/*
//screen object tests
//TODO
*/


//document object tests
//console.log("document.createElement('div'): "+document.createElement('div'));


/*
//script object tests
//console.log("document.createElement('script'): "+document.createElement("script"));
var script = document.createElement("script");
console.log("script: "+script+"\n");
script.id = "test_script";
console.log("script.id: "+script.id+"\n");
document.body.appendChild(script);
*/

/*
function Element2(id)
{
	this.id = id;

	Element2.prototype.ElementTest = function(){
		console.warn("Element2.prototype.ElementTest()");
	}

	return new Proxy(this, {
		get: function (targ, key, recv){
			console.warn("Element2 proxy get: called");
			return targ[key];
		},
		set: function (targ, key, val, recv){
			console.warn("Element2 proxy set: called");
			return val;
		},
	});
}

function HTMLElement(id)
{
	HTMLElement.prototype.HTMLElementTest = function(){
		console.warn("HTMLElement2.prototype.HTMLElementTest()");
	}
	return Element2.call(this, id);
}
HTMLElement.prototype = Element2.prototype;

var htmlElement = new HTMLElement("test_id");
htmlElement.ElementTest();
htmlElement.HTMLElementTest();
htmlElement.id = "test2";
console.warn("htmlElement.id = "+htmlElement.id+"\n");
*/
