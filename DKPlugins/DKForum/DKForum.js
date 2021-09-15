///////////////////////
function DKForum_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKForum/DKForum.html");
}

//////////////////////
function DKForum_End()
{
	DKDEBUGFUNC();
	DKClose("DKForum/DKForum.html");
}

///////////////////////////////
function DKForum_OnEvent(event)
{
	DKDEBUGFUNC(event);
}