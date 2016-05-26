DKCreate("DKWidget,Home.html");

////////////////////
function Home_Init()
{
	DKRegisterEvent("login", "click", Home_OnEvent);
}

////////////////////////////
function Home_OnEvent(event)
{
	var password = DKWidget_GetValue("password");
	if(password == "million"){
		DKLog("Yup \n");
	}
	else{
		DKLog("Nope \n");
	}
}