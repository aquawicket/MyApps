CPP_DK_Create("DKWindow");
CPP_DK_Create("DKRocket");
DKRocket_LoadGui("index.html");
CPP_DK_Create("DKWidget");
CPP_DK_Create("DKScale/DKScale.js", function(){});
CPP_DK_Create("DKRemote/Remote.js", function(){});
CPP_DK_Create("DKDebug/DKDebug.js", function(){});

DKAddEvent("GLOBAL", "keydown", app_OnEvent);

///////////////////////////
function app_OnEvent(event)  //Duktape
{
	DKDEBUGFUNC(event);
	if(DK_Type(event, "keydown")){
		//DKINFO("keydown ="+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}