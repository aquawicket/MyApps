function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	console.log("myapp.loadFiles")
	DKPlugin("DKWindow/DKWindow.js")
	DKPlugin("DKGui/DKFrame.js")
	DKPlugin("DKDebug/DKDebug.js")
	DKPlugin("DKOcr/DKOcr.js")
}

myapp.loadApp = function myapp_loadApp() {
	console.log("myapp.loadApp")
}
