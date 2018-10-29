DKCreate("DKAssets");
var url = DKAssets_LocalAssets()+"test.html";

DKCreate("DKDebug/DKDebug.js");
DKCreate("DKWindow");
DKWindow_Create();
DKCreate("DKRocket");
DKRocket_LoadUrl(url);


DKCreate("DKWidget");
var iframe = DKWidget_CreateElement("body", "iframe", "DKCef_frame");
DKWidget_SetProperty(iframe, "position", "absolute");
DKWidget_SetProperty(iframe, "top", "0rem");
//DKWidget_SetProperty(iframe, "left", "0rem");
DKWidget_SetProperty(iframe, "right", "0rem");
DKWidget_SetProperty(iframe, "width", "50%");
DKWidget_SetProperty(iframe, "height", "100%");
//DKWidget_SetProperty(iframe, "right", "0rem");
//DKWidget_SetProperty(iframe, "bottom", "0rem");
DKWidget_SetAttribute(iframe, "src", url);
DKCef_SetFocus(DKCef_GetCurrentBrowser());