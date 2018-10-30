console.warn("Loaded test.js");

/*
//page setup
document.getElementsByTagName("html")[0].style.height = "100%";
document.body.id = "body";
document.body.style["margin"] = "0px";
document.body.style["overflow"] = "hidden";
document.body.style["height"] = "100%";
document.body.style["backgroundColor"] = "grey";
document.body.style["border-width"] = "1px";
document.body.style["border-style"] = "solid";
document.body.style["border-color"] = "black";
*/

/*
//console tests
console.log(console.clear());
console.log(console.assert(false, "console.assert() false"));
console.log(console.assert(true, "console.assert() true"));
console.log(console.debug("console.debug()"));
console.log(console.error("console.error()"));
console.log(console.info("console.info()"));
console.log(console.log("console.log()"));
console.log(console.trace("console.trace()"));
console.log(console.warn("console.warn()"));
*/

/*
//window tests
//console.log(window.alert("window.alert()"));
console.log("window.innerWidth: "+window.innerWidth);
console.log("window.innerHeight: "+window.innerHeight);
console.log("window.name: "+window.name);
console.log("window['innerWidth']: "+window['innerWidth']);
console.log("window['innerHeight']: "+window['innerHeight']);
console.log("window['name']: "+window['name']);
console.log("window.noFunc: "+window.noFunc);
*/

//window.location tests
//TODO

//window.screen tests
//TODO

//window.document tests
var ele = document.createElement('div');
console.log(ele+"\n");
//console.log("document.createElement('div'): "+document.createElement('div'));

//var obj = [];
//console.log(obj+"\n");


/*
function MyConsole()
{
	MyConsole.prototype.log = function(str){
		//send the str to c++ or something
		//alert(str);
		console.log(str);
	}
}

function MyObject(val)
{
	this.val = val;
	MyObject.prototype.appendChild = function(){
		return this;
	}
		
	return new Proxy(this, {
		has: function (targ, key){
			return key in targ;
		},
		get: function(targ, key, recv){
			return targ[key];
		},
		set: function (targ, key, val, recv){
			targ[key] = val;
			return true;
		},
		deleteProperty: function (targ, key){
			delete targ[key];
			return true;
		}
	});
}

myconsole = new MyConsole();

var val = 42;
var myobject = new MyObject(val);
myconsole.log(myobject+"\n");
*/











