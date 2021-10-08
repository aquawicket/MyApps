//////////////////////
function OsInfo_Init()
{
	
	CPP_DK_Create("Digitalknob/OsInfo.html,Digitalknob/Digitalknob.html");
	DKAddEvent("GLOBAL", "resize", OsInfo_OnEvent);
	OsInfo_Resize();
}

/////////////////////
function OsInfo_End()
{
	
	DKRemoveEvents(OsInfo_OnEvent);
	DKClose("Digitalknob/OsInfo.html");
}

//////////////////////////////
function OsInfo_OnEvent(event)
{
	DKDEBUGFUNC(event);	
	if(DK_Type(event, "resize")){
		OsInfo_Resize();
	}
}

////////////////////////
function OsInfo_Resize()
{
	
	DKWidget_SetInnerHtml("OsInfo_OS", "OS: "+DK_GetOS());
	DKWidget_SetInnerHtml("OsInfo_Browser", "Browser: "+DK_GetBrowser()+" ,"+DK_GetJSEngine());
	DKWidget_SetInnerHtml("OsInfo_width", "width: "+DKWindow_GetWidth());
	DKWidget_SetInnerHtml("OsInfo_height", "height: "+DKWindow_GetHeight());
	DKWidget_SetInnerHtml("OsInfo_pixelratio", "pixel_ratio: "+DKWindow_GetPixelRatio());
	
	//Set the scale
	if((parseInt(DKWindow_GetHeight()) > parseInt(DKWindow_GetWidth())) && (parseFloat(DKWindow_GetPixelRatio()) > 1)){
		var pixel_ratio = DKWindow_GetPixelRatio();
		if(pixel_ratio > 1.0){//= Math.min(2, pixel_ratio);
			pixel_ratio = 2.0;
			DKWidget_SetInnerHtml("OsInfo_scale", "scale: "+pixel_ratio+"px");
		}
	}
	else{
		DKWidget_SetInnerHtml("OsInfo_scale", "scale: 1px");
	}
}