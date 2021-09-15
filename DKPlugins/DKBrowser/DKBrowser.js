var selection = "";
var source_url = "";
var link_url = "";
var parent = "";
var activeTab = 0;
	
/////////////////////////
function DKBrowser_Init()
{
	DKDEBUGFUNC();
	//CPP_DK_Create("DKCef");
	CPP_DK_Create("DKBrowser/DKBrowser.html");

	DKAddEvent("GLOBAL", "keydown", DKBrowser_OnEvent);
	DKAddEvent("GLOBAL", "mousedown", DKBrowser_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnLoadingStateChange", DKBrowser_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnBeforePopup", DKBrowser_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnLoadEnd", DKBrowser_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnLoadError", DKBrowser_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFullscreen", DKBrowser_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_ContextMenu", DKBrowser_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFileDialogDismissed", DKBrowser_OnEvent);
	DKAddEvent("Tab1", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab2", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab3", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab4", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab5", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab6", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab1Close", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab2Close", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab3Close", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab4Close", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab5Close", "click", DKBrowser_OnEvent);
	DKAddEvent("Tab6Close", "click", DKBrowser_OnEvent);
	DKAddEvent("NewTab", "click", DKBrowser_OnEvent);
	DKAddEvent("BackButton", "click", DKBrowser_OnEvent);
	DKAddEvent("ForwardButton", "click", DKBrowser_OnEvent);
	DKAddEvent("StopButton", "click", DKBrowser_OnEvent);
	DKAddEvent("RefreshButton", "click", DKBrowser_OnEvent);
	DKAddEvent("HomeButton", "click", DKBrowser_OnEvent);
	DKAddEvent("Textbox", "focus", DKBrowser_OnEvent);
	DKAddEvent("Textbox", "contextmenu", DKBrowser_OnEvent);
	DKAddEvent("GoButton", "click", DKBrowser_OnEvent);
	DKAddEvent("Copy", "click", DKBrowser_OnEvent);
	DKAddEvent("Paste", "click", DKBrowser_OnEvent);
	DKAddEvent("SaveImage", "click", DKBrowser_OnEvent);
	DKAddEvent("CopyLink", "click", DKBrowser_OnEvent);
	DKAddEvent("FindButton", "click", DKBrowser_OnEvent);
	DKAddEvent("Settings", "click", DKBrowser_OnEvent);
	
	DKBrowser_NewTab();
}

////////////////////////
function DKBrowser_End()
{
	DKDEBUGFUNC();
	
	//close all browsers
	/*
	while(CPP_DKCef_GetBrowsers() > 1){
		DKINFO("DKBrowserEnd(): closing browser "+(CPP_DKCef_GetBrowsers()-1)+"\n");
		CPP_DKCef_CloseDevTools(CPP_DKCef_GetBrowsers()-1);
		CPP_DKCef_CloseBrowser(CPP_DKCef_GetBrowsers()-1);
	}
	CPP_DKCef_CloseDevTools(0);
	CPP_DKCef_CloseBrowser(0); //close first browser
	*/
	
	DKRemoveEvents(DKBrowser_OnEvent);	
	DKClose("DKBrowser/DKBrowser.html");
}

/////////////////////////////////
function DKBrowser_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Type(event, "keydown")){
		DKBrowser_ProcessKey(DK_GetValue(event));
	}
	if(DK_Id(event, "Tab1")){
		DKBrowser_SelectTab(1);
	}
	if(DK_Id(event, "Tab2")){
		DKBrowser_SelectTab(2);
	}
	if(DK_Id(event, "Tab3")){
		DKBrowser_SelectTab(3);
	}
	if(DK_Id(event, "Tab4")){
		DKBrowser_SelectTab(4);
	}
	if(DK_Id(event, "Tab5")){
		DKBrowser_SelectTab(5);
	}
	if(DK_Id(event, "Tab6")){
		DKBrowser_SelectTab(6);
	}
	if(DK_Id(event, "Tab1Close")){
		DKBrowser_CloseTab(1);
	}
	if(DK_Id(event, "Tab2Close")){
		DKBrowser_CloseTab(2);
	}
	if(DK_Id(event, "Tab3Close")){
		DKBrowser_CloseTab(3);
	}
	if(DK_Id(event, "Tab4Close")){
		DKBrowser_CloseTab(4);
	}
	if(DK_Id(event, "Tab5Close")){
		DKBrowser_CloseTab(5);
	}
	if(DK_Id(event, "Tab6Close")){
		DKBrowser_CloseTab(6);
	}
	if(DK_Id(event, "NewTab")){
		DKBrowser_NewTab();
	}
	if(DK_Id(event, "BackButton")){
		CPP_DKCef_GoBack(CPP_DKCef_GetCurrentBrowser());
	}
	if(DK_Id(event, "ForwardButton")){
		CPP_DKCef_GoForward(CPP_DKCef_GetCurrentBrowser());
	}
	if(DK_Id(event, "StopButton")){
		CPP_DKCef_Stop(CPP_DKCef_GetCurrentBrowser());
	}
	if(DK_Id(event, "RefreshButton")){
		CPP_DKCef_Reload(CPP_DKCef_GetCurrentBrowser());
	}
	if(DK_Id(event, "HomeButton")){
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "http://google.com");
	}
	if(DK_Id(event, "Textbox")){
		var num = CPP_DKCef_GetBrowsers();
		for(var i = 0; i<num; i++){
			CPP_DKCef_RemoveFocus(i);
		}
		CPP_DKCef_SetKeyboardFocus(-1);
		//TODO: select all text
		if(DK_Type(event, "contextmenu")){
			CPP_DK_Create("DKBrowser/DKBrowserMenu.js", function(){
				CPP_DK_Create("DKGui/DKMenu.js", function(){
					DKMenu_ValidatePosition("DKBrowser/DKBrowserMenu.html");
				});
			});
		}
	}
	if(DK_Id(event, "GoButton")){		
		var tabCount = 0;
		for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
			if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
				tabCount++;
				if(tabCount == activeTab){
					CPP_DKCef_SetUrl(i, DKWidget_GetValue("Textbox"));
					return;
				}
			}
		}
	}

	if(DK_Type(event, "DKCef_OnLoadingStateChange")){
		var num = parseInt(DK_GetValue(event));
		var url = CPP_DKCef_GetUrl(num);
		if(url){
			DKBrowser_SetUrlBar(url, num);
		}
		return;
	}
	if(DK_Type(event, "DKCef_OnLoadEnd")){
		var num = parseInt(DK_GetValue(event));
		var url = CPP_DKCef_GetUrl(CPP_DKCef_GetCurrentBrowser());
		//TODO
		return;
	}
	if(DK_Type(event, "DKCef_OnLoadError")){
		DKBrowser_OnLoadError(DK_GetValue(event));
	}
	if(DK_Type(event, "DKCef_ContextMenu")){
		DKINFO("DKBrowser_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
		var data = DK_GetValue(event);
		var arry = data.split(";");
		selection = arry[0];
		source_url = arry[1];
		link_url = arry[2];
		if(!selection && !source_url && !link_url){ return; }
		CPP_DK_Create("DKBrowser/DKBrowserMenu.js", function(){
			CPP_DK_Create("DKGui/DKMenu.js", function(){
				DKMenu_ValidatePosition("DKBrowser/DKBrowserMenu.html");
			});
		});
	}
	if(DK_Type(event, "DKCef_OnFullscreen")){
		DKINFO("DKCef_OnFullscreen\n");
		var value = DK_GetValue(event);
		if(value == "true"){
			DKWidget_Hide("Tabs");
			DKWidget_Hide("Menu");
			DKWidget_SetProperty(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser()),"top","0rem");
			DKWidget_SetProperty(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser()),"z-index","100");
			DKWidget_AppendChild("body", CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser()));
			DKWindow_Fullscreen();
		}
		else{
			DKWidget_Show("Tabs");
			DKWidget_Show("Menu");
			DKWidget_SetProperty(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser()),"top","44rem");
			DKWidget_RemoveProperty(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser()),"z-index","100");
			DKWidget_AppendChild("body", CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser()));
			DKWindow_Windowed();
		}
	}
	if(DK_Id(event,"Settings")){
		CPP_DK_Create("DKBrowser/Settings.js", function(){
			DKFrame_Widget("DKBrowser/Settings.html");
		});
	}
	if(DK_Id(event,"FindButton")){
		CPP_DK_Create("DKBrowser/Find.js", function(){
			DKFrame_Widget("DKBrowser/Find.html");
		});
	}
}

