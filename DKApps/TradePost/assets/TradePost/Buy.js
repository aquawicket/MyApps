///////////////////
function Buy_Init()
{
	DKLog("Buy_Init()\n", DKDEBUG);
	DKCreate("TradePost/Buy.html");
}

//////////////////
function Buy_End()
{
	DKLog("Buy_End()\n", DKDEBUG);
	DKRemoveEvents(Buy_OnEvent);
	DKClose("TradePost/Buy.html");
}

///////////////////////////
function Buy_OnEvent(event)
{
	DKLog("Buy_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}