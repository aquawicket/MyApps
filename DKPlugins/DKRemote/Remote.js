//////////////////////
function Remote_Init()
{
	DKCreate("DKRemote/Remote.html");
	//DKCreate("DKClient");
	DKCreate("DKWebSockets");
	
	var assets = DKAssets_LocalAssets();
	var address = DKFile_GetSetting(assets+"remote.txt", "[SERVER]");
	if(address){
		DKWidget_SetValue("address", address);
		//Remote_Connect();  FIXME: crashes android 
	}
	//DKAddEvent("GLOBAL", "client", Remote_OnEvent);
	DKAddEvent("VolumeUp_Button", "click", Remote_OnEvent);
	DKAddEvent("VolumeDown_Button", "click", Remote_OnEvent);
	DKAddEvent("Wifi", "click", Remote_OnEvent);
	DKAddEvent("address", "change", Remote_OnEvent);
	DKAddEvent("GLOBAL", "DKWebSockets_OnMessageFromServer", Remote_OnEvent);
}

//////////////////////////////
function Remote_OnEvent(event)
{
	DKLog("Remote_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "Power")){
		DKClient_Send("Power");
		DKLog("Server: Power\n");
	}
	if(DK_Id(event, "VolumeUp_Button")){
		DKLog("Button: VolumeUp \n");
		Remote_MessageToServer("VolumeUp");
		//DKClient_Send("VolumeUp");
	}
	if(DK_Id(event, "VolumeDown_Button")){
		DKLog("Button: Volume Down\n");
		Remote_MessageToServer("VolumeDown");
		//DKClient_Send("VolumeDown");
	}
	if(DK_Id(event, "Wifi")){
		DKLog("Button: Wifi\n");
		DKWidget_Toggle("address");
		if(!DKWidget_Visible("address")){
			Remote_Connect();
		}
	}
	if(DK_Id(event, "address")){
		//DKClient_Address(DKWidget_GetValue("address"));
	}
	if(DK_Type(event, "DKWebSockets_OnMessageFromServer")){
		Remote_OnMessageFromServer(DK_GetValue(event));
	}
	
	/*
	if(DK_Type(event, "client")){
		DKLog("client: "+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "connected"){
			DKWidget_Hide("address");
			DKWidget_SetAttribute("Wifi", "src", "DKRemote/wifiGreen.png");
			//DK_CallFunc("DKOSGRocket::DirtyRefresh","");
			var assets = DKAssets_LocalAssets();
			var address = DKWidget_GetValue("address");
			DKFile_SetSetting(assets+"remote.txt", "[SERVER]", address); //provide full path in case file does not exist
		}
		if(DK_GetValue(event) == "disconnected"){
			DKWidget_Show("address");
			DKWidget_SetAttribute("Wifi", "src", "DKRemote/wifiRed.png");
		}
	}
	*/
}

/////////////////////////
function Remote_Connect()
{
	//DKClient_Connect(DKWidget_GetValue("address"));
	
	if(!DKWidget_GetValue("address")){
		DKLog("Remote_Connect(): please enter an address\n", DKWARN);
		return;
	}
	url = DKWidget_GetValue("address");  //  ws://localhost
	
	if(DK_GetBrowser() == "Rocket"){
		DKLog("Connecting to WebSocket via C++...\n");
		DKWebSockets_CreateClient(url);
		return;
	}
	
	//else
	DKLog("Connecting to WebSocket via javascript...\n");
	websocket = new WebSocket(url);
	websocket.onopen = function(){
		console.log("websocket.onopen");
	}
	websocket.onmessage = function(e){
		console.log("websocket.onmessage");
		Remote_OnMessageFromServer(e.data.toString());
	}
	websocket.onclose = function(e){
		console.log("websocket.onclose");
	}
	websocket.onerror = function(e){
		console.log("websocket.onerror");
	}
}

/////////////////////////////
function Remote_CloseClient()
{
	DKLog("Remote_CloseClient()\n", DKDEBUG);
	if(DK_GetBrowser() == "Rocket"){
		DKWebSockets_CloseClient();
		return;
	}
	
	//else
	websocket.close();
}

////////////////////////////////////////
function Remote_MessageToServer(message)
{
	DKLog("DKWebSocketsClient_MessageToServer()\n", DKDEBUG);
	if(DK_GetBrowser() == "Rocket"){
		DKWebSockets_MessageToServer(message);
		return;
	}
	
	//else
	websocket.send(message);
}

////////////////////////////////////////////
function Remote_OnMessageFromServer(message)
{
	DKLog("DKWebSocketsClient_OnMessageFromServer("+message+")\n", DKDEBUG);
}