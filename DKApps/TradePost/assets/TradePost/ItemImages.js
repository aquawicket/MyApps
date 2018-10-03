var ItemImages_itemNum;

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
	DKWidget_SetInnerHtml("ItemImages.html", "Item# "+ItemImages_itemNum);
}