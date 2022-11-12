CPP_DK_Create("DKSDLWindow");
CPP_DK_Create("DKRml");

var url   = "file:///"+CPP_DKAssets_LocalAssets()+"/index.html";
//CPP_DKRml_LoadGui("index.html");
CPP_DKRml_LoadGui(url);

//CPP_DK_Create("DKWidget");
CPP_DK_Create("DKScale/DKScale.js", function(){});
CPP_DK_Create("DKRemote/Remote.js", function(){});
CPP_DK_Create("DKDebug/DKDebug.js", function(){});

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