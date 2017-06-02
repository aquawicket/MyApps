/////////////////////////////////
function AllStores_options_Init()
{
	DKCreate("AllStores_options.html", function(){});
}

////////////////////////////////
function AllStores_options_End()
{
	
}

/////////////////////////////////////////
function AllStores_options_OnEvent(event)
{
	DKLog("AllStores_options_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKINFO);
	
}