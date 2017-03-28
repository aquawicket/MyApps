///////////////////////
function Settings_Init()
{
	DKCreate("DKBrowser/Settings.html");
	DKAddEvent("UpdateButton", "click", Settings_OnEvent);
}

///////////////////////
function Settings_End()
{
	DKClose("Settings.html");
}

///////////////////////////////
function Settings_OnEvent(event)
{
	//DKLog("Settings_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKINFO);
	
	if(DK_Id(event, "UpdateButton")){
		Settings_Update();
	}
}

//////////////////////////
function Settings_Update()
{
	DKLog("Settings_Update()\n", DKINFO);
	DKCreate("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKUpdate_DoUpdate();
}