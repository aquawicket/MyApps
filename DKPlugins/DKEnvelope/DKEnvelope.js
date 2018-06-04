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
	DKWidget_SetProperty(ele2, "top", "100rem");
	DKWidget_SetProperty(ele2, "left", "200rem");
	DKWidget_SetProperty(ele2, "width", "300rem");
	DKWidget_SetProperty(ele2, "height", "600rem");
	DKWidget_SetProperty(ele2, "background-color", "rgb(200,200,200)");
	DKWidget_SetProperty(ele2, "z-index", "101");
	
	DKWidget_SetInnerHtml(ele2, "test");
	
	DKCef_Print();
	
	//DKWidget_RemoveElement(ele);
	//DKWidget_Show("DKGui/Desktop.html");
	//DKWidget_Show("DKGui/Taskbar.html");
	
}