/////////////////////
function Tray_Init()
{
	DKCreate("DKTrayJS");
	DKCreate("DKFileJS");
	DKRegisterEvent("DKTray", "click", Tray_OnEvent);
	DKRegisterEvent("DKTray", "Restore", Tray_OnEvent);
	DKRegisterEvent("DKTray", "Minimize", Tray_OnEvent);
	DKRegisterEvent("DKTray", "Exit", Tray_OnEvent);
}

/////////////////////////////
function Tray_OnEvent(event)
{
	DKLog("DKTray_OnEvent("+event+") \n");
	if(DK_Type(event, "click")){
		var icon = DKTray_GetIcon();
		DKLog(icon+"\n");
		var file = DKFile_GetFilename(icon);
		DKLog(file+"\n");
	}
}
