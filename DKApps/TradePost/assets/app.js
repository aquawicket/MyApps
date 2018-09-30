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

DKCef_SetUrl("DKBrowser_cef", DKAssets_LocalAssets()+"TradePost/index.html", DKCef_GetCurrentBrowser("DKBrowser_cef"));

DK_RunDuktape("DKLog(\"Test\");");
DK_RunDuktape("DKCef_SetFocus(\"DKBrowser_cef\");");


//DK_RunJavascript("DKBrowser_NewTab();");
//DK_RunJavascript("DKCef_SetUrl(\"DKBrowser_cef\", \"https://offerup.com/\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");


/*
DKBrowser_NewTab();
DKCef_SetUrl("DKBrowser_cef", "https://inlandempire.craigslist.org/d/for-sale/search/sss", DKCef_GetCurrentBrowser("DKBrowser_cef"));
DKBrowser_NewTab();
DKCef_SetUrl("DKBrowser_cef", "https://us.letgo.com/en", DKCef_GetCurrentBrowser("DKBrowser_cef"));
DKBrowser_NewTab();
DKCef_SetUrl("DKBrowser_cef", "https://offerup.com/", DKCef_GetCurrentBrowser("DKBrowser_cef"));
DKBrowser_SelectTab(0);
*/