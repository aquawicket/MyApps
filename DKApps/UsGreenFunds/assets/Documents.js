DKCreate("DKWidget,Documents.html");
DKCreate("DKJavascript, DKNotepad/DKNotepad.js");

////////////////////////
function Documents_Init()
{
	Documents_Update();
}

/////////////////////////////////
function Documents_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");	
	if(DK_GetId(event).indexOf("delete_") > -1){
		var file = DK_GetId(event).replace("delete_", "");
		Documents_Delete(file);
	}
	if(DK_GetId(event).indexOf("edit_") > -1){
		var file = DK_GetId(event).replace("edit_", "");
		DKLog("Documents_OnEvent"+file+"\n");
		Documents_Edit(file);
	}
}

///////////////////////////
function Documents_Update()
{
	DKWidget_SetInnerHtml("documents_div", "");
	var assets = DKAssets_GetDataPath();
	var docs = DKFile_DirectoryContents(assets+"Documents");
	if(DK_GetBrowser() != "DigitalKnob"){
		var htmldocs = DKFile_DirectoryContents(realpath+"Documents/");
		docs = docs.concat(htmldocs);
	}
	//DKLog("FILE DOCS: "+docs+"\n");
	
	var files = docs.split(",");
	for(i=0; i<files.length; i++){
		if(files[i] == "."){ continue; }
		if(files[i] == ".."){ continue; }
		var div = DKWidget_CreateElement("documents_div", "div", "div");

		var del = DKWidget_CreateElement(div, "img", "delete_"+files[i]);
		DKWidget_SetAttribute(del, "src", "delete.png");
		DKWidget_SetProperty(del,"display","inline-block");
		DKRegisterEvent(del, "click", Documents_OnEvent);
		
		if(files[i].indexOf(".txt") > -1){
			var edit = DKWidget_CreateElement(div, "img", "edit_"+files[i]);
			DKWidget_SetAttribute(edit, "src", "edit.png");
			DKWidget_SetProperty(edit,"display","inline-block");
			DKRegisterEvent(edit, "click", Documents_OnEvent);
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
 	if(DK_GetBrowser() != "DigitalKnob" && realpath){
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
    DKLog("Edit: "+file+"\n");
	DKWidget_Show("DKNotepad.html");
	var assets = DKAssets_GetDataPath();
	DKNotepad_LoadFile(assets+"Documents/"+file);
}