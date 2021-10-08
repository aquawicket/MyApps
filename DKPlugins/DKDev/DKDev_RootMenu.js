
//////////////////////////////
function DKDev_RootMenu_Init()
{
	CPP_DK_Create("DKDev/DKDev_RootMenu.html");
	DKWidget_SetProperty("DKDev/DKDev_RootMenu.html","top",DKWindow_GetMouseY()+"rem");
	DKWidget_SetProperty("DKDev/DKDev_RootMenu.html","left",DKWindow_GetMouseX()+"rem");
	DKAddEvent("GLOBAL", "mousedown", DKDev_RootMenu_OnEvent);
	DKAddEvent("DKDev_RootMenu_NewFrame", "click", DKDev_RootMenu_OnEvent);
	DKAddEvent("DKDev_RootMenu_OpenFile", "click", DKDev_RootMenu_OnEvent);
}

/////////////////////////////
function DKDev_RootMenu_End()
{
	DKRemoveEvents(DKDev_RootMenu_OnEvent);
	DKClose("DKDev/DKDev_RootMenu.html");
}

//////////////////////////////////////
function DKDev_RootMenu_OnEvent(event)
{
	console.log("DKDev_RootMenu_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "DKDev_RootMenu_NewFrame")){
		DKDev_NewPage(stored_element);
	}
	if(DK_Id(event, "DKDev_RootMenu_OpenFile")){
		CPP_DK_Create("DKFile/DKFileDialog.js", function(){
			DKFrame_Widget("DKFile/DKFileDialog.html");
			var assets = DKAssets_LocalAssets();
			DKSendEvent("DKFile/DKFileDialog.html", "GetFile", "GLOBAL,OpenFile,"+assets+",relative"); // To -> DKFileDialog
		});
	}
	
	if(DK_Id(event, "GLOBAL")){
		if(DKWidget_IsChildOf(DKWidget_GetHoverElement(), "DKDev/DKDev_RootMenu.html")){
			return;
		}
	}
	
	DKClose("DKDev/DKDev_RootMenu.js");
}