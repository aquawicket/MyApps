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
//myDiv2.addEventListener("click", function(){ console.warn("myDiv2 click"); });
//myDiv2.addEventListener("mouseover", function(){ console.warn("myDiv2: mouseover"); });
//myDiv2.addEventListener("mouseout", function(){ console.warn("myDiv2: mouseout"); });


//objectMap.print();

var divs = document.getElementsByTagName("div");
DKWARN(String(divs.length));
DKWARN(divs[0].id);
DKWARN(divs[0].myVal);

function myDivClicked(){
	DKWARN("myDiv clicked!!!!!!!!!!!");
}

//myDiv.onclick = myDivClicked;
//myDiv.onclick();


// Test custom event
/*
function OnPrinterStateChanged(){
    var evt = {};
	evt.type = 'printerstatechanged';
    window.dispatchEvent(evt);
}

window.addEventListener('printerstatechanged', function(){
	DKWARN("printerstatechanged")
});
OnPrinterStateChanged();
*/

var element = myDiv;

element.onabort = function(){ DKWARN("onabort"); };
element.onanimationcancel = function(){ DKWARN("onanimationcancel"); };
element.onanimationend = function(){ DKWARN("onanimationend"); };
element.onanimationiteration = function(){ DKWARN("onanimationiteration"); };
element.onanimationstart = function(){ DKWARN("onanimationstart"); };
element.onauxclick = function(){ DKWARN("onauxclick"); };
element.onblur = function(){ DKWARN("onblur"); };
element.onerror = function(){ DKWARN("onerror"); };
element.onfocus = function(){ DKWARN("onfocus"); };
element.oncanplay = function(){ DKWARN("oncanplay"); };
element.oncanplaythrough = function(){ DKWARN("oncanplaythrough"); };
element.onchange = function(){ DKWARN("onchange"); };
element.onclick = function(){ DKWARN("onclick"); };
element.onclose = function(){ DKWARN("onclose"); };
element.oncontextmenu = function(){ DKWARN("oncontextmenu"); };
element.oncuechange = function(){ DKWARN("oncuechange"); };
element.ondblclick = function(){ DKWARN("ondblclick"); };
element.ondrag = function(){ DKWARN("ondrag"); };
element.ondragend = function(){ DKWARN("ondragend"); };
element.ondragenter = function(){ DKWARN("ondragenter"); };
element.ondragexit = function(){ DKWARN("ondragexit"); };
element.ondragleave = function(){ DKWARN("ondragleave"); };
element.ondragover = function(){ DKWARN("ondragover"); };
element.ondragstart = function(){ DKWARN("ondragstart"); };
element.ondrop = function(){ DKWARN("ondrop"); };
element.ondurationchange = function(){ DKWARN("ondurationchange"); };
element.onemptied = function(){ DKWARN("onemptied"); };
element.onended = function(){ DKWARN("onended"); };
element.ongotpointercapture = function(){ DKWARN("ongotpointercapture"); };
element.oninput = function(){ DKWARN("oninput"); };
element.oninvalid = function(){ DKWARN("oninvalid"); };
element.onkeydown = function(){ DKWARN("onkeydown"); };
element.onkeypress = function(){ DKWARN("onkeypress"); };
element.onkeyup = function(){ DKWARN("onkeyup"); };
element.onload = function(){ DKWARN("onload"); };
element.onloadeddata = function(){ DKWARN("onloadeddata"); };
element.onloadedmetadata = function(){ DKWARN("onloadedmetadata"); };
element.onloadend = function(){ DKWARN("onloadend"); };
element.onloadstart = function(){ DKWARN("onloadstart"); };
element.onlostpointercapture = function(){ DKWARN("onlostpointercapture"); };
element.onmousedown = function(){ DKWARN("onmousedown"); };
element.onmouseenter = function(){ DKWARN("onmouseenter"); };
element.onmouseleave = function(){ DKWARN("onmouseleave"); };
element.onmousemove = function(){ DKWARN("onmousemove"); };
element.onmouseout = function(){ DKWARN("onmouseout"); };
element.onmouseover = function(){ DKWARN("onmouseover"); };
element.onmouseup = function(){ DKWARN("onmouseup"); };
element.onmousewheel = function(){ DKWARN("onmousewheel"); };
element.onwheel = function(){ DKWARN("onwheel"); };
element.onpause = function(){ DKWARN("onpause"); };
element.onplay = function(){ DKWARN("onplay"); };
element.onplaying = function(){ DKWARN("onplaying"); };
element.onpointerdown = function(){ DKWARN("onpointerdown"); };
element.onpointermove = function(){ DKWARN("onpointermove"); };
element.onpointerup = function(){ DKWARN("onpointerup"); };
element.onpointercancel = function(){ DKWARN("onpointercancel"); };
element.onpointerover = function(){ DKWARN("onpointerover"); };
element.onpointerout = function(){ DKWARN("onpointerout"); };
element.onpointerenter = function(){ DKWARN("onpointerenter"); };
element.onpointerleave = function(){ DKWARN("onpointerleave"); };
element.onpointerlockchange = function(){ DKWARN("onpointerlockchange"); };
element.onpointerlockerror = function(){ DKWARN("onpointerlockerror"); };
element.onprogress = function(){ DKWARN("onprogress"); };
element.onratechange = function(){ DKWARN("onratechange"); };
element.onreset = function(){ DKWARN("onreset"); };
element.onresize = function(){ DKWARN("onresize"); };
element.onscroll = function(){ DKWARN("onscroll"); };
element.onseeked = function(){ DKWARN("onseeked"); };
element.onseeking = function(){ DKWARN("onseeking"); };
element.onselect = function(){ DKWARN("onselect"); };
element.onselectstart = function(){ DKWARN("onselectstart"); };
element.onselectionchange = function(){ DKWARN("onselectionchange"); };
element.onshow = function(){ DKWARN("onshow"); };
element.onsort = function(){ DKWARN("onsort "); };
element.onstalled = function(){ DKWARN("onstalled"); };
element.onsubmit = function(){ DKWARN("onsubmit"); };
element.onsuspend = function(){ DKWARN("onsuspend"); };
element.ontimeupdate = function(){ DKWARN("ontimeupdate"); };
element.onvolumechange = function(){ DKWARN("onvolumechange"); };
element.ontouchcancel = function(){ DKWARN("ontouchcancel"); };
element.ontouchend = function(){ DKWARN("ontouchend"); };
element.ontouchmove = function(){ DKWARN("ontouchmove"); };
element.ontouchstart = function(){ DKWARN("ontouchstart"); };
element.ontransitioncancel = function(){ DKWARN("ontransitioncancel"); };
element.ontransitionend = function(){ DKWARN("ontransitionend"); };
element.onwaiting = function(){ DKWARN("onwaiting"); };




//document.body.onclick = function(){ DKWARN("body clicked !!!!") }


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


