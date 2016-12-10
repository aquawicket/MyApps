if(DK_GetOS() == "Win32" || DK_GetOS() == "Win64"){
	var USE_CEF = false;
}

DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKWidget");
DKCreate("DKDebug/DKDebug.js", function(){});

////////////////////////////
function User_OnEvent(event)  //Duktape
{
	DKLog("User_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
	
	if(DK_Type(event, "DKCef_OnQueueNewBrowser")){
		var currentBrowser = DKCef_GetCurrentBrowser("DKCef_frame");
		DKCef_SetUrl("DKCef_frame", DKWidget_GetValue(event), currentBrowser);
	}
}

if(DK_GetBrowser() == "Rocket" && USE_CEF){ //Duktape
	var assets = DKAssets_LocalAssets();
	var url = "file:///"+assets+"/index.html";
	//var url = "http://digitalknob.com/Digitalknob/index.html";
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

	DKAddEvent("GLOBAL", "DKCef_OnQueueNewBrowser", User_OnEvent);
	/*
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
		DKWidget_RemoveProperty(id, "top");
		DKWidget_SetProperty(id, "bottom", "0rem");
	});
	*/
}
else{  //V8
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("Digitalknob/Digitalknob.js", function(){});
	
	//if(DK_GetBrowser() != "CEF"){ 
		DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
			var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
			DKWidget_RemoveProperty(id, "top");
			DKWidget_SetProperty(id, "bottom", "0rem");
		});
	//}
}
