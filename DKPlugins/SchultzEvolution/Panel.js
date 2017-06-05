DKCreate("SchultzEvolution/Panel.html");

/////////////////////
function Panel_Init()
{
	DKAddEvent("login_Button", "click", Panel_OnEvent);
	DKAddEvent("FileNum_Button", "click", Panel_OnEvent);
}

/////////////////////////////
function Panel_OnEvent(event)
{
	DKLog("Panel_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "login_Button")){
		//DKLog("login_Button \n");
		var name = DKWidget_GetValue("name_Textbox");
		var pass = DKWidget_GetValue("pass_Textbox");
		if(name == "vince" && pass == "123"){
			DKLog("Succesfully logged in.\n");
			DKWidget_Hide("Panel.html");
			DKCreate("SchultzEvolution/Panel0.js");
		}
	}
	
	if(DK_Id(event, "FileNum_Button")){
		var filenum = DKWidget_GetValue("FileNum_Textbox");
		DKWidget_Hide("Panel.html");
		DKCreate("SchultzEvolution/Panel3.js");
	}
}