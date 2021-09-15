CPP_DK_Create("DKWindow");
CPP_DK_Create("DKRocket");
CPP_DKRml_LoadGui("index.html");
CPP_DK_Create("DKDom/DKDom.js");
CPP_DK_Create("DKGui/DKFrame.js");
CPP_DK_Create("DKBrowser/DKBrowser.js");
CPP_DK_Create("DKTray/DKTray.js");
CPP_DK_Create("DKDebug/DKDebug.js");
CPP_DK_Create("DKAdmin/DKAdmin.js");
CPP_DKWidget_SetProperty("body", "background-color", "rgb:(245,245,245)");

CPP_DK_Create("DKSDLText"); //This currently fixed cef redraw issues.

CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), CPP_DKAssets_LocalAssets()+"index.html?plugin=TradePost/TradePost");

//DK_SetFramerate(120);
CPP_DK_Create("DKUpdate");
CPP_DK_Create("DKCurl");