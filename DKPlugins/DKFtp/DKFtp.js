/////////////////////
function DKFtp_Init()
{
	
	CPP_DK_Create("DKFtp/DKFtp.html");
	//DKAddEvent("DKFtp.html", "blah", DKFtp_OnEvent);
}

////////////////////
function DKFtp_End()
{
	
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