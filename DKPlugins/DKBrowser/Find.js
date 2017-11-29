////////////////////
function Find_Init()
{
	DKCreate("DKBrowser/Find.html");
	DKAddEvent("FindNext", "click", Find_OnEvent);
}

///////////////////
function Find_End()
{
	DKClose("Find.html");
}

////////////////////////////
function Find_OnEvent(event)
{
	//DKLog("Find_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "FindNext")){
		//TODO
		DKCef_Find("DKBrowser_cef", "google"); //test: search for text "google" on page
	}
}