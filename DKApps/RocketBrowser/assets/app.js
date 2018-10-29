DKCreate("DKAssets");
var url = DKAssets_LocalAssets()+"test.html";


DKCreate("DKDebug/DKDebug.js");
//DKCreate("DKWindow");
//DKWindow_Create();
DKCreate("DKRocket");
DKRocket_LoadUrl(url);

DKCreate("DKCef");
DKCef_NewBrowser("CefPopup", 0, 0, 415, 638, url);
/*
DKCreate("DKWidget");
var iframe = DKWidget_CreateElement("body", "iframe", "DKCef_frame");
DKWidget_SetProperty(iframe, "position", "absolute");
DKWidget_SetProperty(iframe, "top", "0px");
DKWidget_SetProperty(iframe, "right", "0px");
DKWidget_SetProperty(iframe, "bottom", "1px");
DKWidget_SetProperty(iframe, "width", "50%");
DKWidget_SetProperty(iframe, "border-style", "solid");
DKWidget_SetProperty(iframe, "border-width", "1px");
DKWidget_SetAttribute(iframe, "src", url);
DKCef_SetFocus(DKCef_GetCurrentBrowser());
*/

//DKAddEvent("GLOBAL", "resize", app_OnEvent);

///////////////////////////
function app_OnEvent(event)
{
	if(DK_Type(event, "resize")){
		DK_CallFunc("DKSDLCef::OnResize", "DKCef_frame,0,0,"+String(DKWindow_GetWidth()/2)+","+String(DKWindow_GetHeight()));
	}
}