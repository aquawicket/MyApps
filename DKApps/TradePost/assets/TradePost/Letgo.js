/////////////////////
function Letgo_Init()
{
	DKLog("Letgo_Init()\n", DKDEBUG);
}

////////////////////
function Letgo_End()
{
	DKLog("Letgo_End()\n", DKDEBUG);
	DKRemoveEvents(Letgo_OnEvent);
}

/////////////////////////////
function Letgo_OnEvent(event)
{
	DKLog("Letgo_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}