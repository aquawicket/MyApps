//"use strict";
console.log("DKBrowser.js loading")

function DKBrowser(){}

var selection = "";
var source_url = "";
var link_url = "";
var parent = "";
var activeTab = 0;

DKBrowser.prototype.init = function DKBrowser_init(){	
	//DKDEBUGFUNC()
	console.log("!!dk.browser.init()!!")
	DKPlugin("DKBrowser/DKBrowser.html")
    //init_callback && init_callback(this)
	
	window.addEventListner("keydown", DKBrowser_OnEvent)
	window.addEventListner("mousedown", DKBrowser_OnEvent)
	window.addEventListner("DKCef_OnLoadingStateChange", DKBrowser_OnEvent)
	window.addEventListner("DKCef_OnBeforePopup", DKBrowser_OnEvent)
	window.addEventListner("DKCef_OnLoadEnd", DKBrowser_OnEvent)
	window.addEventListner("DKCef_OnLoadError", DKBrowser_OnEvent)
	window.addEventListner("DKCef_OnFullscreen", DKBrowser_OnEvent)
	window.addEventListner("DKCef_ContextMenu", DKBrowser_OnEvent)
	window.addEventListner("DKCef_OnFileDialogDismissed", DKBrowser_OnEvent)
	document.getElementById("Tab1").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab2").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab3").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab4").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab5").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab6").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab1Close").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab2Close").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab3Close").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab4Close").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab5Close").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Tab6Close").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("NewTab").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("BackButton").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("ForwardButton").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("StopButton").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("RefreshButton").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("HomeButton").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Textbox").addEventListner("focus", DKBrowser_OnEvent)
	document.getElementById("Textbox").addEventListner("contextmenu", DKBrowser_OnEvent)
	document.getElementById("GoButton").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Copy").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Paste").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("SaveImage").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("CopyLink").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("FindButton").addEventListner("click", DKBrowser_OnEvent)
	document.getElementById("Settings").addEventListner("click", DKBrowser_OnEvent)
	dk.browser.NewTab()
}

DKBrowser.prototype.end = function DKBrowser_End(){
	DKDEBUGFUNC()
	//close all browsers
	/*
	while(CPP_DKCef_GetBrowsers() > 1){
		console.log("DKBrowserEnd(): closing browser "+(CPP_DKCef_GetBrowsers()-1)+"\n")
		CPP_DKCef_CloseDevTools(CPP_DKCef_GetBrowsers()-1)
		CPP_DKCef_CloseBrowser(CPP_DKCef_GetBrowsers()-1)
	}
	CPP_DKCef_CloseDevTools(0)
	CPP_DKCef_CloseBrowser(0) //close first browser
	*/
	
	DKRemoveEvents(DKBrowser_OnEvent)	
	DKClose("DKBrowser/DKBrowser.html")
}

