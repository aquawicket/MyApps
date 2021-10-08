var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_RML  = 0; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://TODO.com/Wowzer";

CPP_DK_Create("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKTray/DKTray.js", function(){});
	CPP_DK_Create("DKDebug/DKDebug.js", function(){});
}

///////////////////////
function app_LoadPage()
{
	DKDEBUGFUNC();	
	DKWidget_SetProperty("body","background-color","grey");
	CPP_DK_Create("DKWindow/DKWindow.js", function(){
	CPP_DK_Create("DKScale/DKScale.js", function(){
	CPP_DK_Create("DKGui/DKFrame.js", function(){
	CPP_DK_Create("DKDebug/DKDebug.js", function(){
	CPP_DK_Create("Wowzer.js", function(){
	//CPP_DK_Create("DKGoogleAd/DKGoogleAd.js", function(){
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