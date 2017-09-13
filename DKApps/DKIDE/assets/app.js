var USE_SDL = 0;
var USE_ROCKET = 0;
var USE_CEF = 1;
var USE_WEBVIEW = 1;
var DKApp_url = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/DKIDE/index.html";
//var DKApp_url = "http://google.com";
//var DKApp_url = "chrome://gpu";

DKCreate("DK/init.js", function(){});

///////////////////////
function app_LoadPage()
{
	//DKLog("Loading page... \n");
	DKWidget_SetProperty("body","background-color","grey");
	DKCreate("DKWindow/DKWindow.js", function(){});
	DKCreate("DKScale/DKScale.js", function(){});
	DKCreate("DKBuild/DKBuildGUI.js", function(){
		DKCreate("DKDev/DKDev.js", function(){});
		DKCreate("DKDev/DKMenuRight.js", function(){
			DKWidget_RemoveProperty("DKMenuRight.html","left");
			DKWidget_RemoveProperty("DKMenuRight.html","height");
			DKWidget_SetProperty("DKMenuRight.html","top","41rem");
			DKWidget_SetProperty("DKMenuRight.html","right","0rem");
			DKWidget_SetProperty("DKMenuRight.html","bottom","24rem");
		});
		DKCreate("DKDebug/Input.js", function(){});
		DKCreate("DKBuild/DKSolution.js", function(){
			DKCreate("DKFrame/DKFrame.js", function(){
				var frame = DKFrame_Widget("DKSolution.html");
				DKWidget_SetProperty(frame, "top", "40rem");
				DKWidget_SetProperty(frame,"left","0rem");
				DKWidget_SetProperty(frame,"bottom","23rem");
				DKWidget_SetProperty(frame,"width","160rem");
				DKWidget_RemoveProperty(frame,"height");
				DKWidget_SetProperty("DKSolution.html","bottom","0rem");
			});
		});
	});
	
	DKCreate("DKDebug/DKDebug.js", function(){});
	
	//DKCreate("DKFileMenu/DKFileMenu.js", function(){
	//	DKFileMenu_Widget("body");
	//});
	
	//if(DK_GetBrowser() != "CEF"){ 
	//	DKCreate("DKGoogleAd/DKGoogleAd.js", function(){
	//		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
	//	});
	//}
}