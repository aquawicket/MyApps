function MyApp(){}
const myapp = DKPlugin(MyApp);

myapp.loadFiles = function myapp_loadFiles() {
	console.log("!!!! myapp.loadFiles !!!!")
	DKPlugin("DK/DKPhp.js")
	DKPlugin("DKFile/DKFile.js")
	DKPlugin("DKRemote/Remote.js")
}

myapp.loadApp = function myapp_loadApp() {
	console.log("!!!! myapp.loadApp !!!!")
	Remote_init()
}

/*
DKAddEvent("GLOBAL", "keydown", app_OnEvent);

///////////////////////////
function app_OnEvent(event)  //Duktape
{
	DKDEBUGFUNC(event);
	if(DK_Type(event, "keydown")){
		//console.log("keydown ="+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "4"){ //Exit for ANDROID
		    DK_Exit();
		}
	}
}
*/