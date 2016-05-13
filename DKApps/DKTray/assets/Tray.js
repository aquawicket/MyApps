/////////////////////
function Tray_Init()
{
	DKRegisterEvent("Tray", "click", Tray_OnEvent);
	DKRegisterEvent("Tray", "Restore", Tray_OnEvent);
	DKRegisterEvent("Tray", "Minimize", Tray_OnEvent);
	DKRegisterEvent("Tray", "Exit", Tray_OnEvent);
}

//////////////////////////////
function Tray_OnEvent(event)
{
	DKLog("DKTray_OnEvent("+event+") \n");
	if(DK_Type(event, "Tray")){
		var arry = DKWidget_GetValue(event).split(",");
		//DKTrigger_ProcessGui(arry[0], arry[1]);
	}
	if(DK_Type(event, "Restore")){
		DKLog("Tray Restore \n");
	}
}
