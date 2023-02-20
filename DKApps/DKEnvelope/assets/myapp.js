function MyApp(){}
const myapp = DKPlugin(MyApp);


myapp.loadFiles = function myapp_loadFiles() {
	DKPlugin("DKDebug/DKDebug.js")
	DKPlugin("DKGoogleAd/DKGoogleAd.js", function(){
		var id = DKGoogleAd_CreateAd("body", "100%", "90rem");
		if(id)
			byId(id).style.bottom = "0px"
	});
}

myapp.loadApp = function myapp_loadApp() {
	document.body.style.backgroundColor = "grey"
	DKPlugin("DKWindow/DKWindow.js", function(){
		DKPlugin("DKScale/DKScale.js", function(){
			DKPlugin("DKDebug/DKDebug.js", function(){
				DKPlugin("DKEnvelope/DKEnvelope.js", function(){
					DKPlugin("DKGoogleAd/DKGoogleAd.js", function(){
						var id = DKGoogleAd_CreateAd("body", "100%", "90rem");
						if(id)
							byId(id).style.bottom = "0px"
					});
				});
			});
		});
	});
}