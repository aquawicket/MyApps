/////////////////////
function DKFtp_Init()
{
	DKCreate("DKFtp/DKFtp.html");
	//DKAddEvent("DKFtp.html", "blah", DKFtp_OnEvent);
}

/////////////////////////
function DKDatabase_End()
{
	DKClose("DKFtp/DKFtp.html");
}

/////////////////////////////
function DKFtp_OnEvent(event)
{	
	DKLog("DKFtp_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");

	/*
	if(DK_Id(event, "Blah")){
		//TODO
	}
	*/
}
