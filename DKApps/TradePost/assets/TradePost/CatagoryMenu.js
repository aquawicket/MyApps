/////////////////////////////
function CatagoryMenu_Init()
{
	//DKLog("CatagoryMenu_Init()\n");
	
	DKCreate("CatagoryMenu.html");
	DKAddEvent("GLOBAL", "mousedown", CatagoryMenu_OnEvent);
	
	var elements = DKWidget_GetElements("CatagoryMenu.html");
	var arry = elements .split(",");
	for(var i=0; i<arry.length; i++){
		DKAddEvent(arry[i], "mousedown", CatagoryMenu_OnEvent);
		DKLog("added "+arry[i]+"\n")
	}
}

////////////////////////////
function CatagoryMenu_End()
{
	//DKLog("CatagoryMenu_End()\n");
	
	DKRemoveEvents(CatagoryMenu_OnEvent);
	DKClose("CatagoryMenu.html");
}

/////////////////////////////////////
function CatagoryMenu_OnEvent(event)
{
	DKLog("CatagoryMenu_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(!DK_Id(event,"GLOBAL")){
		DKLog(DK_GetId(event)+"\n");
		DKWidget_SetValue("catagory"+UploadId, DK_GetId(event));
		DKSendEvent("catagory"+UploadId, "change");
	}
	
	DKClose("CatagoryMenu.js");
}