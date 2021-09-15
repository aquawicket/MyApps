////////////////////////
function Settings_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKBrowser/Settings.html", function(){
		DKAddEvent("UpdateButton", "click", Settings_OnEvent);
		DKAddEvent("VersionButton", "click", Settings_OnEvent);
		DKAddEvent("GpuButton", "click", Settings_OnEvent);
		DKAddEvent("SystemButton", "click", Settings_OnEvent);
		DKAddEvent("NetInternalsButton", "click", Settings_OnEvent);
		DKAddEvent("ClearCache", "click", Settings_OnEvent);
	});
}

///////////////////////
function Settings_End()
{
	DKDEBUGFUNC();
	DKClose("DKBrowser/Settings.html");
}

////////////////////////////////
function Settings_OnEvent(event)
{	
	DKDEBUGFUNC(event);
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
	if(DK_Id(event, "ClearCache")){
		Settings_ClearCache();
	}
}

//////////////////////////////
function Settings_ClearCache()
{
	DKDEBUGFUNC();
	var assets = DKAssets_LocalAssets();
	var cachePath = assets+"USER/Cache";
	if(!DKFile_Exists(cachePath)){
		DKWARN("Settings_ClearCache(): cachePath+ invalid\n");
		return false;
	}
	
	var files = DKFile_DirectoryContents(cachePath);
	var arry = files.split(",");
	
	for(var i=0; i<arry.length; i++){
		if(arry[i].indexOf("f_") == 0){
			//DKINFO("cachePath+/+arry["+i+"] = "+cachePath+"/"+arry[i]+"\n");
			DKFile_Delete(cachePath+"/"+arry[i]);
		}
	}
}

//////////////////////////
function Settings_Update()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKUpdate_DoUpdate();
}

///////////////////////////
function Settings_Version()
{
	DKDEBUGFUNC();
	DKBrowser_NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://version");
}

///////////////////////
function Settings_Gpu()
{
	DKDEBUGFUNC();
	DKBrowser_NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://gpu");
}

//////////////////////////
function Settings_System()
{
	DKDEBUGFUNC();
	DKBrowser_NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://system");
}

////////////////////////////////
function Settings_NetInternals()
{
	DKDEBUGFUNC();
	DKBrowser_NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://net-internals");
}