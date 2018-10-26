var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 1; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/DKEnvelope"


DKCreate("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	DKDEBUGFUNC();
	DKCreate("DKDebug/DKDebug.js", function(){});
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "90rem");
		if(id){ DKWidget_SetProperty(id, "bottom", "0px"); }
	});
}

///////////////////////
function app_LoadPage()
{
	DKDEBUGFUNC();
	DKWidget_SetProperty("body","background-color","grey");
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKScale/DKScale.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
	DKCreate("DKEnvelope/DKEnvelope.js", function(){
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "90rem");
		if(id){ DKWidget_SetProperty(id, "bottom", "0px"); }
	});
	});
	});
	});
	});
}