DKBrowser.prototype.OnEvent = function DKBrowser_OnEvent(event){
	DKDEBUGFUNC(event)
	if(event.type = "keydown")
		DKBrowser_ProcessKey(DK_GetValue(event))
	if(event.currentElement.id = "Tab1")
		DKBrowser_SelectTab(1)
	if(event.currentElement.id = "Tab2")
		DKBrowser_SelectTab(2)
	if(event.currentElement.id = "Tab3")
		DKBrowser_SelectTab(3)
	if(event.currentElement.id = "Tab4")
		DKBrowser_SelectTab(4)
	if(event.currentElement.id = "Tab5")
		DKBrowser_SelectTab(5)
	if(event.currentElement.id = "Tab6")
		DKBrowser_SelectTab(6)
	if(event.currentElement.id = "Tab1Close")
		DKBrowser_CloseTab(1)
	if(event.currentElement.id = "Tab2Close")
		DKBrowser_CloseTab(2)
	if(event.currentElement.id = "Tab3Close")
		DKBrowser_CloseTab(3)
	if(event.currentElement.id = "Tab4Close")
		DKBrowser_CloseTab(4)
	if(event.currentElement.id = "Tab5Close")
		DKBrowser_CloseTab(5)
	if(event.currentElement.id = "Tab6Close")
		DKBrowser_CloseTab(6)
	if(event.currentElement.id = "NewTab")
		DKBrowser_NewTab()
	if(event.currentElement.id = "BackButton")
		CPP_DKCef_GoBack(CPP_DKCef_GetCurrentBrowser())
	if(event.currentElement.id = "ForwardButton")
		CPP_DKCef_GoForward(CPP_DKCef_GetCurrentBrowser())
	if(event.currentElement.id = "StopButton")
		CPP_DKCef_Stop(CPP_DKCef_GetCurrentBrowser())
	if(event.currentElement.id = "RefreshButton")
		CPP_DKCef_Reload(CPP_DKCef_GetCurrentBrowser())
	if(event.currentElement.id = "HomeButton")
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "http://google.com")
	if(event.currentElement.id = "Textbox")
		var num = CPP_DKCef_GetBrowsers()
		for(var i = 0; i<num; i++){
			CPP_DKCef_RemoveFocus(i)
		CPP_DKCef_SetKeyboardFocus(-1)
		//TODO: select all text
		if(event.type = "contextmenu"){
			CPP_DK_Create("DKBrowser/DKBrowserMenu.js", function(){
				CPP_DK_Create("DKGui/DKMenu.js", function(){
					DKMenu_ValidatePosition("DKBrowser/DKBrowserMenu.html")
				})
			})
		}
	}
	if(event.currentElement.id = "GoButton"){		
		var tabCount = 0;
		for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
			if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
				tabCount++;
				if(tabCount == activeTab){
					CPP_DKCef_SetUrl(i, document.getElementById("Textbox"))
					return;
				}
			}
		}
	}

	if(event.type = "DKCef_OnLoadingStateChange"){
		var num = parseInt(DK_GetValue(event))
		var url = CPP_DKCef_GetUrl(num)
		if(url)
			DKBrowser_SetUrlBar(url, num)
		return;
	}
	if(event.type = "DKCef_OnLoadEnd"){
		var num = parseInt(event.value)
		var url = CPP_DKCef_GetUrl(CPP_DKCef_GetCurrentBrowser())
		//TODO
		return;
	}
	if(event.type = "DKCef_OnLoadError"){
		DKBrowser_OnLoadError(DK_GetValue(event))
	}
	if(event.type = "DKCef_ContextMenu"){
		console.log("DKBrowser_OnEvent("+event+")");
		var data = event.value
		var arry = data.split(";")
		selection = arry[0];
		source_url = arry[1];
		link_url = arry[2];
		if(!selection && !source_url && !link_url)
			return;
		CPP_DK_Create("DKBrowser/DKBrowserMenu.js", function(){
			CPP_DK_Create("DKGui/DKMenu.js", function(){
				DKMenu_ValidatePosition("DKBrowser/DKBrowserMenu.html")
			})
		})
	}
	if(event.type = "DKCef_OnFullscreen"){
		console.log("DKCef_OnFullscreen\n")
		var value = event.value
		if(value == "true"){
			document.getElementById("Tabs").style["visibility"] = "hidden";
			document.getElementById("Menu").style["visibility"] = "hidden";
			document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())).style["top"] = "0rem"
			document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())).style["z-index"] = "100"
			document.body.appendChild(document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())))
			CPP_DKWindow_Fullscreen()
		}
		else{
			document.getElementById("Tabs").style["visibility"] = "visible";
			document.getElementById("Menu").style["visibility"] = "visible";
			document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())).style["top"] = "44rem"
			document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())).style["z-index"] = "100"
			document.body.appendChild(document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())))
			CPP_DKWindow_Windowed()
		}
	}
	if(event.currentElement.id = "Settings"){
		CPP_DK_Create("DKBrowser/Settings.js", function(){
			DKFrame_Widget("DKBrowser/Settings.html") //FIXME
		})
	}
	if(event.currentElement.id = "FindButton"){
		CPP_DK_Create("DKBrowser/Find.js", function(){
			DKFrame_Widget("DKBrowser/Find.html") //FIXME
		})
	}
}

DKBrowser.prototype.OnLoadError = function DKBrowser_OnLoadError(error){
	DKDEBUGFUNC(error)
	if(error == "-105"){
		var url = document.getElementById("Textbox").value
		url = url.replace(" ", "%20")
		var search = "https://www.google.com/?gws_rd=ssl#q=" + url;
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), search)
	}
}

