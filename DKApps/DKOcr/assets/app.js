var USE_CEF = 1;     //Desktop
var USE_WEBVIEW = 0; //Android, iOS?
var USE_SDL = 0;     //Use with caution
var USE_ROCKET = 0;  //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"index.html";

DKCreate("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{

}

///////////////////////
function app_LoadPage()
{
	DKLog("app_LoadPage()\n");
	
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKGui/DKFrame.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
	DKCreate("DKPaint/DKPaint.js", function(){
		DKCreate("DKOcr")
		DKWidget_SetProperty("DKPaint/DKPaint.html", "height", "50%");
		var assets = DKAssets_LocalAssets();
		DKPaint_Open(assets+"DKOcr/test.png");
	DKCreate("DKNotepad/DKNotepad.js", function(){
		DKWidget_SetProperty("DKNotepad/DKNotepad.html", "top", "50%");
	});
	});
	});
	});
	});
}