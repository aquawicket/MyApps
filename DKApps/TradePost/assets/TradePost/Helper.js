//////////////////////
function Helper_Init()
{
	DKLog("Helper_Init()\n", DKDEBUG);
}

/////////////////////
function Helper_End()
{
	DKLog("Helper_End()\n", DKDEBUG);
}

//////////////////////////////
function Helper_OnEvent(event)
{
	DKLog("Helper_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
	
}