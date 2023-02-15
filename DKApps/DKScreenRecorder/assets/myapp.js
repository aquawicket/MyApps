function app_onevent(event){
	//DKDEBUGFUNC(event);
	if(event.type === "1003"){ //Tray, Fullscreen
		console.log("Clicked Tray -> Record\n");
		DKScreenRecorder_Record("video.avi"); //Record the screen to a file.
	}
	if(event.type === "1004"){ //Tray, Fullscreen
		console.log("Clicked Tray -> Stop\n");
		DKScreenRecorder_Stop();
	}
}

function app_LoadPlugins(){
	DKPlugin("DKScreenRecorder");
	DKPlugin("DKTray/DKTray.js", function(){
		DKTray_init()
		DKTray_AddItem("Record", 1003);
		DKAddEvent("DKTray", "1003", app_onevent);
		DKTray_AddItem("Stop", 1004);
		DKAddEvent("DKTray", "1004", app_onevent);
	});
}

function app_LoadPage()
{
	
}