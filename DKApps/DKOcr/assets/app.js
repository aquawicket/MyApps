var USE_CEF = 0;     //Desktop
var USE_WEBVIEW = 0; //Android, iOS?
var USE_SDL = 1;     //Use with caution
var USE_ROCKET = 1;  //Use with caution

DKCreate("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{

}

///////////////////////
function app_LoadPage()
{
	DKLog("app_LoadPage()\n");
	
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKTray/DKTray.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
		DKCreate("DKOcr");
		var assets = DKAssets_LocalAssets();
		DKOcr_ImageToText(assets+"DKOcr/test.png");
	});
	});
	});
}