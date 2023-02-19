var tray

function Tray_init(){
	DKPlugin("DKTray");
	tray = new Tray();
	
	tray.addEventListener("1003", Tray_onevent);
	tray.addEventListener("1004", Tray_onevent);
		
	tray.addItem("Record", 1003);
	tray.addItem("Stop", 1004);
	
	tray.setTooltip("DKScreenRecorder");	
	tray.showBalloon("DKScreenRecorder");
}

function Tray_onevent(event){
	//DKDEBUGFUNC(event);
	if(event.type === "1003"){
		console.log("Clicked Tray -> Record\n");
		CPP_DKScreenRecorder_Record("video.avi"); //Record the screen to a file.
	}
	if(event.type === "1004"){
		console.log("Clicked Tray -> Stop\n");
		CPP_DKScreenRecorder_Stop();
	}
}


/////////////////////////////////////////////
function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	DKPlugin("DKScreenRecorder");	
}

myapp.loadApp = function myapp_loadApp() {
	Tray_init()
}
//////////////////////////////////////////////