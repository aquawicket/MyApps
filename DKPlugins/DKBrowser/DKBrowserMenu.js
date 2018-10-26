/////////////////////////////
function DKBrowserMenu_Init()
{
	DKDEBUGFUNC();
	DKCreate("DKBrowser/DKBrowserMenu.html");
	//DKWidget_SetProperty("DKBrowser/DKBrowserMenu.html","top",DKWindow_GetMouseY()+"px");
	//DKWidget_SetProperty("DKBrowser/DKBrowserMenu.html","left",DKWindow_GetMouseX()+"px");
	DKAddEvent("GLOBAL", "mousedown", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_Cut", "click", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_Copy", "click", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_Paste", "click", DKBrowserMenu_OnEvent);
	
	DKAddEvent("DKBrowserMenu_OpenImageInNewTab", "click", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_SaveImageAs", "click", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_CopyImage", "click", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_CopyImageAddress", "click", DKBrowserMenu_OnEvent);
	
	DKAddEvent("DKBrowserMenu_OpenLinkInNewTab", "click", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_OpenLinkInNewWindow", "click", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_SaveLinkAs", "click", DKBrowserMenu_OnEvent);
	DKAddEvent("DKBrowserMenu_CopyLinkAddress", "click", DKBrowserMenu_OnEvent);
	
	if(source_url){	
		DKWidget_Show("DKBrowserMenu_OpenImageInNewTab");
		DKWidget_Show("DKBrowserMenu_SaveImageAs"); 
		DKWidget_Show("DKBrowserMenu_CopyImage"); 
		DKWidget_Show("DKBrowserMenu_CopyImageAddress"); 
	}
	else{ 
		DKWidget_Hide("DKBrowserMenu_OpenImageInNewTab");
		DKWidget_Hide("DKBrowserMenu_SaveImageAs"); 
		DKWidget_Hide("DKBrowserMenu_CopyImage"); 
		DKWidget_Hide("DKBrowserMenu_CopyImageAddress"); 
	}
	if(link_url){ 
		DKWidget_Show("DKBrowserMenu_OpenLinkInNewTab");
		DKWidget_Show("DKBrowserMenu_OpenLinkInNewWindow"); 
		DKWidget_Show("DKBrowserMenu_SaveLinkAs"); 
		DKWidget_Show("DKBrowserMenu_CopyLinkAddress"); 
	}
	else{
		DKWidget_Hide("DKBrowserMenu_OpenLinkInNewTab");
		DKWidget_Hide("DKBrowserMenu_OpenLinkInNewWindow"); 
		DKWidget_Hide("DKBrowserMenu_SaveLinkAs"); 
		DKWidget_Hide("DKBrowserMenu_CopyLinkAddress");  
	}
}

////////////////////////////
function DKBrowserMenu_End()
{
	DKDEBUGFUNC();
	DKRemoveEvent("GLOBAL", "mousedown", DKBrowserMenu_OnEvent);
	DKClose("DKBrowser/DKBrowserMenu.html");
}

/////////////////////////////////////
function DKBrowserMenu_OnEvent(event)
{
	DKDEBUGFUNC(event);	
	if(DK_Id(event,"DKBrowserMenu_Cut")){
		DKBrowserMenu_Cut();
	}
	if(DK_Id(event,"DKBrowserMenu_Copy")){
		DKBrowserMenu_Copy();
	}
	if(DK_Id(event,"DKBrowserMenu_Paste")){
		DKBrowserMenu_Paste();
	}
	if(DK_Id(event,"DKBrowserMenu_OpenImageInNewTab")){
		DKBrowserMenu_OpenImageInNewTab();
	}
	if(DK_Id(event,"DKBrowserMenu_SaveImageAs")){
		DKBrowserMenu_SaveImageAs();
	}
	if(DK_Id(event,"DKBrowserMenu_CopyImage")){
		DKBrowserMenu_CopyImage();
	}
	if(DK_Id(event,"DKBrowserMenu_CopyImageAddress")){
		DKBrowserMenu_CopyImageAddress();
	}
	if(DK_Id(event,"DKBrowserMenu_OpenLinkInNewTab")){
		DKBrowserMenu_OpenLinkInNewTab();
	}
	if(DK_Id(event,"DKBrowserMenu_OpenLinkInNewWindow")){
		DKBrowserMenu_OpenLinkInNewWindow();
	} 
	if(DK_Id(event,"DKBrowserMenu_SaveLinkAs")){
		DKBrowserMenu_SaveLinkAs();
	} 
	if(DK_Id(event,"DKBrowserMenu_CopyLinkAddress")){
		DKBrowserMenu_CopyLinkAddress();
	}
	
	if(DK_Id(event, "GLOBAL")){
		if(DKWidget_IsChildOf(DKWidget_GetHoverElement(), "DKBrowser/DKBrowserMenu.html")){
			return;
		}
	}
	DKClose("DKBrowser/DKBrowserMenu.js");
}

////////////////////////////
function DKBrowserMenu_Cut()
{
	DKDEBUGFUNC();
	if(DKCef_GetCurrentBrowser() > -1){
		DKCef_Cut(); //This will not copy images to the clipboard
	}
	else{
		DKWidget_Cut("Textbox");
	}
}

/////////////////////////////
function DKBrowserMenu_Copy()
{
	DKDEBUGFUNC();
	if(DKCef_GetCurrentBrowser() > -1){
		DKCef_Copy(); //This will not copy images to the clipboard
	}
	else{
		DKWidget_Copy("Textbox");
	}
}

//////////////////////////////
function DKBrowserMenu_Paste()
{
	DKDEBUGFUNC();
	if(DKCef_GetCurrentBrowser() > -1){
		DKCef_Paste();
	}
	else{
		DKWidget_Paste("Textbox");
	}
}

//////////////////////////////////////////
function DKBrowserMenu_OpenImageInNewTab()
{
	DKDEBUGFUNC();
	if(source_url){
		DKBrowser_NewTab();
		DKCef_SetUrl(DKCef_GetCurrentBrowser(), source_url);
	}
}

////////////////////////////////////
function DKBrowserMenu_SaveImageAs()
{
	DKDEBUGFUNC();
	if(source_url){
		DKCef_DownloadUrl(source_url);
	}
}

//////////////////////////////////
function DKBrowserMenu_CopyImage()
{
	DKDEBUGFUNC();
	if(source_url){
		DKCef_CopyImage(source_url);
	}
}

/////////////////////////////////////////
function DKBrowserMenu_CopyImageAddress()
{
	DKDEBUGFUNC();
	if(source_url){
		DK_SetClipboard(source_url);
	}
}

/////////////////////////////////////////
function DKBrowserMenu_OpenLinkInNewTab()
{
	DKDEBUGFUNC();
	if(link_url){
		DKBrowser_NewTab();
		DKCef_SetUrl(DKCef_GetCurrentBrowser(), link_url);
	}
}

////////////////////////////////////////////
function DKBrowserMenu_OpenLinkInNewWindow()
{
	DKDEBUGFUNC();
	if(link_url){
		DKCef_Popup(link_url);
	}
}

///////////////////////////////////
function DKBrowserMenu_SaveLinkAs()
{
	DKDEBUGFUNC();
	if(link_url){
		DKCef_DownloadUrl(link_url);
	}
}

////////////////////////////////////////
function DKBrowserMenu_CopyLinkAddress()
{
	DKDEBUGFUNC();
	if(link_url){
		DK_SetClipboard(link_url);
	}
}