var USE_CEF = false;
DKLog("DK_GetBrowser() = "+DK_GetBrowser()+"\n");
DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKWidget");
if(DK_GetBrowser() == "DigitalKnob" && USE_CEF){
	var url = "file:///C:/digitalknob/USER/DKApps/DKOS/assets/index.html";
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
		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
	});
}
else{
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKOS/DKOS.js", function(){});
}
//DKCreate("DKUpdate");