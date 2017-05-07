////////////////////
function Home_Init()
{
	DKCreate("Digitalknob/Home.html,Digitalknob_content");
}

///////////////////
function Home_End()
{
	DKRemoveEvent("GLOBAL", "mousedown", Home_OnEvent);
	DKClose("Home.html");
}

////////////////////////////
function Home_OnEvent(event)
{
	DKLog("Home_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}