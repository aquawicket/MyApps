///////////////////////////
function BuySettings_Init()
{
	DKLog("BuySettings_Init()\n", DKDEBUG);
	DKCreate("TradePost/BuySettings.html", function(){
		DKAddEvent("BuySettings_hideNoImage", "click", BuySettings_OnEvent);
	});
	BuySettings_Update();
}

//////////////////////////
function BuySettings_End()
{
	DKLog("BuySettings_End()\n", DKDEBUG);
	DKClose("TradePost/BuySettings.html");
}

///////////////////////////////////
function BuySettings_OnEvent(event)
{
	DKLog("BuySettings_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");//, DKDEBUG);
	
	if(DK_Id(event, "BuySettings_hideNoImage")){
		var val = DKWidget_GetValue("BuySettings_hideNoImage");
		DKLog("value = "+val+"\n");
		buySettings.hideNoImage = val;
		Buy_SaveSettings();
	}
}

/////////////////////////////
function BuySettings_Update()
{
	DKWidget_SetValue("BuySettings_hideNoImage", buySettings.hideNoImage);
}
