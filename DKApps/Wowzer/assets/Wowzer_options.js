/////////////////////////////////
function Wowzer_options_Init()
{
	DKCreate("Wowzer_options.html", function(){});
	DKAddEvent("Wowzer_options_price", "click", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_close5", "click", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_offerup", "click", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_letgo", "click", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_craigslist", "click", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_fivemiles", "click", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_ebay", "click", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_low", "keyup", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_high", "keyup", Wowzer_options_OnEvent);
	DKAddEvent("Wowzer_options_bug", "click", Wowzer_options_OnEvent);
	
	DKWidget_SetValue("Wowzer_options_price", sortbyprice);
	DKWidget_SetValue("Wowzer_options_close5", close5);
	DKWidget_SetValue("Wowzer_options_offerup", offerup);
	DKWidget_SetValue("Wowzer_options_letgo", letgo);
	DKWidget_SetValue("Wowzer_options_craigslist", craigslist);
	DKWidget_SetValue("Wowzer_options_fivemiles", fivemiles);
	DKWidget_SetValue("Wowzer_options_ebay", ebay);
	DKWidget_SetValue("Wowzer_options_low", low);
	DKWidget_SetValue("Wowzer_options_high", high);
}

////////////////////////////////
function Wowzer_options_End()
{
	DKClose("Wowzer_options.html");
}

/////////////////////////////////////////
function Wowzer_options_OnEvent(event)
{
	//DKLog("Wowzer_options_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKINFO);
	
	if(DK_Id(event, "Wowzer_options_price")){
		sortbyprice = DKWidget_GetValue("Wowzer_options_price");
	}
	if(DK_Id(event, "Wowzer_options_close5")){
		close5 = DKWidget_GetValue("Wowzer_options_close5");
	}
	if(DK_Id(event, "Wowzer_options_offerup")){
		offerup = DKWidget_GetValue("Wowzer_options_offerup");
	}
	if(DK_Id(event, "Wowzer_options_letgo")){
		letgo = DKWidget_GetValue("Wowzer_options_letgo");
	}
	if(DK_Id(event, "Wowzer_options_craigslist")){
		craigslist = DKWidget_GetValue("Wowzer_options_craigslist");
	}
	if(DK_Id(event, "Wowzer_options_fivemiles")){
		fivemiles = DKWidget_GetValue("Wowzer_options_fivemiles");
	}
	if(DK_Id(event, "Wowzer_options_ebay")){
		ebay = DKWidget_GetValue("Wowzer_options_ebay");
	}
	if(DK_Id(event, "Wowzer_options_low")){
		low = DKWidget_GetValue("Wowzer_options_low");
		window.location.hash = setUrlParameter(window.location.hash, "l", low);
		if(DKWidget_GetValue(event) == 13){
			DKClose("Wowzer_options.js");
		}
	}
	if(DK_Id(event, "Wowzer_options_high")){
		high = DKWidget_GetValue("Wowzer_options_high");
		window.location.hash = setUrlParameter(window.location.hash, "h", high);
		if(DKWidget_GetValue(event) == 13){
			DKClose("Wowzer_options.js");
		}
	}
	
	if(DK_Id(event, "Wowzer_options_bug")){
		alert("coming soon...");
		return;
	}
	
	Wowzer_ShowItems();
}