function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	console.log("myapp.loadFiles")

}

myapp.loadApp = function myapp_loadApp() {
	console.log("myapp.loadApp")
	document.body.style.backgroundColor = "grey"
	DKPlugin("DKScale/DKScale.js");
	DKPlugin("DKFtp/DKFtp.js");
	DKPlugin("DKDebug/DKDebug.js");
	
	//if(CPP_DK_GetBrowser() != "CEF"){ 
	//	DKPlugin("DKGoogleAd/DKGoogleAd.js", function(){
	//		var id = DKGoogleAd_CreateAd("body", "100%", "100rem");
	//	});
	//}
}
