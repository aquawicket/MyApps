function DKDatabase(){}
dk.database = DKPlugin(DKDatabase)


DKDatabase.prototype.init = function DKDatabase_init() {
	DKPlugin("DKMySql");
	DKPlugin("DKMySql/DKMySql.js", function(){
		DKPlugin("DKDatabase/DKDatabase.html", function(){
		
			//FIXME
			//DKAddEvent("DKDatabase.html", "AddDatabase", DKDatabase_onevnt);
			//DKAddEvent("DKDatabase.html", "AddTable", DKDatabase_onevnt);
			//DKAddEvent("DKDatabase.html", "AddColumn", DKDatabase_onevnt);
			
			byId("DatabaseDrop").addEventListener("change", DKDatabase_onevnt);
			DKAddEvent("TableDrop", "change", DKDatabase_onevnt);
			DKAddEvent("DatabaseConnect", "click", DKDatabase_onevnt);
			DKAddEvent("AddDatabase", "click", DKDatabase_onevnt);
			DKAddEvent("AddTable", "click", DKDatabase_onevnt);
			DKAddEvent("AddColumn", "click", DKDatabase_onevnt);
			DKAddEvent("CancelButton", "click", DKDatabase_onevnt);
			DKAddEvent("SaveButton", "click", DKDatabase_onevnt);
		
			var assets = DKAssets_LocalAssets();
			var file = assets+"USER/database.txt";
			var protocol = DKAssets_Protocol();
			if(protocol == "file:"){ file = 0;}
			var server = DKFile_GetSetting(file, "[SERVER]");
			var name = DKFile_GetSetting(file, "[USERNAME]");
			var pass = DKFile_GetSetting(file, "[PASSWORD]");
			var port = DKFile_GetSetting(file, "[PORT]");
			DKWidget_SetValue("ServerBox", server);
			DKWidget_SetValue("NameBox", name);
			DKWidget_SetValue("PassBox", pass);
			DKWidget_SetValue("PortBox", port);
		});
	});
}

DKDatabase.prototype.end = function DKDatabase_end() {
	DKClose("DKDatabase/DKDatabase.html");
}

DKDatabase.prototype.onevent = function DKDatabase_onevent(event) {
	//DKDEBUGFUNC(event);

	if(DK_Id(event, "DatabaseConnect")){
		DKDatabase_Connect();
		DKDatabase_UpdateDatabases();
	}
	if(DK_Id(event, "AddDatabase")){
		CPP_DK_Create("DKMessage/DKMessage.js", function(){
			CPP_DK_Create("DKFrame/DKFrame.js", function(){
				DKFrame_Widget("DKMessage.html");
				//var params = [];
				//params.push("AddDatabase"); //event_type
				//params.push("DKDatabase.html"); //event_id
				DKSendEvent("DKMessage.html", "GetInput", "DKDatabase.html,AddDatabase"); // To -> DKMessageBox
			});
		});
	}
	if(DK_Id(event, "AddTable")){
		CPP_DK_Create("DKMessage/DKMessage.js", function(){
			CPP_DK_Create("DKFrame/DKFrame.js", function(){
				DKFrame_Widget("DKMessage.html");
				//var params = [];
				//params.push("AddTable"); //event_type
				//params.push("DKDatabase.html"); //event_id
				DKSendEvent("DKMessage.html", "GetInput", "DKDatabase.html,AddTable"); // To -> DKMessageBox
			});
		});
	}
	if(DK_Id(event, "AddColumn")){
		CPP_DK_Create("DKMessage/DKMessage.js", function(){
			CPP_DK_Create("DKFrame/DKFrame.js", function(){
				DKFrame_Widget("DKMessage.html");
				//var params = [];
				//params.push("AddColumn"); //event_type
				//params.push("DKDatabase.html"); //event_id
				DKSendEvent("DKMessage.html", "GetInput", "DKDatabase.html,AddColumn"); // To -> DKMessageBox
			});
		});
	}
	
	if(DK_IdLike(event, "DeleteRecord")){
		//TODO - need confirmation 
		var id = DKWidget_GetAttribute(DK_GetId(event), "row");
		console.log("Delete Record "+id+"\n");
		var query = "DELETE FROM "+DKWidget_GetValue("TableDrop")+" WHERE ID="+id
		DKMySql_Query(query);
		DKDatabase_UpdateRecords(DKWidget_GetValue("TableDrop"));
	}
	if(DK_Id(event, "CancelButton")){
		DKDatabase_Cancel();
	}
	if(DK_Id(event, "SaveButton")){
		DKDatabase_Save();
	}
	if(DK_Id(event, "DatabaseDrop")){
		//console.log("DatabaseDrop\n");
		DKMySql_Database(DKWidget_GetValue(event));
		DKDatabase_UpdateTables();
		DKDatabase_UpdateRecords("");
	}
	if(DK_Id(event, "TableDrop")){
		DKDatabase_UpdateRecords(DKWidget_GetValue(event));
	}
	if(DK_Type(event, "AddDatabase")){	
		var query = "CREATE DATABASE "+DKWidget_GetValue(event);
		DKMySql_Query(query);
	}
	if(DK_Type(event, "AddTable")){
		var query = "CREATE TABLE "+DKWidget_GetValue(event)+" (ID INT(10) NOT NULL AUTO_INCREMENT, PRIMARY KEY (ID))";
		DKMySql_Query(query);
	}
	if(DK_Type(event, "AddColumn")){
		var query ="ALTER TABLE "+DKWidget_GetValue("TableDrop")+" ADD "+DKWidget_GetValue(event)+" VARCHAR(60) NOT NULL";
		DKMySql_Query(query);
		DKDatabase_UpdateRecords(DKWidget_GetValue("TableDrop"));
	}
	if(DK_Id(event, "AddRecord")){
		DKDatabase_AddRecord();
	}
}

