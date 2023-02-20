function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	console.log("!!!! myapp.loadFiles !!!!")
	DKPlugin("DK/DKPhp.js")
	DKPlugin("DKFile/DKFile.js");
	DKPlugin("DKReceiver/Receiver.js");
	DKPlugin("DKTray/DKTray.js");
}

myapp.loadApp = function myapp_loadApp() {
	console.log("!!!! myapp.loadApp !!!!")
	Receiver_init()
}
