/////////////////////
function Tray_Init()
{
	DKCreate("DKTray");
	DKAddEvent("DKTray", "1000", Tray_OnEvent);
	DKAddEvent("DKTray", "1001", Tray_OnEvent);
	DKAddEvent("DKTray", "1002", Tray_OnEvent);
	DKAddEvent("DKTray", "click", Tray_OnEvent);
	DKAddEvent("DKTray", "doubleclick", Tray_OnEvent);
	
	DKTray_AddItem("Exit", 1002);
	DKTray_AddItem("Minimize", 1001);
	DKTray_AddItem("Restore", 1000);
	
	DKTray_SetTooltip("DKTray example");
	
	Tray_On();
}

////////////////////////////
function Tray_OnEvent(event)
{
	DKLog("Tray_OnEvent("+event+")\n");
	
	if(DK_Type(event, "1000") || DK_Type(event, "doubleclick")){
		DKCreate("DKWindowJS");
		DKWindow_Show();
	}
	if(DK_Type(event, "1001")){
		DKCreate("DKWindowJS");
		DKWindow_Hide();
	}
	if(DK_Type(event, "1002")){
		DK_Exit();
	}
	
	if(DK_Type(event, "click")){
		Tray_ToggleIcon();
	}
}

//////////////////////////
function Tray_ToggleIcon()
{
	var icon = DKTray_GetIcon();
	var file = DKFile_GetFilename(icon);
	DKLog("current icon = "+file+"\n", DKINFO);
	
	if(file == "touchON.ico"){
		Tray_Off();
	}
	else{
		Tray_On();
	}
}

//////////////////
function Tray_On()
{
	DKLog("Tray_On()\n", DKINFO);
	var assets = DKAssets_LocalAssets();
	DKTray_SetIcon(assets+"touchON.ico");
}

///////////////////
function Tray_Off()
{
	DKLog("Tray_Off()\n", DKINFO);
	var assets = DKAssets_LocalAssets();
	DKTray_SetIcon(assets+"touchOFF.ico");
}
