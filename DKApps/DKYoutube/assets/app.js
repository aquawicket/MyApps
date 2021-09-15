var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_RML  = 0; //Use with caution
var DKApp_url   = "http://www.youtube.com";
//var DKApp_url   = "http://www.youtube.com/tv";

CPP_DK_Create("DK/init.js", function(){});

///////////////////////////
function app_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Type(event, "keydown") && DK_GetValue(event) == 122){ //F11
		if(CPP_DKWindow_IsFullscreen()){
			CPP_DKWindow_Windowed();
		}
		else{
			CPP_DKWindow_Fullscreen();
		}
	}
	
	if(DK_Type(event, "1003")){ //Tray, Fullscreen
		CPP_DKWindow_Show();
		CPP_DKWindow_Restore();
		CPP_DKWindow_Fullscreen();
	}
	
	//FIXME
	if(DK_Type(event, "1004")){ //Toggle youtube.com and youtube.com/TV
		DKINFO("DKCef_GetUrl(): DK_Type == 1004\n");
		
		//TODO
		var url = CPP_DKCef_GetUrl();
		DKINFO("DKCef_GetUrl(): = "+url+"\n");
	}
}


//////////////////////////
function app_LoadPlugins()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKTray/DKTray.js", function(){
		DKTray_AddItem("Fullscreen", 1003);
		DKAddEvent("DKTray", "1003", app_OnEvent);
		
		//FIXME
		DKTray_AddItem("Toggle YoutubeTV", 1004);
		DKAddEvent("DKTray", "1004", app_OnEvent);
	});
	CPP_DK_Create("DKDebug/DKDebug.js", function(){});
	DK_SetFramerate(240);
	CPP_DK_Create("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKAddEvent("GLOBAL", "keydown", app_OnEvent);
}

///////////////////////
function app_LoadPage()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKWindow/DKWindow.js", function(){
	CPP_DK_Create("DKDebug/DKDebug.js", function(){
		//DKAddEvent("GLOBAL", "keydown", app_OnEvent);
	});
	});
}