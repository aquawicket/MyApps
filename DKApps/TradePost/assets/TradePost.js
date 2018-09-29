/////////////////////////
function TradePost_Init()
{
	DKCreate("TradePost.html");
	DKAddEvent("AddItem", "click", TradePost_OnEvent);
	
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
{	DKLog("TradePost_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");

	if(DK_Id(event, "AddItem")){
		TradePost_AddItem();
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
	while(DKFile_Exists(DKAssets_LocalAssets()+"Items/"+i)){
		i++;
	}
	DKFile_MkDir(DKAssets_LocalAssets()+"Items/"+i);
	TradePost_UpdateList();
}

///////////////////////////////
function TradePost_UpdateList()
{
	DKLog("TradePost_UpdateList\n");
	
	DKWidget_SetInnerHtml("ItemList", ""); //clear
	for(var row = 0; row < 1000; row++){
		if(DKFile_Exists(DKAssets_LocalAssets()+"Items/"+row)){
			
			//DKLog(DKAssets_LocalAssets()+"Items/"+r);
			var div = DKWidget_CreateElement("ItemList", "div", "Item"+row);
			DKWidget_SetProperty(div, "display", "inline-block");
			DKWidget_SetProperty(div, "width", "100%");
			DKWidget_SetProperty(div, "min-width", "450rem");
			//DKWidget_SetProperty(div, "height", "20rem");
			DKWidget_SetProperty(div, "background-color", "white");
			//DKWidget_SetProperty(div, "border-width", "1rem");
			//DKWidget_SetProperty(div, "border-color", "black");
			//DKWidget_SetProperty(div, "border-style", "solid");
			//DKWidget_SetValue(div, row);
			
			var num = DKWidget_CreateElement(div, "div", "ItemId"+row);
			DKWidget_SetProperty(num, "overflow", "hidden");
			DKWidget_SetProperty(num, "width", "30rem");
			DKWidget_SetProperty(num, "height", "60rem");
			DKWidget_SetProperty(num, "display", "inline-block");
			DKWidget_SetProperty(num, "background-color", "white");
			DKWidget_SetProperty(num, "border-width", "1rem");
			DKWidget_SetProperty(num, "border-color", "black");
			DKWidget_SetProperty(num, "border-style", "solid");
			DKWidget_SetAttribute(num, "row", row);
			DKWidget_SetAttribute(num, "column", 1);
			DKWidget_SetValue(num, row);
			
			var image = DKWidget_CreateElement(div, "div", "ItemImage"+row);
			DKWidget_SetProperty(image, "overflow", "hidden");
			DKWidget_SetProperty(image, "width", "60rem");
			DKWidget_SetProperty(image, "height", "60rem");
			DKWidget_SetProperty(image, "display", "inline-block");
			DKWidget_SetProperty(image, "background-color", "white");
			DKWidget_SetProperty(image, "border-width", "1rem");
			DKWidget_SetProperty(image, "border-color", "black");
			DKWidget_SetProperty(image, "border-style", "solid");
			DKWidget_SetAttribute(image, "row", row);
			DKWidget_SetAttribute(image, "column", 2);
			
			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/"+row+"/0.jpg")){
				var img = DKWidget_CreateElement(image, "img", "img"+row);
				DKWidget_SetProperty(img, "width", "100%");
				//DKWidget_SetProperty(img, "height", "100%");
				DKWidget_SetAttribute(img, "src", DKAssets_LocalAssets()+"Items/"+row+"/0.jpg");
			}
			
			var titleCell = DKWidget_CreateElement(div, "div", "ItemTitleCell"+row);
			DKWidget_SetProperty(titleCell, "overflow", "hidden");
			DKWidget_SetProperty(titleCell, "width", "120rem");
			DKWidget_SetProperty(titleCell, "height", "60rem");
			DKWidget_SetProperty(titleCell, "display", "inline-block");
			DKWidget_SetProperty(titleCell, "border-width", "1rem");
			DKWidget_SetProperty(titleCell, "border-color", "black");
			DKWidget_SetProperty(titleCell, "border-style", "solid");
			DKWidget_SetAttribute(titleCell, "row", row);
			DKWidget_SetAttribute(titleCell, "column", 3);
			
			var title = DKWidget_CreateElement(titleCell, "textarea", "ItemTitle"+row);
			DKWidget_SetProperty(title, "width", "100%");
			DKWidget_SetProperty(title, "height", "100%");
			DKWidget_SetProperty(title, "overflow-x", "hidden");
			DKWidget_SetProperty(title, "word-wrap", "break-word");
			DKWidget_SetProperty(title, "border-width", "0rem");
			DKWidget_SetProperty(title, "font-weight", "bold");
			DKAddEvent(title, "keyup", TradePost_OnEvent);
			DKAddEvent(title, "change", TradePost_OnEvent);

			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/"+row+"/title.txt")){
				DKWidget_SetValue(title, DKFile_FileToString(DKAssets_LocalAssets()+"Items/"+row+"/title.txt"));
			}
			
			var descriptionCell = DKWidget_CreateElement(div, "div", "ItemDescriptionCell"+row);
			DKWidget_SetProperty(descriptionCell, "overflow", "hidden");
			DKWidget_SetProperty(descriptionCell, "width", "200rem");
			DKWidget_SetProperty(descriptionCell, "height", "60rem");
			DKWidget_SetProperty(descriptionCell, "display", "inline-block");
			DKWidget_SetProperty(descriptionCell, "background-color", "white");
			DKWidget_SetProperty(descriptionCell, "border-width", "1rem");
			DKWidget_SetProperty(descriptionCell, "border-color", "black");
			DKWidget_SetProperty(descriptionCell, "border-style", "solid");
			DKWidget_SetAttribute(descriptionCell, "row", row);
			DKWidget_SetAttribute(descriptionCell, "column", 3);

			var description = DKWidget_CreateElement(descriptionCell, "textarea", "ItemDescription"+row);
			DKWidget_SetProperty(description, "width", "100%");
			DKWidget_SetProperty(description, "height", "100%");
			DKWidget_SetProperty(description, "overflow-x", "hidden");
			DKWidget_SetProperty(description, "word-wrap", "break-word");
			DKWidget_SetProperty(description, "border-width", "0rem");
			DKWidget_SetProperty(description, "font-weight", "bold");
			DKAddEvent(description, "keyup", TradePost_OnEvent);
			DKAddEvent(description, "change", TradePost_OnEvent);
			
			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/"+row+"/description.txt")){
				DKWidget_SetValue(description, DKFile_FileToString(DKAssets_LocalAssets()+"Items/"+row+"/description.txt"));
			}
			
		}
	}
}

////////////////////////////////////////
function TradePost_ChangeTitle(id, text)
{
	DKLog("TradePost_ChangeTitle("+id+", "+text+")\n");
	
	if(id.includes("ItemTitle")){
		id = id.replace("ItemTitle","");
		DKFile_StringToFile(text, DKAssets_LocalAssets()+"Items/"+id+"/title.txt");
	}
	if(id.includes("ItemDescription")){
		id = id.replace("ItemDescription","");
		DKFile_StringToFile(text, DKAssets_LocalAssets()+"Items/"+id+"/description.txt");
	}
	
}