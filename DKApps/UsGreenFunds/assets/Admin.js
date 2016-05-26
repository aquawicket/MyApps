DKCreate("DKWidget,Admin.html");

////////////////////
function Admin_Init()
{
	var assets = DKAssets_GetDataPath();
	//DKLog(assets+"Documents"+"\n");
	var docs = DKFile_DirectoryContents(assets+"Documents");
	//DKLog("FILE DOCS: "+docs+"\n");
	var files = docs.split(",");
	for(i=0; i<files.length; i++){
		if(files[i] == "."){ continue; }
		if(files[i] == ".."){ continue; } 
		var id = DKWidget_CreateElement("documents_div", "div", "fileID");
		DKWidget_SetInnerHtml(id, files[i]);
	}
	
	if(serverpath){
		var htmlassets = serverpath;
		//DKLog(htmlassets+"\n");
		var htmldocs = DKFile_DirectoryContents("/home/keithnam/www/Documents");
		DKLog("FILE DOCS: "+htmldocs+"\n");
		var files = htmldocs.split(",");
		for(i=0; i<files.length; i++){
			if(files[i] == "."){ continue; }
			if(files[i] == ".."){ continue; } 
			var id = DKWidget_CreateElement("documents_div", "div", "fileID");
			DKWidget_SetInnerHtml(id, files[i]);
		}
	}
}

////////////////////////////
function Admin_OnEvent(event)
{

}