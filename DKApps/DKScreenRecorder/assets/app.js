var USE_CEF     = 0; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 0; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"index.html";

DKCreate("DK/init.js", function(){});

///////////////////////////
function app_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Type(event, "1003")){ //Tray, Fullscreen
		DKINFO("Clicked Tray -> Record\n");
		DKScreenRecorder_Record("video.avi"); //Record the screen to a file.
	}
	if(DK_Type(event, "1004")){ //Tray, Fullscreen
		DKINFO("Clicked Tray -> Stop\n");
		DKScreenRecorder_Stop();
	}
}

//////////////////////////
function app_LoadPlugins()
{
	DKDEBUGFUNC();
	DKCreate("DKScreenRecorder");
	DKCreate("DKTray/DKTray.js", function(){
		DKTray_AddItem("Record", 1003);
		DKAddEvent("DKTray", "1003", app_OnEvent);
		DKTray_AddItem("Stop", 1004);
		DKAddEvent("DKTray", "1004", app_OnEvent);
	});
}

///////////////////////
function app_LoadPage()
{
	DKDEBUGFUNC();
}