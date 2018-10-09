/////////////////////////
function TradePost_Init()
{
	DKLog("TradePost_Init()\n", DKDEBUG);
	DKCreate("TradePost/TradePost.html");
	DKCreate("TradePost/Buy.js", function(){
		DKWidget_Hide("TradePost/Buy.html");
	});
	DKCreate("TradePost/Inventory.js", function(){});
	DKCreate("DKAdmin/DKAdmin.js", function(){});
	DKCreate("DKGui/DKMenu.js", function(){});
	
	DKAddEvent("Buy", "click", TradePost_OnEvent);
	DKAddEvent("Inventory", "click", TradePost_OnEvent);
	DKAddEvent("Craigslist", "click", TradePost_OnEvent);
	DKAddEvent("Letgo", "click", TradePost_OnEvent);
	DKAddEvent("Letgo", "click", TradePost_OnEvent);
	DKAddEvent("OfferUp", "click", TradePost_OnEvent);
	DKAddEvent("Facebook", "click", TradePost_OnEvent);
	DKAddEvent("Ebay", "click", TradePost_OnEvent);
	DKAddEvent("Test", "click", TradePost_OnEvent);
	DKAddEvent("Refresh", "click", TradePost_OnEvent);
	return;
}

////////////////////////
function TradePost_End()
{
	DKLog("TradePost_End()\n", DKDEBUG);
	DKRemoveEvents(TradePost_OnEvent);
	DKClose("TradePost/TradePost.html");
}

/////////////////////////////////
function TradePost_OnEvent(event)
{	
	DKLog("TradePost_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);

	if(DK_Id(event, "Buy")){
		DKLog("Buy\n");
		DKWidget_Hide("TradePost/Inventory.html");
		DKWidget_Show("TradePost/Buy.html");
	}
	if(DK_Id(event, "Inventory")){
		DKLog("Inventory\n");
		DKWidget_Hide("TradePost/Buy.html");
		DKWidget_Show("TradePost/Inventory.html");
	}
	if(DK_Id(event, "Craigslist")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://inlandempire.craigslist.org/d/for-sale/search/sss');");
	}
	if(DK_Id(event, "Letgo")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://us.letgo.com/en');");
	}
	if(DK_Id(event, "OfferUp")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://offerup.com');");
	}
	if(DK_Id(event, "Facebook")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://www.facebook.com/marketplace');");
	}
	if(DK_Id(event, "Ebay")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://www.ebay.com');");
	}
	if(DK_Id(event, "Test")){
		TradePost_Test();
	}
	if(DK_Id(event, "Refresh")){
		DK_Refresh();
	}
}

/////////////////////////
function TradePost_Test()
{
	DKLog("TradePost_Test\n", DKDEBUG);
	
	DKCef_ViewPageSource("",0);
	
	DKLog("######### ITEMS ##########\n");
	for(var i=0; i<items.length; i++){
		/*
		DKLog("\n");
		DKLog("items["+i+"]id: "+items[i].id+"\n");
		DKLog("items["+i+"]title: "+items[i].title+"\n");
		DKLog("items["+i+"]description: "+items[i].description+"\n");
		DKLog("items["+i+"]catagory: "+items[i].catagory+"\n");
		DKLog("items["+i+"]price: "+items[i].price+"\n");
		*/
		
		//var json_string = JSON.stringify(items[i]);
		//DKLog(json_string+"\n");
		
		/*
		var item_object = JSON.parse(json_string);
		DKLog("item_object.id: "+item_object.id+"\n");
		DKLog("item_object.title: "+item_object.title+"\n");
		DKLog("item_object.description: "+item_object.description+"\n");
		DKLog("item_object.catagory: "+item_object.catagory+"\n");
		DKLog("item_object.price: "+item_object.price+"\n");
		*/
	}
	
	
	/*
	//Wait for a Open Files window to appear, set the path, select all files, open
	DKCreate("DKHandles");
	if(!DKHandles_WaitForWindow("Open Files", 5)){
		DKLog("Open Files never showed up\n", DKERROR);
		return;
	}
	if(!DKHandles_WaitForWindow("Address", 1)){
		DKLog("address bar never showed up\n", DKERROR);
		return;
	}
	
	var currentHandle = DKHandles_CurrentHandle();
	
	if(!DKHandles_SetWindowHandle("Address", 3)){
		DKLog("DKHandles_SetWindowHandle(\"Address\"): failed\n");
	}
	var currentHandle = DKHandles_CurrentHandle();
	var top = DKHandles_GetTop(currentHandle);
	var left = DKHandles_GetLeft(currentHandle);
	var right = DKHandles_GetRight(currentHandle);
	var bottom = DKHandles_GetBottom(currentHandle);
	DKLog("top = "+top+"\n");
	DKLog("left = "+left+"\n");
	DKLog("right = "+right+"\n");
	DKLog("bottom = "+bottom+"\n");
	
	//Process url bar
	DK_SetMousePos(left+10,top+10);
	DK_LeftClick();
	//We need the correct images path of the current item
	var path = "C:/digitalknob/MyApps/DKApps/TradePost/assets/Items/Item6";
	DK_SetClipboard(path);
	DK_PressKey(17); DK_Sleep(100); // ctrl down
	DK_StrokeKey(86); DK_Sleep(100); // v
	DK_ReleaseKey(17); DK_Sleep(100); // ctrl up
	DK_StrokeKey(13); DK_Sleep(100); // enter
	
	//Process folders window
	DK_StrokeKey(9); DK_Sleep(100); // tab
	DK_StrokeKey(9); DK_Sleep(100); // tab
	DK_StrokeKey(9); DK_Sleep(100); // tab
	DK_PressKey(17); DK_Sleep(100); // ctrl down
	DK_StrokeKey(65); DK_Sleep(100); // a 
	DK_ReleaseKey(17); DK_Sleep(100); // ctrl up
	
	//This will press open
	//DK_StrokeKey(13); //enter
	*/
}