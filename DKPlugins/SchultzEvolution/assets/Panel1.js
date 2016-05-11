DKCreate("DKWidget,SchultzEvolution/Panel1.html,Panel0.html");

//////////////////////
function Panel1_Init()
{
	//DKWidget_Hide("Panel1.html");
	//DKMySql_Prep("Panel1.html");  //only need to do this when we update the gui with new databases, tables and fields
	
	current_record = DKMySql_GetFirstRecordNum("Panel1.html");
	DKMySql_LoadRecord("Panel1.html", current_record);
}

//////////////////////////////
function Panel1_OnEvent(event)
{
	
}

