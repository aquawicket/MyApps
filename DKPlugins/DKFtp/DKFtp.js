/////////////////////
function DKFtp_Init()
{
	DKDEBUGFUNC();
	DKCreate("DKFtp/DKFtp.html");
	//DKAddEvent("DKFtp.html", "blah", DKFtp_OnEvent);
}

////////////////////
function DKFtp_End()
{
	DKDEBUGFUNC();
	DKClose("DKFtp/DKFtp.html");
}

/////////////////////////////
function DKFtp_OnEvent(event)
{	
	DKDEBUGFUNC(event);
	/*
	if(DK_Id(event, "Blah")){
		//TODO
	}
	*/
}