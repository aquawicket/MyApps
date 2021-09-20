
function DKBrowserMenu(){}

DKBrowserMenu.prototype.init = function DKBrowserMenu_init(){
	//DKDEBUGFUNC()
	CPP_DK_Create("DKBrowser/DKBrowserMenu.html")
	dk.create("DKBrowser/DKBrowserMenu.html", function dkcreate_callback(htmlObj) {
		console.log("dkcreate_callback(html)")
        if (!htmlObj)
            return error("htmlObj invalid")
		dk.browsermenu.instance = this
		dk.browsermenu.instance.htmlObj = htmlObj
		//htmlObj.style["top"] = DKWindow_GetMouseY()+"px"
		//htmlObj.style["left"] = DKWindow_GetMouseX()+"px"
		window.addEventListener("mousedown", function(){ dk.close("DKBrowser/DKBrowserMenu.js") })
		htmlObj.getElementById("DKBrowserMenu_Cut").onclick = dk.browsermenu.Cut
		htmlObj.getElementById("DKBrowserMenu_Copy").onclick = dk.browsermenu.Copy
		htmlObj.getElementById("DKBrowserMenu_Paste").onclick = dk.browsermenu.Paste
		htmlObj.getElementById("DKBrowserMenu_OpenImageInNewTab").onclick = dk.browsermenu.OpenImageInNewTab
		htmlObj.getElementById("DKBrowserMenu_SaveImageAs").onclick = dk.browsermenu.SaveImageAs
		htmlObj.getElementById("DKBrowserMenu_CopyImage").onclick = dk.browsermenu.CopyImage
		htmlObj.getElementById("DKBrowserMenu_CopyImageAddress").onclick = dk.browsermenu.CopyImageAddress
		htmlObj.getElementById("DKBrowserMenu_OpenLinkInNewTab").onclick = dk.browsermenu.OpenLinkInNewTab
		htmlObj.getElementById("DKBrowserMenu_OpenLinkInNewWindow").onclick = dk.browsermenu.OpenLinkInNewWindow
		htmlObj.getElementById("DKBrowserMenu_SaveLinkAs").onclick = dk.browsermenu.SaveLinkAs
		htmlObj.getElementById("DKBrowserMenu_CopyLinkAddress").onclick = dk.browsermenu.CopyLinkAddress
		if(source_url){	
			dk.show("DKBrowserMenu_OpenImageInNewTab")
			dk.show("DKBrowserMenu_SaveImageAs") 
			dk.show("DKBrowserMenu_CopyImage") 
			dk.show("DKBrowserMenu_CopyImageAddress") 
		}
		else{ 
			dk.hide("DKBrowserMenu_OpenImageInNewTab")
			dk.hide("DKBrowserMenu_SaveImageAs") 
			dk.hide("DKBrowserMenu_CopyImage") 
			dk.hide("DKBrowserMenu_CopyImageAddress") 
		}
		if(link_url){ 
			dk.show("DKBrowserMenu_OpenLinkInNewTab")
			dk.show("DKBrowserMenu_OpenLinkInNewWindow") 
			dk.show("DKBrowserMenu_SaveLinkAs") 
			dk.show("DKBrowserMenu_CopyLinkAddress") 
		}
		else{
			dk.hide("DKBrowserMenu_OpenLinkInNewTab")
			dk.hide("DKBrowserMenu_OpenLinkInNewWindow") 
			dk.hide("DKBrowserMenu_SaveLinkAs") 
			dk.hide("DKBrowserMenu_CopyLinkAddress")  
		}
	})
}

DKBrowserMenu.prototype.end = function DKBrowserMenu_end(){
	//DKDEBUGFUNC()
	DKRemoveEvent("GLOBAL", "mousedown", dk.browsermenu.OnEvent)
	dk.close("DKBrowser/DKBrowserMenu.html")
}

DKBrowserMenu.prototype.Cut = function DKBrowserMenu_Cut(){
	//DKDEBUGFUNC()
	if(CPP_CPP_DKCef_GetCurrentBrowser() > -1){
		CPP_DKCef_Cut() //This will not copy images to the clipboard
	}
	else{
		//DKWidget_Cut("Textbox")
		dk.clipboard.cut(document.getElementById("Textbox"))
	}
}

DKBrowserMenu.prototype.Copy = function DKBrowserMenu_Copy(){
	//DKDEBUGFUNC()
	if(CPP_DKCef_GetCurrentBrowser() > -1){
		CPP_DKCef_Copy() //This will not copy images to the clipboard
	}
	else{
		//DKWidget_Copy("Textbox")
		dk.clipboard.copy(document.getElementById("Textbox"))
	}
}

DKBrowserMenu.prototype.Paste = function DKBrowserMenu_Paste(){
	//DKDEBUGFUNC()
	if(CPP_DKCef_GetCurrentBrowser() > -1){
		CPP_DKCef_Paste()
	}
	else{
		//DKWidget_Paste("Textbox")
		dk.clipboard.paste(document.getElementById("Textbox"))
	}
}

DKBrowserMenu.prototype.OpenImageInNewTab = function DKBrowserMenu_OpenImageInNewTab(){
	//DKDEBUGFUNC()
	if(source_url){
		dk.browser.NewTab()
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), source_url)
	}
}

DKBrowserMenu.prototype.SaveImageAs = function DKBrowserMenu_SaveImageAs(){
	//DKDEBUGFUNC()
	if(source_url)
		CPP_DKCef_DownloadUrl(source_url)
}

DKBrowserMenu.prototype.CopyImage = function DKBrowserMenu_CopyImage(){
	//DKDEBUGFUNC()
	if(source_url)
		CPP_DKCef_CopyImage(source_url)
}

DKBrowserMenu.prototype.CopyImageAddress = function DKBrowserMenu_CopyImageAddress(){
	//DKDEBUGFUNC()
	if(source_url){
		//DK_SetClipboard(source_url)
		dk.clipboard.copyToClipboard(source_url);
	}
}

DKBrowserMenu.prototype.OpenLinkInNewTab = function DKBrowserMenu_OpenLinkInNewTab(){
	//DKDEBUGFUNC()
	if(link_url){
		dk.browser.NewTab()
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), link_url)
	}
}

DKBrowserMenu.prototype.OpenLinkInNewWindow = function DKBrowserMenu_OpenLinkInNewWindow(){
	//DKDEBUGFUNC()
	if(link_url)
		CPP_DKCef_Popup(link_url)
}

DKBrowserMenu.prototype.SaveLinkAs = function DKBrowserMenu_SaveLinkAs(){
	//DKDEBUGFUNC()
	if(link_url)
		CPP_DKCef_DownloadUrl(link_url)
}

DKBrowserMenu.prototype.CopyLinkAddress = function DKBrowserMenu_CopyLinkAddress(){
	//DKDEBUGFUNC()
	if(link_url)
		DK_SetClipboard(link_url)
}

dk.browsermenu = DKPlugin(DKBrowserMenu)
