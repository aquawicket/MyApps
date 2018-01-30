var USE_CEF = 1;     //Desktop
var USE_WEBVIEW = 0; //Android, iOS?
var USE_SDL = 0;     //Use with caution
var USE_ROCKET = 0;  //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"index.html";

DKCreate("DK/init.js", function(){});

///////////////////////////
function app_OnEvent(event)
{
	//DKLog("app_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Type(event, "OpenFile")){
		var file = DK_GetValue(event);
		DKLog("OpenFile: "+file+" \n");
		//DKPaint_Open(file);
		var text;
		if(text = DKOcr_ImageToText(file)){
			DKWidget_SetAttribute("DKNotepad_Text", "value", text);
		}
	}
}

//////////////////////////
function app_LoadPlugins()
{

}

///////////////////////
function app_LoadPage()
{
	DKLog("app_LoadPage()\n");
	DKAddEvent("GLOBAL", "OpenFile", app_OnEvent);
	
	DKCreate("DKWindow/DKWindow.js", function(){
	DKCreate("DKGui/DKFrame.js", function(){
	DKCreate("DKDebug/DKDebug.js", function(){
	//DKCreate("DKPaint/DKPaint.js", function(){
		DKCreate("DKOcr");
		//DKWidget_SetProperty("DKPaint/DKPaint.html", "height", "50%");
		//var assets = DKAssets_LocalAssets();
		//DKPaint_Open(assets+"DKOcr/test.png");
	DKCreate("DKNotepad/DKNotepad.js", function(){
		//DKWidget_SetProperty("DKNotepad/DKNotepad.html", "top", "50%");
	});
	//});
	});
	});
	});
}