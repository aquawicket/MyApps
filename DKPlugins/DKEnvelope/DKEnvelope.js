//////////////////////////
function DKEnvelope_Init()
{
	DKCreate("DKEnvelope/DKEnvelope.html");
	DKAddEvent("printEnvelope", "click", DKEnvelope_OnEvent);
	DKAddEvent("returnAddress", "keyup", DKEnvelope_OnEvent);
	DKAddEvent("sendAddress", "keyup", DKEnvelope_OnEvent);
}

/////////////////////////
function DKEnvelope_End()
{
	DKClose("DKEnvelope/DKEnvelope.html");
}

//////////////////////////////////
function DKEnvelope_OnEvent(event)
{	
	DKLog("DKEnvelope_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");

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
}

///////////////////////////////////////////
function DKEnvelope_ReturnAddressAutofill()
{
	DKLog("DKEnvelope_ReturnAddressAutofill()\n", DKINFO);
	//TODO
}

/////////////////////////////////////////
function DKEnvelope_SendAddressAutofill()
{
	DKLog("DKEnvelope_SendAddressAutofill()\n", DKINFO);
	//TODO
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
	var sendAddress = DKWidget_GetValue("sendAddress");
	var str = DKFile_FileToString("sendAddresses.txt");
	var sendAddresses = str.split(";");
	if(sendAddresses.includes(sendAddress) == false){
		sendAddresses.push(sendAddress);
		var str2 = sendAddresses.join(";");
		DKFile_StringToFile(str2, "sendAddresses.txt");
	}
	
	var returnAddress = DKWidget_GetValue("returnAddress");
	var str = DKFile_FileToString("returnAddresses.txt");
	var returnAddresses = str.split(";");
	if(returnAddresses.includes(returnAddress) == false){
		returnAddresses.push(returnAddress);
		var str2 = returnAddresses.join(";");
		DKFile_StringToFile(str2, "returnAddresses.txt");
	}
}

///////////////////////////////////
function DKEnvelope_PrintEnvelope()
{
	DKLog("DKEnvelope_PrintEnvelope()");
	
	//Create the blank background
	var envelope_bg = DKWidget_CreateElement("body", "div", "envelope_background");
	DKWidget_SetProperty(envelope_bg, "position", "absolute");
	DKWidget_SetProperty(envelope_bg, "width", "100%");
	DKWidget_SetProperty(envelope_bg, "height", "100%");
	DKWidget_SetProperty(envelope_bg, "background-color", "rgb(200,200,200)");
	
	//Build the envelope and position it
	var envelope = DKWidget_CreateElement(envelope_bg, "div", "envelope");
	DKWidget_SetProperty(envelope, "position", "absolute");
	DKWidget_SetProperty(envelope, "top", "300rem");
	DKWidget_SetProperty(envelope, "left", "-10rem");
	DKWidget_SetProperty(envelope, "width", "800rem");
	DKWidget_SetProperty(envelope, "height", "300rem");
	DKWidget_SetProperty(envelope, "background-color", "rgb(255,255,255)");
	
	//mark the corners
	var x1 = DKWidget_CreateElement(envelope, "div", "x");
	DKWidget_SetProperty(x1, "position", "absolute");
	DKWidget_SetInnerHtml(x1, "x");
	
	var x2 = DKWidget_CreateElement(envelope, "div", "x");
	DKWidget_SetProperty(x2, "position", "absolute");
	DKWidget_SetProperty(x2, "bottom", "0");
	DKWidget_SetInnerHtml(x2, "x");
	
	var x3 = DKWidget_CreateElement(envelope, "div", "x");
	DKWidget_SetProperty(x3, "position", "absolute");
	DKWidget_SetProperty(x3, "right", "0");
	DKWidget_SetInnerHtml(x3, "x");
	
	var x4 = DKWidget_CreateElement(envelope, "div", "x");
	DKWidget_SetProperty(x4, "position", "absolute");
	DKWidget_SetProperty(x4, "bottom", "0");
	DKWidget_SetProperty(x4, "right", "0");
	DKWidget_SetInnerHtml(x4, "x");
	
	var returnAddress = DKWidget_CreateElement(envelope, "textarea", "returnAddress");
	//DKWidget_SetAttribute(returnAddress, "readOnly", "true");
	DKWidget_SetProperty(returnAddress, "position", "absolute");
	DKWidget_SetProperty(returnAddress, "top", "10rem");
	DKWidget_SetProperty(returnAddress, "left", "10rem");
	DKWidget_SetProperty(returnAddress, "width", "200rem");
	DKWidget_SetProperty(returnAddress, "height", "100rem");
	DKWidget_SetProperty(returnAddress, "border", "none");
	var val = DKWidget_GetValue("returnAddress");
	DKWidget_SetInnerHtml(returnAddress, val);
	
	var sendAddress = DKWidget_CreateElement(envelope, "textarea", "sendAddress");
	//DKWidget_SetAttribute(returnAddress, "readOnly", "true");
	DKWidget_SetProperty(sendAddress, "position", "absolute");
	DKWidget_SetProperty(sendAddress, "top", "80rem");
	DKWidget_SetProperty(sendAddress, "left", "250rem");
	DKWidget_SetProperty(sendAddress, "width", "200rem");
	DKWidget_SetProperty(sendAddress, "height", "100rem");
	DKWidget_SetProperty(sendAddress, "border", "none");
	var val = DKWidget_GetValue("sendAddress");
	DKWidget_SetInnerHtml(sendAddress, val);
	
	document.getElementById(envelope).rotate(-90);
	
	DoPrint(envelope_bg, function(){
		DKLog("finnished printing\n", DKINFO);
		DKWidget_RemoveElement(envelope_bg);
	});
}