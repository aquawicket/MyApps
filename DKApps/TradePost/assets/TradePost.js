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
			DKWidget_SetProperty(id, "overflow-x", "hidden");
			DKWidget_SetProperty(id, "width", "30rem");
			DKWidget_SetProperty(id, "height", "18rem");
			DKWidget_SetProperty(id, "display", "inline-block");
			DKWidget_SetProperty(id, "background-color", "white");
			DKWidget_SetProperty(id, "border-width", "1rem");
			DKWidget_SetProperty(id, "border-color", "black");
			DKWidget_SetProperty(id, "border-style", "solid");
			DKWidget_SetAttribute(id, "row", row);
			DKWidget_SetAttribute(id, "column", 1);
			DKWidget_SetValue(id, row);
				
			/*
			for(var r=0; r < 10; r++){
				var command = DKWidget_CreateElement(id, "input", "ItemValue"+i+r);
				DKWidget_SetAttribute(command, "type", "text");
				DKWidget_SetProperty(command, "overflow-x", "hidden");
				DKWidget_SetProperty(command, "width", "100rem");
				DKWidget_SetProperty(command, "height", "18rem");
				DKWidget_SetProperty(command, "display", "inline-block");
				DKWidget_SetProperty(command, "border-width", "1rem");
				DKWidget_SetAttribute(command, "row", r);
				DKWidget_SetAttribute(command, "column", i);
				//DKWidget_SetValue(command, records[r+i]);
			}
			*/

		}
	}
}