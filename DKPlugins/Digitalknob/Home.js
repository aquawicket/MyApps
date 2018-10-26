////////////////////
function Home_Init()
{
	DKDEBUGFUNC();
	DKCreate("Digitalknob/Home.html,Digitalknob_content");
}

///////////////////
function Home_End()
{
	DKDEBUGFUNC();
	DKRemoveEvent("GLOBAL", "mousedown", Home_OnEvent);
	DKClose("Digitalknob/Home.html");
}

////////////////////////////
function Home_OnEvent(event)
{
	DKDEBUGFUNC(event);
}