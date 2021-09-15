CPP_DK_Create("DKWindow");
CPP_DK_Create("DKRocket");
DKRocket_LoadGui("index.html");
CPP_DK_Create("DKScale/DKScale.js", function(){});
CPP_DK_Create("DKReceiver/Receiver.js", function(){});
CPP_DK_Create("DKTray/DKTray.js", function(){});
CPP_DK_Create("DKDebug/DKDebug.js", function(){});

DKAddEvent("GLOBAL", "minimize", app_OnEvent);

///////////////////////////
function app_OnEvent(event)
{
	DKDEBUGFUNC(event);
	CPP_DK_Create("DKWindowJS");
	CPP_DKWindow_Hide();
}