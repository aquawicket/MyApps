DKCreate("SchultzEvolution/Panel2.html,Panel0.html");

//////////////////////
function Panel2_Init()
{
	DKWidget_Hide("Panel2.html");
	//DKMySql_Prep("Panel2.html");  //only need to do this when we update the gui with new databases, tables and fields
	
	DKMySql_LoadRecord("Panel2.html", current_record);
}

//////////////////////////////
function Panel2_OnEvent(event)
{
	DKLog("Panel2_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}