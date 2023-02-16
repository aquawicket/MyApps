function Tray_init(){
	CPP_DK_Create("DKTray");
	window.addEventListener("1000", Tray_onevent);
	window.addEventListener("1001", Tray_onevent);
	window.addEventListener("1002", Tray_onevent);
	window.addEventListener("click", Tray_onevent);
	window.addEventListener("doubleclick", Tray_onevent);
	
	CPP_DKTray_AddItem("Exit", 1002);
	CPP_DKTray_AddItem("Minimize", 1001);
	CPP_DKTray_AddItem("Restore", 1000);
	
	CPP_DKTray_SetTooltip("DKTray example");
	
	Tray_On();
	
	CPP_DKTray_ShowBalloon("DKTray");
}

function Tray_onevent(event){
	//DKDEBUGFUNC(event);
	if(event.type === "1000" || event.type === "doubleclick"){
		CPP_DK_Create("DKWindowJS");
		CPP_DKWindow_Show();
		DKTray_ShowBalloon("DKTray restored");
	}
	if(event.type === "1001"){
		CPP_DK_Create("DKWindowJS");
		CPP_DKWindow_Hide();
		DKTray_ShowBalloon("DKTray minimized");
	}
	if(event.type === "1002"){
		DK_Exit();
	}
	
	if(event.type === "click"){
		Tray_ToggleIcon();
		DKTray_ShowBalloon("DKTray clicked");
	}
}

function Tray_ToggleIcon(){
	var icon = DKTray_GetIcon();
	var file = DKFile_GetFilename(icon);
	console.log("current icon = "+file+"\n");
	if(file == "touchON.ico")
		Tray_Off();
	else
		Tray_On();
}

function Tray_On(){
	var assets = CPP_DKAssets_LocalAssets();
	CPP_DKTray_SetIcon(assets+"touchON.ico");
}

function Tray_Off(){
	var assets = CPP_DKAssets_LocalAssets();
	CPP_DKTray_SetIcon(assets+"touchOFF.ico");
}
