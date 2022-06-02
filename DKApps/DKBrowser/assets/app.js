const USE_CEF = 1
const width = 1280
const height = 720
const url = "chrome://gpu"
//const url = "http://duckduckgo.com"
//const url = "http://www.google.com/"
//const url = "http://127.0.0.1:2393"
//const url = CPP_DKAssets_LocalAssets()+"DKWebTest/index.html"

CPP_DK_Create("DKSDLWindow")
CPP_DK_Create("DKRml")
CPP_DK_Create("DKSDLText")
location.href = CPP_DKAssets_LocalAssets()+"index.html"

//CPP_DKRml_DebuggerOn()