/////////////////////////////
function CatagoryMenu_Init()
{
	
	CPP_DK_Create("TradePost/CatagoryMenu.html");
	DKAddEvent("GLOBAL", "mousedown", CatagoryMenu_OnEvent);
	
	var elements = DKWidget_GetElements("TradePost/CatagoryMenu.html");
	var arry = elements .split(",");
	for(var i=0; i<arry.length-1; i++){
		DKAddEvent(arry[i], "mousedown", CatagoryMenu_OnEvent);
		console.log("added "+arry[i]+"\n")
	}
}

////////////////////////////
function CatagoryMenu_End()
{
	
	DKRemoveEvents(CatagoryMenu_OnEvent);
	DKClose("TradePost/CatagoryMenu.html");
}

/////////////////////////////////////
function CatagoryMenu_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(!DK_Id(event,"GLOBAL")){
		DKWidget_SetValue("catagory"+currentItem, DK_GetId(event));
		DKSendEvent("catagory"+currentItem, "change");
	}
	if(DK_Id(event,"none")){
		DKWidget_SetValue("catagory"+currentItem, "");
		DKSendEvent("catagory"+currentItem, "change");
	}
	
	DKClose("TradePost/CatagoryMenu.js");
}