DKDatabase.prototype.connect = function DKDatabase_connect() {
	dk.hide("Success");
	var server = DKWidget_GetValue("ServerBox");
	var port = DKWidget_GetValue("PortBox");
	var username = DKWidget_GetValue("NameBox");
	var password = DKWidget_GetValue("PassBox");
	
	var result = DKMySql_Query("Info");
	console.log("DKDatabase_Connect(): result = "+result+"\n");
	//FIXME
	if(!DKMySql_Connect(server, username, password, "")){ return false; }
	//DKMySql_Database("DKData");

	dk.show("Success");
	var assets = DKAssets_LocalAssets();
	var file = assets+"USER/database.txt";
	var protocol = DKAssets_Protocol();
	if(protocol == "file:"){ file = 0;}
	DKFile_SetSetting(file, "[SERVER]", server);
	DKFile_SetSetting(file, "[USERNAME]", username);
	DKFile_SetSetting(file, "[PASSWORD]", password);
	DKFile_SetSetting(file, "[PORT]", port);
	return true;
}

DKDatabase.prototype.updateDatabases = function DKDatabase_updateDatabases() {
	DKWidget_SetValue("DatabaseDrop", "");
	DKWidget_SetInnerHtml("DatabaseDrop", ""); //clear

	var query = "SHOW DATABASES";
	var result = DKMySql_Query(query);
	console.log("DKDatabase_UpdateDatabases(): result = "+result+"\n");
	var records = result.split(',');

	var blank = DKWidget_CreateElement("DatabaseDrop", "option", "Database00");
	for(var i=1; i<records.length; i++){
		if(!records[i]){ continue; }
		var id = DKWidget_CreateElement("DatabaseDrop", "option", "Database"+String(i));
		DKWidget_SetAttribute(id, "value", records[i]);
		//AddEventListener(id, "click");
		DKWidget_SetInnerHtml(id, records[i]);
	}
}

DKDatabase.prototype.updateTables = function DKDatabase_updateTables() {
	DKWidget_SetValue("TableDrop", "");
	DKWidget_SetInnerHtml("TableDrop", ""); //clear

	var query = "SHOW TABLES";
	var result = DKMySql_Query(query);
	console.log("DKDatabase_UpdateTables(): result = "+result+"\n");
	var records = result.split(',');

	var blank = DKWidget_CreateElement("TableDrop", "option", "Table00");
	for(var i=1; i<records.length; i++){
		if(!records[i]){ continue; }
		var id = DKWidget_CreateElement("TableDrop", "option", "Table"+i);
		DKWidget_SetAttribute(id, "value", records[i]);
		DKWidget_SetInnerHtml(id, records[i]);
		DKWidget_SetProperty(id, "overflow", "hidden");
	}
}

DKDatabase.prototype.updateHeader = function DKDatabase_updateHeader(table) {
	//DKDEBUGFUNC(table);
	DKWidget_SetInnerHtml("Records", ""); //clear
	if(!table){ return false; }

	var query = "SHOW COLUMNS FROM "+ table;
	var result = DKMySql_Query(query);
	console.log("DKDatabase_UpdateHeader("+table+"): result = "+result+"\n");
	var records = result.split(',');
	
	var step = Number(records[0]);
	var id = DKWidget_CreateElement("Records", "div", "RecordsDiv");
	DKWidget_SetProperty(id, "display", "inline-block");
	DKWidget_SetProperty(id, "width", "100%");
	DKWidget_SetProperty(id, "min-width", "450rem");

	for(var i=1; i<records.length-1; i+=step){
		var id = DKWidget_CreateElement("RecordsDiv", "input", "ColumnName"+i);
		DKWidget_SetAttribute(id, "type", "text");
		DKWidget_SetProperty(id, "overflow", "hidden");
		DKWidget_SetProperty(id, "width", "100rem");
		DKWidget_SetProperty(id, "height", "18rem");
		DKWidget_SetProperty(id, "display", "inline-block");
		DKWidget_SetProperty(id, "border-width", "1rem");
		DKWidget_SetProperty(id, "background-color", "rgb(200,200,200)");
		//DKWidget_SetAttribute(command, "row", records[r]);
		//DKWidget_SetAttribute(command, "column", toString(i));
		DKWidget_SetValue(id, records[i]);
	}

	var id = DKWidget_CreateElement("RecordsDiv", "button", "AddColumn");
	DKWidget_SetProperty(id, "width", "20rem");
	DKWidget_SetProperty(id, "height", "18rem");
	DKWidget_SetProperty(id, "display", "inline-block");
	DKWidget_SetInnerHtml(id, "+");
	DKAddEvent(id, "click", DKDatabase_onevnt);

	return true;
}

