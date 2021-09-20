
function DKBrowserMenu(){}

DKBrowserMenu.prototype.init = function DKBrowserMenu_init(){
	//DKDEBUGFUNC();
	CPP_DK_Create("DKBrowser/DKBrowserMenu.html");
	dk.create("DKBrowser/DKBrowserMenu.html", function dkcreate_callback(htmlObj) {
		console.log("dkcreate_callback(html)")
        if (!htmlObj)
            return error("htmlObj invalid")
		dk.browsermenu.instance = this
		dk.browsermenu.instance.htmlObj = htmlObj
		//DKWidget_SetProperty("DKBrowser/DKBrowserMenu.html","top",DKWindow_GetMouseY()+"px");
		//DKWidget_SetProperty("DKBrowser/DKBrowserMenu.html","left",DKWindow_GetMouseX()+"px");
		window.addEventListener("mousedown", DKBrowserMenu_OnEvent);
		htmlObj.getElementById("DKBrowserMenu_Cut").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_Copy").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_Paste").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_OpenImageInNewTab").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_SaveImageAs").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_CopyImage").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_CopyImageAddress").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_OpenLinkInNewTab").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_OpenLinkInNewWindow").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_SaveLinkAs").addEventListener("click", dk.browsermenu.OnEvent);
		htmlObj.getElementById("DKBrowserMenu_CopyLinkAddress").addEventListener("click", dk.browsermenu.OnEvent);
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
	});
}

DKBrowserMenu.prototype.end = function DKBrowserMenu_end(){
	//DKDEBUGFUNC();
	DKRemoveEvent("GLOBAL", "mousedown", dk.browsermenu.OnEvent);
	DKClose("DKBrowser/DKBrowserMenu.html");
}

DKBrowserMenu.prototype.OnEvent function DKBrowserMenu_OnEvent(event){
	//DKDEBUGFUNC(event);	
	if(DK_Id(event,"DKBrowserMenu_Cut"))
		DKBrowserMenu_Cut();
	if(DK_Id(event,"DKBrowserMenu_Copy"))
		DKBrowserMenu_Copy();
	if(DK_Id(event,"DKBrowserMenu_Paste"))
		DKBrowserMenu_Paste();
	if(DK_Id(event,"DKBrowserMenu_OpenImageInNewTab"))
		DKBrowserMenu_OpenImageInNewTab();
	if(DK_Id(event,"DKBrowserMenu_SaveImageAs"))
		DKBrowserMenu_SaveImageAs();
	if(DK_Id(event,"DKBrowserMenu_CopyImage"))
		DKBrowserMenu_CopyImage();
	if(DK_Id(event,"DKBrowserMenu_CopyImageAddress"))
		DKBrowserMenu_CopyImageAddress();
	if(DK_Id(event,"DKBrowserMenu_OpenLinkInNewTab"))
		DKBrowserMenu_OpenLinkInNewTab();
	if(DK_Id(event,"DKBrowserMenu_OpenLinkInNewWindow"))
		DKBrowserMenu_OpenLinkInNewWindow();
	if(DK_Id(event,"DKBrowserMenu_SaveLinkAs"))
		DKBrowserMenu_SaveLinkAs();
	if(DK_Id(event,"DKBrowserMenu_CopyLinkAddress"))
		DKBrowserMenu_CopyLinkAddress();
	if(DK_Id(event, "GLOBAL")){
		if(DKWidget_IsChildOf(DKWidget_GetHoverElement(), "DKBrowser/DKBrowserMenu.html"))
			return;
	}
	DKClose("DKBrowser/DKBrowserMenu.js");
}

DKBrowserMenu.prototype.Cut = function DKBrowserMenu_Cut(){
	//DKDEBUGFUNC();
	if(CPP_CPP_DKCef_GetCurrentBrowser() > -1){
		CPP_DKCef_Cut(); //This will not copy images to the clipboard
	}
	else{
		DKWidget_Cut("Textbox");
	}
}

DKBrowserMenu.prototype.Copy = function DKBrowserMenu_Copy(){
	//DKDEBUGFUNC();
	if(CPP_DKCef_GetCurrentBrowser() > -1){
		CPP_DKCef_Copy(); //This will not copy images to the clipboard
	}
	else{
		DKWidget_Copy("Textbox");
	}
}

DKBrowserMenu.prototype.Paste = function DKBrowserMenu_Paste(){
	//DKDEBUGFUNC();
	if(CPP_DKCef_GetCurrentBrowser() > -1){
		CPP_DKCef_Paste();
	}
	else{
		DKWidget_Paste("Textbox");
	}
}

DKBrowserMenu.prototype.OpenImageInNewTab = function DKBrowserMenu_OpenImageInNewTab(){
	//DKDEBUGFUNC();
	if(source_url){
		dk.browser.NewTab();
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), source_url);
	}
}

DKBrowserMenu.prototype.SaveImageAs = function DKBrowserMenu_SaveImageAs(){
	//DKDEBUGFUNC();
	if(source_url)
		CPP_DKCef_DownloadUrl(source_url);
}

DKBrowserMenu.prototype.CopyImage = function DKBrowserMenu_CopyImage(){
	//DKDEBUGFUNC();
	if(source_url)
		CPP_DKCef_CopyImage(source_url);
}

DKBrowserMenu.prototype.CopyImageAddress = function DKBrowserMenu_CopyImageAddress(){
	//DKDEBUGFUNC();
	if(source_url)
		DK_SetClipboard(source_url);
}

DKBrowserMenu.prototype.OpenLinkInNewTab = function DKBrowserMenu_OpenLinkInNewTab(){
	//DKDEBUGFUNC();
	if(link_url){
		dk.browser.NewTab();
		CPP_DKCef_SetUrl(CPP_DKCef_GetCurrentBrowser(), link_url);
	}
}

DKBrowserMenu.prototype.OpenLinkInNewWindow = function DKBrowserMenu_OpenLinkInNewWindow(){
	//DKDEBUGFUNC();
	if(link_url)
		CPP_DKCef_Popup(link_url);
}

DKBrowserMenu.prototype.SaveLinkAs = function DKBrowserMenu_SaveLinkAs(){
	//DKDEBUGFUNC();
	if(link_url)
		CPP_DKCef_DownloadUrl(link_url);
}

DKBrowserMenu.prototype.CopyLinkAddress = function DKBrowserMenu_CopyLinkAddress(){
	//DKDEBUGFUNC();
	if(link_url)
		DK_SetClipboard(link_url);
}

dk.browsermenu = DKPlugin(DKBrowserMenu)
