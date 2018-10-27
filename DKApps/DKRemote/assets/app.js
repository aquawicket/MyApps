DKCreate("DKWindow");
DKCreate("DKRocket");
DKRocket_LoadGui("index.html");
DKCreate("DKWidget");
DKCreate("DKScale/DKScale.js", function(){});
DKCreate("DKRemote/Remote.js", function(){});
DKCreate("DKDebug/DKDebug.js", function(){});

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