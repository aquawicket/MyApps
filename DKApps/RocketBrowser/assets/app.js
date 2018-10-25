DKCreate("DKDebug/DKDebug.js");
DKCreate("DKRocket");
DKCreate("DKCurl");
DKCreate("DKDom/DKDom.js");

//attmpt to load code from an online resource
var str = DKCurl_HttpToString("http://www.onesentence.org/");
var assets = DKAssets_LocalAssets();
DKFile_StringToFile(str, assets+"index2.html");

DKRocket_LoadGui("index.html");
