var USE_SDL = 1;
var USE_ROCKET = 0;
var USE_CEF = 1;
var USE_Webview = 1;
var DKApp_url = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/DKIDE/index.html";
//var DKApp_url = "http://google.com";
//var DKApp_url = "chrome://gpu";

DKCreate("DK/init.js", function(){});

///////////////////////
function app_LoadPage()
{
	DKWidget_SetProperty("body","background-color","grey");
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKFtp/DKFtp.js", function(){});
	DKCreate("DKDebug/DKDebug.js", function(){});
	
	//if(DK_GetBrowser() != "CEF"){ 
	//	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
	//		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
	//	});
	//}
}