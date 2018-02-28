///////////////////////////
function DKMenuRight_Init()
{
	DKCreate("DKDev/DKMenuRight.html", function(){
	DKAddEvent("GLOBAL", "keydown", DKMenuRight_OnEvent);
	DKAddEvent("DevModeButton", "click", DKMenuRight_OnEvent);
	//DKAddEvent("AppImage", "click", DKMenuRight_OnEvent);
	DKAddEvent("Image19", "click", DKMenuRight_OnEvent);
	//DKAddEvent("Image20", "click", DKMenuRight_OnEvent);
	DKAddEvent("WebImage", "click", DKMenuRight_OnEvent);
	DKAddEvent("TriggerImage", "click", DKMenuRight_OnEvent);
	DKAddEvent("HookImage", "click", DKMenuRight_OnEvent);
	DKAddEvent("DKDev/DKMenuRight.html", "SetPanel", DKMenuRight_OnEvent);

	DKCreate("DKDev/DKMenuRightWeb.js", function(){});
	DKCreate("DKDev/DKMenuRightEdit.js", function(){});
	});
}

//////////////////////////
function DKMenuRight_End()
{
	DKRemoveEvents(DKMenuRight_OnEvent);
	DKClose("DKDev/DKMenuRightWeb.js");
	DKClose("DKDev/DKMenuRightTree.js");
	DKClose("DKDev/DKMenuRightApp.js");
	DKClose("DKDev/DKMenuRightEdit.js");
	DKClose("DKDev/DKMenuRight.html");
}

///////////////////////////////////
function DKMenuRight_OnEvent(event)
{
	DKLog("DKMenuRight_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "AppImage")){
		DKMenuRight_SetPanel("App");
	}
	if(DK_Id(event, "Image19")){
		DKMenuRight_SetPanel("Edit");
	}
	if(DK_Id(event, "Image20")){
		DKMenuRight_SetPanel("Tree");
	}
	if(DK_Id(event, "WebImage")){
		DKMenuRight_SetPanel("Web");
	}
	if(DK_Id(event, "TriggerImage")){
		DKCreate("DKTriggers/DKAutomate.js", function(){
			DKFrame_Widget("DKTriggers/DKAutomate.html");
		});
	}
	if(DK_Id(event, "HookImage")){
		DKCreate("DKHook/DKHook.js", function(){
			DKFrame_Widget("DKHook/DKHook.html");
		});
	}
	if(DK_Id(event, "DevModeButton")){
		DKMenuRight_ToggleEditMode();
	}
	if(DK_Type(event, "SetPanel")){
		DKLog("DKMenuRight_OnEvent("+event+") \n");
		DKMenuRight_SetPanel(DK_GetValue(event));
	}
}

/////////////////////////////////////
function DKMenuRight_SetPanel(string)
{
	DKWidget_Hide("DKDev/DKMenuRightApp.html");
	DKWidget_Hide("DKDev/DKMenuRightEdit.html");
	DKWidget_Hide("DKDev/DKMenuRightTree.html");
	DKWidget_Hide("DKDev/DKMenuRightWeb.html");
	DKWidget_SetAttribute("AppImage", "src", "DKDev/app.png");
	DKWidget_SetAttribute("Image19", "src", "DKDev/pencil.png");
	DKWidget_SetAttribute("Image20", "src", "DKDev/tree.png");
	DKWidget_SetAttribute("WebImage", "src", "DKDev/web.png");

	if(string == "App"){
		DKWidget_SetAttribute("AppImage", "src", "DKDev/app-select.png");
		DKWidget_Show("DKDev/DKMenuRightApp.html");
	}
	if(string == "Edit"){
		DKWidget_SetAttribute("Image19", "src", "DKDev/pencil-select.png");
		DKWidget_Show("DKDev/DKMenuRightEdit.html");
	}
	if(string == "Tree"){
		DKWidget_SetAttribute("Image20", "src", "DKDev/tree-select.png");
		DKWidget_Show("DKDev/DKMenuRightTree.html");
	}
	if(string == "Web"){
		DKWidget_SetAttribute("WebImage", "src", "DKDev/web-select.png");
		DKWidget_Show("DKDev/DKMenuRightWeb.html");
	}
}

/////////////////////////////////////
function DKMenuRight_ToggleEditMode()
{
	DKLog("DKMenuRight_ToggleEditMode() \n");
	var img = DKWidget_GetAttribute("DevModeButton", "src");
	if(img.indexOf("greenbutton.png") != -1){
		DKMenuRight_EditModeOn();
		return;
	}
	if(img.indexOf("redbutton.png") != -1){
		DKMenuRight_EditModeOff();
	}
}

/////////////////////////////////
function DKMenuRight_EditModeOn()
{
	DKLog("DKMenuRight_EditModeOn() \n");
	DKWidget_SetAttribute("DevModeButton", "src", "DKDev/redbutton.png");
	DKCreate("DKDev/DKDev.js", function(){
		DKDev_On();
		DKSendEvent("GLOBAL", "ToggleTriggers", "OFF");
	});
}

//////////////////////////////////
function DKMenuRight_EditModeOff()
{
	DKLog("DKMenuRight_EditModeOff() \n");
	DKWidget_SetAttribute("DevModeButton", "src", "DKDev/greenbutton.png");
	DKCreate("DKDev/DKDev.js", function(){
		DKDev_Off();
		DKSendEvent("GLOBAL", "ToggleTriggers", "ON");
	});
}
