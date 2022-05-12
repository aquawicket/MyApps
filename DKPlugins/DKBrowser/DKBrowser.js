//"use strict"

function DKBrowser(){}

var selection = ""
var source_url = ""
var link_url = ""
var parent = ""
var activeTab = 0

DKBrowser.prototype.init = function DKBrowser_init(create_callback){	
	//DKDEBUGFUNC()
	dk.create("DKBrowser/DKBrowser.html", function dkcreate_callback(htmlObj) {
		console.log("dkcreate_callback(htmlObj)")
        if (!htmlObj)
            return error("htmlObj invalid")
		dk.browser.htmlObj = htmlObj
		window.addEventListener("keydown", dk.browser.OnEvent)
		window.addEventListener("mousedown", dk.browser.OnEvent)
		window.addEventListener("DKCef_OnLoadingStateChange", dk.browser.OnEvent)
		window.addEventListener("DKCef_OnBeforePopup", dk.browser.OnEvent)
		window.addEventListener("DKCef_OnLoadEnd", dk.browser.OnEvent)
		window.addEventListener("DKCef_OnLoadError", dk.browser.OnEvent)
		window.addEventListener("DKCef_OnFullscreen", dk.browser.OnEvent)
		window.addEventListener("DKCef_ContextMenu", dk.browser.OnEvent)
		window.addEventListener("DKCef_OnFileDialogDismissed", dk.browser.OnEvent)
		htmlObj.getElementById("Tab1").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab2").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab3").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab4").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab5").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab6").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab1Close").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab2Close").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab3Close").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab4Close").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab5Close").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Tab6Close").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("NewTab").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("BackButton").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("ForwardButton").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("StopButton").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("RefreshButton").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("HomeButton").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Textbox").addEventListener("focus", dk.browser.OnEvent)
		htmlObj.getElementById("Textbox").addEventListener("contextmenu", dk.browser.OnEvent)
		htmlObj.getElementById("GoButton").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("FindButton").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Settings").addEventListener("click", dk.browser.OnEvent)
		/*
		htmlObj.getElementById("Copy").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("Paste").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("SaveImage").addEventListener("click", dk.browser.OnEvent)
		htmlObj.getElementById("CopyLink").addEventListener("click", dk.browser.OnEvent)
		*/
		
		dk.browser.NewTab()
		create_callback && create_callback(dk.browser)
		return dk.browser
    })
}

DKBrowser.prototype.end = function DKBrowser_End(){
	//DKDEBUGFUNC()
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
	
	DKRemoveEvents(dk.browser.OnEvent)	
	dk.close("DKBrowser/DKBrowser.html")
}

