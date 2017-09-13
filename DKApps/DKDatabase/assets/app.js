var USE_SDL = 0;
var USE_ROCKET = 0;
var USE_CEF = 1;
var USE_WEBVIEW = 1;
var DKApp_url = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var url = "http://digitalknob.com/DKDatabase/index.html";

DKCreate("DK/init.js", function(){});

///////////////////////
function app_LoadPage()
{
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKDatabase/DKDatabase.js", function(){});
	
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
		DKWidget_RemoveProperty(id, "top");
		DKWidget_SetProperty(id, "bottom", "0px");
	});
}