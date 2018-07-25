//////////////////////////
function DKEnvelope_Init()
{
	DKCreate("DKEnvelope/DKEnvelope.html", function(){
		DKAddEvent("printEnvelope", "click", DKEnvelope_OnEvent);
		DKAddEvent("returnAddress", "keyup", DKEnvelope_OnEvent);
		DKAddEvent("sendAddress", "keyup", DKEnvelope_OnEvent);
		DKEnvelope_SetDefaultReturnAddress();
	});
}

/////////////////////////
function DKEnvelope_End()
{
	DKClose("DKEnvelope/DKEnvelope.html");
}

//////////////////////////////////
function DKEnvelope_OnEvent(event)
{	
	//DKLog("DKEnvelope_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");

	if(DK_Id(event, "printEnvelope")){
		DKEnvelope_SaveAddresses();
		DKEnvelope_PrintEnvelope();
	}
	if(DK_Id(event, "returnAddress")){
		DKEnvelope_ReturnAddressAutofill();
	}
	if(DK_Id(event, "sendAddress")){
		
		DKEnvelope_SendAddressAutofill();
	}
	if(DK_Id(event, "autofill")){
		var val = DKWidget_GetInnerHtml("autofill");
		document.getElementById("sendAddress").value = val;
		DKWidget_RemoveElement("autofill");
	}
}

/////////////////////////////////////////////
function DKEnvelope_SetDefaultReturnAddress()
{
	var str = DKFile_FileToString("returnAddresses.txt");
	if(!str){ return; }
	var returnAddresses = str.split(";");
	DKWidget_SetInnerHtml("returnAddress", returnAddresses[1]);
}

///////////////////////////////////////////
function DKEnvelope_ReturnAddressAutofill()
{
	//DKLog("DKEnvelope_ReturnAddressAutofill()\n", DKINFO);
	//TODO
}

/////////////////////////////////////////
function DKEnvelope_SendAddressAutofill()
{
	//DKLog("DKEnvelope_SendAddressAutofill()\n", DKINFO);
	
	//Polyfill
	if(!String.prototype.includes){
		String.prototype.includes = function(search, start){
			'use strict';
			if(typeof start !== 'number'){
				start = 0;
			}
			if (start + search.length > this.length){
				return false;
			} 
			else{
				return this.indexOf(search, start) !== -1;
			}
		};
	}
	
	var str = DKFile_FileToString("sendAddresses.txt");
	if(!str){ return; }
	var sendAddresses = str.split(";");
	
	//Check for partial match for beginning of string
	var sendAddress = DKWidget_GetValue("sendAddress");
	if(!sendAddress){
		DKEnvelope_CreateSendAutofill("");
		return;
	}
	for(var i=0; i<sendAddresses.length; i++){
		if(sendAddresses[i].toLowerCase().indexOf(sendAddress.toLowerCase()) == 0){
			DKEnvelope_CreateSendAutofill(sendAddresses[i]);
			return;
		}
	}
	
	DKEnvelope_CreateSendAutofill("");
}

///////////////////////////////////////////////
function DKEnvelope_CreateSendAutofill(address)
{
	//DKLog(address+"\n", DKINFO);
	
	DKWidget_RemoveElement("autofill");
	
	var autofill = DKWidget_CreateElement("envelope", "div", "autofill");
	DKWidget_SetProperty(autofill, "position", "absolute");
	DKWidget_SetProperty(autofill, "bottom", "172rem");
	DKWidget_SetProperty(autofill, "left", "300rem");
	DKWidget_SetProperty(autofill, "background-color", "rgb(200,200,200)");
	DKWidget_SetInnerHtml(autofill, address);
	DKAddEvent("autofill", "click", DKEnvelope_OnEvent);
}

/////////////////////////////////////
Object.prototype.rotate = function(d)
{
    var s = "rotate(" + d + "deg)";
    if(this.style){ // regular DOM Object
        this.style.MozTransform = s
        this.style.WebkitTransform = s;
        this.style.OTransform = s;
        this.style.transform = s;
    } 
	else if (this.css){ // JQuery Object
        this.css("-moz-transform", s);
        this.css("-webkit-transform", s);
        this.css("-0-transform", s);
        this.css("transform", s);
    }
    this.setAttribute("rotation", d);
}

///////////////////////////////
function DoPrint(ele, callback)
{
	var str = DKWidget_GetElements("body");
	var elems = str.split(",");
	for(var i=0; i<elems.length; i++){
		if(ele != elems[i]){
			DKWidget_Hide(elems[i]);
		}
	}
	
    window.print();
    setTimeout(function(){ 
		for(var i=0; i<elems.length; i++){
			DKWidget_Show(elems[i]);
		}
		callback(); 
	}, 100);
}

///////////////////////////////////
function DKEnvelope_SaveAddresses()
{
	//DKLog("DKEnvelope_SaveAddresses()\n", DKINFO);
	//DKLog("absolutepath = "+absolutepath+"\n", DKINFO);
	
	//Polyfill for Internet Explorer
	if(!Array.prototype.includes){
		Array.prototype.includes = function(searchElement, fromIndex){
			'use strict';
			if(this == null){
				throw new TypeError('"this" is null or not defined');
			}
			var o = Object(this);
			var len = o.length >>> 0;
			if(len === 0){
				return false;
			}
			var n = fromIndex | 0;
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
			function sameValueZero(x, y){
				return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
			}
			while(k < len){
				if(sameValueZero(o[k], searchElement)){
					return true;
				}
				k++;
			}
			return false;
		};
	}

	var sendAddress = DKWidget_GetValue("sendAddress");
	var str = DKFile_FileToString("sendAddresses.txt");
	if(!str){ str = ""; }
	var sendAddresses = str.split(";");
	if(sendAddresses.includes(sendAddress) == false){
		sendAddresses.push(sendAddress);
		var str2 = sendAddresses.join(";");
		DKFile_StringToFile(str2, "sendAddresses.txt");
	}
	
	var returnAddress = DKWidget_GetValue("returnAddress");
	var str = DKFile_FileToString("returnAddresses.txt");
	if(!str){ str = ""; }
	var returnAddresses = str.split(";");
	if(returnAddresses.includes(returnAddress) == false){
		returnAddresses.push(returnAddress);
		var str2 = returnAddresses.join(";");
		DKFile_StringToFile(str2, "returnAddresses.txt");
	}
}

