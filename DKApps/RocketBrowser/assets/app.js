DKDuktape_Create("DKDebug/DKDebug.js");

DKDuktape_Create("DKAssets");
var url = DKAssets_LocalAssets()+"test.html";
//var url = "http://digitalknob.com/test.html";
//var url = "http://this-page-intentionally-left-blank.org";
//var url = "http://web.ics.purdue.edu/~gchopra/class/public/pages/webdesign/05_simple.html";
//var url = "https://www.google.com/";
//var url = "https://curl.haxx.se/libcurl/c/https.html"
//var url = "https://www.w3schools.com/"

DKDuktape_Create("DKRocket");
window.location.href = url;

DKDuktape_Create("DKCef");
DKCef_NewBrowser("CefPopup", 0, 0, 416, 638, url);
//DKCef_SetFocus(0);
