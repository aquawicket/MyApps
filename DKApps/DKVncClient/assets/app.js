DKCreate("DKWindow");
DKWindow_Create();
DKCreate("DKRocket");
DKCreate("DKWidget");
DKCreate("Login.js", function(){});

DKCreate("DKDebug/DKDebug.js", function(){
	DKCreate("DKVncClient", function(){
		DKCreate("DKSDLText");
	});
});
