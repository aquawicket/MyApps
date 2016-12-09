///////////////////////////
function Digitalknob_Init()
{
	DKCreate("DKFrame/DKFrame.js", function(){});
	DKCreate("Digitalknob/Digitalknob.html");
	DKCreate("Digitalknob/Home.js", function(){});
	DKCreate("Digitalknob/OsInfo.js", function(){});
	
	DKAddEvent("Image", "click", Digitalknob_OnEvent);
	DKAddEvent("AppsMenu", "click", Digitalknob_OnEvent);
	DKAddEvent("Blog", "click", Digitalknob_OnEvent);
	DKAddEvent("Digitalknob_login", "click", Digitalknob_OnEvent);
}

//////////////////////////
function Digitalknob_End()
{
	DKRemoveEvent("GLOBAL", "DKCef_OnQueueNewBrowser", Digitalknob_OnEvent);
	DKClose("Digitalknob/Digitalknob.html");
}

///////////////////////////////////
function Digitalknob_OnEvent(event)
{
	DKLog("Digitalknob_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
	
	//if(DK_Id(event, "GLOBAL")){
	//	DKLog("Digitalknob_OnEvent(GLOBAL)\n", DKDEBUG);
	//}
	
	if(DK_Id(event, "Image")){
		DKWidget_SetInnerHtml("Digitalknob_content","");
		DKClose("Digitalknob/Home.js");
		DKCreate("Digitalknob/Home.js", function(){});
	}
	if(DK_Id(event, "AppsMenu")){
		DKCreate("Digitalknob/AppsMenu.js", function(){});
	}
	if(DK_Id(event, "Blog")){
		DKLog("clicked Blog\n", DKDEBUG);
		//DKCreate("Digitalknob/Blog.js", function(){});
	}
	if(DK_Id(event, "Digitalknob_login")){
		DKCreate("DKLogin/DKLogin.js", function(){
			DKFrame_Widget("DKLogin.html");
		});
	}
}