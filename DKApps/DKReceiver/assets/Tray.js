/////////////////////
function Tray_Init()
{
	DKCreate("DKTray");
	DKAddEvent("DKTray", "Restore", Tray_OnEvent);
	DKAddEvent("DKTray", "Minimize", Tray_OnEvent);
	//DKAddEvent("DKTray", "Exit", Tray_OnEvent);
}

////////////////////////////
function Tray_OnEvent(event)
{
	//DKLog("DKTray_OnEvent("+event+") \n");
	if(DK_Type(event, "Restore")){
		DKCreate("DKWindowJS");
		DKWindow_Restore();
	}
	if(DK_Type(event, "Minimize")){
		DKCreate("DKWindowJS");
		DKWindow_Minimize();
	}
}
