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
	DKLog("app_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	DKCreate("DKWindowJS");
	DKWindow_Hide();
}