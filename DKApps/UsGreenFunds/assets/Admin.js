CPP_DK_Create("Admin.html");
CPP_DK_Create("Documents.js");
CPP_DK_Create("Links.js");
CPP_DK_Create("Templates.js");

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
	DKLog("Admin_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "logout")){
		DKFile_SetSetting("", "loggedin", "false");
		DK_Reload();
	}
	if(DK_Id(event, "documents")){
		//DKLog("documents clicked \n");
		dk.hide("Links.html");
		DKWidget_SetProperty("links", "background-color", "rgb(130,130,130)");
		dk.hide("Templates.html");
		DKWidget_SetProperty("templates", "background-color", "rgb(130,130,130)");
		dk.show("Documents.html");
		DKWidget_SetProperty("documents", "background-color", "rgb(100,100,100)");
	}
	if(DK_Id(event, "links")){
		//DKLog("documents links \n");
		dk.hide("Documents.html");
		DKWidget_SetProperty("documents", "background-color", "rgb(130,130,130)");
		dk.hide("Templates.html");
		DKWidget_SetProperty("templates", "background-color", "rgb(130,130,130)");
		dk.show("Links.html");
		DKWidget_SetProperty("links", "background-color", "rgb(100,100,100)");
	}
	if(DK_Id(event, "templates")){
		//DKLog("documents links \n");
		dk.hide("Documents.html");
		DKWidget_SetProperty("documents", "background-color", "rgb(130,130,130)");
		dk.hide("Links.html");
		DKWidget_SetProperty("links", "background-color", "rgb(130,130,130)");
		dk.show("Templates.html");
		DKWidget_SetProperty("templates", "background-color", "rgb(100,100,100)");
	}
}
