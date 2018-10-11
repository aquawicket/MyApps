////////////////////////
function Facebook_Init()
{
	DKLog("Facebook_Init()\n", DKDEBUG);
}

///////////////////////
function Facebook_End()
{
	DKLog("Facebook_End()\n", DKDEBUG);
	DKRemoveEvents(Facebook_OnEvent);
}

////////////////////////////////
function Facebook_OnEvent(event)
{
	DKLog("Facebook_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}