DKBrowser.prototype.ProcessKey = function DKBrowser_ProcessKey(key){
	DKDEBUGFUNC(key)
	if(key == 78 && DK_KeyIsDown(17)){
		//console.log("New Window\n")
		var app = DKFile_GetFullExeName()
		DK_Run(app)
	}
	if(key == 84 && DK_KeyIsDown(17)){
		//console.log("New Tab\n")
		DKBrowser_NewTab()
	}
	if(key == 9 && DK_KeyIsDown(17) && !DK_KeyIsDown(16)){
		//console.log("Next Tab\n")
	}
	if(key == 9 && DK_KeyIsDown(17) && DK_KeyIsDown(16)){
		//console.log("Prev Tab\n")
	}
	if(key == 36 && DK_KeyIsDown(18)){
		//console.log("Homepage\n")
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "http://google.com")
	}
	
	var focused = DKWidget_GetFocusElement() //FIXME
	//console.log("DKWidget_GetFocusElement(): focused="+focused+"\n")
	if(key == 13 && (focused == "Textbox")){
		var tabCount = 0;
		for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
			if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
				tabCount++;
				if(tabCount == activeTab){
					CPP_DKCef_SetUrl(i, document.getElementById("Textbox").value)
					return;
				}
			}
		}
	}
}

DKBrowser.prototype.CloseTab = function DKBrowser_CloseTab(num){
	DKDEBUGFUNC(num)
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
			if(num == tabCount){
				DKWidget_RemoveElement(CPP_DKCef_GetBrowserId(i)) //FIXME
				CPP_DKCef_CloseBrowser(i)
				DKBrowser_SelectTab(Number(num-1))
				return;
			}
		}
	}
}

DKBrowser.prototype.NewTab = function DKBrowser_NewTab(){
	DKDEBUGFUNC()
	var url = "https://google.com";
	var dummy = DKWidget_CreateElement("DKBrowser/DKBrowser.html", "div", "CefBrowserTab") //FIXME
	var iframe = DKWidget_CreateElement("DKBrowser/DKBrowser.html", "iframe", "CefBrowserTab") //FIXME
	DKWidget_RemoveElement(dummy) //FIXME
	DKWidget_SetAttribute(iframe, "src", url) //FIXME
	DKWidget_SetProperty(iframe, "position", "absolute") //FIXME
	DKWidget_SetProperty(iframe, "top", "44rem") //FIXME
	DKWidget_SetProperty(iframe, "left", "0rem") //FIXME
	DKWidget_SetProperty(iframe, "width", "100%") //FIXME
	DKWidget_SetProperty(iframe, "bottom", "0rem") //FIXME
	
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1)
			tabCount++;
	}
	DKBrowser_SelectTab(tabCount)
}

DKBrowser.prototype.SetUrlBar = function DKBrowser_SetUrlBar(url, num){
	DKDEBUGFUNC(url, num)
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
			if(num == i)
				document.getElementById("Tab"+tabCount+"Text").innerHTML = url;
		}
	}

	if(CPP_DKCef_GetCurrentBrowser() != num)
		return;
	var focused = DKWidget_GetFocusElement() //FIXME
	//console.log("Focused Element: focused="+focused+"\n")
	if(focused != "Textbox")
		document.getELementById("Textbox").value = url;
	DKBrowser_UpdateTabs()
}

DKBrowser.prototype.SelectTab = function DKBrowser_SelectTab(num){
	DKDEBUGFUNC(num)
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
			if(num == tabCount){
				activeTab = tabCount;
				document.getElementById(CPP_DKCef_GetBrowserId(i)).style["visibility"] = "visible"
				CPP_DKCef_SetFocus(i)
				if(isNaN(CPP_DKCef_GetUrl(i))){
					document.getElementById("Textbox").value = CPP_DKCef_GetUrl(i)
				}
				else{
					document.getElementById("Textbox").value = ""
				}
			}
			else{
				document.getElementById(CPP_DKCef_GetBrowserId(i)).style["visibility"] = "hidden"
			}
		}
	}
	DKBrowser_UpdateTabs()
}

DKBrowser.prototype.UpdateTabs = function DKBrowser_UpdateTabs(){
	DKDEBUGFUNC()	
	var num = CPP_DKCef_GetBrowsers()
	var current = CPP_DKCef_GetCurrentBrowser()
	
	var tabCount = 0;
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++;
			document.getElementById("Tab"+String(tabCount)).style["display"] = "inline-block"
			var url = CPP_DKCef_GetUrl(i)
			if(typeof url === 'string')
				document.getElementById("Tab"+String(tabCount)+"Text").innerHTML = url
			if(i == current){
				document.getElementById("Tab"+String(tabCount)).style["background-color"] = "rgb(230,230,230)"
			}
			else{
				document.getElementById("Tab"+String(tabCount)).style["background-color"] = "rgb(180,180,180)"
			}
		}
	}
	
	//hide the rest of the tabs
	for(var i=tabCount+1; i<7; i++)
		document.getElementById("Tab"+String(i)).style["display"] = "none"
}

dk.browser = DKPlugin(DKBrowser)

