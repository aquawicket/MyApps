/////////////////////////
function TradePost_Init()
{
	DKCreate("TradePost.html");
	
	DKAddEvent("GLOBAL", "DKCef_OnLoadingStateChange", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnBeforePopup", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnQueueNewBrowser", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnLoadError", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFullscreen", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_ContextMenu", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnContextCreated", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFileDialogDismissed", TradePost_OnEvent);
	
	DKAddEvent("AddItem", "click", TradePost_OnEvent);
	DKAddEvent("Craigslist", "click", TradePost_OnEvent);
	DKAddEvent("Letgo", "click", TradePost_OnEvent);
	DKAddEvent("Letgo", "click", TradePost_OnEvent);
	DKAddEvent("OfferUp", "click", TradePost_OnEvent);
	DKAddEvent("Facebook", "click", TradePost_OnEvent);
	DKAddEvent("Test", "click", TradePost_OnEvent);
	DKAddEvent("Refresh", "click", TradePost_OnEvent);
	
	//Create Items folder if it does not exist.
	if(!DKFile_Exists(DKAssets_LocalAssets()+"Items")){
		DKFile_MkDir(DKAssets_LocalAssets()+"Items");
	}
	
	TradePost_UpdateList();
}

////////////////////////
function TradePost_End()
{
	DKClose("TradePost.html");
}

/////////////////////////////////
function TradePost_OnEvent(event)
{	
	DKLog("TradePost_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");

	if(DK_Type(event, "DKCef_OnFileDialogDismissed")){
		TradePost_UploadImage(DK_GetValue(event));
	}
	if(DK_IdLike(event, "ImageCell")){
		//var num = DK_GetId(event).replace("ImageCell","");
		//DKLog("Clicking ImageUpload"+num+"\n");
		//document.getElementById("ImageUpload"+num).click();
		DKCef_FileDialog("DKBrowser_cef");
		return;
	}
	if(DK_IdLike(event, "ImageUpload")){
		var num = DK_GetId(event).replace("ImageUpload","");
		DKLog("Uploading file "+DK_GetValue(event)+"\n");
		
		DKLog(document.getElementById(DK_GetId(event)).files[0].path+"\n");
		return;
	}
	if(DK_Id(event, "AddItem")){
		TradePost_AddItem();
	}
	if(DK_Id(event, "Craigslist")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://inlandempire.craigslist.org/d/for-sale/search/sss\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "Letgo")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://us.letgo.com/en\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "OfferUp")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://offerup.com\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "Facebook")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://www.facebook.com/marketplace\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "Test")){
		TradePost_Test();
	}
	if(DK_Id(event, "Refresh")){
		DK_Refresh();
	}
	if(DK_Type(event, "keyup")){
		TradePost_ChangeTitle(DK_GetId(event), DK_GetValue(DK_GetId(event)));
	}
	if(DK_Type(event, "change")){
		TradePost_ChangeTitle(DK_GetId(event), DK_GetValue(DK_GetId(event)));
	}
}

////////////////////////////
function TradePost_AddItem()
{
	DKLog("TradePost_AddItem\n");
	
	var i = 0;
	while(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+i)){
		i++;
	}
	DKFile_MkDir(DKAssets_LocalAssets()+"Items/Item"+i);
	TradePost_UpdateList();
}

