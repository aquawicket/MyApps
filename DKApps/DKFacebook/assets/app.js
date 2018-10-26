var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 0; //Use with caution
var DKApp_url   = "http://facebook.com/home.php";

DKCreate("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	DKDEBUGFUNC();
	DKCreate("DKDebug/DKDebug.js", function(){});
	DK_SetFramerate(120);
	DKCreate("DKUpdate");
	DKUpdate_CheckForUpdate();
}

///////////////////////
function app_LoadPage()
{
	DKDEBUGFUNC();
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKTray/DKTray.js", function(){

	});
	});
}