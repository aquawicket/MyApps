//////////////////////////
function SortByMenu_Init()
{
	DKLog("SortByMenu_Init()\n", DKDEBUG);
	DKCreate("TradePost/SortByMenu.html");
	DKAddEvent("GLOBAL", "mousedown", SortByMenu_OnEvent);
	DKAddEvent("SortByMenu_DateAsc", "mousedown", SortByMenu_OnEvent);
	DKAddEvent("SortByMenu_PriceAsc", "mousedown", SortByMenu_OnEvent);
	DKAddEvent("SortByMenu_PriceDec", "mousedown", SortByMenu_OnEvent);
	DKAddEvent("SortByMenu_TitleAsc", "mousedown", SortByMenu_OnEvent);
}

/////////////////////////
function SortByMenu_End()
{
	DKLog("SortByMenu_End()\n", DKDEBUG);
	DKRemoveEvents(SortByMenu_OnEvent);
	DKClose("TradePost/SortByMenu.html");
}

//////////////////////////////////
function SortByMenu_OnEvent(event)
{
	DKLog("SortByMenu_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");//, DKDEBUG);

	if(DK_Id(event,"SortByMenu_DateAsc")){
		buySettings.sortBy = "Date";
		DKWidget_SetValue("BuySettings_sortBy", buySettings.sortBy);
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event,"SortByMenu_PriceAsc")){
		buySettings.sortBy = "Price: Low to High";
		DKWidget_SetValue("BuySettings_sortBy", buySettings.sortBy);
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event,"SortByMenu_PriceDec")){
		buySettings.sortBy = "Price: High to Low";
		DKWidget_SetValue("BuySettings_sortBy", buySettings.sortBy);
		Buy_SaveSettings();
		Buy_Update()
	}
	if(DK_Id(event,"SortByMenu_TitleAsc")){
		buySettings.sortBy = "Title";
		DKWidget_SetValue("BuySettings_sortBy", buySettings.sortBy);
		Buy_SaveSettings();
		Buy_Update()
	}
	
	DKClose("TradePost/SortByMenu.js");
}