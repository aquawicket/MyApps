DKCreate("DKWidget,Admin.html");

////////////////////
function Admin_Init()
{
	DKRegisterEvent("logout", "click", Admin_OnEvent);
	Admin_Update();
}

////////////////////////////
function Admin_OnEvent(event)
{
	//DKLog(DK_GetId(event)+"\n");
	
	if(DK_Id(event, "logout")){
		DKFile_SetSetting("", "loggedin", "false");
		window.location.href = "http://usgreenfunds.com";
	}
	if(DK_GetId(event).indexOf("delete_") > -1){
		//DKLog(DK_GetId(event)+"\n");
		var file = DK_GetId(event).replace("delete_", "");
		Admin_Delete(file);
	}
}

///////////////////////
function Admin_Update()
{
	DKWidget_SetInnerHtml("documents_div", "");
	var assets = DKAssets_GetDataPath();
	var docs = DKFile_DirectoryContents(assets+"Documents");
	var htmldocs = DKFile_DirectoryContents("/home/keithnam/www/Documents");
	docs = docs.concat(htmldocs);
	//DKLog("FILE DOCS: "+docs+"\n");
	
	var files = docs.split(",");
	for(i=0; i<files.length; i++){
		if(files[i] == "."){ continue; }
		if(files[i] == ".."){ continue; }
		var div = DKWidget_CreateElement("documents_div", "div", "div");

		var del = DKWidget_CreateElement(div, "img", "delete_"+files[i]);
		DKWidget_SetAttribute(del, "src", "delete.png");
		DKWidget_SetProperty(del,"display","inline-block");
		DKRegisterEvent(del, "click", Admin_OnEvent);
		
		var href = DKWidget_CreateElement(div, "a", "fileID");
		DKWidget_SetProperty(href,"display","inline-block");
		DKWidget_SetProperty(href,"padding-left","20px");
		
		DKWidget_SetAttribute(href, "href", "http://usgreenfunds.com/Documents/"+files[i]); //<a href="url">link text</a>
		DKWidget_SetAttribute(href, "target", "_blank");
		DKWidget_SetInnerHtml(href, files[i]);
	}
}

///////////////////////////
function Admin_Delete(file)
{
	DKFile_Delete(file);
}