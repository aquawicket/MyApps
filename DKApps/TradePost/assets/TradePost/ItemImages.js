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