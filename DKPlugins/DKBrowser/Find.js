////////////////////
function Find_Init()
{
	DKDEBUGFUNC();
	DKCreate("DKBrowser/Find.html");
	DKAddEvent("FindNext", "click", Find_OnEvent);
	DKAddEvent("FindCancel", "click", Find_OnEvent);
}

///////////////////
function Find_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(Find_OnEvent);
	DKCef_Find(0, ""); //FIXME: not working
	DKClose("DKBrowser/Find.html");
}

////////////////////////////
function Find_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Id(event, "FindNext")){
		DKCef_Find(0, DKWidget_GetValue("FindInput"));
	}
	if(DK_Id(event, "FindCancel")){
		DKFrame_Close("DKBrowser/Find.html"); //FIXME: not working
		return;
	}
}