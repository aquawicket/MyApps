var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 0; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/Wowzer";

DKCreate("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	DKDEBUGFUNC();
	DKCreate("DKTray/DKTray.js", function(){});
	DKCreate("DKDebug/DKDebug.js", function(){});
}

///////////////////////
function app_LoadPage()
{
	DKDEBUGFUNC();	
	DKWidget_SetProperty("body","background-color","grey");
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKScale/DKScale.js", function(){
	DKCreate("DKGui/DKFrame.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
	DKCreate("Wowzer.js", function(){
	//DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
	//	var id = DKGoogleAd_CreateAd("Wowzer_add", "100%", "100rem");
	//	DKWidget_RemoveProperty(id, "top");
	//	DKWidget_SetProperty(id, "bottom", "0rem");
	//});
	});
	});
	});
	});
	});
}