///////////////////////////////
function TradePost_UpdateList()
{
	DKLog("TradePost_UpdateList\n");
	
	DKWidget_SetInnerHtml("ItemList", ""); //clear
	for(var row = 0; row < 1000; row++){
		DKLog(DKAssets_LocalAssets()+"Items/Item"+row+"\n");
		if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row)){
			var div = DKWidget_CreateElement("ItemList", "div", "Item"+row);
			DKWidget_SetProperty(div, "display", "inline-block");
			DKWidget_SetProperty(div, "width", "100%");
			//DKWidget_SetProperty(div, "min-width", "450rem");
			DKWidget_SetProperty(div, "background-color", "white");
			
			var num = DKWidget_CreateElement(div, "div", "ItemId"+row);
			DKWidget_SetProperty(num, "display", "inline-block");
			DKWidget_SetProperty(num, "overflow", "hidden");
			DKWidget_SetProperty(num, "width", "30rem");
			DKWidget_SetProperty(num, "height", "80rem");
			DKWidget_SetProperty(num, "border-width", "1rem");
			DKWidget_SetProperty(num, "border-color", "black");
			DKWidget_SetProperty(num, "border-style", "solid");
			DKWidget_SetAttribute(num, "row", row);
			DKWidget_SetAttribute(num, "column", 1);
			DKWidget_SetValue(num, row);
			
			var imageCell = DKWidget_CreateElement(div, "div", "ImageCell"+row);
			DKWidget_SetProperty(imageCell, "display", "inline-block");
			DKWidget_SetProperty(imageCell, "width", "80rem");
			DKWidget_SetProperty(imageCell, "height", "80rem");
			DKWidget_SetProperty(imageCell, "text-align", "center");
			DKWidget_SetProperty(imageCell, "overflow", "hidden");
			DKWidget_SetProperty(imageCell, "border-width", "1rem");
			DKWidget_SetProperty(imageCell, "border-color", "black");
			DKWidget_SetProperty(imageCell, "border-style", "solid");
			DKWidget_SetAttribute(imageCell, "row", row);
			DKWidget_SetAttribute(imageCell, "column", 2);
			DKAddEvent(imageCell, "click", TradePost_OnEvent);
			
			var imageUpload = DKWidget_CreateElement(imageCell , "input", "ImageUpload"+row);
			DKWidget_SetAttribute(imageUpload, "type", "file");
			DKWidget_SetProperty(imageUpload, "width", "1px");
			DKWidget_SetProperty(imageUpload, "height", "1px");
			DKWidget_SetProperty(imageUpload, "visibility", "hidden");
			//DKAddEvent(imageUpload, "change", TradePost_OnEvent);
			
			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/Img0.jpg")){
				var img = DKWidget_CreateElement(imageCell, "img", "img"+row);
				DKWidget_SetProperty(img, "display", "block");
				DKWidget_SetProperty(img, "width", "100%");
				DKWidget_SetProperty(img, "margin", "auto");
				DKWidget_SetAttribute(img, "src", DKAssets_LocalAssets()+"Items/Item"+row+"/Img0.jpg");
			}
			
			var titleCell = DKWidget_CreateElement(div, "div", "TitleCell"+row);
			DKWidget_SetProperty(titleCell, "overflow", "hidden");
			DKWidget_SetProperty(titleCell, "width", "120rem");
			DKWidget_SetProperty(titleCell, "height", "80rem");
			DKWidget_SetProperty(titleCell, "display", "inline-block");
			DKWidget_SetProperty(titleCell, "border-width", "1rem");
			DKWidget_SetProperty(titleCell, "border-color", "black");
			DKWidget_SetProperty(titleCell, "border-style", "solid");
			DKWidget_SetAttribute(titleCell, "row", row);
			DKWidget_SetAttribute(titleCell, "column", 3);
			
			var title = DKWidget_CreateElement(titleCell, "textarea", "Title"+row);
			DKWidget_SetProperty(title, "width", "100%");
			DKWidget_SetProperty(title, "height", "100%");
			DKWidget_SetProperty(title, "overflow-x", "hidden");
			DKWidget_SetProperty(title, "word-wrap", "break-word");
			DKWidget_SetProperty(title, "border-width", "0rem");
			DKWidget_SetProperty(title, "font-weight", "bold");
			DKAddEvent(title, "keyup", TradePost_OnEvent);
			DKAddEvent(title, "change", TradePost_OnEvent);

			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/title.txt")){
				DKWidget_SetValue(title, DKFile_FileToString(DKAssets_LocalAssets()+"Items/Item"+row+"/title.txt"));
			}
			
			var descriptionCell = DKWidget_CreateElement(div, "div", "DescriptionCell"+row);
			DKWidget_SetProperty(descriptionCell, "overflow", "hidden");
			DKWidget_SetProperty(descriptionCell, "width", "220rem");
			DKWidget_SetProperty(descriptionCell, "height", "80rem");
			DKWidget_SetProperty(descriptionCell, "display", "inline-block");
			DKWidget_SetProperty(descriptionCell, "border-width", "1rem");
			DKWidget_SetProperty(descriptionCell, "border-color", "black");
			DKWidget_SetProperty(descriptionCell, "border-style", "solid");
			DKWidget_SetAttribute(descriptionCell, "row", row);
			DKWidget_SetAttribute(descriptionCell, "column", 3);

			var description = DKWidget_CreateElement(descriptionCell, "textarea", "Description"+row);
			DKWidget_SetProperty(description, "width", "100%");
			DKWidget_SetProperty(description, "height", "100%");
			DKWidget_SetProperty(description, "overflow-x", "hidden");
			DKWidget_SetProperty(description, "word-wrap", "break-word");
			DKWidget_SetProperty(description, "border-width", "0rem");
			DKWidget_SetProperty(description, "font-weight", "bold");
			DKAddEvent(description, "keyup", TradePost_OnEvent);
			DKAddEvent(description, "change", TradePost_OnEvent);
			
			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/description.txt")){
				DKWidget_SetValue(description, DKFile_FileToString(DKAssets_LocalAssets()+"Items/Item"+row+"/description.txt"));
			}
		}
	}
}

////////////////////////////////////////
function TradePost_ChangeTitle(id, text)
{
	DKLog("TradePost_ChangeTitle("+id+", "+text+")\n");
	
	if(id.includes("Title")){
		id = id.replace("Title","");
		DKFile_StringToFile(text, DKAssets_LocalAssets()+"Items/Item"+id+"/title.txt");
	}
	if(id.includes("Description")){
		id = id.replace("Description","");
		DKFile_StringToFile(text, DKAssets_LocalAssets()+"Items/Item"+id+"/description.txt");
	}
	
}

/////////////////////////
function TradePost_Test()
{
	DKLog("TradePost_Test\n");
	
	DK_QueueDuktape("DKBrowser_NewTab();");
	DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://post.craigslist.org/c/inl\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	
}

////////////////////////////////////
function TradePost_UploadImage(file)
{
	DKLog("TradePost_UploadImage("+file+")\n");
}