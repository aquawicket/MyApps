////////////////////
function Home_Init()
{
	
	CPP_DK_Create("Digitalknob/Home.html,Digitalknob_content");
}

///////////////////
function Home_End()
{
	
	DKRemoveEvent("GLOBAL", "mousedown", Home_OnEvent);
	DKClose("Digitalknob/Home.html");
}

////////////////////////////
function Home_OnEvent(event)
{
	DKDEBUGFUNC(event);
}