CPP_DK_Create("DKSDLWindow");
CPP_DK_Create("DKRml");

var url = CPP_DKAssets_LocalAssets()+"/index.html";
location.href = url

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