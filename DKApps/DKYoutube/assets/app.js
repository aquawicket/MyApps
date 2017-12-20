var USE_CEF = 1;     //Desktop
var USE_WEBVIEW = 1; //Android, iOS?
var USE_SDL = 0;     //Use with caution
var USE_ROCKET = 0;  //Use with caution
var DKApp_url = "http://www.youtube.com";

DKCreate("DK/init.js", function(){});
DK_SetFramerate(120);

///////////////////////
function app_LoadPage()
{
	DKLog("app_LoadPage()\n");
	
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKTray/DKTray.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
		
	});
	});
	});
}