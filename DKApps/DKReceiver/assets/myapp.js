//DKPlugin("DKScale/DKScale.js");
DKPlugin("DKFile/DKFile.js");
DKPlugin("DKDebug/DKDebug.js");
DKPlugin("DKReceiver/Receiver.js");
Receiver_init()
DKPlugin("DKTray/DKTray.js");


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