var ItemImages_itemNum;
var ItemImages_imageNum = 0;

//////////////////////////
function ItemImages_Init()
{
	DKLog("ItemImages_Init()\n", DKDEBUG);
	DKCreate("TradePost/ItemImages.html");
	DKAddEvent("ItemImages_upload", "click", ItemImages_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFileDialogDismissed", ItemImages_OnEvent);
}

/////////////////////////
function ItemImages_End()
{
	DKLog("ItemImages_End()\n", DKDEBUG);
	DKRemoveEvents(ItemImages_OnEvent);
	DKClose("TradePost/ItemImages.html");
}

//////////////////////////////////
function ItemImages_OnEvent(event)
{
	DKLog("ItemImages_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
	if(DK_Id(event, "ItemImages_left")){
		ItemImages_imageNum--;
		ItemImages_Update();
	}
	if(DK_Id(event, "ItemImages_right")){
		ItemImages_imageNum++;
		ItemImages_Update();
	}
	if(DK_Id(event, "ItemImages_upload")){
		DKCef_FileDialog("DKBrowser_cef");
	}
	if(DK_Type(event, "DKCef_OnFileDialogDismissed")){
		ItemImages_UploadImage(DK_GetValue(event));
		return;
	}
	if(DK_Id(event, "ItemImages_delete")){
		ItemImages_Delete(DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+ItemImages_imageNum+".jpg");
	}
}

////////////////////////////////////
function ItemImages_SetItem(itemNum)
{
	DKLog("ItemImages_SetItem("+itemNum+")\n", DKDEBUG);
	ItemImages_itemNum = itemNum;
	ItemImages_Update();
}

////////////////////////////
function ItemImages_Update()
{
	DKLog("ItemImages_Update()\n", DKDEBUG);
	DKWidget_SetInnerHtml("ItemImages_div", ""); //clear
	
	var img = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_img");
	DKWidget_SetProperty(img, "width", "100%");
	DKWidget_SetProperty(img, "position", "absolute");
	if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+ItemImages_imageNum+".jpg")){
		DKWidget_SetAttribute(img, "src", DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+ItemImages_imageNum+".jpg?"+new Date().getTime());
		
		var trash = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_delete");
		DKWidget_SetAttribute(trash, "src", "TradePost/trash.png");
		DKWidget_SetProperty(trash, "position", "absolute");
		DKWidget_SetProperty(trash, "bottom", "100rem");
		DKWidget_SetProperty(trash, "right", "10rem");
		DKAddEvent(trash, "click", ItemImages_OnEvent);
	}
	
	if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+Number(ItemImages_imageNum-1)+".jpg")){
		var leftArrow = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_left");
		DKWidget_SetAttribute(leftArrow, "src", "TradePost/imageLeft.png");
		DKWidget_SetProperty(leftArrow, "position", "absolute");
		DKWidget_SetProperty(leftArrow, "top", "30%");
		DKWidget_SetProperty(leftArrow, "height", "20%");
		DKAddEvent(leftArrow, "click", ItemImages_OnEvent);
	}
	if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+Number(ItemImages_imageNum+1)+".jpg")){
		var rightArrow = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_right");
		DKWidget_SetAttribute(rightArrow, "src", "TradePost/imageRight.png");
		DKWidget_SetProperty(rightArrow, "position", "absolute");
		DKWidget_SetProperty(rightArrow, "top", "30%");
		DKWidget_SetProperty(rightArrow, "height", "20%");
		DKWidget_SetProperty(rightArrow, "right", "0px");
		DKAddEvent(rightArrow, "click", ItemImages_OnEvent);
	}
}

/////////////////////////////////////
function ItemImages_UploadImage(file)
{
	DKLog("ItemImages_UploadImage("+file+")\n", DKDEBUG);
	if(!file){ return; }
	var i=0;
	while(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+i+".jpg")){
		i++;
	}
	DKFile_Copy(file, DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+i+".jpg", true);
	ItemImages_imageNum = i;
	ItemImages_Update();
	DKWidget_SetAttribute("img"+ItemImages_itemNum, "src", DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img0.jpg?"+new Date().getTime());
}

////////////////////////////////
function ItemImages_Delete(file)
{
	DKLog("ItemImages_Delete("+file+")\n", DKDEBUG);
	DKCreate("DKMessage/DKMessage.js", function(){
		DKFrame_Widget("DKMessage/DKMessage.html");
		DKMessage_Confirm("delete this file?", function(rval){
			//DKLog("DKMessage_Confirm(): rval = "+rval+"\n");
			if(rval == true){
				DKFile_Delete(file);
				ItemImages_imageNum = 0;
				ItemImages_Update();
			}
		});
	});
}