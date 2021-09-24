var current_record = 0;

CPP_DK_Create("SchultzEvolution/Panel0.html");

function Panel0_Init(){
	CPP_DK_Create("SchultzEvolution/Panel1.js");
	CPP_DK_Create("SchultzEvolution/Panel2.js");
			
	DKMySql_SetPhp("http://schultzevolution.com/");
	DKMySql_Connect("mysql.schultzevolution.com", "aquawicket", "8BallBreak", "");
	DKMySql_Database("schultzevolution");
	
	DKAddEvent("Sync_Button", "click", Panel0_OnEvent);
	DKAddEvent("Mechanical_Button", "click", Panel0_OnEvent);
	
	DKAddEvent("DB_Prev", "click", Panel0_OnEvent);
	DKAddEvent("DB_Next", "click", Panel0_OnEvent);
	DKAddEvent("DB_NewButton", "click", Panel0_OnEvent);
	DKAddEvent("DB_Save", "click", Panel0_OnEvent);
	DKAddEvent("DB_Cancel", "click", Panel0_OnEvent);
	DKAddEvent("DB_Delete", "click", Panel0_OnEvent);
	DKAddEvent("DB_Search", "click", Panel0_OnEvent);
}

function Panel0_OnEvent(event){
	DKLog("Panel0_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "Sync_Button")){
		dk.hide("Panel2.html");
		dk.show("Panel1.html");
	}
	if(DK_Id(event, "Mechanical_Button")){
		dk.hide("Panel1.html");
		dk.show("Panel2.html");
	}
	if(DK_Id(event, "DB_Prev"))
		Panel0_PrevRecord();
	if(DK_Id(event, "DB_Next"))
		Panel0_NextRecord();
	if(DK_Id(event, "DB_NewButton"))
		Panel0_NewRecord();
	if(DK_Id(event, "DB_Save"))
		Panel0_Save();
	if(DK_Id(event, "DB_Cancel"))
		Panel0_Cancel();
	if(DK_Id(event, "DB_Delete"))
		Panel0_Delete();
	if(DK_Id(event, "DB_Search"))
		Panel0_Search();
}

function Panel0_PrevRecord(){
	current_record = DKMySql_GetPrevRecordNum("Panel1.html", current_record);
	DKMySql_LoadRecord("Panel1.html", current_record);
	DKMySql_LoadRecord("Panel2.html", current_record);
}

function Panel0_NextRecord(){
	current_record = DKMySql_GetNextRecordNum("Panel1.html", current_record);
	DKMySql_LoadRecord("Panel1.html", current_record);
	DKMySql_LoadRecord("Panel2.html", current_record);
}

function Panel0_NewRecord(){
	DKLog("Creating new record. \n");
	var query = "INSERT INTO SyncRequest () VALUES ()";
	var result = DKMySql_Query(query);
	DKLog(result);
	current_record = DKMySql_GetLastRecordNum("Panel1.html");
	DKMySql_LoadRecord("Panel1.html", current_record);
	DKMySql_LoadRecord("Panel2.html", current_record);
}

function Panel0_Save(){
	DKMySql_SaveRecord("Panel1.html", current_record);
	DKMySql_SaveRecord("Panel2.html", current_record);
}

function Panel0_Cancel(){
	DKMySql_LoadRecord("Panel1.html", current_record);
	DKMySql_LoadRecord("Panel2.html", current_record);
}

function Panel0_Delete(){
	DKMySql_DeleteRecord("Panel1.html", current_record);
	current_record = DKMySql_GetLastRecordNum("Panel1.html");
	DKMySql_LoadRecord("Panel1.html", current_record);
	DKMySql_LoadRecord("Panel2.html", current_record);
}

function Panel0_Search(){
	var string = DKWidget_GetValue("DB_SearchBox");
	current_record = DKMySql_Search("Panel1.html", string);
	DKMySql_LoadRecord("Panel1.html", current_record);
	DKMySql_LoadRecord("Panel2.html", current_record);
}