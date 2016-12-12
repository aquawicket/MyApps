DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKWidget");
DKCreate("DKFrame/DKFrame.js");
DKCreate("DKDebug/DKDebug.js");
DKCreate("DKNotepad/DKNotepad.js");
DKWidget_SetProperty("DKNotepad.html", "width", "100%");
DKWidget_SetProperty("DKNotepad.html", "height", "100%");


DKAddEvent("GLOBAL", "keydown", User_OnEvent);
////////////////////////////
function User_OnEvent(event)  //Duktape
{
	DKLog("User_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);

	if(DK_Type(event, "keydown")){
		//DKLog("keydown ="+DKWidget_GetValue(event)+"\n", DKINFO);
		if(DKWidget_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}

//DKCreate("DKWebview");
//DKCreate("youtube.html");