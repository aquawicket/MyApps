var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 0; //Use with caution
var DKApp_url   = "http://www.youtube.com";
//var DKApp_url   = "http://www.youtube.com/tv";

DKCreate("DK/init.js", function(){});

///////////////////////////
function app_OnEvent(event)
{
	//DKLog("app_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Type(event, "keydown") && DK_GetValue(event) == 122){ //F11
 
	}
}


//////////////////////////
function app_LoadPlugins()
{
	DKCreate("DKTray/DKTray.js", function(){});
	DKCreate("DKDebug/DKDebug.js", function(){});
	DK_SetFramerate(240);
	DKCreate("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKAddEvent("GLOBAL", "keydown", app_OnEvent);
}

///////////////////////
function app_LoadPage()
{
	DKLog("app_LoadPage()\n");
	
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
		DKAddEvent("GLOBAL", "keydown", app_OnEvent);
	});
	});
}