DKBrowser.prototype.OnEvent = function DKBrowser_OnEvent(event){
	//DKDEBUGFUNC(event)
	var event_string = "EVENT: ";
	//event && console.log("DKBrowser_OnEvent(event): "+event+")") || console.log("DKBrowser_OnEvent(event): undefined")
	//event.currentTarget && console.log("DKBrowser_OnEvent(event.currentTarget): "+event.currentTarget+")") || console.log("DKBrowser_OnEvent(event.currentTarget): undefined")
	event.currentTarget.id && (event_string = event_string + event.currentTarget.id+", ")
	event.type && (event_string = event_string + event.type+", ")
	event.value && (event_string = event_string + event.value)
	console.log(event_string)
	
	
	if(!event.currentTarget.id)
		return false;
	
	if(event.type = "keydown")
		dk.browser.ProcessKey(event.key)
	if(event.currentTarget.id == "Tab1")
		dk.browser.SelectTab(1)
	if(event.currentTarget.id == "Tab2")
		dk.browser.SelectTab(2)
	if(event.currentTarget.id == "Tab3")
		dk.browser.SelectTab(3)
	if(event.currentTarget.id == "Tab4")
		dk.browser.SelectTab(4)
	if(event.currentTarget.id == "Tab5")
		dk.browser.SelectTab(5)
	if(event.currentTarget.id == "Tab6")
		dk.browser.SelectTab(6)
	if(event.currentTarget.id == "Tab1Close")
		dk.browser.CloseTab(1)
	if(event.currentTarget.id == "Tab2Close")
		dk.browser.CloseTab(2)
	if(event.currentTarget.id == "Tab3Close")
		dk.browser.CloseTab(3)
	if(event.currentTarget.id == "Tab4Close")
		dk.browser.CloseTab(4)
	if(event.currentTarget.id == "Tab5Close")
		dk.browser.CloseTab(5)
	if(event.currentTarget.id == "Tab6Close")
		dk.browser.CloseTab(6)
	if(event.currentTarget.id == "NewTab")
		dk.browser.NewTab()
	if(event.currentTarget.id == "BackButton")
		CPP_DKCef_GoBack(CPP_DKCef_GetCurrentBrowser())
	if(event.currentTarget.id == "ForwardButton")
		CPP_DKCef_GoForward(CPP_DKCef_GetCurrentBrowser())
	if(event.currentTarget.id == "StopButton")
		CPP_DKCef_Stop(CPP_DKCef_GetCurrentBrowser())
	if(event.currentTarget.id == "RefreshButton")
		CPP_DKCef_Reload(CPP_DKCef_GetCurrentBrowser())
	if(event.currentTarget.id == "HomeButton")
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "http://duckduckgo.com")
	if(event.currentTarget.id == "Textbox")
		var num = CPP_DKCef_GetBrowsers()
		for(var i = 0; i<num; i++){
			CPP_DKCef_RemoveFocus(i)
		CPP_DKCef_SetKeyboardFocus(-1)
		//TODO: select all text
		if(event.type == "contextmenu"){
			CPP_DK_Create("DKBrowser/DKBrowserMenu.js", function(){
				CPP_DK_Create("DKGui/DKMenu.js", function(){
					DKMenu_ValidatePosition("DKBrowser/DKBrowserMenu.html")
				})
			})
		}
	}
	if(event.currentTarget.id == "GoButton"){
		var tabCount = 0
		for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
			if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
				tabCount++
				if(tabCount == activeTab){
					CPP_DKCef_SetUrl(i, document.getElementById("Textbox").value)
					return
				}
			}
		}
	}

	if(event.type == "DKCef_OnLoadingStateChange"){
		var num = parseInt(event.value)
		var url = CPP_DKCef_GetUrl(num)
		if(url)
			dk.browser.SetUrlBar(url, num)
		return
	}
	if(event.type == "DKCef_OnLoadEnd"){
		//TODO
		/*
		var num = parseInt(event.value)
		var url = CPP_DKCef_GetUrl(CPP_DKCef_GetCurrentBrowser())
		*/
		return
	}
	if(event.type == "DKCef_OnLoadError"){
		dk.browser.OnLoadError(event.value)
	}
	if(event.type == "DKCef_ContextMenu"){
		console.log("dk.browser.OnEvent("+event+")")
		var data = event.value
		var arry = data.split(";")
		selection = arry[0]
		source_url = arry[1]
		link_url = arry[2]
		if(!selection && !source_url && !link_url)
			return
		CPP_DK_Create("DKBrowser/DKBrowserMenu.js", function(){
			CPP_DK_Create("DKGui/DKMenu.js", function(){
				DKMenu_ValidatePosition("DKBrowser/DKBrowserMenu.html")
			})
		})
	}
	if(event.type == "DKCef_OnFullscreen"){
		console.log("DKCef_OnFullscreen\n")
		if(event.value == "true"){
			document.getElementById("Tabs").style["visibility"] = "hidden"
			document.getElementById("Menu").style["visibility"] = "hidden"
			document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())).style["top"] = "0rem"
			document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())).style["z-index"] = "100"
			document.body.appendChild(document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())))
			CPP_DKWindow_Fullscreen()
		}
		else{
			document.getElementById("Tabs").style["visibility"] = "visible"
			document.getElementById("Menu").style["visibility"] = "visible"
			document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())).style["top"] = "44rem"
			document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())).style["z-index"] = "100"
			document.body.appendChild(document.getElementById(CPP_DKCef_GetBrowserId(CPP_DKCef_GetCurrentBrowser())))
			CPP_DKWindow_Windowed()
		}
	}
	if(event.currentTarget.id == "Settings"){
		DKPlugin("DKBrowser/Settings.js", "singleton")
		
		//CPP_DK_Create("DKBrowser/Settings.js", function(){
		//	DKFrame_Widget("DKBrowser/Settings.html") //FIXME
		//})
	}
	if(event.currentTarget.id == "FindButton"){
		CPP_DK_Create("DKBrowser/Find.js", function(){
			DKFrame_Widget("DKBrowser/Find.html") //FIXME
		})
	}
}

