function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	console.log("\n!!!! myapp.loadFiles !!!!")
	DKPlugin("DK/DKPhp.js")
	DKPlugin("DKFile/DKFile.js")
	DKPlugin("DKTray/DKTray.js")
	DKPlugin("Wowzer.js")
}

myapp.loadApp = function myapp_loadApp() {
	console.log("\n!!!! myapp.loadApp !!!!")
	document.body.style.backgroundColor = "grey";
}