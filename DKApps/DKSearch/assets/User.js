if(DK_GetOS() == "Win32" || DK_GetOS() == "Win64"  || DK_GetOS() == "Mac" || DK_GetOS() == "Linux"){
	var USE_CEF = 1;
}
if(DK_GetOS() == "Android"){
	var USE_Webview = 1;
}

if(DK_GetJavascript() == "Duktape"){
	DKCreate("DKWindow");
	DKCreate("DKRocket");
	DKCreate("DKWidget");
	if(DK_GetOS() == "Win32" || DK_GetOS() == "Win64"){
		DKCreate("DKTray/DKTray.js", function(){});
	}
}
DKCreate("DKDebug/DKDebug.js", function(){});


////////////////////////////
function User_OnEvent(event)  //Duktape events
{
	DKLog("User_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
	if(DK_Type(event, "keydown")){
		if(DKWidget_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}

if(DK_GetJavascript() == "Duktape" && USE_CEF){
	var assets = DKAssets_LocalAssets();
	var url = "file:///"+assets+"/index.html";
	//var url = "http://digitalknob.com/DKSearch/index.html";
	var iframe = DKWidget_CreateElement("body", "iframe", "DKCef_frame");
	DKWidget_SetAttribute(iframe, "src", url);
	DKWidget_SetAttribute(iframe, "width", "100%");
	DKWidget_SetAttribute(iframe, "height", "100%");
	DKWidget_SetProperty(iframe, "position", "absolute");
	DKWidget_SetProperty(iframe, "top", "0rem");
	DKWidget_SetProperty(iframe, "left", "0rem");
	DKWidget_SetProperty(iframe, "width", "100%");
	DKWidget_SetProperty(iframe, "height", "100%");
	var currentBrowser = DKCef_GetCurrentBrowser(iframe);
	DKCef_SetUrl(iframe, url, currentBrowser);
	DKCef_SetFocus(iframe);
}
else if(DK_GetJavascript() == "Duktape" && USE_Webview){ //Duktape
	var assets = DKAssets_LocalAssets();
	var url = "file:///"+assets+"/index.html";
	DKAddEvent("GLOBAL", "keydown", User_OnEvent);  //Exit for ANDROID
}
else{  //Duktape or V8 or Webview
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKSearch/DKSearch.js", function(){});
	
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
		DKWidget_RemoveProperty(id, "top");
		DKWidget_SetProperty(id, "bottom", "0rem");
	});
}