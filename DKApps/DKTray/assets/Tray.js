/////////////////////
function Tray_Init()
{
	//Attempt to extend DKTray
	DKAddEvent("DKTray", "click", Tray_OnEvent);
	Tray_On();
}

////////////////////////////
function Tray_OnEvent(event)
{
	DKLog("Tray_OnEvent("+event+")\n");
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
