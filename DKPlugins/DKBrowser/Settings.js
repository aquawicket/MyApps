////////////////////////
function Settings_Init()
{
	//DKLog("Settings_Init()\n");
	DKCreate("DKBrowser/Settings.html");
	DKAddEvent("UpdateButton", "click", Settings_OnEvent);
	DKAddEvent("VersionButton", "click", Settings_OnEvent);
	DKAddEvent("GpuButton", "click", Settings_OnEvent);
}

///////////////////////
function Settings_End()
{
	//DKLog("Settings_End()\n");
	DKClose("DKBrowser/Settings.html");
}

////////////////////////////////
function Settings_OnEvent(event)
{
	//DKLog("Settings_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	if(DK_Id(event, "UpdateButton")){
		Settings_Update();
	}
	if(DK_Id(event, "VersionButton")){
		Settings_Version();
	}
	if(DK_Id(event, "GpuButton")){
		Settings_Gpu();
	}
}

//////////////////////////
function Settings_Update()
{
	//DKLog("Settings_Update()\n");
	DKCreate("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKUpdate_DoUpdate();
}

///////////////////////////
function Settings_Version()
{
	//DKLog("Settings_Version()\n");
	DKBrowser_NewTab(0);
	DKCef_SetUrl("DKBrowser_cef", DKCef_GetCurrentBrowser("DKBrowser_cef"), "chrome://version");
}

///////////////////////
function Settings_Gpu()
{
	//DKLog("Settings_Gpu()\n");
	DKBrowser_NewTab(0);
	DKCef_SetUrl("DKBrowser_cef", DKCef_GetCurrentBrowser("DKBrowser_cef"), "chrome://gpu");
}