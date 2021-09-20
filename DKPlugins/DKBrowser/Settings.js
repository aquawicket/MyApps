function DKBrowserSettings(){}

dk.browsersettings.init = function DKBrowserSettings_init(){
	//DKDEBUGFUNC();
	dk.create("DKBrowser/Settings.html", function(element){
		dk.browsersettings.element = element
		element.getElementById("UpdateButton").onclick = dk.browsersettings.Update
		element.getElementById("VersionButton").onclick = dk.browsersettings.Version
		element.getElementById("GpuButton").onclick = dk.browsersettings.Gpu
		element.getElementById("SystemButton").onclick = dk.browsersettings.System
		element.getElementById("NetInternalsButton").onclick = dk.browsersettings.NetInternals
		element.getElementById("ClearCache").onclick = dk.browsersettings.ClearCache
	});
}

dk.browsersettings.end = function DKBrowserSettings_end(){
	//DKDEBUGFUNC();
	dk.close("DKBrowser/Settings.html");
}

dk.browsersettings.ClearCache = function DKBrowserSettings_ClearCache(){
	//DKDEBUGFUNC();
	var assets = CPP_DKAssets_LocalAssets();
	var cachePath = assets+"USER/Cache";
	if(!DKFile_Exists(cachePath))
		return error("Settings_ClearCache(): cachePath+ invalid\n");
	var files = DKFile_DirectoryContents(cachePath);
	var arry = files.split(",");
	for(var i=0; i<arry.length; i++){
		if(arry[i].indexOf("f_") == 0){
			//console.log("cachePath+/+arry["+i+"] = "+cachePath+"/"+arry[i]+"\n");
			DKFile_Delete(cachePath+"/"+arry[i]);
		}
	}
}

dk.browsersettings.Update = function DKBrowserSettings_Update(){
	//DKDEBUGFUNC();
	CPP_DK_Create("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKUpdate_DoUpdate();
}

dk.browsersettings.Version = function DKBrowserSettings_Version(){
	//DKDEBUGFUNC();
	dk.browser.NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://version");
}

dk.browsersettings.Gpu = function DKBrowserSettings_Gpu(){
	//DKDEBUGFUNC();
	dk.browser.NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://gpu");
}

dk.browsersettings.System = function DKBrowserSettings_System(){
	//DKDEBUGFUNC();
	dk.browser.NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://system");
}

dk.browsersettings.NetInternals = function DKBrowserSettings_NetInternals(){
	//DKDEBUGFUNC();
	dk.browser.NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://net-internals");
}

dk.browsersettings = DKPlugin(DKBrowserSettings, "singleton")