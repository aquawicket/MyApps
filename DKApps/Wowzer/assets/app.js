var USE_SDL = 0;
var USE_ROCKET = 0;
var USE_CEF = 1;
var USE_WEBVIEW = 1;
var DKApp_url = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/Wowzer";



///////////////////////
function app_LoadPage()
{
	DKLog("app_LoadPage()\n");
	
	DKWidget_SetProperty("body","background-color","grey");
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKScale/DKScale.js", function(){
	DKCreate("DKFrame/DKFrame.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
	DKCreate("Wowzer.js", function(){
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("Wowzer_add", "100%", "100rem");
		DKWidget_RemoveProperty(id, "top");
		DKWidget_SetProperty(id, "bottom", "0rem");
	});
	});
	});
	});
	});
	});
}