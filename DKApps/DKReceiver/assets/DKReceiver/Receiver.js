
//////////////////////
function Receiver_Init()
{
	DKCreate("DKReceiver/Receiver.html");	
	DKCreate("DKServer");
	var IP = DK_GetLocalIP();
	DKWidget_SetInnerHtml("IPAddress", IP);
	
	DKAddEvent("GLOBAL", "server", Receiver_OnEvent);
	DKAddEvent("VolumeUp_Button", "click", Receiver_OnEvent);
	DKAddEvent("VolumeDown_Button", "click", Receiver_OnEvent);

}

////////////////////////////////
function Receiver_OnEvent(event)
{
	if(DK_Id(event, "VolumeUp_Button")){
		DKLog("Button: VolumeUp \n", DKDEBUG);
		var volume = DK_GetVolume();
		DK_ChangeVolume(volume+0.1);
	}
	if(DK_Id(event, "VolumeDown_Button")){
		DKLog("Button: Volume Down\n", DKDEBUG);
		var volume = DK_GetVolume();
		DK_ChangeVolume(volume-0.1);
	}
	
	if(DK_Type(event, "server")){
		DKLog("server: "+DKWidget_GetValue(event)+"\n", DKDEBUG);
		if(DKWidget_GetValue(event) == "Power"){
			DKLog("Client: Power\n", DKDEBUG);
		}
		if(DKWidget_GetValue(event) == "VolumeUp"){
			var volume = DK_GetVolume();
			DK_ChangeVolume(volume+0.1);
			DKLog("Client: VolumeUp\n", DKDEBUG);
		}
		if(DKWidget_GetValue(event) == "VolumeDown"){
			var volume = DK_GetVolume();
			DK_ChangeVolume(volume-0.1);
			DKLog("Client: VolumeDown\n", DKDEBUG);
		}
	}
}