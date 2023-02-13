CPP_DK_Create("DKSDLWindow");
CPP_DK_Create("DKRml");

//DKPlugin("DKScale/DKScale.js", function(){});
DKPlugin("DKReceiver/Receiver.js");
Receiver_init()
DKPlugin("DKTray/DKTray.js");
DKPlugin("DKDebug/DKDebug.js");

/*
DKAddEvent("GLOBAL", "minimize", app_OnEvent);

///////////////////////////
function app_OnEvent(event)
{
	DKDEBUGFUNC(event);
	CPP_DK_Create("DKWindowJS");
	CPP_DKWindow_Hide();
}
*/