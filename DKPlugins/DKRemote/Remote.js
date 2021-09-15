//////////////////////
function Remote_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKRemote/Remote.html");
	CPP_DK_Create("DKWebSockets");
	
	var assets = DKAssets_LocalAssets();
	var address = DKFile_GetSetting(assets+"remote.txt", "[SERVER]");
	if(address){
		DKWidget_SetValue("address", address);
		//Remote_Connect();  FIXME: crashes android 
	}
	DKAddEvent("VolumeUp_Button", "click", Remote_OnEvent);
	DKAddEvent("VolumeDown_Button", "click", Remote_OnEvent);
	DKAddEvent("Wifi", "click", Remote_OnEvent);
	DKAddEvent("address", "change", Remote_OnEvent);
	DKAddEvent("GLOBAL", "DKWebSockets_OnMessageFromServer", Remote_OnEvent);
}

/////////////////////
function Remote_End()
{
	DKDEBUGFUNC();
	DKClose("DKRemote/Remote.html");
	DKClose("DKWebSockets");
	DKRemoveEvents(Remote_OnEvent);
}

//////////////////////////////
function Remote_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Id(event, "Power")){
		DKClient_Send("Power");
		DKINFO("Server: Power\n");
	}
	if(DK_Id(event, "VolumeUp_Button")){
		DKINFO("Button: VolumeUp\n");
		Remote_MessageToServer("VolumeUp");
	}
	if(DK_Id(event, "VolumeDown_Button")){
		DKINFO("Button: Volume Down\n");
		Remote_MessageToServer("VolumeDown");
	}
	if(DK_Id(event, "Wifi")){
		DKINFO("Button: Wifi\n");
		DKWidget_Toggle("address");
		if(!DKWidget_Visible("address")){
			Remote_Connect();
		}
	}
	if(DK_Id(event, "address")){
		//TODO
	}
	if(DK_Type(event, "DKWebSockets_OnMessageFromServer")){
		Remote_OnMessageFromServer(DK_GetValue(event));
	}
}

/////////////////////////
function Remote_Connect()
{
	DKDEBUGFUNC();	
	if(!DKWidget_GetValue("address")){
		DKWARN("Remote_Connect(): please enter an address\n");
		return;
	}
	url = DKWidget_GetValue("address");  //  ws://localhost
	
	if(DK_GetBrowser() == "Rocket"){
		DKINFO("Connecting to WebSocket via C++...\n");
		DKWebSockets_CreateClient(url);
		return;
	}
	
	//else
	DKINFO("Connecting to WebSocket via javascript...\n");
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
	DKDEBUGFUNC();
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
	DKDEBUGFUNC(message);	
	if(DK_GetBrowser() == "Rocket"){
		DKWebSockets_MessageToServer(message);
		return;
	}
	
	//else
	websocket.send(message);

	/*
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
	*/
}

////////////////////////////////////////////
function Remote_OnMessageFromServer(message)
{
	DKDEBUGFUNC(message);
}