DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKWidget");
DKCreate("DKFrame/DKFrame.js");
DKCreate("DKDebug/DKDebug.js");
DKCreate("DKNotepad/DKNotepad.js");
DKWidget_SetProperty("DKNotepad.html", "width", "100%");
DKWidget_SetProperty("DKNotepad.html", "height", "100%");

/////////////////////////
//ANDROID back key = exit
DKAddEvent("GLOBAL", "keydown", User_OnEvent);
function User_OnEvent(event)  //Duktape
{
	if(DK_Type(event, "keydown")){
		if(DKWidget_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}
//////////////////////////

DKCreate("DKWebview");
DKLog("DK_SendValue() = "+DK_SendValue()+"\n", DKINFO);
DK_ReceiveValue();
DK_PrintFunctions();
//DKCreate("youtube.html");