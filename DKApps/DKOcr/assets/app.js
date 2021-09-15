var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_RML  = 0; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"index.html";

CPP_DK_Create("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	DKDEBUGFUNC();
}

///////////////////////
function app_LoadPage()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKWindow/DKWindow.js", function(){
	CPP_DK_Create("DKGui/DKFrame.js", function(){
	CPP_DK_Create("DKDebug/DKDebug.js", function(){
	CPP_DK_Create("DKOcr/DKOcr.js", function(){

	});
	});
	});
	});
}