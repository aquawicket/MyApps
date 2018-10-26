///////////////////////////
function Digitalknob_Init()
{
	DKDEBUGFUNC();
	DKCreate("DKGui/DKFrame.js", function(){});
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
	DKDEBUGFUNC();
	DKRemoveEvents(Digitalknob_OnEvent);
	DKClose("Digitalknob/OsInfo.js");
	DKClose("Digitalknob/Home.js");
	DKClose("Digitalknob/Digitalknob.html");
}

///////////////////////////////////
function Digitalknob_OnEvent(event)
{
	DKDEBUGFUNC(event);
	//if(DK_Id(event, "GLOBAL")){
	//	DKINFO("Digitalknob_OnEvent(GLOBAL)\n");
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
		DKINFO("clicked Blog\n");
		//DKCreate("Digitalknob/Blog.js", function(){});
	}
	if(DK_Id(event, "Digitalknob_login")){
		DKCreate("DKLogin/DKLogin.js", function(){
			DKFrame_Widget("DKLogin/DKLogin.html");
		});
	}
}