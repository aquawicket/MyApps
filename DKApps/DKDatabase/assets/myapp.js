function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	DKPlugin("DKDebug/DKDebug.js")
	/*
	DKPlugin("DKGoogleAd/DKGoogleAd.js", function(){
		var id = CPP_DKGoogleAd_CreateAd("body", "100%", "90rem");
		if(id)
			byId(id).style.bottom = "0px"
	});
	*/
}

myapp.loadApp = function myapp_loadApp() {
	document.body.style.backgroundColor = "grey"
	DKPlugin("DKWindow/DKWindow.js")
	//DKPlugin("DKScale/DKScale.js")
	DKPlugin("DKDatabase/DKDatabase.js")
}
