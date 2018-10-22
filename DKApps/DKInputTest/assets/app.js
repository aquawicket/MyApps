var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 1; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/DKInputTest/index.html";

DKCreate("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{
	DKCreate("DKDebug/DKDebug.js", function(){});

	var iframe = DKWidget_CreateElement("DKCef_frame", "iframe", "GoogleAd_iframe");
	DKWidget_SetAttribute(iframe, "src", "https://digitalknob.com/DKEnvelope/DKGoogleAd/AddFrame.html");
	DKWidget_SetProperty(iframe, "position", "absolute");
	DKWidget_SetProperty(iframe, "left", "0px");
	DKWidget_SetProperty(iframe, "width", "100%");
	DKWidget_SetProperty(iframe, "height", "100rem");
	DKWidget_SetProperty(iframe, "bottom", "0px");
	DKWidget_RemoveProperty(iframe, "top");
}

///////////////////////
function app_LoadPage()
{
	DKWidget_SetProperty("body","background-color","grey");
	DKCreate("DKWindow/DKWindow.js", function(){});
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKDebug/DKDebug.js", function(){});
	DKCreate("appPage.html", function(){
		DKCreate("DKInputTest/DKInput.js", function(){
			DKWidget_AppendChild("dkapp_container", "DKInputTest/DKInput.html");
	
			
		});
	});

	if(DK_GetBrowser() != "CEF"){
		DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
			var id = DKGoogleAd_CreateAd("appPage.html", "100%", "100rem");
			DKWidget_SetProperty(id, "bottom", "0px");
		});
	}
}