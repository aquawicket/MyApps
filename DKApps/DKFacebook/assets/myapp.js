function MyApp(){}
const myapp = DKPlugin(MyApp);

var DKApp_url   = "http://facebook.com/home.php";

myapp.loadFiles = function myapp_loadFiles() {
	console.log("myapp.loadFiles")
	DKPlugin("DKDebug/DKDebug.js");
	CPP_DK_SetFramerate(120);
	DKPlugin("DKUpdate");
	CPP_DKUpdate_CheckForUpdate();
	
	DKPlugin("DKWindow/DKWindow.js")
	DKPlugin("DKTray/DKTray.js")
}

myapp.loadApp = function myapp_loadApp() {
	console.log("myapp.loadApp")
}
