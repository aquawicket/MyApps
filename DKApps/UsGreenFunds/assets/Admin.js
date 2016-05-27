DKCreate("DKWidget,Admin.html");

////////////////////
function Admin_Init()
{
	//DKCreate("DKJavascript, DKNotepad/DKNotepad.js");
	//DKWidget_Hide("DKNotepad.html");
	DKRegisterEvent("logout", "click", Admin_OnEvent);
	Admin_Update();
}

////////////////////////////
function Admin_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");
	
	if(DK_Id(event, "logout")){
		DKFile_SetSetting("", "loggedin", "false");
		window.location.href = "http://usgreenfunds.com";
	}
	if(DK_GetId(event).indexOf("delete_") > -1){
		var file = DK_GetId(event).replace("delete_", "");
		Admin_Delete(file);
	}
	if(DK_GetId(event).indexOf("edit_") > -1){
		var file = DK_GetId(event).replace("edit_", "");
		Admin_Edit(file);
	}
}

///////////////////////
function Admin_Update()
{
	DKWidget_SetInnerHtml("documents_div", "");
	var assets = DKAssets_GetDataPath();
	var docs = DKFile_DirectoryContents(assets+"Documents");
	var htmldocs = DKFile_DirectoryContents("/home/keithnam/www/Documents");
	docs = docs.concat(htmldocs);
	//DKLog("FILE DOCS: "+docs+"\n");
	
	var files = docs.split(",");
	for(i=0; i<files.length; i++){
		if(files[i] == "."){ continue; }
		if(files[i] == ".."){ continue; }
		var div = DKWidget_CreateElement("documents_div", "div", "div");

		var del = DKWidget_CreateElement(div, "img", "delete_"+files[i]);
		DKWidget_SetAttribute(del, "src", "delete.png");
		DKWidget_SetProperty(del,"display","inline-block");
		DKRegisterEvent(del, "click", Admin_OnEvent);
		
		if(files[i].indexOf(".txt") > -1){
			var edit = DKWidget_CreateElement(div, "img", "edit_"+files[i]);
			DKWidget_SetAttribute(edit, "src", "edit.png");
			DKWidget_SetProperty(edit,"display","inline-block");
			DKRegisterEvent(edit, "click", Admin_OnEvent);
		}
		
		var href = DKWidget_CreateElement(div, "a", "fileID");
		DKWidget_SetProperty(href,"display","inline-block");
		DKWidget_SetProperty(href,"padding-left","28px");
		if(files[i].indexOf(".txt") > -1){
			DKWidget_SetProperty(href,"padding-left","8px");
		}
		
		DKWidget_SetAttribute(href, "href", "http://usgreenfunds.com/Documents/"+files[i]); //<a href="url">link text</a>
		DKWidget_SetAttribute(href, "target", "_blank");
		DKWidget_SetInnerHtml(href, files[i]);
	}
}

///////////////////////////
function Admin_Delete(file)
{
    if(confirm("Delete this file?") == true){
		var result = DKFile_Delete("/home/keithnam/www/Documents/"+file);
		DKLog(result+"\n");
		window.location.href = "http://usgreenfunds.com";
	}
}

/////////////////////////
function Admin_Edit(file)
{
    DKLog("Edit: "+file+"\n");
	DKCreate("DKJavascript, DKNotepad/DKNotepad.js");
	DKWidget_Show("DKNotepad.html");
	//DKNotepad_LoadFile(file);
}