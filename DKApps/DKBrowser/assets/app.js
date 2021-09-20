//const url = "http://www.google.com/"
//const url = "chrome://gpu"
//const url = "http://127.0.0.1:2393"
const url = CPP_DKAssets_LocalAssets()+"index.html"

const USE_CEF = 1
const width = 800
const height = 600


////// RmlUi
CPP_DK_Create("DKWindow")
CPP_DK_Create("DKRml")
//CPP_DK_Create("DKCef")
//CPP_DK_Create("DKSDLText")

location.href = url
//location.href = CPP_DKAssets_LocalAssets()+"index.html"
//location.href = CPP_DKAssets_LocalAssets()+"DKWebTest/index.html"


/*
///// CEF 
CPP_DK_Create("DKCef,Cef,0,0,"+width+","+height+","+url)
CPP_DKCef_NewBrowser("Cef",0,0,width,height,url)
//CPP_DKCef_ShowDevTools(0)
window.addEventListener("keydown", function mykeydown(event){
	if(event.key === "F12")
		CPP_DKCef_ShowDevTools(0)	
})
*/