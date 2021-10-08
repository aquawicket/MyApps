CPP_DK_Create("Home.html");

////////////////////
function Home_Init()
{
	DKAddEvent("login", "click", Home_OnEvent);
	DKAddEvent("GLOBAL", "keydown", Home_OnEvent);
	
	if(DK_GetBrowser() != "Rocket"){
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
	console.log("Home_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "login")){
		Home_Login();
	}
	if(DK_Type(event, "keydown")){
		if(DK_GetValue(event) == "13"){
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
	dk.hide("Home.html");
	CPP_DK_Create("Admin.js");
	DKFile_SetSetting("", "loggedin", "true");
}