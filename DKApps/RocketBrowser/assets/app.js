DKCreate("DKDebug/DKDebug.js");
DKCreate("DKRocket");

//attmpt to load code from an online resource
DKRocket_LoadUrl("test.html");

DKCreate("DKWidget");
var iframe = DKWidget_CreateElement("body", "iframe", "DKCef_frame");
DKWidget_SetProperty(iframe, "position", "absolute");
DKWidget_SetProperty(iframe, "top", "0rem");
//DKWidget_SetProperty(iframe, "left", "0rem");
DKWidget_SetProperty(iframe, "right", "0rem");
DKWidget_SetProperty(iframe, "width", "50%");
DKWidget_SetProperty(iframe, "height", "100%");
DKWidget_SetAttribute(iframe, "src", "test.html");
DKCef_SetFocus(DKCef_GetCurrentBrowser());