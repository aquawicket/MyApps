var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_RML  = 1; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://TODO.com/DKSearch

CPP_DK_Create("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	CPP_DK_Create("DKDebug/DKDebug.js", function(){});

	CPP_DK_Create("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
		if(id){ DKWidget_SetProperty(id, "bottom", "0px"); }
	});
}

///////////////////////
function app_LoadPage()
{
	DKWidget_SetProperty("body","background-color","grey");
	CPP_DK_Create("DKWindow/DKWindow.js", function(){
	CPP_DK_Create("DKScale/DKScale.js", function(){
	CPP_DK_Create("DKDebug/DKDebug.js", function(){	
	CPP_DK_Create("DKSearch/DKSearch.js", function(){
	CPP_DK_Create("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
		if(id){ DKWidget_SetProperty(id, "bottom", "0px"); }
	});
	});
	});	
	});
	});
}