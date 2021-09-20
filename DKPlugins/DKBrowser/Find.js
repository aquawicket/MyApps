
function DKBrowserFind(){}

DKBrowserFind.init = function DKBrowserFind_init(){
	//DKDEBUGFUNC()
	dk.create("DKBrowser/Find.html", function(obj){
		dk.browserfind.htmlObj = obj
		obj.getElementById("FindNext").onclick = function(){
			CPP_DKCef_Find(0, document.getElementById("FindInput").value))
		}
		obj.getElementById("FindCancel").onclick = function(){
			dk.frame.close("DKBrowser/Find.html")
		}
	})
}

DKBrowserFind.end = function DKBrowserFind_End(){
	//DKDEBUGFUNC()
	CPP_DKCef_Find(0, "") //FIXME: not working
	dk.close("DKBrowser/Find.html")
}

dk.browserfind = DKPlugin(DKBrowserFind, "singleton")