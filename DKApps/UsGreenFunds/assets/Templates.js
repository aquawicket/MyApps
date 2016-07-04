DKCreate("DKWidget,Templates.html");
var stored_templates = "";

/////////////////////
function Templates_Init()
{
	DKAddEvent("add_template_link", "click", Templates_OnEvent);
	Templates_Update();
}

/////////////////////////////
function Templates_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");
	if(DK_Id(event, "add_template_link")){
		Templates_AddLink(DKWidget_GetValue("template_text"));
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
	stored_templates = DKFile_FileToString("templates.txt");
	if(!stored_templates){
		DKLog("cannot get templates.txt");
	}
	
	var templates = stored_templates.split(",");
	for(i=0; i<templates.length; i++){
		if(templates[i] == ""){ continue; }
		var div = DKWidget_CreateElement("templates_div", "div", "div");
		DKWidget_SetProperty(div,"width","80%");
		DKWidget_SetProperty(div,"white-space","nowrap");
		
		var del = DKWidget_CreateElement(div, "img", "delete_"+templates[i]);
		DKWidget_SetAttribute(del, "src", "delete.png");
		DKWidget_SetProperty(del,"display","inline-block");
		DKAddEvent(del, "click", Templates_OnEvent);
		
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
	stored_templates = stored_templates+link+",";
	//DKLog(stored_templates+"\n");
	DKFile_SaveFile("templates.txt", stored_templates);
	Templates_Update();
}

//////////////////////////
function Templates_Delete(url)
{
	DKLog("Delete: "+url);

	if(DK_GetBrowser() != "DigitalKnob"){
		if(confirm("Delete this link?") == true){
			stored_templates = stored_templates.replace(url+",", "");
			DKFile_SaveFile("templates.txt", stored_templates);
		}
	}
	else{
		stored_templates = stored_templates.replace(url+",", "");
		DKFile_StringToFile(stored_templates, "templates.txt")
	}
	Templates_Update();
}