var current_record = 0;

function Panel3_Init(){
	CPP_DK_Create("DKMySql.js");
	CPP_DK_Create("SchultzEvolution/Panel3.html");

	DKMySql_SetPhp("FIXME.com");
	DKMySql_Connect("mysql.schultzevolution.com", "name", "pass", "");
	DKMySql_Database("schultzevolution");
	
	current_record = DKWidgetMySql_GetFirstRecordNum("Panel3.html");
	DKWidgetMySql_LoadRecord("Panel3.html", current_record);
}

function Panel3_OnEvent(event){
	console.log("Panel3_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
}