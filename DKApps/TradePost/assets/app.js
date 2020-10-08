CPP_DKDuktape_Create("DKWindow");
CPP_DKDuktape_Create("DKRocket");
DKRml_LoadGui("index.html");
CPP_DKDuktape_Create("DKDom/DKDom.js");
CPP_DKDuktape_Create("DKGui/DKFrame.js");
CPP_DKDuktape_Create("DKBrowser/DKBrowser.js");
CPP_DKDuktape_Create("DKTray/DKTray.js");
CPP_DKDuktape_Create("DKDebug/DKDebug.js");
CPP_DKDuktape_Create("DKAdmin/DKAdmin.js");
DKWidget_SetProperty("body", "background-color", "rgb:(245,245,245)");

DKCreate("DKSDLText"); //This currently fixed cef redraw issues.

DKCef_SetUrl(DKCef_GetCurrentBrowser(), DKAssets_LocalAssets()+"index.html?plugin=TradePost/TradePost");

//DK_SetFramerate(120);
CPP_DKDuktape_Create("DKUpdate");
CPP_DKDuktape_Create("DKCurl");