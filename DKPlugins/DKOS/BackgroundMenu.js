//////////////////////////////
function BackgroundMenu_Init()
{
	DKCreate("DKOS/BackgroundMenu.html");
	var file = DKWidget_GetAttribute("Background","src");
	DKLog("file="+file+"\n", DKINFO);
	DKWidget_SetAttribute("BackgroundMenu_Image","src",file);
}

/////////////////////////////
function BackgroundMenu_End()
{
	DKClose("BackgroundMenu.html");
}

//////////////////////////////////////
function BackgroundMenu_OnEvent(event)
{
	//DKLog("BackgroundMenu_OnEvent("+event+") \n", DKDEBUG);
}
