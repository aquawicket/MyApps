////////////////////
function Home_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("Digitalknob/Home.html,Digitalknob_content");
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