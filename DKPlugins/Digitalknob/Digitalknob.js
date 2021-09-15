///////////////////////////
function Digitalknob_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKGui/DKFrame.js", function(){});
	CPP_DK_Create("Digitalknob/Digitalknob.html");
	CPP_DK_Create("Digitalknob/Home.js", function(){});
	CPP_DK_Create("Digitalknob/OsInfo.js", function(){});
	
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
	//	console.log("Digitalknob_OnEvent(GLOBAL)\n");
	//}
	
	if(DK_Id(event, "Image")){
		DKWidget_SetInnerHtml("Digitalknob_content","");
		DKClose("Digitalknob/Home.js");
		CPP_DK_Create("Digitalknob/Home.js", function(){});
	}
	if(DK_Id(event, "AppsMenu")){
		CPP_DK_Create("Digitalknob/AppsMenu.js", function(){});
	}
	if(DK_Id(event, "Blog")){
		console.log("clicked Blog\n");
		//CPP_DK_Create("Digitalknob/Blog.js", function(){});
	}
	if(DK_Id(event, "Digitalknob_login")){
		CPP_DK_Create("DKLogin/DKLogin.js", function(){
			DKFrame_Widget("DKLogin/DKLogin.html");
		});
	}
}