///////////////////////////
function BuySettings_Init()
{
	DKLog("BuySettings_Init()\n", DKDEBUG);
	DKCreate("TradePost/BuySettings.html", function(){
		DKAddEvent("BuySettings_hideNoImage", "click", BuySettings_OnEvent);
	});
	BuySettings_Load();
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
		BuySettings_Save();
	}
}

///////////////////////////
function BuySettings_Save()
{
	DKLog("BuySettings_Save()\n", DKDEBUG);
	var json = JSON.stringify(buySettings);
	DKFile_StringToFile(json, DKAssets_LocalAssets()+"buySettings.json");
}

///////////////////////////
function BuySettings_Load()
{
	DKLog("BuySettings_Load()\n", DKDEBUG);
	if(!DKFile_Exists(DKAssets_LocalAssets()+"buySettings.json")){
		DKLog("Buy_LoadData(): buySettings.json does not exist\n");
		return;
	}
	var json = DKFile_FileToString(DKAssets_LocalAssets()+"buySettings.json");
	if(json){
		buySettings = JSON.parse(json);
	}
}

/////////////////////////////
function BuySettings_Update()
{
	DKWidget_SetValue("BuySettings_hideNoImage", buySettings.hideNoImage);
}
