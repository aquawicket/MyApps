DKCreate("DKWidget,Templates.html");
var templates_text = "";

/////////////////////
function Templates_Init()
{
	DKRegisterEvent("add_link", "click", Templates_OnEvent);
	Templates_Update();
}

/////////////////////////////
function Templates_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");
	if(DK_Id(event, "add_link")){
		Templates_AddLink(DKWidget_GetValue("link_text"));
	}
	if(DK_GetId(event).indexOf("delete_") > -1){
		var url = DK_GetId(event).replace("delete_", "");
		Templates_Delete(url);
	}
}

///////////////////////
function Templates_Update()
{
	DKWidget_SetInnerHtml("templates_div", "");
	var assets = DKAssets_GetDataPath();
	templates_text = DKFile_FileToString("templates.txt");
	if(!templates_text){
		DKLog("cannot get templates.txt");
	}
	
	var templates = templates_text.split(",");
	for(i=0; i<templates.length; i++){
		if(templates[i] == ""){ continue; }
		var div = DKWidget_CreateElement("templates_div", "div", "div");
		DKWidget_SetProperty(div,"width","1px");
		DKWidget_SetProperty(div,"white-space","nowrap");
		
		var del = DKWidget_CreateElement(div, "img", "delete_"+templates[i]);
		DKWidget_SetAttribute(del, "src", "delete.png");
		DKWidget_SetProperty(del,"display","inline-block");
		DKRegisterEvent(del, "click", Templates_OnEvent);
		
		var href = DKWidget_CreateElement(div, "a", "link_");
		DKWidget_SetProperty(href,"display","inline-block");
		DKWidget_SetProperty(href,"padding-left","28px");
		DKWidget_SetAttribute(href, "href", templates[i]); //<a href="url">link text</a>
		DKWidget_SetAttribute(href, "target", "_blank");
		DKWidget_SetInnerHtml(href, templates[i]);
	}
}

////////////////////////////
function Templates_AddLink(link)
{
	DKLog("Templates_AddLink: "+link+"\n");
	if(!DKFile_PathExists(link)){
		DKLog("link does not exists");
		return;
	}
	//DKLog("link exists");
	templates_text = templates_text+link+",";
	//DKLog(templates_text+"\n");
	DKFile_SaveFile("templates.txt", templates_text);
	Templates_Update();
}

//////////////////////////
function Templates_Delete(url)
{
	DKLog("Delete: "+url);

	if(DK_GetBrowser() != "DigitalKnob"){
		if(confirm("Delete this link?") == true){
			templates_text = templates_text.replace(url+",", "");
			DKFile_SaveFile("templates.txt", templates_text);
		}
	}
	else{
		templates_text = templates_text.replace(url+",", "");
		DKFile_StringToFile(templates_text, "templates.txt")
	}
	Templates_Update();
}