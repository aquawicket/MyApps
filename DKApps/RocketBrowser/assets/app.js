//CPP_DK_Create("DK/DK.js");
CPP_DK_Create("DK/DKEvents.js");
CPP_DK_Create("DKDebug/DKDebug.js");

CPP_DK_Create("DKAssets");
var url = DKAssets_LocalAssets()+"test.html";
//var url = "http://digitalknob.com/test.html";
//var url = "http://this-page-intentionally-left-blank.org";
//var url = "http://web.ics.purdue.edu/~gchopra/class/public/pages/webdesign/05_simple.html";
//var url = "https://www.google.com/";
//var url = "https://curl.haxx.se/libcurl/c/https.html"
//var url = "https://www.w3schools.com/"
//var url = "https://inlandempire.craigslist.org/";
//var url = "https://inlandempire.craigslist.org/d/for-sale/search/sss/";
//var url = "http://pricewatch.com/";

CPP_DK_Create("DKRocket");
window.location.href = url;

/*
//test location
console.warn("hash: "+window.location.hash);
console.warn("host: "+window.location.host);
console.warn("hostname: "+window.location.hostname);
console.warn("href: "+window.location.href);
console.warn("origin: "+window.location.origin);
console.warn("password: "+window.location.password);
console.warn("pathname: "+window.location.pathname);
console.warn("port: "+window.location.port);
console.warn("protocol: "+window.location.protocol);
console.warn("search: "+window.location.search);
console.warn("username: "+window.location.username);

CPP_DK_Create("DKTest/DKTest.js", function(){
	console.warn("CPP_DK_Create(DKTest/DKTest.js) callback called");
});
*/

CPP_DK_Create("DKCef");
DKCef_NewBrowser("CefPopup", 0, 0, 416, 638, url);
//DKCef_SetFocus(0);