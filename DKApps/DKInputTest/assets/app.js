var USE_CEF     = 0; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 1; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/DKInputTest";

DKCreate("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	DKCreate("DKDebug/DKDebug.js", function(){});
	//DKCreate("DKWidget");
	
	//DKWidget_SetProperty("html", "height", "100%");
	DKWidget_SetProperty("body", "width", "100%");	
	DKWidget_SetProperty("body", "height", "100%");
	DKWidget_SetProperty("body", "margin", "0px"); 
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "90rem");

			DKWidget_SetProperty(id, "bottom", "0px"); 
			//DKWidget_RemoveProperty(id, "top"); 

	});
}