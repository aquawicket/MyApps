//"use strict";

function DKBrowserSettings(){}

DKBrowserSettings.prototype.init = function DKBrowserSettings_init(callback){
	console.log("DKBrowserSettings.prototype.init")
	//dk.create("DKBrowser/Settings.html");
	//dk.create("DKBrowser/Settings.css");
	//callback && callback(true)
}

DKBrowserSettings.prototype.end = function DKBrowserSettings_end(){
	dk.close("DKBrowser/Settings.html");
	//dk.close("DKBrowser/Settings.css");
}

DKBrowserSettings.prototype.create = function DKBrowser_settings(DKBrowser_settings_callback) {
	dk.create("DKBrowser/Settings.html", function dkcreate_callback(html) {
		if (!html)
            return error("invalid html", DKBrowser_settings_callback);
		dk.browsersettings.html = html
		html.getElementById("UpdateButton").onclick = dk.browsersettings.Update
		html.getElementById("VersionButton").onclick = dk.browsersettings.Version
		html.getElementById("GpuButton").onclick = dk.browsersettings.Gpu
		html.getElementById("SystemButton").onclick = dk.browsersettings.System
		html.getElementById("NetInternalsButton").onclick = dk.browsersettings.NetInternals
		html.getElementById("ClearCache").onclick = dk.browsersettings.ClearCache
		
		//dk.browsersettings.dkframe = DKFrame.prototype.create(dk.browsersettings);
		DKBrowser_settings_callback && DKBrowser_settings_callback(dk.browsersettings);
        return dk.browsersettings;
	});
}


DKBrowserSettings.prototype.ClearCache = function DKBrowserSettings_ClearCache(){
	//
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

DKBrowserSettings.prototype.Update = function DKBrowserSettings_Update(){
	//
	CPP_DK_Create("DKUpdate");
	DKUpdate_CheckForUpdate();
	DKUpdate_DoUpdate();
}

DKBrowserSettings.prototype.Version = function DKBrowserSettings_Version(){
	//
	dk.browser.NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://version");
}

DKBrowserSettings.prototype.Gpu = function DKBrowserSettings_Gpu(){
	//
	dk.browser.NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://gpu");
}

DKBrowserSettings.prototype.System = function DKBrowserSettings_System(){
	//
	dk.browser.NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://system");
}

DKBrowserSettings.prototype.NetInternals = function DKBrowserSettings_NetInternals(){
	//
	dk.browser.NewTab(0);
	CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "chrome://net-internals");
}

dk.browsersettings = DKPlugin(DKBrowserSettings, "singleton")