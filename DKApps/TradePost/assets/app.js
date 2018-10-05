DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKGui/DKFrame.js");
DKCreate("DKBrowser/DKBrowser.js");
DKWidget_SetProperty("DKBrowser.html", "width", "100%");
DKWidget_SetProperty("DKBrowser.html", "height", "100%");
DKCreate("DKTray/DKTray.js");
DKCreate("DKDebug/DKDebug.js");
DKCreate("DKAdmin/DKAdmin.js");
DKWidget_SetProperty("body", "background-color", "rgb:(120,120,120)");

DKCreate("DKSDLText"); //This currently fixed cef redraw issues.

DKCef_SetUrl("DKBrowser_cef", DKCef_GetCurrentBrowser("DKBrowser_cef"), DKAssets_LocalAssets()+"TradePost.html");

//DK_SetFramerate(120);
//DKCreate("DKUpdate");

