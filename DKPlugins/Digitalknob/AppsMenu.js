////////////////////////
function AppsMenu_Init()
{
	DKDEBUGFUNC();
	DKCreate("Digitalknob/AppsMenu.html,Digitalknob/Digitalknob.html");
	DKAddEvent("GLOBAL", "mousedown", AppsMenu_OnEvent);
	
	AppsMenu_GetApps();
}

///////////////////////
function AppsMenu_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(AppsMenu_OnEvent);
	DKClose("Digitalknob/AppsMenu.html");
}

///////////////////////////
function AppsMenu_GetApps()
{
	DKDEBUGFUNC();
	var AppList = ["DKDatabase", "DKBrowser", "DKFacebook", "DKInputTest", "DKOS", "DKReceiver", "DKRemote", "DKYoutube", "DKBuilder", "DKIDE"];
	for(var i=0; i<AppList.length; i++){
		AppsMenu_AddApp(AppList[i]);
	}
}

//////////////////////////////////////
function AppsMenu_GetDescription(name)
{
	DKDEBUGFUNC(name);
	if(name == "DKDatabase"){
		return "A simple MySql database client. <br />";
	}
	
	if(name == "DKBrowser"){
		return "A simple altenative browser. <br />";
	}
	
	if(name == "DKFacebook"){
		return "If you want to use facebook on your phone, but don't want all of the extra stuff that comes with it, give this a try. It fast, free and simple. <br /> \
* Super fast <br /> \
* No notifications <br /> \
* No data sharing <br /> \
* No location sharing <br /> \
* No running processes <br /> \
* Small, Fast, simple and free <br /><br />";
	}
	
	if(name == "DKInputTest"){
		return "Test Keyboard and Mouse input.";
	}
	
	if(name == "DKOS"){
		return "Experimental OS";
	}
	
	if(name == "DKReceiver"){
		return "Experimental Remote control Reciever for windows";
	}
	
	if(name == "DKRemote"){
		return "Experimental Remote control";
	}
	
	if(name == "DKYoutube"){
		return "Introducing, DKYoutube for Android. <br /> \
Don't you just hate how youtube music stops playing when you turn off your screen. You want to listen to music on youtube, but you want to turn my screen off to save battery!. Try DKYoutube. <br /> \
* Super small file size <br /> \
* Faster speeds than the youtube app <br /> \
* More secure with less data and location sharing <br /> \
* Turn off your screen, and the music keeps playing <br /> \
* Small, Fast, simple and free <br /><br />";
	}
	
	if(name == "DKBuilder"){
		return "The most important app. With this app, you can build eveything from scratch.";
	}
	
	if(name == "DKIDE"){
		return "Integrated development environment.";
	}
}

//////////////////////////////
function AppsMenu_AddApp(name)
{
	DKDEBUGFUNC(name);
	var id = DKWidget_CreateElement("Digitalknob/AppsMenu.html", "div", name)
	DKWidget_SetAttribute(id, "class", "option");
	DKWidget_SetProperty(id, "height", "40px");  //IE fix: This does not work. 
	DKWidget_SetProperty(id, "height", "40rem");
	DKWidget_SetProperty(id, "font-size", "30px");   //IE fix: This does not work. 
	DKWidget_SetProperty(id, "font-size", "30rem");
	DKWidget_SetInnerHtml(id, name);
	DKAddEvent(name, "click", AppsMenu_OnEvent);
}

////////////////////////////////
function AppsMenu_OnEvent(event)
{
	DKDEBUGFUNC(event);	
	if(DK_Type(event, "click")){
		DKWidget_SetInnerHtml("Digitalknob_content",""); //clear the content
		var id = DK_GetId(event);
		DKClose("Digitalknob/DKApp.js");
		DKCreate("Digitalknob/DKApp.js", function(){
			DKApp_UpdateApp(id);
			DKApp_UpdateDescription(AppsMenu_GetDescription(id));
		});		
	}
	
	if(DK_Id(event, "GLOBAL")){
		if(DKWidget_IsChildOf(DKWidget_GetHoverElement(), "Digitalknob/AppsMenu.html")){
			return;
		}
	}
	DKClose("Digitalknob/AppsMenu.js");
}