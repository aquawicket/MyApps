///////////////////////
function Settings_Init()
{
	DKCreate("DKBrowser/Settings.html");
}

///////////////////////
function Settings_End()
{
	DKClose("Settings.html");
}

///////////////////////////////
function Settings_OnEvent(event)
{
	DKLog("Settings_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
}