/////////////////////////////////////
function DKBrowser_OnLoadError(error)
{
	DKDEBUGFUNC(error);
	if(error == "-105"){
		var url = DKWidget_GetValue("Textbox");
		url = url.replace(" ", "%20");
		var search = "https://www.google.com/?gws_rd=ssl#q=" + url;
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), search);
	}
}

//////////////////////////////////
function DKBrowser_ProcessKey(key)
{
	DKDEBUGFUNC(key);
	if(key == 78 && DK_KeyIsDown(17)){
		//DKINFO("New Window\n");
		var app = DKFile_GetFullExeName();
		DK_Run(app);
	}
	if(key == 84 && DK_KeyIsDown(17)){
		//DKINFO("New Tab\n");
		DKBrowser_NewTab();
	}
	if(key == 9 && DK_KeyIsDown(17) && !DK_KeyIsDown(16)){
		//DKINFO("Next Tab\n");
	}
	if(key == 9 && DK_KeyIsDown(17) && DK_KeyIsDown(16)){
		//DKINFO("Prev Tab\n");
	}
	if(key == 36 && DK_KeyIsDown(18)){
		//DKINFO("Homepage\n");
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "http://google.com");
	}
	
	var focused = DKWidget_GetFocusElement();
	//DKINFO("DKWidget_GetFocusElement(): focused="+focused+"\n");
	if(key == 13 && (focused == "Textbox")){
		var tabCount = 0;
		for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
			if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
				tabCount++;
				if(tabCount == activeTab){
					CPP_DKCef_SetUrl(i, DKWidget_GetValue("Textbox"));
					return;
				}
			}
		}
	}
}

