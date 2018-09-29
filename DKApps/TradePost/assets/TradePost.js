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
			
			var id = DKWidget_CreateElement(div, "div", "ItemId"+row);
			DKWidget_SetProperty(id, "overflow", "hidden");
			DKWidget_SetProperty(id, "width", "30rem");
			DKWidget_SetProperty(id, "height", "60rem");
			DKWidget_SetProperty(id, "display", "inline-block");
			DKWidget_SetProperty(id, "background-color", "white");
			DKWidget_SetProperty(id, "border-width", "1rem");
			DKWidget_SetProperty(id, "border-color", "black");
			DKWidget_SetProperty(id, "border-style", "solid");
			DKWidget_SetAttribute(id, "row", row);
			DKWidget_SetAttribute(id, "column", 1);
			DKWidget_SetValue(id, row);
			
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
			
			var title = DKWidget_CreateElement(div, "div", "ItemTitle"+row);
			DKWidget_SetProperty(title, "overflow", "hidden");
			DKWidget_SetProperty(title, "width", "120rem");
			DKWidget_SetProperty(title, "height", "60rem");
			DKWidget_SetProperty(title, "display", "inline-block");
			DKWidget_SetProperty(title, "background-color", "white");
			DKWidget_SetProperty(title, "border-width", "1rem");
			DKWidget_SetProperty(title, "border-color", "black");
			DKWidget_SetProperty(title, "border-style", "solid");
			DKWidget_SetProperty(title, "font-weight", "bold");
			DKWidget_SetAttribute(title, "row", row);
			DKWidget_SetAttribute(title, "column", 3);

			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/"+row+"/title.txt")){
				DKWidget_SetValue(title, DKFile_FileToString(DKAssets_LocalAssets()+"Items/"+row+"/Title.txt"));
			}
			
			var description = DKWidget_CreateElement(div, "div", "ItemDescription"+row);
			DKWidget_SetProperty(description, "overflow", "hidden");
			DKWidget_SetProperty(description, "width", "120rem");
			DKWidget_SetProperty(description, "height", "60rem");
			DKWidget_SetProperty(description, "display", "inline-block");
			DKWidget_SetProperty(description, "background-color", "white");
			DKWidget_SetProperty(description, "border-width", "1rem");
			DKWidget_SetProperty(description, "border-color", "black");
			DKWidget_SetProperty(description, "border-style", "solid");
			DKWidget_SetAttribute(description, "row", row);
			DKWidget_SetAttribute(description, "column", 3);

			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/"+row+"/description.txt")){
				DKWidget_SetValue(description, DKFile_FileToString(DKAssets_LocalAssets()+"Items/"+row+"/description.txt"));
			}
			
		}
	}
}