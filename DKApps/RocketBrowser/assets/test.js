DKCreate("DKFile/DKFile.js", function(){});
DKCreate("DKWindow/DKWindow.js", function(){});
DKCreate("DKWidget/DKWidget.js", function(){});

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
myDiv.style.width = "100rem";
myDiv.style.height = "100rem";
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
myDiv2.style.width = "100rem";
myDiv2.style.height = "100rem";
myDiv2.style.backgroundColor = "red";
document.body.appendChild(myDiv2);
//myDiv2.addEventListener("click", function(){ console.warn("myDiv2 click"); });
//myDiv2.addEventListener("mouseover", function(){ console.warn("myDiv2: mouseover"); });
//myDiv2.addEventListener("mouseout", function(){ console.warn("myDiv2: mouseout"); });


//objectMap.print();

var divs = document.getElementsByTagName("div");
console.warn(String(divs.length));
console.warn(divs[0].id);
console.warn(divs[0].myVal);

function myDivClicked(){
	console.warn("myDiv clicked!!!!!!!!!!!");
}

//allert("test error");

var myImg = document.createElement("img");
myImg.id = "myImg";
myImg.style.position = "absolute";
myImg.style.top = "300px";
myImg.style.left = "110px";
myImg.style.width = "100rem";
myImg.style.height = "100rem";
myImg.src = "image.gif";
document.body.appendChild(myImg);


DKAddEvent("myImg", "click", Test_OnEvent);
////////////////////////////
function Test_OnEvent(event)
{
	console.warn("Test_OnEvent fired");
}
//DKRemoveEvent("myImg", "click", Test_OnEvent);


DKCreate("myapp.js", function(){});

var test_attrib = myImg.dummy;
console.warn(test_attrib);


DKCreate("DKNotepad/DKNotepad.js", function(){
	//DKCreate("DKGui/DKFrame.js", function(){
		//DKFrame_Widget("DKNotepad/DKNotepad.html");
	//})
});

/*
//myDiv.onclick = myDivClicked;
//myDiv.onclick();
*/

// Test custom event
/*
function OnPrinterStateChanged(){
    var evt = {};
	evt.type = 'printerstatechanged';
    window.dispatchEvent(evt);
}

window.addEventListener('printerstatechanged', function(){
	console.warn("printerstatechanged")
});
OnPrinterStateChanged();
*/

