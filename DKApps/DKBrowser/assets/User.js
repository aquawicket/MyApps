DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKFrame/DKFrame.js");
DKCreate("DKBrowser/DKBrowser.js");
DKWidget_SetProperty("DKBrowser.html", "width", "100%");
DKWidget_SetProperty("DKBrowser.html", "height", "100%");
if(DK_GetOS() == "Win32" || DK_GetOS() == "Win64"){
	DKCreate("DKTray/DKTray.js");
}
DKCreate("DKDebug/DKDebug.js");
//DKCreate("DKUpdate");