var USE_ROCKET = 1;
var USE_CEF = 1;
var USE_Webview = 1;
var DKApp_url = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/DKSearch/index.html";



if(DK_GetOS() == "Android" || DK_GetOS() == "iOS"){
	USE_CEF = 0; //not available for mobile devices
}
else{
	USE_Webview = 0; //not available for Desktop devices
}

if(DK_GetJavascript() == "Duktape"){
	DKCreate("DKWindow");
	if(USE_ROCKET){
		DKCreate("DKRocket");
		DKCreate("DKWidget");
	}
	DKCreate("DKTray/DKTray.js", function(){});
}
DKCreate("DKDebug/DKDebug.js", function(){});


////////////////////////////
function User_OnEvent(event)  //Duktape events
{
	//DKLog("User_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
	if(DK_Type(event, "keydown")){
		if(DKWidget_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
	if(DK_Type(event, "resize")){
		//DKLog("User_OnEvent(): resize\n", DKINFO);
		//DKCef_SetSize("CefSDL", 100, 100);
		var width = DKWindow_GetWidth();
		var height = DKWindow_GetHeight();
		DK_CallFunc("CefSDL::OnResize", "0,0,"+String(width)+","+String(height));
	}
}

if(DK_GetJavascript() == "Duktape" && USE_ROCKET && USE_CEF){  //Create Cef frame in Rocket
	var assets = DKAssets_LocalAssets();
	var iframe = DKWidget_CreateElement("body", "iframe", "DKCef_frame");
	DKWidget_SetAttribute(iframe, "src", DKApp_url);
	DKWidget_SetAttribute(iframe, "width", "100%");
	DKWidget_SetAttribute(iframe, "height", "100%");
	DKWidget_SetProperty(iframe, "position", "absolute");
	DKWidget_SetProperty(iframe, "top", "0rem");
	DKWidget_SetProperty(iframe, "left", "0rem");
	DKWidget_SetProperty(iframe, "width", "100%");
	DKWidget_SetProperty(iframe, "height", "100%");
	var currentBrowser = DKCef_GetCurrentBrowser(iframe);
	DKCef_SetUrl(iframe, DKApp_url, currentBrowser);
	DKCef_SetFocus(iframe);
}
else if(DK_GetJavascript() == "Duktape" && USE_CEF){ //Create Cef frame in SDL
	var width = DKWindow_GetWidth();
	var height = DKWindow_GetHeight();
	DKCreate("DKCef,CefSDL,0,0,"+width+","+height+","+DKApp_url);
	var currentBrowser = DKCef_GetCurrentBrowser("CefSDL");
	DKCef_SetUrl("CefSDL", DKApp_url, currentBrowser);
	DKCef_SetFocus("CefSDL");
	DKAddEvent("GLOBAL", "resize", User_OnEvent);
}
else if(DK_GetJavascript() == "Duktape" && USE_Webview){ //Duktape
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