/*
var element = myDiv;

element.onabort = function(){ console.warn("onabort"); };
element.onanimationcancel = function(){ console.warn("onanimationcancel"); };
element.onanimationend = function(){ console.warn("onanimationend"); };
element.onanimationiteration = function(){ console.warn("onanimationiteration"); };
element.onanimationstart = function(){ console.warn("onanimationstart"); };
element.onauxclick = function(){ console.warn("onauxclick"); };
element.onblur = function(){ console.warn("onblur"); };
element.onerror = function(){ console.warn("onerror"); };
element.onfocus = function(){ console.warn("onfocus"); };
element.oncanplay = function(){ console.warn("oncanplay"); };
element.oncanplaythrough = function(){ console.warn("oncanplaythrough"); };
element.onchange = function(){ console.warn("onchange"); };
element.onclick = function(){ console.warn("onclick"); };
element.onclose = function(){ console.warn("onclose"); };
element.oncontextmenu = function(){ console.warn("oncontextmenu"); };
element.oncuechange = function(){ console.warn("oncuechange"); };
element.ondblclick = function(){ console.warn("ondblclick"); };
element.ondrag = function(){ console.warn("ondrag"); };
element.ondragend = function(){ console.warn("ondragend"); };
element.ondragenter = function(){ console.warn("ondragenter"); };
element.ondragexit = function(){ console.warn("ondragexit"); };
element.ondragleave = function(){ console.warn("ondragleave"); };
element.ondragover = function(){ console.warn("ondragover"); };
element.ondragstart = function(){ console.warn("ondragstart"); };
element.ondrop = function(){ console.warn("ondrop"); };
element.ondurationchange = function(){ console.warn("ondurationchange"); };
element.onemptied = function(){ console.warn("onemptied"); };
element.onended = function(){ console.warn("onended"); };
element.ongotpointercapture = function(){ console.warn("ongotpointercapture"); };
element.oninput = function(){ console.warn("oninput"); };
element.oninvalid = function(){ console.warn("oninvalid"); };
element.onkeydown = function(){ console.warn("onkeydown"); };
element.onkeypress = function(){ console.warn("onkeypress"); };
element.onkeyup = function(){ console.warn("onkeyup"); };
element.onload = function(){ console.warn("onload"); };
element.onloadeddata = function(){ console.warn("onloadeddata"); };
element.onloadedmetadata = function(){ console.warn("onloadedmetadata"); };
element.onloadend = function(){ console.warn("onloadend"); };
element.onloadstart = function(){ console.warn("onloadstart"); };
element.onlostpointercapture = function(){ console.warn("onlostpointercapture"); };
element.onmousedown = function(){ console.warn("onmousedown"); };
element.onmouseenter = function(){ console.warn("onmouseenter"); };
element.onmouseleave = function(){ console.warn("onmouseleave"); };
element.onmousemove = function(){ console.warn("onmousemove"); };
element.onmouseout = function(){ console.warn("onmouseout"); };
element.onmouseover = function(){ console.warn("onmouseover"); };
element.onmouseup = function(){ console.warn("onmouseup"); };
element.onmousewheel = function(){ console.warn("onmousewheel"); };
element.onwheel = function(){ console.warn("onwheel"); };
element.onpause = function(){ console.warn("onpause"); };
element.onplay = function(){ console.warn("onplay"); };
element.onplaying = function(){ console.warn("onplaying"); };
element.onpointerdown = function(){ console.warn("onpointerdown"); };
element.onpointermove = function(){ console.warn("onpointermove"); };
element.onpointerup = function(){ console.warn("onpointerup"); };
element.onpointercancel = function(){ console.warn("onpointercancel"); };
element.onpointerover = function(){ console.warn("onpointerover"); };
element.onpointerout = function(){ console.warn("onpointerout"); };
element.onpointerenter = function(){ console.warn("onpointerenter"); };
element.onpointerleave = function(){ console.warn("onpointerleave"); };
element.onpointerlockchange = function(){ console.warn("onpointerlockchange"); };
element.onpointerlockerror = function(){ console.warn("onpointerlockerror"); };
element.onprogress = function(){ console.warn("onprogress"); };
element.onratechange = function(){ console.warn("onratechange"); };
element.onreset = function(){ console.warn("onreset"); };
element.onresize = function(){ console.warn("onresize"); };
element.onscroll = function(){ console.warn("onscroll"); };
element.onseeked = function(){ console.warn("onseeked"); };
element.onseeking = function(){ console.warn("onseeking"); };
element.onselect = function(){ console.warn("onselect"); };
element.onselectstart = function(){ console.warn("onselectstart"); };
element.onselectionchange = function(){ console.warn("onselectionchange"); };
element.onshow = function(){ console.warn("onshow"); };
element.onsort = function(){ console.warn("onsort "); };
element.onstalled = function(){ console.warn("onstalled"); };
element.onsubmit = function(){ console.warn("onsubmit"); };
element.onsuspend = function(){ console.warn("onsuspend"); };
element.ontimeupdate = function(){ console.warn("ontimeupdate"); };
element.onvolumechange = function(){ console.warn("onvolumechange"); };
element.ontouchcancel = function(){ console.warn("ontouchcancel"); };
element.ontouchend = function(){ console.warn("ontouchend"); };
element.ontouchmove = function(){ console.warn("ontouchmove"); };
element.ontouchstart = function(){ console.warn("ontouchstart"); };
element.ontransitioncancel = function(){ console.warn("ontransitioncancel"); };
element.ontransitionend = function(){ console.warn("ontransitionend"); };
element.onwaiting = function(){ console.warn("onwaiting"); };
*/



//document.body.onclick = function(){ console.warn("body clicked !!!!") }


//allert("this will error");  
	  
	  
//objectMap.print();
//var ele = document.getElementById("myDiv");
//console.warn("ele = "+ele+"\n");

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

