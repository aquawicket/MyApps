DKCreate("DKWidget,Admin.html");

////////////////////
function Admin_Init()
{
	var assets = DKAssets_GetDataPath();
	var docs = DKFile_DirectoryContents(assets+"Documents");
	var htmldocs = DKFile_DirectoryContents("/home/keithnam/www/Documents");
	docs = docs.concat(htmldocs);
	//DKLog("FILE DOCS: "+docs+"\n");
	
	var files = docs.split(",");
	for(i=0; i<files.length; i++){
		if(files[i] == "."){ continue; }
		if(files[i] == ".."){ continue; } 
		var href = DKWidget_CreateElement("documents_div", "a", "fileID");
		var br = DKWidget_CreateElement("documents_div", "br", "");
		DKWidget_SetAttribute(href, "href", "http://usgreenfunds.com/Documents/"+files[i]); //<a href="url">link text</a>
		DKWidget_SetAttribute(href, "target", "_blank");
		DKWidget_SetInnerHtml(href, files[i]);
	}
}

////////////////////////////
function Admin_OnEvent(event)
{

}