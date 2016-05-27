DKCreate("DKWidget,Admin.html");
DKCreate("DKJavascript,Documents.js");

////////////////////
function Admin_Init()
{
	DKRegisterEvent("logout", "click", Admin_OnEvent);
}

////////////////////////////
function Admin_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");
	
	if(DK_Id(event, "logout")){
		DKFile_SetSetting("", "loggedin", "false");
		window.location.href = "http://usgreenfunds.com";
	}
}
