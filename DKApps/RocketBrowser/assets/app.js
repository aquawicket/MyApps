DKCreate("DKDebug/DKDebug.js");
DKCreate("DKRocket");
DKCreate("DKDom/DKDom.js");


//attmpt to load code from an online resource
DKCreate("DKCurl");
var str = DKCurl_HttpToString("http://digitalknob.com/test.html");
var assets = DKAssets_LocalAssets();
DKFile_StringToFile(str, assets+"test.html");

DKRocket_LoadGui(assets+"test.html");