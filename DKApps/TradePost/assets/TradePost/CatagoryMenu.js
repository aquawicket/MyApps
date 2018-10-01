/////////////////////////////
function CatagoryMenu_Init()
{
	//DKLog("CatagoryMenu_Init()\n");
	
	DKCreate("CatagoryMenu.html");
	DKAddEvent("GLOBAL", "mousedown", CatagoryMenu_OnEvent);
	DKAddEvent("Electronics", "mousedown", CatagoryMenu_OnEvent);
	DKAddEvent("Computers", "mousedown", CatagoryMenu_OnEvent);
	DKAddEvent("Cars", "mousedown", CatagoryMenu_OnEvent);
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
	//DKLog("CatagoryMenu_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(!DK_Id(event,"GLOBAL")){
		DKLog(DK_GetId(event)+"\n");
	}
	
	DKClose("CatagoryMenu.js");
}