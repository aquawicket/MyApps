DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKScale/DKScale.js", function(){});
DKCreate("DKReceiver/Receiver.js", function(){});
DKCreate("DKTray/DKTray.js", function(){});
DKCreate("DKDebug/DKDebug.js", function(){});

DKAddEvent("GLOBAL", "minimize", app_OnEvent);

///////////////////////////
function app_OnEvent(event)
{
	DKDEBUGFUNC(event);
	DKCreate("DKWindowJS");
	DKWindow_Hide();
}