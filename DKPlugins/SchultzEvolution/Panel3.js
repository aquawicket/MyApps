var current_record = 0;

//////////////////////
function Panel3_Init()
{
	DKCreate("DKMySql.js");
	DKCreate("SchultzEvolution/Panel3.html");

	DKMySql_SetPhp("http://digitalknob.com/digitalknob.com");
	DKMySql_Connect("mysql.schultzevolution.com", "aquawicket", "8BallBreak", "");
	DKMySql_Database("schultzevolution");
	
	current_record = DKWidgetMySql_GetFirstRecordNum("Panel3.html");
	DKWidgetMySql_LoadRecord("Panel3.html", current_record);
}

//////////////////////////////
function Panel3_OnEvent(event)
{
	DKLog("Panel3_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
}