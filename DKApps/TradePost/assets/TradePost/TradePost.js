/////////////////////////
function TradePost_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("TradePost/TradePost.html");
	CPP_DK_Create("TradePost/Inventory.js", function(){
		DKWidget_AppendChild("TradePost/TradePost.html", "TradePost/Inventory.html");
		DKWidget_Hide("TradePost/Inventory.html");
	});
	CPP_DK_Create("TradePost/Buy.js", function(){
		DKWidget_AppendChild("TradePost/TradePost.html", "TradePost/Buy.html");
	});
	CPP_DK_Create("DKAdmin/DKAdmin.js", function(){});
	CPP_DK_Create("DKGui/DKMenu.js", function(){});
	
	//DKAddEvent("GLOBAL", "DKCef_SourceReceived", TradePost_OnEvent);
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
	
	TradePost_UpdateConnectionStatus();
	var connectionStatusTimer = setInterval(function(){ TradePost_UpdateConnectionStatus() }, 10000);
}

////////////////////////
function TradePost_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(TradePost_OnEvent);
	DKClose("TradePost/TradePost.html");
}

/////////////////////////////////
function TradePost_OnEvent(event)
{	
	DKDEBUGFUNC(event);

	/*
	if(DK_Type(event, "DKCef_SourceReceived")){
		var source = DK_GetValue(event);
		DKINFO("DKCef_SourceReceived() = "+DK_GetValue(event)+"\n");
	}
	*/
	
	if(DK_Id(event, "Buy")){
		//DKINFO("Buy\n");
		DKWidget_Hide("TradePost/Inventory.html");
		DKWidget_Show("TradePost/Buy.html");
	}
	if(DK_Id(event, "Inventory")){
		//DKINFO("Inventory\n");
		DKWidget_Hide("TradePost/Buy.html");
		DKWidget_Show("TradePost/Inventory.html");
	}
	if(DK_Id(event, "Craigslist")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), 'https://craigslist.org');");
	}
	if(DK_Id(event, "Letgo")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), 'https://us.letgo.com/en');");
	}
	if(DK_Id(event, "OfferUp")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), 'https://offerup.com');");
	}
	if(DK_Id(event, "Facebook")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), 'https://www.facebook.com/marketplace');");
	}
	if(DK_Id(event, "Ebay")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), 'https://www.ebay.com');");
	}
	DK_Id(event, "Test") && TradePost_Test();
	DK_Id(event, "Refresh") && DK_Refresh();
}

///////////////////////////////////////////
function TradePost_UpdateConnectionStatus()
{
	DKDEBUGFUNC();
	if(!DKWidget_ElementExists("Status")){
		var status = DKWidget_CreateElement("TradePost/TradePost.html", "div", "Status");
		DKWidget_SetProperty(status, "position", "absolute");
		DKWidget_SetProperty(status, "display", "block");
		DKWidget_SetProperty(status, "top", "10rem");
		DKWidget_SetProperty(status, "right", "10rem");
	}
	if(navigator.onLine){
		//DKINFO("TradePost_UpdateConnectionStatus(): online\n");
		DKWidget_SetInnerHtml("Status", "online");
		DKWidget_SetProperty("Status", "color", "black");
		return;
	}
	//DKINFO("TradePost_UpdateConnectionStatus(): OFFLINE!\n");
	DKWidget_SetInnerHtml("Status", "OFFLINE!");
	DKWidget_SetProperty("Status", "color", "red");
}


