var server

function Receiver_init(){
	dk.create("DKUWebSocketsServer");
	dk.create("DKReceiver/Receiver.html", function(){
		var local_ip = CPP_DK_GetLocalIP()
		var server = new WebSocketServer("ws://"+local_ip+":80");
		
		//server.onclose = function onclose(event){
		server.addEventListener("close", function onclose(event){
			console.log("server.onclose("+event+")");
			console.log("event.value = "+event.value);
		})

		//server.onerror = function onerror(event){
		server.addEventListener("error", function onerror(event){
			console.log("server.onerror("+event+")");
			console.log("event.value = "+event.value);
		})

		//server.oninit = function oninit(event){
		server.addEventListener("init", function oninit(event){
			console.log("server.oninit("+event+")");
			console.log("event.value = "+event.value);
		})

		//server.onmessage = function onmessage(event){
		server.addEventListener("message", function onmessage(event){
			console.log("server.onmessage("+event+")");
			console.log("event.value = "+event.value);
			//byId("DKUWebSocketsServer_receive").value = event.value;
		})

		//server.onopen = function onopen(event){
		server.addEventListener("open", function onopen(event){
			console.log("server.onopen("+event+")");
			console.log("event.value = "+event.value);
		})
			
		server.start(local_ip, "80");
	
		byId("IPAddress").innerHTML = local_ip
		byId("VolumeUp_Button").addEventListener("click", Receiver_onevent);
		byId("VolumeDown_Button").addEventListener("click", Receiver_onevent);
	});
}

function Receiver_End(){
	server.close() //TODO
	DKRemoveEvents(Receiver_OnEvent);
	DKClose("DKReceiver/Receiver.html");
}

function Receiver_onevent(event){
	//DKDEBUGFUNC(event);	
	console.log("Receiver_onevent("+event+")")
	/*
	if(event.currentTarget.id === "VolumeUp_Button"){
		console.log("Button: VolumeUp\n");
		var volume = CPP_DK_GetVolume();
		if(DK_GetOS() == "Linux"){
			CPP_DK_SetVolume(volume+5000);
		}
		else{
			CPP_DK_SetVolume(volume+2); // 1 doesn't work.   debug me
		}
	}
	if(event.currentTarget.id === "VolumeDown_Button"){
		console.log("Button: Volume Down\n");
		var volume = CPP_DK_GetVolume();
		if(DK_GetOS() == "Linux"){
			CPP_DK_SetVolume(volume-5000);
		}
		else{
			CPP_DK_SetVolume(volume-2);
		}
	}
	*/
	/*
	if(event.type === "DKWebSockets_OnMessageFromClient"){
		console.log("server: "+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "Power"){
			console.log("Client: Power\n");
		}
		if(DK_GetValue(event) == "VolumeUp"){
			console.log("Client: VolumeUp\n");
			var volume = DK_GetVolume();
			if(DK_GetOS() != "Linux"){
				DK_SetVolume(volume+2);
				DKTray_ShowBalloon("Volume Up");
			}
			else{
				DK_SetVolume(volume+5000);
			}
		}
		if(DK_GetValue(event) == "VolumeDown"){
			console.log("Client: VolumeDown\n");
			var volume = DK_GetVolume();
			if(DK_GetOS() != "Linux"){
				DK_SetVolume(volume-2);
				DKTray_ShowBalloon("Volume Down");
			}
			else{
				DK_SetVolume(volume-5000);
			}
		}
	}
	*/
}
