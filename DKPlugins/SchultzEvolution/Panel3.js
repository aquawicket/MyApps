DKCreate("DKMySqlJS");
DKCreate("DKWidgetMySqlJS");
DKCreate("DKMySql.js");

var current_record = 0;
DKCreate("DKWidget,SchultzEvolution/Panel3.html");

//////////////////////
function Panel3_Init()
{
	DKMySql_SetPhp("http://digitalknob.com/digitalknob.com");
	DKMySql_Connect("mysql.schultzevolution.com", "aquawicket", "8BallBreak", "");
	DKMySql_Database("schultzevolution");
	
	current_record = DKWidgetMySql_GetFirstRecordNum("Panel3.html");
	DKWidgetMySql_LoadRecord("Panel3.html", current_record);
}

//////////////////////////////
function Panel3_OnEvent(event)
{
	
}