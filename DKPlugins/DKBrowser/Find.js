//"use strict";

function DKBrowserFind(){}

DKBrowserFind.prototype.init = function DKBrowserFind_init(){
	console.log("DKBrowserFind.prototype.init")
	//dk.create("DKBrowser/Find.html");
	//dk.create("DKBrowser/Find.css");
	//callback && callback(true)
}
DKBrowserFind.prototype.end = function DKBrowserFind_End(){
	//CPP_DKCef_Find(0, "") //FIXME: not working
	dk.close("DKBrowser/Find.html")
	//dk.close("DKBrowser/Find.css")
}
DKBrowserFind.prototype.create = function DKBrowser_find(DKBrowser_find_callback) {
	dk.create("DKBrowser/Find.html", function dkcreate_callback(html) {
		if (!html)
            return error("invalid html", dkcreate_callback);
		dk.browserfind.html = html

		html.getElementById("FindNext").onclick = function(){
			CPP_DKCef_Find(0, document.getElementById("FindInput").value)
		}
		html.getElementById("FindCancel").onclick = function(){
			dk.frame.close("DKBrowser/Find.html")
		}
		
		//DKFrame.prototype.create(dk.browserfind);
		
		DKBrowser_find_callback && DKBrowser_find_callback(dk.browsersettings);
        return dk.browsersettings;
	});
}

dk.browserfind = DKPlugin(DKBrowserFind, "singleton")