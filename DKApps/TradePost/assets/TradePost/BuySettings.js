///////////////////////////
function BuySettings_Init()
{
	
	CPP_DK_Create("TradePost/BuySettings.html", function(){
		DKAddEvent("BuySettings_hideNoImage", "click", BuySettings_OnEvent);
		DKAddEvent("BuySettings_lowPrice", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_highPrice", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_sortBy", "click", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistLocation", "change", BuySettings_OnEvent);
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
		DKAddEvent("BuySettings_craigslistBooks", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistBusniess", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistCarsTrucks", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistCdsDvdVhs", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistCellPhones", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistClothesAcc", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistCollectibles", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistComputerParts", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistComputers", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistElectronics", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistFarmGarden", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistFreeStuff", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistFurniture", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistGarageSales", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistGeneral", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistHeavyEquipment", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistHousehold", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistJewelry", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistMaterials", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistMotorcycleParts", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistMotorcycles", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistMusicInstr", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistPhotoVideo", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistRVs", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistSporting", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistTickets", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistTools", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistToysGames", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistTrailers", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistVideoGames", "change", BuySettings_OnEvent);
		DKAddEvent("BuySettings_craigslistWanted", "change", BuySettings_OnEvent);
		BuySettings_Update();
	});
}

//////////////////////////
function BuySettings_End()
{
	
	DKClose("TradePost/BuySettings.html");
}

///////////////////////////////////
function BuySettings_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Id(event, "BuySettings_sortBy")){
		CPP_DK_Create("TradePost/SortByMenu.js", function(){
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
	
	if(DK_Id(event, "BuySettings_craigslistLocation")){
		buySettings.craigslistLocation = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		//Buy_Update();
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
		buySettings.craigslistCarsTrucks = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistCdsDvdVhs")){
		buySettings.craigslistCdsDvdVhs = DKWidget_GetValue(DK_GetId(event));
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
	if(DK_Id(event, "BuySettings_craigslistElectronics")){
		buySettings.craigslistElectronics = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistFarmGarden")){
		buySettings.craigslistFarmGarden = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistFreeStuff")){
		buySettings.craigslistFreeStuff = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistFurniture")){
		buySettings.craigslistFurniture = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistGarageSales")){
		buySettings.craigslistGarageSales = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistGeneral")){
		buySettings.craigslistGeneral = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistHeavyEquipment")){
		buySettings.craigslistHeavyEquipment = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistHousehold")){
		buySettings.craigslistHousehold = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistJewelry")){
		buySettings.craigslistJewelry = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistMaterials")){
		buySettings.craigslistMaterials = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistMotorcycleParts")){
		buySettings.craigslistMotorcycleParts = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistMotorcycles")){
		buySettings.craigslistMotorcycles = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistMusicInstr")){
		buySettings.craigslistMusicInstr = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistPhotoVideo")){
		buySettings.craigslistPhotoVideo = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistRVs")){
		buySettings.craigslistRVs = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistSporting")){
		buySettings.craigslistSporting = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistTickets")){
		buySettings.craigslistTickets = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistTools")){
		buySettings.craigslistTools = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistToysGames")){
		buySettings.craigslistToysGames = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistTrailers")){
		buySettings.craigslistTrailers = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistVideoGames")){
		buySettings.craigslistVideoGames = DKWidget_GetValue(DK_GetId(event));
		Buy_SaveSettings();
		Buy_Update();
	}
	if(DK_Id(event, "BuySettings_craigslistWanted")){
		buySettings.craigslistWanted = DKWidget_GetValue(DK_GetId(event));
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
	
	buySettings.craigslistLocation && DKWidget_SetValue("BuySettings_craigslistLocation", buySettings.craigslistLocation);
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
	DKWidget_SetValue("BuySettings_craigslistCarsTrucks", buySettings.craigslistCarsTrucks);
	DKWidget_SetValue("BuySettings_craigslistCdsDvdVhs", buySettings.craigslistCdsDvdVhs);
	DKWidget_SetValue("BuySettings_craigslistCellPhones", buySettings.craigslistCellPhones);
	DKWidget_SetValue("BuySettings_craigslistClothesAcc", buySettings.craigslistClothesAcc);
	DKWidget_SetValue("BuySettings_craigslistCollectibles", buySettings.craigslistCollectibles);
	DKWidget_SetValue("BuySettings_craigslistComputerParts", buySettings.craigslistComputerParts);
	DKWidget_SetValue("BuySettings_craigslistComputers", buySettings.craigslistComputers);
	DKWidget_SetValue("BuySettings_craigslistElectronics", buySettings.craigslistElectronics);
	DKWidget_SetValue("BuySettings_craigslistFarmGarden", buySettings.craigslistFarmGarden);
	DKWidget_SetValue("BuySettings_craigslistFreeStuff", buySettings.craigslistFreeStuff);
	DKWidget_SetValue("BuySettings_craigslistFurniture", buySettings.craigslistFurniture);
	DKWidget_SetValue("BuySettings_craigslistGarageSales", buySettings.craigslistGarageSales);
	DKWidget_SetValue("BuySettings_craigslistGeneral", buySettings.craigslistGeneral);
	DKWidget_SetValue("BuySettings_craigslistHeavyEquipment", buySettings.craigslistHeavyEquipment);
	DKWidget_SetValue("BuySettings_craigslistHousehold", buySettings.craigslistHousehold);
	DKWidget_SetValue("BuySettings_craigslistJewelry", buySettings.craigslistJewelry);
	DKWidget_SetValue("BuySettings_craigslistMaterials", buySettings.craigslistMaterials);
	DKWidget_SetValue("BuySettings_craigslistMotorcycleParts", buySettings.craigslistMotorcycleParts);
	DKWidget_SetValue("BuySettings_craigslistMotorcycles", buySettings.craigslistMotorcycles);
	DKWidget_SetValue("BuySettings_craigslistMusicInstr", buySettings.craigslistMusicInstr);
	DKWidget_SetValue("BuySettings_craigslistPhotoVideo", buySettings.craigslistPhotoVideo);
	DKWidget_SetValue("BuySettings_craigslistRVs", buySettings.craigslistRVs);
	DKWidget_SetValue("BuySettings_craigslistSporting", buySettings.craigslistSporting);
	DKWidget_SetValue("BuySettings_craigslistTickets", buySettings.craigslistTickets);
	DKWidget_SetValue("BuySettings_craigslistTools", buySettings.craigslistTools);
	DKWidget_SetValue("BuySettings_craigslistToysGames", buySettings.craigslistToysGames);
	DKWidget_SetValue("BuySettings_craigslistTrailers", buySettings.craigslistTrailers);
	DKWidget_SetValue("BuySettings_craigslistVideoGames", buySettings.craigslistVideoGames);
	DKWidget_SetValue("BuySettings_craigslistWanted", buySettings.craigslistWanted);
}