// browser app script, called from index.html

DKCreate("DK/DK.css");	
DKCreate("DKGui/DKFrame.js");
DKCreate("DKBrowser/DKBrowser.js");
DKWidget_SetProperty("DKBrowser.html", "width", "100%");
DKWidget_SetProperty("DKBrowser.html", "height", "100%");
DKCreate("DKTray/DKTray.js");
DKCreate("DKDebug/DKDebug.js");
DKCreate("DKSDLText");
DK_SetFramerate(120);
DKCreate("DKUpdate");
DKWidget_SetProperty("body", "background-color", "rgb:(245,245,245)");