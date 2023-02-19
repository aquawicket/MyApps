function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	console.log("myapp.loadFiles")
	//DKPlugin("DKScale/DKScale.js");
	DKPlugin("DKFile/DKFile.js");
	DKPlugin("DKDebug/DKDebug.js");
	DKPlugin("DKReceiver/Receiver.js");
	DKPlugin("DKTray/DKTray.js");
}

myapp.loadApp = function myapp_loadApp() {
	Receiver_init()
}
