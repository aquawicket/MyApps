DKCreate("Admin.html");
DKCreate("Documents.js");
DKCreate("Links.js");
DKCreate("Templates.js");

////////////////////
function Admin_Init()
{
	DKAddEvent("logout", "click", Admin_OnEvent);
	DKAddEvent("documents", "click", Admin_OnEvent);
	DKAddEvent("links", "click", Admin_OnEvent);
	DKAddEvent("templates", "click", Admin_OnEvent);
}

////////////////////////////
function Admin_OnEvent(event)
{
	DKLog("Admin_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
	
	if(DK_Id(event, "logout")){
		DKFile_SetSetting("", "loggedin", "false");
		DK_Reload();
	}
	if(DK_Id(event, "documents")){
		//DKLog("documents clicked \n");
		DKWidget_Hide("Links.html");
		DKWidget_SetProperty("links", "background-color", "rgb(130,130,130)");
		DKWidget_Hide("Templates.html");
		DKWidget_SetProperty("templates", "background-color", "rgb(130,130,130)");
		DKWidget_Show("Documents.html");
		DKWidget_SetProperty("documents", "background-color", "rgb(100,100,100)");
	}
	if(DK_Id(event, "links")){
		//DKLog("documents links \n");
		DKWidget_Hide("Documents.html");
		DKWidget_SetProperty("documents", "background-color", "rgb(130,130,130)");
		DKWidget_Hide("Templates.html");
		DKWidget_SetProperty("templates", "background-color", "rgb(130,130,130)");
		DKWidget_Show("Links.html");
		DKWidget_SetProperty("links", "background-color", "rgb(100,100,100)");
	}
	if(DK_Id(event, "templates")){
		//DKLog("documents links \n");
		DKWidget_Hide("Documents.html");
		DKWidget_SetProperty("documents", "background-color", "rgb(130,130,130)");
		DKWidget_Hide("Links.html");
		DKWidget_SetProperty("links", "background-color", "rgb(130,130,130)");
		DKWidget_Show("Templates.html");
		DKWidget_SetProperty("templates", "background-color", "rgb(100,100,100)");
	}
}
