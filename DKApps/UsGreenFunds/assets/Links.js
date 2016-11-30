DKCreate("Links.html");
var stored_links = "";

/////////////////////
function Links_Init()
{
	DKAddEvent("add_link", "click", Links_OnEvent);
	Links_Update();
}

/////////////////////////////
function Links_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");
	if(DK_Id(event, "add_link")){
		Links_AddLink(DKWidget_GetValue("link_text"));
	}
	if(DK_GetId(event).indexOf("delete_") > -1){
		var url = DK_GetId(event).replace("delete_", "");
		Links_Delete(url);
	}
}

///////////////////////
function Links_Update()
{
	DKWidget_SetInnerHtml("links_div", "");
	var assets = DKAssets_GetDataPath();
	stored_links = DKFile_FileToString("links.txt");
	if(!stored_links){
		DKLog("cannot get links.txt");
	}
	
	var links = stored_links.split(",");
	for(i=0; i<links.length; i++){
		if(links[i] == ""){ continue; }
		var div = DKWidget_CreateElement("links_div", "div", "div");
		DKWidget_SetProperty(div,"width","80%");
		DKWidget_SetProperty(div,"white-space","nowrap");
		
		var del = DKWidget_CreateElement(div, "img", "delete_"+links[i]);
		DKWidget_SetAttribute(del, "src", "delete.png");
		DKWidget_SetProperty(del,"display","inline-block");
		DKAddEvent(del, "click", Links_OnEvent);
		
		var href = DKWidget_CreateElement(div, "a", "link_");
		DKWidget_SetProperty(href,"display","inline-block");
		DKWidget_SetProperty(href,"padding-left","28px");
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
	//DKLog("link exists");
	stored_links = stored_links+link+",";
	//DKLog(stored_links+"\n");
	DKFile_SaveFile("links.txt", stored_links);
	Links_Update();
}

//////////////////////////
function Links_Delete(url)
{
	DKLog("Delete: "+url);

	if(DK_GetBrowser() != "Rocket"){
		if(confirm("Delete this link?") == true){
			stored_links = stored_links.replace(url+",", "");
			DKFile_SaveFile("links.txt", stored_links);
		}
	}
	else{
		stored_links = stored_links.replace(url+",", "");
		DKFile_StringToFile(stored_links, "links.txt")
	}
	Links_Update();
}