////////////////////////////////
function DKBrowser_CloseTab(num)
{
	DKDEBUGFUNC(num);
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
			if(num == tabCount){
				DKWidget_RemoveElement(CPP_DKCef_GetBrowserId(i));
				CPP_DKCef_CloseBrowser(i);
				DKBrowser_SelectTab(Number(num-1));
				return;
			}
		}
	}
}

///////////////////////////
function DKBrowser_NewTab()
{
	DKDEBUGFUNC();
	var url = "https://google.com";
	var dummy = DKWidget_CreateElement("DKBrowser/DKBrowser.html", "div", "CefBrowserTab");
	var iframe = DKWidget_CreateElement("DKBrowser/DKBrowser.html", "iframe", "CefBrowserTab");
	DKWidget_RemoveElement(dummy);
	DKWidget_SetAttribute(iframe, "src", url);
	DKWidget_SetProperty(iframe, "position", "absolute");
	DKWidget_SetProperty(iframe, "top", "44rem");
	DKWidget_SetProperty(iframe, "left", "0rem");
	DKWidget_SetProperty(iframe, "width", "100%");
	DKWidget_SetProperty(iframe, "bottom", "0rem");
	
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
		}
	}
	DKBrowser_SelectTab(tabCount);
}

//////////////////////////////////////
function DKBrowser_SetUrlBar(url, num)
{
	DKDEBUGFUNC(url, num);
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
			if(num == i){
				DKWidget_SetInnerHtml("Tab"+tabCount+"Text", url);
			}
		}
	}

	if(CPP_DKCef_GetCurrentBrowser() != num){ return; }
	var focused = DKWidget_GetFocusElement();
	//DKINFO("DKWidget_GetFocusElement(): focused="+focused+"\n");
	if(focused != "Textbox"){
		DKWidget_SetValue("Textbox", url);
	}
	DKBrowser_UpdateTabs();
}

/////////////////////////////////
function DKBrowser_SelectTab(num)
{
	DKDEBUGFUNC(num);
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
			if(num == tabCount){
				activeTab = tabCount;
				DKWidget_Show(CPP_DKCef_GetBrowserId(i));
				CPP_DKCef_SetFocus(i);
				if(isNaN(CPP_DKCef_GetUrl(i))){
					DKWidget_SetValue("Textbox", CPP_DKCef_GetUrl(i));
				}
				else{
					DKWidget_SetValue("Textbox", "");
				}
			}
			else{
				DKWidget_Hide(CPP_DKCef_GetBrowserId(i));
			}
		}
	}
	DKBrowser_UpdateTabs();
}

///////////////////////////////
function DKBrowser_UpdateTabs()
{
	DKDEBUGFUNC();	
	var num = CPP_DKCef_GetBrowsers();
	var current = CPP_DKCef_GetCurrentBrowser();
	
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
			DKWidget_SetProperty("Tab"+String(tabCount),"display","inline-block");
			var url = CPP_DKCef_GetUrl(i);
			if(typeof url === 'string'){
				DKWidget_SetInnerHtml("Tab"+String(tabCount)+"Text", url);
			}
			if(i == current){
				DKWidget_SetProperty("Tab"+String(tabCount),"background-color","rgb(230,230,230)");
			}
			else{
				DKWidget_SetProperty("Tab"+String(tabCount),"background-color","rgb(180,180,180)");
			}
		}
	}
	
	//hide the rest of the tabs
	for(var i=tabCount+1; i<7; i++){
		DKWidget_SetProperty("Tab"+String(i),"display","none");
	}
}