////////////////////////
function Settings_Init()
{
	DKLog("Settings_Init()\n", DKDEBUG);
	DKCreate("DKBrowser/Settings.html", function(){
		DKAddEvent("UpdateButton", "click", Settings_OnEvent);
		DKAddEvent("VersionButton", "click", Settings_OnEvent);
		DKAddEvent("GpuButton", "click", Settings_OnEvent);
		DKAddEvent("SystemButton", "click", Settings_OnEvent);
		DKAddEvent("NetInternalsButton", "click", Settings_OnEvent);
	});
}

///////////////////////
function Settings_End()
{
	DKLog("Settings_End()\n", DKDEBUG);
	DKClose("DKBrowser/Settings.html");
}

////////////////////////////////
function Settings_OnEvent(event)
{
	DKLog("Settings_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
	if(DK_Id(event, "UpdateButton")){
		Settings_Update();
	}
	if(DK_Id(event, "VersionButton")){
		Settings_Version();
	}
	if(DK_Id(event, "GpuButton")){
		Settings_Gpu();
	}
	if(DK_Id(event, "SystemButton")){
		Settings_System();
	}
	if(DK_Id(event, "NetInternalsButton")){
		Settings_NetInternals();
	}
}

//////////////////////////
function Settings_Update()
{
	DKLog("Settings_Update()\n", DKDEBUG);
	DKCreate("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKUpdate_DoUpdate();
}

///////////////////////////
function Settings_Version()
{
	DKLog("Settings_Version()\n", DKDEBUG);
	DKBrowser_NewTab(0);
	DKCef_SetUrl(DKCef_GetCurrentBrowser(), "chrome://version");
}

///////////////////////
function Settings_Gpu()
{
	DKLog("Settings_Gpu()\n", DKDEBUG);
	DKBrowser_NewTab(0);
	DKCef_SetUrl(DKCef_GetCurrentBrowser(), "chrome://gpu");
}

//////////////////////////
function Settings_System()
{
	DKLog("Settings_System()\n", DKDEBUG);
	DKBrowser_NewTab(0);
	DKCef_SetUrl(DKCef_GetCurrentBrowser(), "chrome://system");
}

////////////////////////////////
function Settings_NetInternals()
{
	DKLog("Settings_NetInternals()\n", DKDEBUG);
	DKBrowser_NewTab(0);
	DKCef_SetUrl(DKCef_GetCurrentBrowser(), "chrome://net-internals");
}