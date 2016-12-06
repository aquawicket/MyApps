/////////////////////
function Tray_Init()
{
	DKCreate("DKTray");
	DKAddEvent("DKTray", "1000", Tray_OnEvent);
	DKAddEvent("DKTray", "1001", Tray_OnEvent);
	DKAddEvent("DKTray", "1002", Tray_OnEvent);
	
	DKTray_AddItem("Test_Exit", 1002);
	DKTray_AddItem("Test_Minimize", 1001);
	DKTray_AddItem("Test_Restore", 1000);
	
	DKTray_SetTooltip("DKReceiver");
}

////////////////////////////
function Tray_OnEvent(event)
{
	//DKLog("DKTray_OnEvent("+event+") \n");
	if(DK_Type(event, "1000")){
		DKCreate("DKWindowJS");
		DKWindow_Show();
	}
	if(DK_Type(event, "1001")){
		DKCreate("DKWindowJS");
		DKWindow_Hide();
	}
	if(DK_Type(event, "1002")){
		DK_Exit();
	}
}
