if(DK_GetOS() == "Win32" || DK_GetOS() == "Win64"){
	var USE_CEF = true;
}

DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKWidget");
DKCreate("DKDebug/DKDebug.js", function(){});
DKCreate("DKTray/DKTray.js", function(){});

DKAddEvent("GLOBAL", "keydown", User_OnEvent);
////////////////////////////
function User_OnEvent(event)  //Duktape
{
	DKLog("User_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
	if(DK_Type(event, "keydown")){
		//DKLog("keydown ="+DKWidget_GetValue(event)+"\n", DKINFO);
		if(DKWidget_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}

if(DK_GetBrowser() == "Rocket" && USE_CEF){
	var assets = DKAssets_LocalAssets();
	var url = "file:///"+assets+"/index.html";
	//var url = "http://digitalknob.com/DKDatabase/index.html";
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
	
	/*
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
		DKWidget_RemoveProperty(id, "top");
		DKWidget_SetProperty(id, "bottom", "0rem");
	});
	*/
}
else{
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKDatabase/DKDatabase.js", function(){});
	
	//if(DK_GetBrowser() != "CEF"){ 
		DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
			var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
			DKWidget_RemoveProperty(id, "top");
			DKWidget_SetProperty(id, "bottom", "0rem");
		});
	//}
}


