DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKWidget");
DKCreate("DKScale/DKScale.js", function(){});
DKCreate("DKRemote/Remote.js", function(){});
DKCreate("DKDebug/DKDebug.js", function(){});

DKAddEvent("GLOBAL", "keydown", User_OnEvent);
////////////////////////////
function User_OnEvent(event)  //Duktape
{
	DKLog("User_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
	if(DK_Type(event, "keydown")){
		//DKLog("keydown ="+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}