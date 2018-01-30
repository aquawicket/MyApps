var USE_CEF     = 0; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 1; //Use with caution
var USE_ROCKET  = 1; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var url = "http://digitalknob.com/DKDatabase/index.html";

DKCreate("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{

}

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