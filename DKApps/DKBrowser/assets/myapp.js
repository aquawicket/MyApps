// browser app script, called from index.html

CPP_DK_Create("DK/DK.css");	
CPP_DK_Create("DKGui/DKFrame.js");
CPP_DK_Create("DKBrowser/DKBrowser.js");
DKWidget_SetProperty("DKBrowser.html", "width", "100%");
DKWidget_SetProperty("DKBrowser.html", "height", "100%");
CPP_DK_Create("DKTray/DKTray.js");
CPP_DK_Create("DKDebug/DKDebug.js");
CPP_DK_Create("DKSDLText");
DK_SetFramerate(120);
CPP_DK_Create("DKUpdate");
DKWidget_SetProperty("body", "background-color", "rgb:(245,245,245)");