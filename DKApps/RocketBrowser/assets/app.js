DKCreate("DKDebug/DKDebug.js");

DKCreate("DKAssets");
//var url = DKAssets_LocalAssets()+"test.html";
//var url = "http://digitalknob.com/test.html";
var url = "http://this-page-intentionally-left-blank.org";

DKCreate("DKRocket");
DKRocket_LoadUrl(url);

DKCreate("DKXml");


DKCreate("DKCef");
DKCef_NewBrowser("CefPopup", 0, 0, 416, 638, url);
//DKCef_SetFocus(0);
