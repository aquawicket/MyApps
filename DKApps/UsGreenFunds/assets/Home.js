DKCreate("DKWidget,Home.html");

////////////////////
function Home_Init()
{
	DKRegisterEvent("login", "click", Home_OnEvent);
}

////////////////////////////
function Home_OnEvent(event)
{
	DKLog("event");
}