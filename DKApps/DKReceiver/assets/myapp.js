CPP_DK_Create("DKSDLWindow");
CPP_DK_Create("DKRml");

//var url = CPP_DKAssets_LocalAssets()+"/index.html";
//location.href = url

//DKPlugin("DKScale/DKScale.js", function(){});
DKPlugin("DKReceiver/Receiver.js", function(){});
DKPlugin("DKTray/DKTray.js", function(){});
DKPlugin("DKDebug/DKDebug.js", function(){});

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