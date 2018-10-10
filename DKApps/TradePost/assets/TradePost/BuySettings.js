///////////////////////////
function BuySettings_Init()
{
	DKLog("BuySettings_Init()\n", DKDEBUG);
	DKCreate("TradePost/BuySettings.html", function(){
		DKAddEvent("BuySettings_hideNoImage", "click", BuySettings_OnEvent);
		DKAddEvent("BuySettings_lowPrice", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_highPrice", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_sortBy", "click", BuySettings_OnEvent);
		
		DKAddEvent("BuySettings_craigslistAntiques", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistAppliances", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistArtsCrafts", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistAtvsUtvsSnow", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistAutoParts", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistAutoWheelsTires", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistAviation", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBabyKids", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBarter", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBeautyHlth", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBikeParts", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBikes", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBoatParts", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBoats", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBoats", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBooks", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBusniess", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistCarsTrucks", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistCdsDvdVhs", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistCellPhones", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistClothesAcc", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistCollectibles", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistComputerParts", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistComputers", "change", BuySettings_OnEvent);
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
	
	if(DK_Id(event, "BuySettings_sortBy")){
		DKCreate("TradePost/SortByMenu.js", function(){
			DKMenu_ValidatePosition("TradePost/SortByMenu.html");
		});
	}
	if(DK_Id(event, "BuySettings_hideNoImage")){
		buySettings.hideNoImage = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_lowPrice")){
		buySettings.lowPrice = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_highPrice")){
		buySettings.highPrice = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	
	if(DK_Id(event, "BuySettings_craigslistAntiques")){
		buySettings.craigslistAntiques = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistAppliances")){
		buySettings.craigslistAppliances = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistArtsCrafts")){
		buySettings.craigslistArtsCrafts = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistAtvsUtvsSnow")){
		buySettings.craigslistAtvsUtvsSnow = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistAutoParts")){
		buySettings.craigslistAutoParts = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistAutoWheelsTires")){
		buySettings.craigslistAutoWheelsTires = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistAviation")){
		buySettings.craigslistAviation = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBabyKids")){
		buySettings.craigslistBabyKids = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBarter")){
		buySettings.craigslistBarter = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBeautyHlth")){
		buySettings.craigslistBeautyHlth = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBikeParts")){
		buySettings.craigslistBikeParts = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBikes")){
		buySettings.craigslistBikes = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBoatParts")){
		buySettings.craigslistBoatParts = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBoats")){
		buySettings.craigslistBoats = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBooks")){
		buySettings.craigslistBooks = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistBusniess")){
		buySettings.craigslistBusniess = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistCarsTrucks")){
		buySettings.craigslistBoats = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistCdsDvdVhs")){
		buySettings.craigslistCarsTrucks = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistCellPhones")){
		buySettings.craigslistCellPhones = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistClothesAcc")){
		buySettings.craigslistClothesAcc = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistCollectibles")){
		buySettings.craigslistCollectibles = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistComputerParts")){
		buySettings.craigslistComputerParts = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistComputers")){
		buySettings.craigslistComputers = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
}

/////////////////////////////
function BuySettings_Update()
{
	DKWidget_SetValue("BuySettings_hideNoImage", buySettings.hideNoImage);
	DKWidget_SetValue("BuySettings_lowPrice", buySettings.lowPrice);
	DKWidget_SetValue("BuySettings_highPrice", buySettings.highPrice);
	DKWidget_SetValue("BuySettings_sortBy", buySettings.sortBy);
	
	DKWidget_SetValue("BuySettings_craigslistAntiques", buySettings.craigslistAntiques);
	DKWidget_SetValue("BuySettings_craigslistAppliances", buySettings.craigslistAppliances);
	DKWidget_SetValue("BuySettings_craigslistArtsCrafts", buySettings.craigslistArtsCrafts);
	DKWidget_SetValue("BuySettings_craigslistAtvsUtvsSnow", buySettings.craigslistAtvsUtvsSnow);
	DKWidget_SetValue("BuySettings_craigslistAutoParts", buySettings.craigslistAutoParts);
	DKWidget_SetValue("BuySettings_craigslistAutoWheelsTires", buySettings.craigslistAutoWheelsTires);
	DKWidget_SetValue("BuySettings_craigslistAviation", buySettings.craigslistAviation);
	DKWidget_SetValue("BuySettings_craigslistBabyKids", buySettings.craigslistBabyKids);
	DKWidget_SetValue("BuySettings_craigslistBarter", buySettings.craigslistBarter);
	DKWidget_SetValue("BuySettings_craigslistBeautyHlth", buySettings.craigslistBeautyHlth);
	DKWidget_SetValue("BuySettings_craigslistBikeParts", buySettings.craigslistBikeParts);
	DKWidget_SetValue("BuySettings_craigslistBikes", buySettings.craigslistBikes);
	DKWidget_SetValue("BuySettings_craigslistBoatParts", buySettings.craigslistBoatParts);
	DKWidget_SetValue("BuySettings_craigslistBoats", buySettings.craigslistBoats);
	DKWidget_SetValue("BuySettings_craigslistBooks", buySettings.craigslistBooks);
	DKWidget_SetValue("BuySettings_craigslistBusniess", buySettings.craigslistBusniess);
	DKWidget_SetValue("BuySettings_craigslistCarsTrucks", buySettings.craigslistBoats);
	DKWidget_SetValue("BuySettings_craigslistCdsDvdVhs", buySettings.craigslistCarsTrucks);
	DKWidget_SetValue("BuySettings_craigslistCellPhones", buySettings.craigslistCellPhones);
	DKWidget_SetValue("BuySettings_craigslistClothesAcc", buySettings.craigslistClothesAcc);
	DKWidget_SetValue("BuySettings_craigslistCollectibles", buySettings.craigslistCollectibles);
	DKWidget_SetValue("BuySettings_craigslistComputerParts", buySettings.craigslistComputerParts);
	DKWidget_SetValue("BuySettings_craigslistComputers", buySettings.craigslistComputers);
}
