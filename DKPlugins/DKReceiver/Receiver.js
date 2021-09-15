////////////////////////
function Receiver_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKReceiver/Receiver.html");	
	CPP_DK_Create("DKWebSockets");
	DKWebSockets_CreateServer("127.0.0.1", 80);
	var IP = DK_GetLocalIP();
	DKWidget_SetInnerHtml("IPAddress", IP);
	
	DKAddEvent("VolumeUp_Button", "click", Receiver_OnEvent);
	DKAddEvent("VolumeDown_Button", "click", Receiver_OnEvent);
	DKAddEvent("GLOBAL", "DKWebSockets_OnMessageFromClient", Receiver_OnEvent);
}

///////////////////////
function Receiver_End()
{
	DKDEBUGFUNC();
	DKWebSockets_CloseServer();
	DKRemoveEvents(Receiver_OnEvent);
	DKClose("DKReceiver/Receiver.html");
}

////////////////////////////////
function Receiver_OnEvent(event)
{
	DKDEBUGFUNC(event);	
	if(DK_Id(event, "VolumeUp_Button")){
		DKINFO("Button: VolumeUp\n");
		var volume = DK_GetVolume();
		if(DK_GetOS() == "Linux"){
			DK_SetVolume(volume+5000);
		}
		else{
			DK_SetVolume(volume+2); // 1 doesn't work.   debug me
		}
	}
	if(DK_Id(event, "VolumeDown_Button")){
		DKINFO("Button: Volume Down\n");
		var volume = DK_GetVolume();
		if(DK_GetOS() == "Linux"){
			DK_SetVolume(volume-5000);
		}
		else{
			DK_SetVolume(volume-2);
		}
	}
	
	if(DK_Type(event, "DKWebSockets_OnMessageFromClient")){
		DKINFO("server: "+DK_GetValue(event)+"\n");
		if(DK_GetValue(event) == "Power"){
			DKINFO("Client: Power\n");
		}
		if(DK_GetValue(event) == "VolumeUp"){
			DKINFO("Client: VolumeUp\n");
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
			DKINFO("Client: VolumeDown\n");
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
}