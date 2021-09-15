var USE_CEF     = 1; //Desktop
var USE_WEBVIEW = 0; //TODO: Android, iOS
var USE_SDL     = 0; //Use with caution
var USE_ROCKET  = 0; //Use with caution
var DKApp_url   = "file:///"+DKAssets_LocalAssets()+"/index.html";
//var DKApp_url = "http://digitalknob.com/DKIDE/index.html";
//var DKApp_url = "http://google.com";
//var DKApp_url = "chrome://gpu";

CPP_DK_Create("DK/init.js", function(){});

//////////////////////////
function app_LoadPlugins()
{

}

///////////////////////
function app_LoadPage()
{
	DKWidget_SetProperty("body","background-color","grey");
	CPP_DK_Create("DKScale/DKScale.js", function(){});
	CPP_DK_Create("DKFtp/DKFtp.js", function(){});
	CPP_DK_Create("DKDebug/DKDebug.js", function(){});
	
	//if(DK_GetBrowser() != "CEF"){ 
	//	CPP_DK_Create("DKGoogleAd/DKGoogleAd.js", function(){
	//		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
	//	});
	//}
}