///////////////////////////////////
function DKEnvelope_Rotate(elem, d)
{
	var ele = document.getElementById(elem);
	var s = "rotate(" + d + "deg)";
	if(ele.style){ // regular DOM Object
		ele.style.MozTransform = s
		ele.style.WebkitTransform = s;
		ele.style.OTransform = s;
		ele.style.transform = s;
		
		if(d >= 0){
			var rotation = Math.PI * d / 180;
		}
		else{
			var rotation = Math.PI * (360+d) / 180;
		}
	
		var c = Math.cos(rotation);
		var s = Math.sin(rotation);
		ele.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+c+",M12="+(-s)+",M21="+s+",M22="+c+",SizingMethod='auto expand')";
	} 
	else if(ele.css){ // JQuery Object
		ele.css("-moz-transform", s);
		ele.css("-webkit-transform", s);
		ele.css("-0-transform", s);
		ele.css("transform", s);
	}
	ele.setAttribute("rotation", d);
}
	
	
///////////////////////////////////
function DKEnvelope_PrintEnvelope()
{
	//DKLog("DKEnvelope_PrintEnvelope()");
	
	//Create the blank background
	var envelope_bg = DKWidget_CreateElement("body", "div", "envelope_background");
	DKWidget_SetProperty(envelope_bg, "position", "absolute");
	DKWidget_SetProperty(envelope_bg, "width", "100%");
	DKWidget_SetProperty(envelope_bg, "height", "100%");
	DKWidget_SetProperty(envelope_bg, "background-color", "rgb(200,200,200)");
	
	//Build the envelope and position it
	var envelope = DKWidget_CreateElement(envelope_bg, "div", "envelope");
	DKWidget_SetProperty(envelope, "position", "absolute");
	DKWidget_SetProperty(envelope, "top", "260rem");
	DKWidget_SetProperty(envelope, "left", "-80rem");
	DKWidget_SetProperty(envelope, "width", "870rem");
	DKWidget_SetProperty(envelope, "height", "350rem");
	DKWidget_SetProperty(envelope, "background-color", "rgb(255,255,255)");
	
	//mark the corners
	//var x1 = DKWidget_CreateElement(envelope, "div", "x");
	//DKWidget_SetProperty(x1, "position", "absolute");
	//DKWidget_SetInnerHtml(x1, "x");
	
	//var x2 = DKWidget_CreateElement(envelope, "div", "x");
	//DKWidget_SetProperty(x2, "position", "absolute");
	//DKWidget_SetProperty(x2, "bottom", "0");
	//DKWidget_SetInnerHtml(x2, "x");
	
	//var x3 = DKWidget_CreateElement(envelope, "div", "x");
	//DKWidget_SetProperty(x3, "position", "absolute");
	//DKWidget_SetProperty(x3, "right", "0");
	//DKWidget_SetInnerHtml(x3, "x");
	
	//var x4 = DKWidget_CreateElement(envelope, "div", "x");
	//DKWidget_SetProperty(x4, "position", "absolute");
	//DKWidget_SetProperty(x4, "bottom", "0");
	//DKWidget_SetProperty(x4, "right", "0");
	//DKWidget_SetInnerHtml(x4, "x");
	
	var returnAddress = DKWidget_CreateElement(envelope, "textarea", "returnAddress");
	//DKWidget_SetAttribute(returnAddress, "readOnly", "true");
	DKWidget_SetProperty(returnAddress, "position", "absolute");
	DKWidget_SetProperty(returnAddress, "top", "10rem");
	DKWidget_SetProperty(returnAddress, "left", "10rem");
	DKWidget_SetProperty(returnAddress, "width", "300rem");
	DKWidget_SetProperty(returnAddress, "height", "100rem");
	DKWidget_SetProperty(returnAddress, "border", "none");
	DKWidget_SetProperty(returnAddress, "overflow", "hidden");
	DKWidget_SetProperty(returnAddress, "font-family", "arial");
	var val = DKWidget_GetValue("returnAddress");
	DKWidget_SetInnerHtml(returnAddress, val);
	
	var sendAddress = DKWidget_CreateElement(envelope, "textarea", "sendAddress");
	//DKWidget_SetAttribute(returnAddress, "readOnly", "true");
	DKWidget_SetProperty(sendAddress, "position", "absolute");
	DKWidget_SetProperty(sendAddress, "top", "170rem");
	DKWidget_SetProperty(sendAddress, "left", "350rem");
	DKWidget_SetProperty(sendAddress, "width", "300rem");
	DKWidget_SetProperty(sendAddress, "height", "100rem");
	DKWidget_SetProperty(sendAddress, "border", "none");
	DKWidget_SetProperty(sendAddress, "overflow", "hidden");
	DKWidget_SetProperty(sendAddress, "font-family", "arial");
	var val = DKWidget_GetValue("sendAddress");
	DKWidget_SetInnerHtml(sendAddress, val);
	
	DKEnvelope_Rotate(envelope, -90);

	DoPrint(envelope_bg, function(){
		DKWidget_RemoveElement(envelope_bg);
	});
}