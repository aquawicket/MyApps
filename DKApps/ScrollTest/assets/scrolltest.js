DKCreate("DKWidgetJS");
DKCreate("DKWidget,scrolltest.html");
DKCreate("DKWidget,scrolltest1.html");
DKCreate("DKWidget,scrolltest2.html");
DKCreate("DKJavascript,DKMessage/DKMessage.js");

//////////////////////////
function scrolltest_Init()
{
	DKRegisterEvent("bottomdiv", "mousedown", scrolltest_OnEvent);
}

//////////////////////////////////
function scrolltest_OnEvent(event)
{
	//DKLog("scrolltest_OnEvent\n");
	DKMessageBox(0, "ShowMessage", "bottomdiv clicked");
}