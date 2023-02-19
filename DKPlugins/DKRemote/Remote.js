var client;

function Remote_init(){
	dk.create("DKUWebSocketsClient");
	dk.create("DKRemote/Remote.html", function(){

		var assets = dk.file.onlineAssets
		console.log("assets = "+assets)

		dk.file.getSetting(assets+"settings.txt", "[SERVER]", function(str){
			byId("address").value = str
		});
		byId("VolumeUp_Button").addEventListener("click", Remote_OnEvent);
		byId("VolumeDown_Button").addEventListener("click", Remote_OnEvent);
		byId("Wifi").addEventListener("click", Remote_OnEvent);
		byId("address").addEventListener("change", Remote_OnEvent);
		//byId("GLOBAL"), "DKWebSockets_OnMessageFromServer", Remote_OnEvent);
	})
}

function Remote_End(){
	DKClose("DKRemote/Remote.html");
	DKClose("DKUWebSocketsClient");
	DKRemoveEvents(Remote_OnEvent);
}

function Remote_OnEvent(event){
	//DKDEBUGFUNC(event);
	if(event.currentTarget.id === "Power"){
		DKClient_Send("Power");
		console.log("Server: Power\n");
	}
	if(event.currentTarget.id === "VolumeUp_Button"){
		console.log("Button: VolumeUp\n");
		Remote_MessageToServer("VolumeUp");
	}
	if(event.currentTarget.id === "VolumeDown_Button"){
		console.log("Button: Volume Down\n");
		Remote_MessageToServer("VolumeDown");
	}
	if(event.currentTarget.id === "Wifi"){
		console.log("Button: Wifi\n");
		dk.toggle("address");
		if(!byId("address").isVisiable){
			Remote_Connect();
		}
	}
	if(event.currentTarget.id === "address"){
		//TODO
	}
	if(event.type === "DKWebSockets_OnMessageFromServer"){
		Remote_OnMessageFromServer(DK_GetValue(event));
	}
}

function Remote_Connect(){
		
	if(!byId("address").value){
		console.warn("Remote_Connect(): please enter an address\n");
		return;
	}
	url = byId("address").value  //  ws://localhost
	
	client = new WebSocket(url);
	
	//client.onclose = function onclose(event){
	client.addEventListener("close", function onclose(event){
		console.log("client.onclose("+event+")");
		console.log("event.value = "+event.value);
	})
	
	//client.onerror = function onerror(event){
	client.addEventListener("error", function onerror(event){
		console.log("client.onerror("+event+")");
		console.log("event.value = "+event.value);
	})
	
	//client.oninit = function oninit(event){
	client.addEventListener("init", function oninit(event){
		console.log("client.oninit("+event+")");
		console.log("event.value = "+event.value);
	})
	
	//client.onmessage = function onmessage(event){
	client.addEventListener("message", function onmessage(event){
		console.log("client.onmessage("+event+")");
		console.log("event.value = "+event.value);
		byId("DKUWebSocketsClient_receive").value = event.value;
	})
	
	//client.onopen = function onopen(event){
	client.addEventListener("open", function onopen(event){
		console.log("client.onopen("+event+")");
		console.log("event.value = "+event.value);
	})
}

function Remote_CloseClient(){
	client.close();
}

function Remote_MessageToServer(message){
	//DKDEBUGFUNC(message);	
	
	client.send(message);

	/*
	if(DK_GetValue(event) == "connected"){
		dk.hide("address");
		DKWidget_SetAttribute("Wifi", "src", "DKRemote/wifiGreen.png");
		//DK_CallFunc("DKOSGRocket::DirtyRefresh","");
		var assets = DKAssets_LocalAssets();
		var address = DKWidget_GetValue("address");
		DKFile_SetSetting(assets+"remote.txt", "[SERVER]", address); //provide full path in case file does not exist
	}
	if(DK_GetValue(event) == "disconnected"){
		dk.show("address");
		DKWidget_SetAttribute("Wifi", "src", "DKRemote/wifiRed.png");
	}
	*/
}

function Remote_OnMessageFromServer(message){
	DKDEBUGFUNC(message);
}