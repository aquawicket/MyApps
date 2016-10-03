var USE_CEF = true;
DKCreate("DKWindow");
DKCreate("DKRocket");
if(DK_GetBrowser() == "DigitalKnob" && USE_CEF){
	DKCreate("DKWidget");
	var url = "file:///C:/digitalknob/USER/DKApps/DKDatabase/assets/index.html";
	//var url = "http://digitalknob.com/DKDatabase";
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
	
	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
		var width = DKWindow_GetWidth();
		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
		DKWidget_RemoveProperty(id, "top");
		DKWidget_SetProperty(id, "bottom", "0rem");
	});
}
else{
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKDatabase/DKDatabase.js", function(){
	
		if(!USE_CEF){
			DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
				var width = DKWindow_GetWidth();
				var id = DKGoogleAd_CreateAd("DKDatabase.html", "100%", "100rem");
				DKWidget_RemoveProperty(id, "top");
				DKWidget_SetProperty(id, "bottom", "0rem");
			});
		}
	
	});
}

