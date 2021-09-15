//////////////////////////
function DKGoogleAd_Init()
{
	//DKDebug();
}

/////////////////////////
function DKGoogleAd_End()
{
	//DKDebug();
}

//////////////////////////////////
function DKGoogleAd_OnEvent(event)
{
	//DKDebug(DK_GetId(event), DK_GetType(event), DK_GetValue(event));
}

///////////////////////////////////////////////////
function DKGoogleAd_CreateAd(parent, width, height)
{
	DKINFO("DKGoogleAd_CreateAd("+parent+","+width+","+height+")\n");
	DKINFO("DK_GetBrowser() = "+DK_GetBrowser()+"\n");
	if(DK_GetBrowser() == "Rocket"){
		return DKGoogleAd_CreateAdForRocket(parent, width, height);
	}
	else{
		if(DK_GetBrowser() != "CEF"){
			return DKGoogleAd_CreateAdForBrowser(parent, width, height);
		}
	}
}

////////////////////////////////////////////////////////////
function DKGoogleAd_CreateAdForRocket(parent, width, height)
{
	DKINFO("DKGoogleAd_CreateAdForRocket\n");
	CPP_DK_Create("DKAssets/DKAssets.js", function(){
	var online_assets = DKAssets_OnlineAssets();
	var iframe = DKWidget_CreateElement(parent, "iframe", "DKAdd");
	DKWidget_SetProperty(iframe, "position", "absolute");
	
	DKWidget_SetProperty(iframe, "width", width);
	DKWidget_SetProperty(iframe, "height", height);
	DKWidget_RemoveProperty(iframe, "top");
	DKWidget_RemoveProperty(iframe, "bottom");
	DKWidget_RemoveProperty(iframe, "left");
	DKWidget_RemoveProperty(iframe, "right");
	
	DKWidget_SetProperty("iframe_"+iframe, "position", "absolute");
	DKWidget_SetProperty("iframe_"+iframe, "bottom", "0rem");
	DKWidget_RemoveProperty("iframe_"+iframe, "top");
	DKWidget_SetAttribute(iframe, "src", online_assets+"/DKGoogleAd/AddFrame.html");
	});
	return iframe;
}

/////////////////////////////////////////////////////////////
function DKGoogleAd_CreateAdForBrowser(parent, width, height)
{
	//DKDebug(parent, width, height);
	var id = DKWidget_CreateElement(parent, "div", "DKAdd");
	DKWidget_SetProperty(id, "position", "absolute");
	DKWidget_SetProperty(id, "width", width);
	DKWidget_SetProperty(id, "height", height);
	DKWidget_SetProperty(id, "text-align", "center");
	
	var px_width = document.getElementById(id).clientWidth;
	var px_height = document.getElementById(id).clientHeight;
	
	//don't let size go over 1200px
	px_width = Math.min(px_width, 1200);
	px_height = Math.min(px_height, 1200);
	window.google_ad_client = "ca-pub-4839505278360003";
	window.google_ad_slot = "8269654670";
	window.google_ad_width = px_width;
	window.google_ad_height = px_height;
	//window.google_adtest = "on";

	var container = document.getElementById(id);
	var w = document.write;
	document.write = function(content){
		container.innerHTML = content;
		document.write = w;	
	};

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://pagead2.googlesyndication.com/pagead/show_ads.js';
	document.body.appendChild(script);
	return id;
}