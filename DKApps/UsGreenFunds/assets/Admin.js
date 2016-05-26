DKCreate("DKWidget,Admin.html");

////////////////////
function Admin_Init()
{
	var assets = DKAssets_GetDataPath();
	DKLog(assets+"Documents"+"\n");
	var docs = DKFile_DirectoryContents(assets+"Documents")
	DKLog(docs+"\n");
}

////////////////////////////
function Admin_OnEvent(event)
{

}