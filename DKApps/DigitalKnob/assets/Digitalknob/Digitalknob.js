///////////////////////////
function Digitalknob_Init()
{
	DKCreate("DKFrame/DKFrame.js", function(){});
	DKCreate("Digitalknob/Digitalknob.html");
	DKCreate("Digitalknob/Home.js", function(){});
	DKCreate("Digitalknob/OsInfo.js", function(){});
	
	DKAddEvent("GLOBAL", "DKCef_OnQueueNewBrowser", Digitalknob_OnEvent);  //FIXME
	DKAddEvent("Image", "click", Digitalknob_OnEvent);
	DKAddEvent("AppsMenu", "click", Digitalknob_OnEvent);
	DKAddEvent("Blog", "click", Digitalknob_OnEvent);
	DKAddEvent("Digitalknob_login", "click", Digitalknob_OnEvent);
	
	DKLog("################ myfunc = "+myfunc("input"));
}

//////////////////////////
function Digitalknob_End()
{
	DKClose("Digitalknob/Digitalknob.html");
}

///////////////////////////////////
function Digitalknob_OnEvent(event)
{
	DKLog("Digitalknob_OnEvent("+event+") \n", DKDEBUG);
	
	//if(DK_Id(event, "GLOBAL")){
	//	DKLog("Digitalknob_OnEvent(GLOBAL)\n");
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
		DKLog("clicked Blog\n");
		//DKCreate("Digitalknob/Blog.js", function(){});
	}
	if(DK_Id(event, "Digitalknob_login")){
		DKCreate("DKLogin/DKLogin.js", function(){
			DKFrame_Widget("DKLogin.html");
		});
	}
	if(DK_Type(event, "DKCef_OnQueueNewBrowser")){  //FIXME
		DKLog("DKCef_OnQueueNewBrowser");
	}
}