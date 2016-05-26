DKCreate("DKWidget,Admin.html");

////////////////////
function Admin_Init()
{
	var assets = DKAssets_GetDataPath();
	DKLog(assets+"Documents"+"\n");
	var docs = DKFile_DirectoryContents(assets+"Documents");
	DKLog("FILE DOCS: "+docs+"\n");
	
	var htmlassets = serverpath;
	DKLog(htmlassets+"/Documents"+"\n");
	var htmldocs = DKFile_DirectoryContents(htmlassets+"/Documents");
	DKLog("FILE DOCS: "+htmldocs+"\n");
}

////////////////////////////
function Admin_OnEvent(event)
{

}