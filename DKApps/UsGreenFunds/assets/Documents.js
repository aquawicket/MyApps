DKCreate("Documents.html");
DKCreate(" DKNotepad/DKNotepad.js");

////////////////////////
function Documents_Init()
{
	Documents_Update();
}

/////////////////////////////////
function Documents_OnEvent(event)
{
	DKLog("Documents_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_GetId(event).indexOf("delete_") > -1){
		var file = DK_GetId(event).replace("delete_", "");
		Documents_Delete(file);
	}
	if(DK_GetId(event).indexOf("edit_") > -1){
		var file = DK_GetId(event).replace("edit_", "");
		Documents_Edit(file);
	}
}

///////////////////////////
function Documents_Update()
{
	DKWidget_SetInnerHtml("documents_div", "");
	var assets = DKAssets_GetDataPath();
	var docs = DKFile_DirectoryContents(assets+"Documents");
	if(DK_GetBrowser() != "Rocket"){
		var htmldocs = DKFile_DirectoryContents(realpath+"Documents/");
		docs = docs.concat(htmldocs);
	}
	//DKLog("FILE DOCS: "+docs+"\n");
	
	var files = docs.split(",");
	for(i=0; i<files.length; i++){
		if(files[i] == "."){ continue; }
		if(files[i] == ".."){ continue; }
		var div = DKWidget_CreateElement("documents_div", "div", "div");
		DKWidget_SetProperty(div,"width","80%");
		DKWidget_SetProperty(div,"white-space","nowrap");
	
		var del = DKWidget_CreateElement(div, "img", "delete_"+files[i]);
		DKWidget_SetAttribute(del, "src", "delete.png");
		DKWidget_SetProperty(del,"display","inline-block");
		DKAddEvent(del, "click", Documents_OnEvent);
		
		if(files[i].indexOf(".txt") > -1){
			var edit = DKWidget_CreateElement(div, "img", "edit_"+files[i]);
			DKWidget_SetAttribute(edit, "src", "edit.png");
			DKWidget_SetProperty(edit,"display","inline-block");
			DKAddEvent(edit, "click", Documents_OnEvent);
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

///////////////////////////////
function Documents_Delete(file)
{
 	if(DK_GetBrowser() != "Rocket" && realpath){
		if(confirm("Delete this file?") == true){
			var result = DKFile_Delete(realpath+"Documents/"+file);
			DKLog(result+"\n");
		}
	}
	else{
		var path = DKAssets_GetDataPath();
		var result = DKFile_Delete(path+"Documents/"+file);
	}
	Documents_Update();
}

/////////////////////////////
function Documents_Edit(file)
{
    //DKLog("Edit: "+file+"\n");
	DKCreate("DKNotepad/DKNotepad.js");
	DKWidget_Show("DKNotepad.html");
	var assets = DKAssets_GetDataPath();
	DKNotepad_LoadFile("Documents/"+file);
}