DKBrowser.prototype.OnLoadError = function DKBrowser_OnLoadError(error){
	//DKDEBUGFUNC(error)
	if(error == "-105"){
		var url = document.getElementById("Textbox").value
		url = url.replace(" ", "%20")
		var search = "https://www.duckduckgo.com/?gws_rd=ssl#q=" + url
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), search)
	}
}

DKBrowser.prototype.ProcessKey = function DKBrowser_ProcessKey(key){
	//DKDEBUGFUNC(key)
	if(key == 78 && DK_KeyIsDown(17)){
		//console.log("New Window\n")
		var app = DKFile_GetFullExeName()
		DK_Run(app)
	}
	if(key == 84 && DK_KeyIsDown(17)){
		//console.log("New Tab\n")
		dk.browser.NewTab()
	}
	if(key == 9 && DK_KeyIsDown(17) && !DK_KeyIsDown(16)){
		//console.log("Next Tab\n")
	}
	if(key == 9 && DK_KeyIsDown(17) && DK_KeyIsDown(16)){
		//console.log("Prev Tab\n")
	}
	if(key == 36 && DK_KeyIsDown(18)){
		//console.log("Homepage\n")
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), "http://duckduckgo.com")
	}
	//var focused = DKWidget_GetFocusElement() //FIXME
	//console.log("DKWidget_GetFocusElement(): focused="+focused+"\n")
	if(key == 13 && (focused == "Textbox")){
		var tabCount = 0
		for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
			if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
				tabCount++
				if(tabCount == activeTab){
					CPP_DKCef_SetUrl(i, document.getElementById("Textbox").value)
					return
				}
			}
		}
	}
}

DKBrowser.prototype.CloseTab = function DKBrowser_CloseTab(num){
	//DKDEBUGFUNC(num)
	console.log("DKBrowser_CloseTab("+num+")")
	var tabCount = 0
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++
			if(num == tabCount){
				const ele = document.getElementById(CPP_DKCef_GetBrowserId(i))
				ele.parentNode.removeChild(ele)
				CPP_DKCef_CloseBrowser(i)
				dk.browser.SelectTab(Number(num-1))
				return
			}
		}
	}
}

DKBrowser.prototype.NewTab = function DKBrowser_NewTab(){
	//DKDEBUGFUNC()
	console.log("DKBrowser.prototype.NewTab")
	var url = "chrome://gpu";
	
	var iframe = document.createElement("iframe")
	iframe.id = dk.getAvailableId("CefBrowserTab")
	iframe.setAttribute("src", url)
	iframe.style["position"] = "absolute"
	
	/*
	iframe.style["top"] = "44rem"
	iframe.style["left"] = "0rem"
	iframe.style["width"] = "100%"
	iframe.style["bottom"] = "0rem"
	*/
	
	iframe.style["top"] = "100px"
	iframe.style["left"] = "100px"
	iframe.style["right"] = "100px"
	iframe.style["bottom"] = "100px"
	
	iframe.style["background-color"] = "white"
	dk.browser.htmlObj.appendChild(iframe)
	
	CPP_DKRml_PostProcess()
	var tabCount = 0
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1)
			tabCount++
	}
	dk.browser.SelectTab(tabCount)
}

DKBrowser.prototype.SetUrlBar = function DKBrowser_SetUrlBar(url, num){
	//DKDEBUGFUNC(url, num)
	var tabCount = 0
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++
			if(num == i)
				document.getElementById("Tab"+tabCount+"Text").innerHTML = url
		}
	}
	if(CPP_DKCef_GetCurrentBrowser() != num)
		return
	//var focused = DKWidget_GetFocusElement() //FIXME
	//console.log("Focused Element: focused="+focused+"\n")
	if(focused != "Textbox")
		document.getELementById("Textbox").value = url
	dk.browser.UpdateTabs()
}

DKBrowser.prototype.SelectTab = function DKBrowser_SelectTab(num){
	//DKDEBUGFUNC(num)
	var tabCount = 0
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++
			if(num == tabCount){
				activeTab = tabCount
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
	dk.browser.UpdateTabs()
}

DKBrowser.prototype.UpdateTabs = function DKBrowser_UpdateTabs(){
	//DKDEBUGFUNC()	
	var num = CPP_DKCef_GetBrowsers()
	var current = CPP_DKCef_GetCurrentBrowser()
	
	var tabCount = 0
	for(var i=0; i<CPP_DKCef_GetBrowsers(); i++){
		if(CPP_DKCef_GetBrowserId(i).indexOf("CefBrowserTab") > -1){
			tabCount++
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

dk.browser = DKPlugin(DKBrowser, "singleton")

