DKCreate("DKWindow");
DKCreate("DKRocket");
DKCreate("DKWidget");
DKCreate("DKFrame/DKFrame.js");
DKCreate("DKDebug/DKDebug.js");
DKCreate("DKWebview/DKWebviewTest.js");
DKWidget_SetProperty("DKWebviewTest.html", "width", "100%");
DKWidget_SetProperty("DKWebviewTest.html", "height", "100%");

///////////////////////////////////////////////
DKAddEvent("GLOBAL", "mousedown", User_OnEvent);
DKAddEvent("GLOBAL", "keydown", User_OnEvent);
function User_OnEvent(event)  //Duktape
{
	DKLog("User_OnEvent("+event+")", DKINFO);
	
	if(DK_Type(event, "keydown")){
		if(DKWidget_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}
//////////////////////////

DKCreate("DKWebview");

//FIXME: these are not available, DKWebView::OnCreate has not been called yet. 
DKLog("DK_SendValue() = "+DK_SendValue()+"\n", DKINFO);
DK_ReceiveValue();
DK_PrintFunctions();
