DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKGui/DKFrame.js");
DKCreate("DKBrowser/DKBrowser.js");
DKWidget_SetProperty("DKBrowser.html", "width", "100%");
DKWidget_SetProperty("DKBrowser.html", "height", "100%");
DKCreate("DKTray/DKTray.js");
DKCreate("DKDebug/DKDebug.js");
DKCreate("DKSDLText");
DK_SetFramerate(120);
DKCreate("DKUpdate");

DKCef_SetUrl("DKBrowser_cef", DKAssets_LocalAssets()+"TradePost", DKCef_GetCurrentBrowser("DKBrowser_cef"));