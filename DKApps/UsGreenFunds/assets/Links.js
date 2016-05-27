DKCreate("DKWidget,Links.html");
var links_text = "";

/////////////////////
function Links_Init()
{
	DKRegisterEvent("add_link", "click", Links_OnEvent);
	Links_Update();
}

/////////////////////////////
function Links_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");
	if(DK_Id(event, "add_link")){
		Links_AddLink(DKWidget_GetValue("link_text"));
	}
}

///////////////////////
function Links_Update()
{
	DKWidget_SetInnerHtml("links_div", "");
	var assets = DKAssets_GetDataPath();
	links_text = DKFile_FileToString(assets+"links.txt");
	if(!links_text){
		DKLog("cannot get links.txt");
	}
	
	var links = links_text.split(",");
	for(i=0; i<links.length; i++){
		var div = DKWidget_CreateElement("links_div", "div", "div");
		var href = DKWidget_CreateElement(div, "a", "link_");
		DKWidget_SetProperty(href,"display","inline-block");
	
		DKWidget_SetAttribute(href, "href", links[i]); //<a href="url">link text</a>
		DKWidget_SetAttribute(href, "target", "_blank");
		DKWidget_SetInnerHtml(href, links[i]);
	}
}

////////////////////////////
function Links_AddLink(link)
{
	DKLog("Links_AddLink: "+link+"\n");
	if(!DKFile_PathExists(link)){
		DKLog("link does not exists");
		return;
	}
	DKLog("link exists");
	links_text = links_text+link+",";
	DKLog(links_text+"\n");
	DKFile_SaveFile(realpath+"links.txt", links_text);
	Links_Update();
}