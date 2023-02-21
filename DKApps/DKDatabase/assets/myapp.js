function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	DKPlugin("DK/DKPhp.js")
	DKPlugin("DKFile/DKFile.js")
	DKPlugin("DKDatabase/DKDatabase.js")
	/*
	DKPlugin("DKGoogleAd/DKGoogleAd.js", function(){
		var id = CPP_DKGoogleAd_CreateAd("body", "100%", "90rem"); //FIXME
		if(id)
			byId(id).style.bottom = "0px"
	});
	*/
}

myapp.loadApp = function myapp_loadApp() {
	document.body.style.backgroundColor = "grey"
}
