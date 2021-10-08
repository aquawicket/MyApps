/////////////////////
function Tray_Init()
{
	
	CPP_DK_Create("DKTray");
	DKAddEvent("DKTray", "click", Tray_OnEvent);
	DKAddEvent("DKTray", "Restore", Tray_OnEvent);
	DKAddEvent("DKTray", "Minimize", Tray_OnEvent);
	DKAddEvent("DKTray", "Exit", Tray_OnEvent);
	Tray_Off();
}

////////////////////////////
function Tray_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Type(event, "click")){
		Tray_ToggleIcon();
	}
}

//////////////////////////
function Tray_ToggleIcon()
{
	
	var icon = DKTray_GetIcon();
	var file = DKFile_GetFilename(icon);
	//console.log(file+"\n");
	
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
	
	console.log("ON\n");
	var datapath = DKAssets_GetDataPath();
	DKTray_SetIcon(datapath+"touchON.ico");
	DK_Execute(datapath+"DevManView.exe /enable \"HID-compliant touch screen\"");
}

///////////////////
function Tray_Off()
{
	
	console.log("OFF\n");
	var datapath = DKAssets_GetDataPath();
	DKTray_SetIcon(datapath+"touchOFF.ico");
	DK_Execute(datapath+"DevManView.exe /disable \"HID-compliant touch screen\"");
}
