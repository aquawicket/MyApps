var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 0; //Use with caution
var DKApp_url   = "http://facebook.com/home.php";

CPP_DK_Create("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKDebug/DKDebug.js", function(){});
	DK_SetFramerate(120);
	CPP_DK_Create("DKUpdate");
	DKUpdate_CheckForUpdate();
}

///////////////////////
function app_LoadPage()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKWindow/DKWindow.js", function(){
	CPP_DK_Create("DKTray/DKTray.js", function(){

	});
	});
}