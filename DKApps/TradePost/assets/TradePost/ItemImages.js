var ItemImages_itemNum;
var ItemImages_imageNum = 0;

//////////////////////////
function ItemImages_Init()
{
	//DKLog("ItemImages_Init()\n");
	DKCreate("ItemImages.html");
}

/////////////////////////
function ItemImages_End()
{
	//DKLog("ItemImages_End()\n");
	DKRemoveEvents(ItemImages_OnEvent);
	DKClose("ItemImages.html");
}

//////////////////////////////////
function ItemImages_OnEvent(event)
{
	DKLog("ItemImages_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "ItemImages_left")){
		DKLog("left\n");
		ItemImages_imageNum--;
		ItemImages_Update();
	}
	if(DK_Id(event, "ItemImages_right")){
		DKLog("right\n");
		ItemImages_imageNum++;
		ItemImages_Update();
	}
}

////////////////////////////////////
function ItemImages_SetItem(itemNum)
{
	ItemImages_itemNum = itemNum;
	ItemImages_Update();
}

////////////////////////////
function ItemImages_Update()
{
	DKWidget_SetInnerHtml("ItemImages_div", ""); //clear
	
	DKLog("ItemImages_Update(): image# "+ItemImages_imageNum+"\n");
	var img = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_img");
	DKWidget_SetProperty(img, "width", "100%");
	DKWidget_SetProperty(img, "position", "absolute");
	if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+ItemImages_imageNum+".jpg")){
		DKWidget_SetAttribute(img, "src", DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+ItemImages_imageNum+".jpg?"+new Date().getTime());
	}
	
	if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+Number(ItemImages_imageNum-1)+".jpg")){
		DKLog("leftArrow\n");
		var leftArrow = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_left");
		DKWidget_SetAttribute(leftArrow, "src", "imageLeft.png");
		DKWidget_SetProperty(leftArrow, "position", "absolute");
		DKWidget_SetProperty(leftArrow, "top", "30%");
		DKWidget_SetProperty(leftArrow, "height", "20%");
		DKAddEvent("ItemImages_left", "click", ItemImages_OnEvent);
	}
	if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+ItemImages_itemNum+"/Img"+Number(ItemImages_imageNum+1)+".jpg")){
		DKLog("rightArrow\n");
		var rightArrow = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_right");
		DKWidget_SetAttribute(rightArrow, "src", "imageRight.png");
		DKWidget_SetProperty(rightArrow, "position", "absolute");
		DKWidget_SetProperty(rightArrow, "top", "30%");
		DKWidget_SetProperty(rightArrow, "height", "20%");
		DKWidget_SetProperty(rightArrow, "right", "0px");
		DKAddEvent("ItemImages_right", "click", ItemImages_OnEvent);
	}
}