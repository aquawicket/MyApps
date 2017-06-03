/////////////////////////////////
function AllStores_options_Init()
{
	DKCreate("AllStores_options.html", function(){});
	DKAddEvent("AllStores_options_price", "click", AllStores_options_OnEvent);
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
		DKLog(DKWidget_GetValue("AllStores_options_price")+"\n", DKINFO);
	}
	
}