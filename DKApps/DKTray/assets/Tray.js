var tray

function Tray_init(){
	dk.create("DKTray");
	tray = new Tray();
	tray.addEventListener("1000", Tray_onevent);
	tray.addEventListener("1001", Tray_onevent);
	tray.addEventListener("1002", Tray_onevent);
	tray.addEventListener("click", Tray_onevent);
	tray.addEventListener("doubleclick", Tray_onevent);
	
	tray.addItem("Exit", 1002);
	tray.addItem("Minimize", 1001);
	tray.addItem("Restore", 1000);
	
	tray.setTooltip("DKTray example");
	
	Tray_On();
	
	tray.showBalloon("DKTray");
}

function Tray_onevent(event){
	//DKDEBUGFUNC(event);
	if(event.type === "1000" || event.type === "doubleclick"){
		CPP_DK_Create("DKWindowJS");
		CPP_DKWindow_Show();
		tray.showBalloon("DKTray restored");
	}
	if(event.type === "1001"){
		CPP_DK_Create("DKWindowJS");
		CPP_DKWindow_Hide();
		tray.showBalloon("DKTray minimized");
	}
	if(event.type === "1002"){
		DK_Exit();
	}
	
	if(event.type === "click"){
		Tray_ToggleIcon();
		tray.showBalloon("DKTray clicked");
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
	tray.setIcon(assets+"touchON.ico");
}

function Tray_Off(){
	var assets = CPP_DKAssets_LocalAssets();
	tray.setIcon(assets+"touchOFF.ico");
}
