/////////////////////////////
function ConditionMenu_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("TradePost/ConditionMenu.html");
	DKAddEvent("GLOBAL", "mousedown", ConditionMenu_OnEvent);
	
	var elements = DKWidget_GetElements("TradePost/ConditionMenu.html");
	var arry = elements .split(",");
	for(var i=0; i<arry.length-1; i++){
		DKAddEvent(arry[i], "mousedown", ConditionMenu_OnEvent);
		console.log("added "+arry[i]+"\n")
	}
}

////////////////////////////
function ConditionMenu_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(ConditionMenu_OnEvent);
	DKClose("TradePost/ConditionMenu.html");
}

/////////////////////////////////////
function ConditionMenu_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(!DK_Id(event,"GLOBAL")){
		DKWidget_SetValue("condition"+currentItem, DK_GetId(event));
		DKSendEvent("condition"+currentItem, "change");
	}
	if(DK_Id(event,"none")){
		DKWidget_SetValue("condition"+currentItem, "");
		DKSendEvent("condition"+currentItem, "change");
	}
	
	DKClose("TradePost/ConditionMenu.js");
}