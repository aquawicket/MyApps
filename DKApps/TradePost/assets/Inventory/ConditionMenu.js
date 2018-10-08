/////////////////////////////
function ConditionMenu_Init()
{
	DKLog("ConditionMenu_Init()\n", DKDEBUG);
	DKCreate("TradePost/ConditionMenu.html");
	DKAddEvent("GLOBAL", "mousedown", ConditionMenu_OnEvent);
	
	var elements = DKWidget_GetElements("TradePost/ConditionMenu.html");
	var arry = elements .split(",");
	for(var i=0; i<arry.length-1; i++){
		DKAddEvent(arry[i], "mousedown", ConditionMenu_OnEvent);
		DKLog("added "+arry[i]+"\n")
	}
}

////////////////////////////
function ConditionMenu_End()
{
	DKLog("ConditionMenu_End()\n", DKDEBUG);
	DKRemoveEvents(ConditionMenu_OnEvent);
	DKClose("TradePost/ConditionMenu.html");
}

/////////////////////////////////////
function ConditionMenu_OnEvent(event)
{
	DKLog("ConditionMenu_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
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