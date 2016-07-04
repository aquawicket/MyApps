DKCreate("DKWidget,Home.html");

////////////////////
function Home_Init()
{
	DKAddEvent("login", "click", Home_OnEvent);
	DKAddEvent("GLOBAL", "keydown", Home_OnEvent);
	
	if(DK_GetBrowser() != "DigitalKnob"){
		realpath = "/home/keithnam/www/";
		if(document.location.protocol == "file:"){
			Home_OpenAdmin();
		}
	}
	if(DKFile_GetSetting("", "loggedin") == "true"){
		Home_OpenAdmin();
	}
}

////////////////////////////
function Home_OnEvent(event)
{
	if(DK_Id(event, "login")){
		Home_Login();
	}
	if(DK_Type(event, "keydown")){
		if(DKWidget_GetValue(event) == "13"){
			Home_Login();
		}
	}
}

/////////////////////
function Home_Login()
{
	var password = DKWidget_GetValue("password");
	if(password == "million"){
		Home_OpenAdmin();
	}
	else{
		DKWidget_SetProperty("password_text","color","rgb(255,0,0)");
	}
}

/////////////////////////
function Home_OpenAdmin()
{
	DKWidget_Hide("Home.html");
	DKCreate("DKJavascript,Admin.js");
	DKFile_SetSetting("", "loggedin", "true");
}