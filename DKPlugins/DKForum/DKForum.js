
///////////////////////
function DKForum_Init()
{
	//DKLog("DKForum_Init() \n");
	DKCreate("DKForum/DKForum.html");
}

//////////////////////
function DKForum_End()
{
	DKClose("DKForum/DKForum.html");
}

///////////////////////////////
function DKForum_OnEvent(event)
{
	DKLog("DKForum_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
}