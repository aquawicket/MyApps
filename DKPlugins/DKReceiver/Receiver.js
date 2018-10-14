////////////////////////
function Receiver_Init()
{
	DKCreate("DKReceiver/Receiver.html");	
	//DKCreate("DKServer");
	DKCreate("DKWebsockets");
	DKWebSockets_CreateServer("127.0.0.1", 80);
	var IP = DK_GetLocalIP();
	DKWidget_SetInnerHtml("IPAddress", IP);
	
	//DKAddEvent("GLOBAL", "server", Receiver_OnEvent);
	DKAddEvent("GLOBAL", "DKWebSockets_OnMessage", Receiver_OnEvent);
	DKAddEvent("VolumeUp_Button", "click", Receiver_OnEvent);
	DKAddEvent("VolumeDown_Button", "click", Receiver_OnEvent);

}

///////////////////////
function Receiver_End()
{
	DKWebSockets_CloseServer();
	DKRemoveEvents(Receiver_OnEvent);
	DKClose("DKReceiver/Receiver.html");
}

////////////////////////////////
function Receiver_OnEvent(event)
{
	DKLog("Receiver_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "VolumeUp_Button")){
		DKLog("Button: VolumeUp \n");
		var volume = DK_GetVolume();
		if(DK_GetOS() == "Linux"){
			DK_SetVolume(volume+5000);
		}
		else{
			DK_SetVolume(volume+0.1);
		}
	}
	if(DK_Id(event, "VolumeDown_Button")){
		DKLog("Button: Volume Down\n");
		var volume = DK_GetVolume();
		if(DK_GetOS() == "Linux"){
			DK_SetVolume(volume-5000);
		}
		else{
			DK_SetVolume(volume-0.1);
		}
	}
	
	/*
	if(DK_Type(event, "server")){
		DKLog("server: "+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "Power"){
			DKLog("Client: Power\n");
		}
		if(DK_GetValue(event) == "VolumeUp"){
			DKLog("Client: VolumeUp\n");
			var volume = DK_GetVolume();
			if(DK_GetOS() != "Linux"){
				DK_SetVolume(volume+0.1);
				DKTray_ShowBalloon("Volume Up");
			}
			else{
				DK_SetVolume(volume+5000);
			}
		}
		if(DK_GetValue(event) == "VolumeDown"){
			DKLog("Client: VolumeDown\n");
			var volume = DK_GetVolume();
			if(DK_GetOS() != "Linux"){
				DK_SetVolume(volume-0.1);
				DKTray_ShowBalloon("Volume Down");
			}
			else{
				DK_SetVolume(volume-5000);
			}
		}
	}
	*/
	
	if(DK_Type(event, "DKWebSockets_OnMessage")){
		DKLog("server: "+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "Power"){
			DKLog("Client: Power\n");
		}
		if(DK_GetValue(event) == "VolumeUp"){
			DKLog("Client: VolumeUp\n");
			var volume = DK_GetVolume();
			if(DK_GetOS() != "Linux"){
				DK_SetVolume(volume+0.1);
				DKTray_ShowBalloon("Volume Up");
			}
			else{
				DK_SetVolume(volume+5000);
			}
		}
		if(DK_GetValue(event) == "VolumeDown"){
			DKLog("Client: VolumeDown\n");
			var volume = DK_GetVolume();
			if(DK_GetOS() != "Linux"){
				DK_SetVolume(volume-0.1);
				DKTray_ShowBalloon("Volume Down");
			}
			else{
				DK_SetVolume(volume-5000);
			}
		}
	}
}
