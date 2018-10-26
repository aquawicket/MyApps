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

	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "90rem");
		if(id){ DKWidget_SetProperty(id, "bottom", "0px"); }
	});
}

///////////////////////
function app_LoadPage()
{
	DKWidget_SetProperty("body","background-color","grey");
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKScale/DKScale.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
	DKCreate("appPage.html", function(){
	DKCreate("DKInputTest/DKInput.js", function(){
		DKWidget_AppendChild("dkapp_container", "DKInputTest/DKInput.html");
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "90rem");
		if(id){ DKWidget_SetProperty(id, "bottom", "0px"); }
	});
	});
	});
	});
	});
	});
}