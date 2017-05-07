var USE_SDL = 1;
var USE_ROCKET = 0;
var USE_CEF = 1;
var USE_Webview = 1;
var DKApp_url = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/DKInputTest/index.html";
//var DKApp_url = "http://google.com";
//var DKApp_url = "chrome://gpu";


//Validate settings
if(DK_GetOS() == "Android" || DK_GetOS() == "iOS"){
	USE_CEF = 0; //not available for mobile devices
}
else{
	USE_Webview = 0; //not available for Desktop devices
}


////////////////////////////
function User_OnEvent(event)  //Duktape
{
	DKLog("User_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
	
	if(DK_Type(event, "DKCef_OnQueueNewBrowser")){
		var currentBrowser = DKCef_GetCurrentBrowser("DKCef_frame");
		DKCef_SetUrl("DKCef_frame", DK_GetValue(event), currentBrowser);
	}
	if(DK_Type(event, "keydown")){
		if(DK_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
	if(DK_Type(event, "resize")){
		var width = DKWindow_GetWidth();
		var height = DKWindow_GetHeight();
		DK_CallFunc("CefSDL::OnResize", "0,0,"+String(width)+","+String(height));
	}
}

////////////////////////////////
if(DK_GetJavascript() == "Duktape"){
	if(USE_SDL && USE_ROCKET && USE_CEF){
		DKLog("Creating SDL -> Rocket -> Cef -> GUI \n", DKINFO);
		DKCreate("DKWindow");
		DKCreate("DKRocket");
		DKCreate("DKWidget");
		var assets = DKAssets_LocalAssets();
		var iframe = DKWidget_CreateElement("body", "iframe", "DKCef_frame");
		DKWidget_SetAttribute(iframe, "src", DKApp_url);
		DKWidget_SetProperty(iframe, "position", "absolute");
		DKWidget_SetProperty(iframe, "top", "0rem");
		DKWidget_SetProperty(iframe, "left", "0rem");
		DKWidget_SetProperty(iframe, "width", "100%");
		DKWidget_SetProperty(iframe, "bottom", "0rem");
		var currentBrowser = DKCef_GetCurrentBrowser(iframe);
		DKCef_SetUrl(iframe, DKApp_url, currentBrowser);
		DKCef_SetFocus(iframe);
		DKAddEvent("GLOBAL", "DKCef_OnQueueNewBrowser", User_OnEvent);
	}
	else if(USE_SDL && USE_ROCKET){
		DKLog("Creating SDL -> ROCKET -> GUI \n", DKINFO);
		DKCreate("DKWindow");
		DKCreate("DKRocket");
		DKCreate("DKWidget");
		LoadPage();
	}
	else if(USE_SDL && USE_CEF){
		DKLog("Creating SDL -> CEF -> GUI \n", DKINFO);
		DKCreate("DKWindow");
		var width = DKWindow_GetWidth();
		var height = DKWindow_GetHeight();
		DKCreate("DKCef,CefSDL,0,0,"+width+","+height+","+DKApp_url);
		var currentBrowser = DKCef_GetCurrentBrowser("CefSDL");
		DKCef_SetUrl("CefSDL", DKApp_url, currentBrowser);
		DKCef_SetFocus("CefSDL");
		DKAddEvent("GLOBAL", "resize", User_OnEvent);
	}
	else if(USE_CEF){
		DKLog("Creating CEF -> GUI \n", DKINFO);
		var width = 800;
		var height = 600;
		DKCreate("DKCef,Cef,0,0,"+width+","+height+","+DKApp_url);
		DK_SetFramerate(5);
	}
	else if(USE_Webview){
		DKLog("Creating WEBVIEW -> GUI \n", DKINFO);
		DKAddEvent("GLOBAL", "keydown", User_OnEvent);
	}
	
	//DKCreate("DKTray/DKTray.js", function(){});
	//DKCreate("DKDebug/DKDebug.js", function(){});
}
else{  //V8 or Webview
	LoadPage();
}

function LoadPage()
{
	//DKLog("Loading page... \n", DKINFO);
	DKWidget_SetProperty("body","background-color","grey");
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKInputTest/DKInput.js", function(){});
	DKCreate("DKDebug/DKDebug.js", function(){});
	
	//DKCreate("DKFileMenu/DKFileMenu.js", function(){
	//	DKFileMenu_Widget("body");
	//});
	
	//if(DK_GetBrowser() != "CEF"){ 
	//	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
	//		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
	//	});
	//}
	
	//DKCreate("DKUpdate");
}






