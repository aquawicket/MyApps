DKCreate("DKWidget");
DKCreate("DKWindow");
DKCreate("DKRocket");
DKRocket_LoadGui("index.html");
DKCreate("DKDom/DKDom.js");
//var html_root = document.getElementsByTagName("html")[0];
DKCreate("DKGui/DKFrame.js");
DKCreate("DKBrowser/DKBrowser.js");
DKCreate("DKTray/DKTray.js");
DKCreate("DKDebug/DKDebug.js");
DKCreate("DKAdmin/DKAdmin.js");
DKWidget_SetProperty("body", "background-color", "rgb:(245,245,245)");

DKCreate("DKSDLText"); //This currently fixed cef redraw issues.

DKCef_SetUrl(DKCef_GetCurrentBrowser(), DKAssets_LocalAssets()+"index.html?plugin=TradePost/TradePost");

//DK_SetFramerate(120);
DKCreate("DKUpdate");
DKCreate("DKCurl");