DKDatabase.prototype.updateRecords = function DKDatabase_updateRecords(table) {
	DKDEBUGFUNC(table);
	DKDatabase_UpdateHeader(table);
	if(!table){ return false; }

	var query = "SHOW COLUMNS FROM "+ table;
	var result = DKMySql_Query(query);
	console.log("DKDatabase_UpdateRecords("+table+"): result = "+result+"\n");
	var columns = result.split(',');
	
	var columnnames = [];
	for(var c = 1; c < columns.length; c += Number(columns[0])){
		columnnames.push(columns[c]);
	}
	
	query = "SELECT * FROM "+ table;
	result = DKMySql_Query(query);
	console.log("DKDatabase_UpdateRecords("+table+"): result = "+result+"\n");
	var records = result.split(',');
	
	for(var r = 1; r < records.length-1; r += Number(records[0])){
	
		var id = DKWidget_CreateElement("Records", "div", "RecordDiv"+String(r));
		DKWidget_SetProperty(id, "display", "inline-block");
		DKWidget_SetProperty(id, "width", "100%");
		DKWidget_SetProperty(id, "min-width", "450rem");

		for(var i=0; i < Number(records[0]); i++){
			var command = DKWidget_CreateElement(id, "input", "RecordValue"+String(r)+String(i));
			DKWidget_SetAttribute(command, "type", "text");
			DKWidget_SetProperty(command, "overflow-x", "hidden");
			DKWidget_SetProperty(command, "width", "100rem");
			DKWidget_SetProperty(command, "height", "18rem");
			DKWidget_SetProperty(command, "display", "inline-block");
			DKWidget_SetProperty(command, "border-width", "1rem");
			DKWidget_SetAttribute(command, "row", records[r]);
			DKWidget_SetAttribute(command, "column", columnnames[i]);
			DKWidget_SetValue(command, records[r+i]);
		}

		var deleteRecord = DKWidget_CreateElement(id, "button", "DeleteRecord"+String(r));
		DKWidget_SetAttribute(deleteRecord, "row", records[r]);
		DKWidget_SetProperty(deleteRecord, "width", "23rem");
		DKWidget_SetProperty(deleteRecord, "height", "18rem");
		DKWidget_SetProperty(deleteRecord, "display", "inline-block");
		DKWidget_SetInnerHtml(deleteRecord, "-");
		DKAddEvent(deleteRecord, "click", DKDatabase_onevnt);
	}

	var addRecord = DKWidget_CreateElement("Records", "button", "AddRecord");
	DKWidget_SetProperty(addRecord, "width", "23rem");
	DKWidget_SetProperty(addRecord, "height", "18rem");
	DKWidget_SetProperty(addRecord, "display", "block");
	DKWidget_SetInnerHtml(addRecord, "+");
	DKAddEvent(addRecord, "click", DKDatabase_onevnt);

	return true;
}

DKDatabase.prototype.cancel = function DKDatabase_cancel() {
	DKDatabase_UpdateRecords(DKWidget_GetValue("TableDrop"));
	return true;
}

DKDatabase.prototype.save = function DKDatabase_save() {
	var query = "SELECT * FROM ";
	query += DKWidget_GetValue("TableDrop");
	query += " ORDER BY ID ASC";

	result = DKMySql_Query(query);
	var dbrecords = result.split(',');
	
	var temp = DKWidget_GetElements("Records");
	var records = temp.split(',');
	for(var i=0; i < records.length; i++){
		if(records[i].indexOf("RecordValue") == -1){
			records.splice(i, 1);
			--i;
		}
	}

	//Now we have all of the RecordValues in records
	
	//compair dbrecords to records
	for(var r=0; r < records.length; r++){
		console.log("\n\nrecords["+String(r)+"]:"+records[r]+"\n");
		console.log("Value:"+DKWidget_GetValue(records[r])+"\n");
		console.log("dbrecords["+String(r+1)+"]:"+dbrecords[r+1]+"\n\n");
		//DKDebug(dbrecords[r+1]+"\n");
		if(DKWidget_GetValue(records[r]) != dbrecords[r+1]){
			var table = DKWidget_GetValue("TableDrop");
			var column = DKWidget_GetAttribute(records[r],"column");
			var row = DKWidget_GetAttribute(records[r],"row");
			var value = DKWidget_GetValue(records[r]);

			var query = "UPDATE "+table+" SET "+column+"='"+value+"' WHERE ID="+row;
			console.log("Saveing record "+row+"\n");
			DKMySql_Query(query);
		}
	}

	return true;
}

DKDatabase.prototype.addRecord = function DKDatabase_addRecord() {
	var query = "INSERT INTO "+DKWidget_GetValue("TableDrop")+" () VALUES ()";
	DKMySql_Query(query);
	DKDatabase_UpdateRecords(DKWidget_GetValue("TableDrop"));
}