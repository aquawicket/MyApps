DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKScale/DKScale.js", function(){});
DKCreate("DKReceiver/Receiver.js", function(){});
DKCreate("DKTray/DKTray.js", function(){});
DKCreate("DKDebug/DKDebug.js", function(){});

DKAddEvent("GLOBAL", "minimize", User_OnEvent);

////////////////////////////
function User_OnEvent(event)
{
	DKLog("User_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
	DKCreate("DKWindowJS");
	DKWindow_Hide();
}