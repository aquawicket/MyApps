dk.init()
const MyApp = function() {}
const myapp = new MyApp

//DKPlugin("DK/DKTrace.js", "singleton")
//DKPlugin("DK/DKErrorHandler.js", "singleton")
//DKPlugin("DK/DKPhp.js", "singleton")
//DKPlugin("DK/DKJson.js", "singleton")
DKPlugin("DKFile/DKFile.js", "singleton")
dk.file.init()
DKPlugin("DK/DKValidate.js", "singleton")
//DKPlugin("DK/DKTime.js", "singleton")
//DKPlugin("DK/DKMqtt.js")
//DKPlugin("DK/DKNotifications.js")
DKPlugin("DKDebug/DKDebug.js", "singleton")
dk.debug.init()
//DKPlugin("DKAudio/DKAudio.js")
//DKPlugin("DKGui/DKConsole.js", "singleton")
DKPlugin("DKGui/DKGui.js", "singleton")
DKPlugin("DKGui/DKFrame.js")
DKFrame.prototype.init()
DKPlugin("DKGui/DKMenu.js")
DKMenu.prototype.init()
DKPlugin("DKGui/DKMessageBox.js")
DKMessageBox.prototype.init()
DKPlugin("DKGui/DKDrag.js")
DKPlugin("DKGui/DKResize.js")
DKPlugin("DKGui/DKClipboard.js", "singleton")
DKPlugin("DKGui/DKTable.js")
//DKPlugin("DKDevTools/DKDevToolsButton.js", "singleton")
//DKPlugin("DKChart/DKChart.js")
//DKPlugin("DKCodeMirror/DKCodeMirror.js")



DKPlugin("DKBrowser/DKBrowser.js", "singleton")
/*
dk.browser.init(function(){
	document.getElementById("DKBrowser/DKBrowser.html").style["width"] = "100%"
	document.getElementById("DKBrowser/DKBrowser.html").style["height"] = "100%"
	//DKPlugin("DKTray/DKTray.js")
	//DKPlugin("DKDebug/DKDebug.js")
	//DKPlugin("DKSDLText")
	CPP_DK_SetFramerate(120)
	//DKPlugin("DKUpdate")
	document.body.style["background-color"] = "rgb:(255,255,255)"
})
*/
