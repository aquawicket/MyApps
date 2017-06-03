/////////////////////////////////
function AllStores_options_Init()
{
	DKCreate("AllStores_options.html", function(){});
	DKAddEvent("AllStores_options_price", "click", AllStores_options_OnEvent);
	DKAddEvent("AllStores_options_close5", "click", AllStores_options_OnEvent);
	DKAddEvent("AllStores_options_offerup", "click", AllStores_options_OnEvent);
	DKAddEvent("AllStores_options_letgo", "click", AllStores_options_OnEvent);
	DKAddEvent("AllStores_options_craigslist", "click", AllStores_options_OnEvent);
	
	DKWidget_SetValue("AllStores_options_price", sortbyprice);
	DKWidget_SetValue("AllStores_options_close5", close5);
	DKWidget_SetValue("AllStores_options_offerup", offerup);
	DKWidget_SetValue("AllStores_options_letgo", letgo);
	DKWidget_SetValue("AllStores_options_craigslist", craigslist);
}

////////////////////////////////
function AllStores_options_End()
{
	DKClose("AllStores_options.html");
}

/////////////////////////////////////////
function AllStores_options_OnEvent(event)
{
	//DKLog("AllStores_options_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKINFO);
	
	if(DK_Id(event, "AllStores_options_price")){
		sortbyprice = DKWidget_GetValue("AllStores_options_price");
	}
	if(DK_Id(event, "AllStores_options_close5")){
		close5 = DKWidget_GetValue("AllStores_options_close5");
	}
	if(DK_Id(event, "AllStores_options_offerup")){
		offerup = DKWidget_GetValue("AllStores_options_offerup");
	}
	if(DK_Id(event, "AllStores_options_letgo")){
		letgo = DKWidget_GetValue("AllStores_options_letgo");
	}
	if(DK_Id(event, "AllStores_options_craigslist")){
		craigslist = DKWidget_GetValue("AllStores_options_craigslist");
	}
	
	AllStores_ShowItems();
}