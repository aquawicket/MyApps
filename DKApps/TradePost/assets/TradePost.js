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
	for(var i = 0; i < 1000; i++){
		if(DKFile_Exists(DKAssets_LocalAssets()+"Items/"+i)){
			
			//DKLog(DKAssets_LocalAssets()+"Items/"+i);
			var id = DKWidget_CreateElement("ItemList", "div", "Item"+i);
			DKWidget_SetProperty(id, "display", "inline-block");
			DKWidget_SetProperty(id, "width", "100%");
			DKWidget_SetProperty(id, "min-width", "450rem");
			DKWidget_SetProperty(id, "height", "18rem");
			DKWidget_SetProperty(id, "background-color", "white");
			//DKWidget_SetProperty(id, "border-width", "1rem");
			
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