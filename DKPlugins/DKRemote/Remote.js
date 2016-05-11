Remote_server = false;
DKCreate("DKWidget,DK/DKRemote/Remote.html");

//////////////////////
function Remote_Init()
{
	DKWidget_Hide("Go");
	
	//attempt to connect
	if(Remote_server){
		DKCreate("DKServer");
		var IP = DK_GetLocalIP();
		DKWidget_SetInnerHtml("IPAddress", IP);
		DKWidget_Hide("Wifi");
		DKWidget_Hide("address");
	}
	else{
		DKCreate("DKClient");
		var datapath = DKAssets_GetDataPath();
		var address = DKFile_GetSetting(datapath+"remote.txt", "[SERVER]");
		if(address){
			DKWidget_SetValue("address", address);
			//Remote_Connect();  FIXME: crashes android 
		}
	}
	
	DKRegisterEvent("GLOBAL", "server", Remote_OnEvent);
	DKRegisterEvent("GLOBAL", "client", Remote_OnEvent);
	DKRegisterEvent("Power", "click", Remote_OnEvent);
	DKRegisterEvent("VolumeUp_Button", "click", Remote_OnEvent);
	DKRegisterEvent("VolumeDown_Button", "click", Remote_OnEvent);
	DKRegisterEvent("Wifi", "click", Remote_OnEvent);
	DKRegisterEvent("address", "change", Remote_OnEvent);
}

////////////////////////////////
function Remote_OnEvent(event)
{
	if(DK_Id(event, "Power")){
		DKClient_Send("Power");
		DKLog("Server: Power\n", DKDEBUG);
	}
	if(DK_Id(event, "VolumeUp_Button")){
		DKLog("Button: VolumeUp \n", DKDEBUG);
		if(Remote_server){
			var volume = DK_GetVolume();
			DK_ChangeVolume(volume+0.1);
		}
		else{
			DKClient_Send("VolumeUp");
		}
	}
	if(DK_Id(event, "VolumeDown_Button")){
		DKLog("Button: Volume Down\n", DKDEBUG);
		if(Remote_server){
			var volume = DK_GetVolume();
			DK_ChangeVolume(volume-0.1);
		}
		else{
			DKClient_Send("VolumeDown");
		}	
	}

	if(DK_Id(event, "Wifi")){
		DKLog("Button: Wifi\n", DKDEBUG);
		DKWidget_Toggle("address");
		if(!DKWidget_Visible("address")){
			Remote_Connect();
		}
	}
	if(DK_Id(event, "address")){
		DKClient_Address(DKWidget_GetValue("address"));
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
	if(DK_Type(event, "client")){
		DKLog("client: "+DKWidget_GetValue(event)+"\n", DKDEBUG);
		if(DKWidget_GetValue(event) == "connected"){
			DKWidget_Hide("address");
			var datapath = DKAssets_GetDataPath();
			DKWidget_SetAttribute("Wifi", "src", datapath+"DK/DKRemote/wifiGreen.png");
			//DK_CallFunc("DKOSGRocket::DirtyRefresh","");
			var address = DKWidget_GetValue("address");
			DKFile_SetSetting(datapath+"remote.txt", "[SERVER]", address); //provide full path in case file does not exist
		}
		if(DKWidget_GetValue(event) == "disconnected"){
			DKWidget_Show("address");
			DKWidget_SetAttribute("Wifi", "src", datapath+"DK/DKRemote/wifiRed.png");
		}
	}
}

/////////////////////////
function Remote_Connect()
{
	DKClient_Connect( DKWidget_GetValue("address") );
}