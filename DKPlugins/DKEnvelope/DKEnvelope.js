//////////////////////////
function DKEnvelope_Init()
{
	DKCreate("DKEnvelope/DKEnvelope.html");
	DKAddEvent("printEnvelope", "click", DKEnvelope_OnEvent);
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
		DKEnvelope_PrintEnvelope();
	}
}

//////////////////////////////////////
Object.prototype.rotate = function(d){
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

//////////////////////////
function DoPrint(callback)
{
    window.print();
    setTimeout(function(){ callback(); }, 100);
}

///////////////////////////////////
function DKEnvelope_PrintEnvelope()
{
	DKLog("DKEnvelope_PrintEnvelope()");
	DKWidget_Hide("DKGui/Desktop.html");
	DKWidget_Hide("DKGui/Taskbar.html");
	
	//Create the blank background
	var envelope_bg = DKWidget_CreateElement("body", "div", "envelope_background");
	DKWidget_SetProperty(envelope_bg, "position", "absolute");
	DKWidget_SetProperty(envelope_bg, "width", "100%");
	DKWidget_SetProperty(envelope_bg, "height", "100%");
	DKWidget_SetProperty(envelope_bg, "background-color", "rgb(200,200,200)");
	DKWidget_SetProperty(envelope_bg, "z-index", "100");
	
	//Build the envelope and position it
	var envelope = DKWidget_CreateElement(envelope_bg, "div", "envelope");
	DKWidget_SetProperty(envelope, "position", "absolute");
	DKWidget_SetProperty(envelope, "top", "300rem");
	DKWidget_SetProperty(envelope, "left", "-10rem");
	DKWidget_SetProperty(envelope, "width", "800rem");
	DKWidget_SetProperty(envelope, "height", "300rem");
	DKWidget_SetProperty(envelope, "background-color", "rgb(255,255,255)");
	DKWidget_SetProperty(envelope, "z-index", "101");
	
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
	DKWidget_SetProperty(returnAddress, "z-index", "102");
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
	DKWidget_SetProperty(sendAddress, "z-index", "102");
	var val = DKWidget_GetValue("sendAddress");
	DKWidget_SetInnerHtml(sendAddress, val);
	
	document.getElementById(envelope).rotate(-90);
	
	DoPrint(function(){
		DKLog("finnished printing\n", DKINFO);
		DKWidget_RemoveElement(envelope_bg);
		DKWidget_Show("DKGui/Desktop.html");
		DKWidget_Show("DKGui/Taskbar.html");
	});
}