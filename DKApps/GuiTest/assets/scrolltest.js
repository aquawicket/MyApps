DKCreate("scrolltest.html");
DKCreate("scrolltest1.html");
DKCreate("scrolltest2.html");
DKCreate("DKMessage/DKMessage.js");

//////////////////////////
function scrolltest_Init()
{
	DKAddEvent("bottomdiv", "mousedown", scrolltest_OnEvent);
}

//////////////////////////////////
function scrolltest_OnEvent(event)
{
	DKLog("scrolltest_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
	
	DKMessageBox(0, "ShowMessage", "bottomdiv clicked");
}