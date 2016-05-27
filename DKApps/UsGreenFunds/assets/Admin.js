DKCreate("DKWidget,Admin.html");
DKCreate("DKJavascript,Documents.js");
DKCreate("DKJavascript,Links.js");

////////////////////
function Admin_Init()
{
	DKRegisterEvent("logout", "click", Admin_OnEvent);
	DKRegisterEvent("documents", "click", Admin_OnEvent);
	DKRegisterEvent("links", "click", Admin_OnEvent);
}

////////////////////////////
function Admin_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");
	
	if(DK_Id(event, "logout")){
		DKFile_SetSetting("", "loggedin", "false");
		//DKRocket_Reload();
		window.location.href = "http://usgreenfunds.com";
	}
	if(DK_Id(event, "documents")){
		//DKLog("documents clicked \n");
		DKWidget_Hide("Links.html");
		DKWidget_SetProperty("links", "background-color", "rgb(130,130,130)");
		DKWidget_Show("Documents.html");
		DKWidget_SetProperty("documents", "background-color", "rgb(100,100,100)");
	}
	if(DK_Id(event, "links")){
		//DKLog("documents links \n");
		DKWidget_Hide("Documents.html");
		DKWidget_SetProperty("documents", "background-color", "rgb(130,130,130)");
		DKWidget_Show("Links.html");
		DKWidget_SetProperty("links", "background-color", "rgb(100,100,100)");
	}
}