/////////////////////////
function TradePost_Test()
{
	DKDEBUGFUNC();	
	CPP_DK_Create("TradePost/Helper.js", function(){});
	
	DKINFO(getParameters(Pinger_ping)+"\n");
	
	//// Test WebSockets
	//OpenWebSocket();
	
	/*
	//// Driving Distance Test
	var addressA = "26705 Patterson St. Perris CA 92570";
	var addressB = "EASTVALE/NORCO/CORONA";
	Helper_GetDistance(addressA, addressB);
	*/
		
	/*
	//// Run Functions in order with a set delay between each execution
	Helper_Queue( function(){ TestFunction(1, function(rval){ DKINFO("1 * 2 = "+rval+"\n"); } ); } );
	Helper_Queue( function(){ TestFunction(2, function(rval){ DKINFO("2 * 2 = "+rval+"\n"); } ); } );
	Helper_Queue( function(){ TestFunction(3, function(rval){ DKINFO("3 * 2 = "+rval+"\n"); } ); } );
	Helper_Queue( function(){ TestFunction(4, function(rval){ DKINFO("4 * 2 = "+rval+"\n"); } ); } );
	Helper_Queue( function(){ TestFunction(5, function(rval){ DKINFO("5 * 2 = "+rval+"\n"); } ); } );
	Helper_Queue( function(){ TestFunction(6, function(rval){ DKINFO("6 * 2 = "+rval+"\n"); } ); } );
	Helper_Queue( function(){ TestFunction(7, function(rval){ DKINFO("7 * 2 = "+rval+"\n"); } ); } );
	Helper_Queue( function(){ TestFunction(8, function(rval){ DKINFO("8 * 2 = "+rval+"\n"); } ); } );
	Helper_Queue( function(){ TestFunction(9, function(rval){ DKINFO("9 * 2 = "+rval+"\n"); } ); } );
	*/
	
	/*
	//// Create an unhandled exception
	function error(){
		var foo = {};
		return foo.bar();
	}
	error();
	*/

	/*
	//// Get the Cef browser's source code
	var source = CPP_DKCef_GetPageSource(0);
	DKINFO("source = "+source+"\n");
	*/
	
	//DKINFO("######### ITEMS ##########\n");
	for(var i=0; i<items.length; i++){
		/*
		DKINFO("\n");
		DKINFO("items["+i+"]id: "+items[i].id+"\n");
		DKINFO("items["+i+"]title: "+items[i].title+"\n");
		DKINFO("items["+i+"]description: "+items[i].description+"\n");
		DKINFO("items["+i+"]catagory: "+items[i].catagory+"\n");
		DKINFO("items["+i+"]price: "+items[i].price+"\n");
		*/
		
		//var json_string = JSON.stringify(items[i]);
		//DKINFO(json_string+"\n");
		
		/*
		var item_object = JSON.parse(json_string);
		DKINFO("item_object.id: "+item_object.id+"\n");
		DKINFO("item_object.title: "+item_object.title+"\n");
		DKINFO("item_object.description: "+item_object.description+"\n");
		DKINFO("item_object.catagory: "+item_object.catagory+"\n");
		DKINFO("item_object.price: "+item_object.price+"\n");
		*/
	}
	
	
	/*
	//Wait for a Open Files window to appear, set the path, select all files, open
	CPP_DK_Create("DKHandles");
	if(!DKHandles_WaitForWindow("Open Files", 5)){
		DKERROR("Open Files never showed up\n");
		return;
	}
	if(!DKHandles_WaitForWindow("Address", 1)){
		DKERROR("address bar never showed up\n");
		return;
	}
	
	var currentHandle = DKHandles_CurrentHandle();
	
	if(!DKHandles_SetWindowHandle("Address", 3)){
		DKERROR("DKHandles_SetWindowHandle(\"Address\"): failed\n");
	}
	var currentHandle = DKHandles_CurrentHandle();
	var top = DKHandles_GetTop(currentHandle);
	var left = DKHandles_GetLeft(currentHandle);
	var right = DKHandles_GetRight(currentHandle);
	var bottom = DKHandles_GetBottom(currentHandle);
	DKINFO("top = "+top+"\n");
	DKINFO("left = "+left+"\n");
	DKINFO("right = "+right+"\n");
	DKINFO("bottom = "+bottom+"\n");
	
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