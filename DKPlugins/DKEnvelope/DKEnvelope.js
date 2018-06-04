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

Object.prototype.rotate = function(d) {
    var s = "rotate(" + d + "deg)";
    if (this.style) { // regular DOM Object
        this.style.MozTransform = s
        this.style.WebkitTransform = s;
        this.style.OTransform = s;
        this.style.transform = s;
    } else if (this.css) { // JQuery Object
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
	var ele = DKWidget_CreateElement("body", "div", "envelope_background");
	DKWidget_SetProperty(ele, "position", "absolute");
	DKWidget_SetProperty(ele, "width", "100%");
	DKWidget_SetProperty(ele, "height", "100%");
	DKWidget_SetProperty(ele, "background-color", "rgb(255,255,255)");
	DKWidget_SetProperty(ele, "z-index", "100");
	
	//Build the envelope and position it
	var ele2 = DKWidget_CreateElement(ele, "div", "envelope");
	DKWidget_SetProperty(ele2, "position", "absolute");
	DKWidget_SetProperty(ele2, "top", "300rem");
	DKWidget_SetProperty(ele2, "left", "-10rem");
	DKWidget_SetProperty(ele2, "width", "800rem");
	DKWidget_SetProperty(ele2, "height", "300rem");
	DKWidget_SetProperty(ele2, "background-color", "rgb(200,200,200)");
	DKWidget_SetProperty(ele2, "z-index", "101");
	
	//mark the corners
	var x1 = DKWidget_CreateElement(ele2, "div", "x");
	DKWidget_SetProperty(x1, "position", "absolute");
	DKWidget_SetInnerHtml(x1, "x");
	
	var x2 = DKWidget_CreateElement(ele2, "div", "x");
	DKWidget_SetProperty(x2, "position", "absolute");
	DKWidget_SetProperty(x2, "bottom", "0");
	DKWidget_SetInnerHtml(x2, "x");
	
	var x3 = DKWidget_CreateElement(ele2, "div", "x");
	DKWidget_SetProperty(x3, "position", "absolute");
	DKWidget_SetProperty(x3, "right", "0");
	DKWidget_SetInnerHtml(x3, "x");
	
	var x4 = DKWidget_CreateElement(ele2, "div", "x");
	DKWidget_SetProperty(x4, "position", "absolute");
	DKWidget_SetProperty(x4, "bottom", "0");
	DKWidget_SetProperty(x4, "right", "0");
	DKWidget_SetInnerHtml(x4, "x");
	
	/*
	var ele3 = DKWidget_CreateElement(ele2, "textarea", "returnAddress");
	DKWidget_SetProperty(ele3, "position", "absolute");
	DKWidget_SetProperty(ele3, "top", "10rem");
	DKWidget_SetProperty(ele3, "left", "10rem");
	DKWidget_SetProperty(ele3, "width", "200rem");
	DKWidget_SetProperty(ele3, "height", "100rem");
	DKWidget_SetProperty(ele3, "z-index", "102");
	DKWidget_SetInnerHtml(ele3, "test");
	
	var ele4 = DKWidget_CreateElement(ele2, "textarea", "sendAddress");
	DKWidget_SetProperty(ele4, "position", "absolute");
	DKWidget_SetProperty(ele4, "top", "80rem");
	DKWidget_SetProperty(ele4, "left", "250rem");
	DKWidget_SetProperty(ele4, "width", "200rem");
	DKWidget_SetProperty(ele4, "height", "100rem");
	DKWidget_SetProperty(ele4, "z-index", "102");
	DKWidget_SetInnerHtml(ele4, "test2");
	*/
	
	document.getElementById(ele2).rotate(-90);
	
	DoPrint(function(){
		DKLog("finnished printing\n", DKINFO);
		DKWidget_RemoveElement(ele);
		DKWidget_Show("DKGui/Desktop.html");
		DKWidget_Show("DKGui/Taskbar.html");
	});
}