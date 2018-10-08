/////////////////////////
function Inventory_Init()
{
	DKLog("Inventory_Init()\n", DKDEBUG);
	DKCreate("TradePost/Inventory.html", function(){
		//TODO
	});
}

////////////////////////
function Inventory_End()
{
	DKLog("Inventory_End()\n", DKDEBUG);
	DKRemoveEvents(Inventory_OnEvent);
	DKClose("TradePost/Inventory.html");
}

/////////////////////////////////
function Inventory_OnEvent(event)
{
	DKLog("Inventory_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}