////////////////////////
function Settings_Init()
{
	DKCreate("DKBrowser/Settings.html");
	DKAddEvent("UpdateButton", "click", Settings_OnEvent);
	DKAddEvent("FindButton", "click", Settings_OnEvent);
}

///////////////////////
function Settings_End()
{
	DKClose("Settings.html");
}

////////////////////////////////
function Settings_OnEvent(event)
{
	//DKLog("Settings_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "UpdateButton")){
		Settings_Update();
	}
	if(DK_Id(event, "FindButton")){
		DKCef_Find("DKBrowser_cef", "google"); //test: search for text "google" on page
	}
}

//////////////////////////
function Settings_Update()
{
	DKLog("Settings_Update()\n");
	DKCreate("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKUpdate_DoUpdate();
}