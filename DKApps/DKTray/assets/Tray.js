/////////////////////
function Tray_Init()
{
	
	CPP_DK_Create("DKTray");
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
	
	DKTray_ShowBalloon("DKTray");
}

////////////////////////////
function Tray_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Type(event, "1000") || DK_Type(event, "doubleclick")){
		CPP_DK_Create("DKWindowJS");
		CPP_DKWindow_Show();
		DKTray_ShowBalloon("DKTray restored");
	}
	if(DK_Type(event, "1001")){
		CPP_DK_Create("DKWindowJS");
		CPP_DKWindow_Hide();
		DKTray_ShowBalloon("DKTray minimized");
	}
	if(DK_Type(event, "1002")){
		DK_Exit();
	}
	
	if(DK_Type(event, "click")){
		Tray_ToggleIcon();
		DKTray_ShowBalloon("DKTray clicked");
	}
}

//////////////////////////
function Tray_ToggleIcon()
{
	
	var icon = DKTray_GetIcon();
	var file = DKFile_GetFilename(icon);
	console.log("current icon = "+file+"\n");
	
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
	
	var assets = DKAssets_LocalAssets();
	DKTray_SetIcon(assets+"touchON.ico");
}

///////////////////
function Tray_Off()
{
	
	var assets = DKAssets_LocalAssets();
	DKTray_SetIcon(assets+"touchOFF.ico");
}