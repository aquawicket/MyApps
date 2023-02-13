//DKPlugin("DKScale/DKScale.js");
DKPlugin("DKFile/DKFile.js");
DKPlugin("DKDebug/DKDebug.js");
DKPlugin("DKRemote/Remote.js");
Remote_init()

/*
DKAddEvent("GLOBAL", "keydown", app_OnEvent);

///////////////////////////
function app_OnEvent(event)  //Duktape
{
	DKDEBUGFUNC(event);
	if(DK_Type(event, "keydown")){
		//console.log("keydown ="+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}
*/