DKCreate("DKDebug/DKDebug.js");

DKCreate("DKAssets");
var url = DKAssets_LocalAssets()+"test.html";
//var url = "http://digitalknob.com/test.html";

DKCreate("DKRocket");
DKRocket_LoadUrl(url);

DKCreate("DKCef");
DKCef_NewBrowser("CefPopup", 0, 0, 415, 638, url);
//DKCef_SetFocus(DKCef_GetCurrentBrowser());