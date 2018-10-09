///////////////////////////
function BuySettings_Init()
{
	DKLog("BuySettings_Init()\n", DKDEBUG);
	DKCreate("TradePost/BuySettings.html", function(){
		DKAddEvent("BuySettings_hideNoImage", "click", BuySettings_OnEvent);
		DKAddEvent("BuySettings_lowPrice", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_highPrice", "change", BuySettings_OnEvent);
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
		buySettings.hideNoImage = val;
		Buy_SaveSettings();
	}
	if(DK_Id(event, "BuySettings_lowPrice")){
		var val = DKWidget_GetValue("BuySettings_lowPrice");
		buySettings.lowPrice = val;
		Buy_SaveSettings();
	}
	if(DK_Id(event, "BuySettings_highPrice")){
		var val = DKWidget_GetValue("BuySettings_highPrice");
		buySettings.highPrice = val;
		Buy_SaveSettings();
	}
}

/////////////////////////////
function BuySettings_Update()
{
	DKWidget_SetValue("BuySettings_hideNoImage", buySettings.hideNoImage);
	DKWidget_SetValue("BuySettings_lowPrice", buySettings.lowPrice);
	DKWidget_SetValue("BuySettings_highPrice", buySettings.highPrice);
}
