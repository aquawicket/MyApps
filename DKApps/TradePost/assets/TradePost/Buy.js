var buyItems = []; //items stored here, for use with json
var buySettings = {}; //new object
var queueSize = 0;
var itemsPerPage = 500;
var startItem = 0;
var nextPage = 0;
var prevPage = 0;

 
///////////////////
function Buy_Init()
{
	DKLog("Buy_Init()\n", DKDEBUG);
	DKCreate("TradePost/Buy.html");
	DKCreate("TradePost/Helper.js", function(){
	DKCreate("TradePost/Craigslist.js", function(){
	DKCreate("TradePost/Letgo.js", function(){
	DKCreate("TradePost/Offerup.js", function(){
		DKAddEvent("Buy_ScrapCraigslist", "click", Buy_OnEvent);
		DKAddEvent("Buy_ScrapLetGo", "click", Buy_OnEvent);
		DKAddEvent("Buy_ScrapOfferUp", "click", Buy_OnEvent);
		DKAddEvent("Buy_ScrapFacebook", "click", Buy_OnEvent);
		DKAddEvent("Buy_ScrapEbay", "click", Buy_OnEvent);
		DKAddEvent("Buy_Settings", "click", Buy_OnEvent);
		DKAddEvent("Buy_Clear", "click", Buy_OnEvent);
		DKAddEvent("Buy_Prev", "click", Buy_OnEvent);
		DKAddEvent("Buy_Next", "click", Buy_OnEvent);
		Buy_LoadSettings();
		Buy_LoadData();
		Buy_Update();
	});
	});
	});
	});
}

//////////////////
function Buy_End()
{
	DKLog("Buy_End()\n", DKDEBUG);
	DKRemoveEvents(Buy_OnEvent);
	DKClose("TradePost/Buy.html");
}

///////////////////////////
function Buy_OnEvent(event)
{
	DKLog("Buy_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
	
	if(DK_Id(event, "Buy_Prev")){
		startItem = prevPage;
		Buy_Update();
	}
	if(DK_Id(event, "Buy_Next")){
		startItem = nextPage;
		Buy_Update();
	}
	if(DK_Id(event, "Buy_ScrapCraigslist")){
		document.getElementById("Buy_Container").scrollTo(0,0);
		Craigslist_Scrape();
	}
	if(DK_Id(event, "Buy_ScrapLetGo")){
		document.getElementById("Buy_Container").scrollTo(0,0);
		Letgo_Scrape();
	}
	if(DK_Id(event, "Buy_ScrapOfferUp")){
		document.getElementById("Buy_Container").scrollTo(0,0);
		Offerup_Scrape();
	}
	if(DK_Id(event, "Buy_ScrapFacebook")){
		document.getElementById("Buy_Container").scrollTo(0,0);
		Facebook_Scrape();
	}
	if(DK_Id(event, "Buy_Settings")){
		DKCreate("TradePost/BuySettings.js", function(){
			DKCreate("DKGui/DKFrame.js", function(){
				DKFrame_Widget("TradePost/BuySettings.html");
				return;
			});
		});
	}
	if(DK_Id(event, "Buy_Clear")){
		buyItems = []; //clear json
		Buy_Update();
		Buy_SaveData();
		return;
	}
	if(DK_IdLike(event, "itemurl")){
		var num = DK_GetId(event).replace("itemurl","");
		window.open(buyItems[num].link, "_blank", "top=0,left=0,width=900,height=700");
		return;
	}
	if(DK_IdLike(event, "hide")){
		DK_StopPropagation(event);
		var num = DK_GetId(event).replace("hide","");
		buyItems[num].hidden = true;
		Buy_Update();
		return;
	}
	if(DK_IdLike(event, "searchEbay")){
		DK_StopPropagation(event);
		var num = DK_GetId(event).replace("searchEbay","");
		//Open a new ebay popup searching for the title
		var title = buyItems[num].title.replace(" ","+");
		var link = "https://www.ebay.com/sch/i.html?_from=R40&_nkw="+title; //Search
		link += "&_sop=15"; //Sort by price lowest first
		link += "&LH_BIN=1"; //Buy It Now
		link += "&LH_Sold=1"; //Show only sold items
		
		window.open(link, "_blank", "top=0,left=0,width=900,height=700");
		return;
	}
	return;
}

///////////////////////////////////////
function Buy_CheckForDuplicate(itemUrl)
{
	for(var i=0; i<buyItems.length; i++){
		if(itemUrl == buyItems[i].link){
			//DKLog("Buy_CheckForDuplicate(): found duplicate\n");
			return true;
		}
	}
	return false;
}

//////////////////////////////////
function Buy_GetFirstAvailableId()
{
	DKLog("Inventory_GetFirstAvailableId()\n", DKDEBUG);
	if(!buyItems){ return false; }
	var id = 0;
	for(var i = 0; i<buyItems.length; i++){
		if(buyItems[i].id == id){
			id++; i=0;
		}
	}
	return id;
}

////////////////////////////////////////
function Buy_GetUrlString(url, callback)
{
	DKLog("Buy_GetUrlString("+url+", callback)\n", DKDEBUG);
	try {
        request = new XDomainRequest();
    }catch(e){}
	try {
        request = new XMLHttpRequest();
    }catch(e){}
    try {
        request = new ActiveXObject("Msxml3.XMLHTTP");
    }catch(e){}
    try {
        request = new ActiveXObject("Msxml2.XMLHTTP.6.0");
    }catch(e){}
    try {
        request = new ActiveXObject("Msxml2.XMLHTTP.3.0");
    }catch(e){}
    try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
    }catch(e){}
    try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }catch(e){}

	if(!request){
		DKLog("AJAX ERROR: Error creating request object", DKERROR);
		return false;
	}
	
	request.open("GET",url,true);
	request.send(); 

	request.onload=function(){
		DKLog("SUCCESS: "+url+"\n", DKINFO);
		callback(request.responseText);
	}
	request.ontimeout=function(){
		DKLog("TIMEOUT: "+url+"\n", DKWARN);
		callback();
	}
	request.onerror=function(){
		DKLog("ERROR: "+url+"\n", DKWARN);
		callback();
	}
}

/////////////////////
function Buy_Update()
{
	DKLog("Buy_Update()\n", DKDEBUG);
	if(buySettings.sortBy == "Date"){
		Buy_SortItems('date', false); //newest to oldest
	}
	if(buySettings.sortBy == "Price: Low to High"){
		Buy_SortItems('price', true);
	}
	if(buySettings.sortBy == "Price: High to Low"){
		Buy_SortItems('price', false);
	}
	if(buySettings.sortBy == "Title"){
		Buy_SortItems('title', true);
	}
	
	DKWidget_SetInnerHtml("Buy_ItemCount", "Records: "+buyItems.length);

	var shown = 0;
	DKWidget_SetInnerHtml("Buy_Container", "");
	DKLog("startItem = "+startItem+"\n");
	DKLog("buyItems.length = "+buyItems.length+"\n");
	DKLog("itemsPerPage= "+itemsPerPage+"\n");
	for(var i=startItem; (i<buyItems.length && shown<itemsPerPage); i++){
		
		//TODO - fix the pages so next and prev work correctly with filters and skiped items
		nextPage = startItem+itemsPerPage;
		if(nextPage > buyItems.length - itemsPerPage){
			nextPage = buyItems.length - itemsPerPage;
		}
		if(nextPage < 0){ nextPage = 0; }
		prevPage = startItem-itemsPerPage;
		if(prevPage < 0){ prevPage = 0; }
		
		
		if(buySettings.hideNoImage && !buyItems[i].img){
			continue;
		}
		if(buyItems[i].hidden){
			continue;
		}
		if(buySettings.lowPrice && buyItems[i].price){
			if(buyItems[i].price < buySettings.lowPrice){ continue; }
		}
		if(buySettings.highPrice && buyItems[i].price){
			if(buyItems[i].price > buySettings.highPrice){ continue; }
		}
		if(Craigslist_IsFiltered(buyItems[i].catagory)){
			continue;
		}

		shown++;
		var itemdiv = document.createElement('div');
		itemdiv.id = "itemdiv"+i;
		itemdiv.style.display = "inline-block";
		itemdiv.style.width = "230px";
		itemdiv.style.width = "230rem";
		itemdiv.style.height = "390px";
		itemdiv.style.height = "390rem";
		itemdiv.style.textAlign = "center";
		itemdiv.style.margin = "4px";
		itemdiv.style.margin = "4rem";
		//itemdiv.style.borderStyle = "solid";
		//itemdiv.style.borderWidth = "1rem";
		//itemdiv.style.borderColor = "red";
		itemdiv.style.background = "white";
		itemdiv.style.overflow = "hidden";
		
		var imgdiv = document.createElement('div');
		imgdiv.id = "imgdiv"+i;
		imgdiv.style.position = "relative";
		imgdiv.style.display = "block";
		imgdiv.style.width = "230px";
		imgdiv.style.width = "230rem";
		imgdiv.style.height = "300px";
		imgdiv.style.height = "300rem";
		//imgdiv.style.borderStyle = "solid";
		//imgdiv.style.borderWidth = "1rem";
		//imgdiv.style.borderColor = "blue";
		itemdiv.appendChild(imgdiv);
		
		var itemurl = document.createElement('div');
		itemurl.id = "itemurl"+i;
		//itemurl.href = buyItems[i].link;
		itemurl.style.display = "block";
		itemurl.style.width = "230px";
		itemurl.style.width = "230rem";
		itemurl.style.height = "300px";
		itemurl.style.height = "300rem";
		//itemurl.target = "_blank";
		imgdiv.appendChild(itemurl);
		
		var itemimg = document.createElement('img');
		itemimg.id = "itemimg"+i;
		itemimg.src = buyItems[i].img;
		itemimg.style.display = "block";
		itemimg.style.maxWidth = "230px";
		itemimg.style.maxWidth = "230rem";
		itemimg.style.maxHeight = "300px";
		itemimg.style.maxHeight = "300rem";
		itemimg.style.margin = "auto";
		if(itemimg.width < itemimg.height){
			itemimg.style.height = "100%";
		}
		else{
			itemimg.style.width = "100%";
		}

		itemurl.appendChild(itemimg);
				
		var host = document.createElement('img');
		host.id = "host"+i;
		host.src = buyItems[i].providerImg;
		host.style.position = "absolute";
		host.style.top = "0px";
		host.style.top = "0rem";
		host.style.right = "0px";
		host.style.right = "0rem";
		host.style.width = "100px";
		host.style.width = "100rem";
		itemurl.appendChild(host);
		
		var hide = document.createElement('img');
		hide.id = "hide"+i;
		hide.src = "TradePost/hide.png";
		hide.style.position = "absolute";
		hide.style.top = "265px";
		hide.style.top = "265rem";
		hide.style.left = "0px";
		hide.style.left = "0rem";
		hide.style.width = "40px";
		hide.style.width = "40rem";
		itemurl.appendChild(hide);
		
		var searchEbay = document.createElement('img');
		searchEbay.id = "searchEbay"+i;
		searchEbay.src = "TradePost/searchEbay.png";
		searchEbay.style.position = "absolute";
		searchEbay.style.top = "260px";
		searchEbay.style.top = "260rem";
		searchEbay.style.right = "0px";
		searchEbay.style.right = "0rem";
		searchEbay.style.width = "40px";
		searchEbay.style.width = "40rem";
		itemurl.appendChild(searchEbay);
		
		var infodiv = document.createElement('div');
		infodiv.id = "infodiv"+i;
		infodiv.style.display = "block";
		infodiv.style.width = "230px";
		infodiv.style.width = "230rem";
		infodiv.style.height = "49px";
		infodiv.style.height = "49rem";
		//infodiv.style.borderStyle = "solid";
		//infodiv.style.borderWidth = "1rem";
		//infodiv.style.borderColor = "green";
		infodiv.style.margin = "auto";
		infodiv.style.overflow = "hidden";
		itemdiv.appendChild(infodiv);
		
		var itemtitle = document.createElement('div');
		itemtitle.id = "itemtitle"+i;
		itemtitle.innerHTML = buyItems[i].title;
		itemtitle.style.display = "block";
		itemtitle.style.fontWeight = "bold";
		itemtitle.style.fontSize = "20px";
		itemtitle.style.fontSize = "20rem";
		itemtitle.style.overflow = "hidden";
		//itemtitle.style.userSelect = "text";
		infodiv.appendChild(itemtitle);
		
		if(buyItems[i].providerImg == "TradePost/letgo.png"){
			if(!buyItems[i].price){
				//Letgo_TriggerGetPrice(buyItems[i].id);
			}
		}
		
		var itemprice = document.createElement('span');
		itemprice.id = "itemprice"+i;
		if(buyItems[i].price){
			itemprice.innerHTML = "$"+buyItems[i].price;
		}
		itemprice.style.display = "block";
		itemprice.style.fontSize = "18px";
		itemprice.style.fontSize = "18rem";
		itemdiv.appendChild(itemprice);
		
		var itemloc = document.createElement('span');
		itemloc.id = "itemloc"+i;
		if(buyItems[i].loc){
			itemloc.innerHTML = buyItems[i].loc;
		}
		itemloc.style.display = "block";
		itemloc.style.fontSize = "15px";
		itemloc.style.fontSize = "15rem";
		itemdiv.appendChild(itemloc);
		
		document.getElementById("Buy_Container").appendChild(itemdiv);
		
		DKAddEvent(itemurl.id, "click", Buy_OnEvent);
		DKAddEvent(hide.id, "click", Buy_OnEvent);
		DKAddEvent(searchEbay.id, "click", Buy_OnEvent);
	}
	
	DKLog("prevPage = "+Number(prevPage)+"\n");
	DKLog("nextPage = "+Number(nextPage)+"\n");
	
	DKWidget_SetInnerHtml("Buy_ItemsShown", "Shown: "+shown);
	Buy_SaveData();
}

///////////////////////
function Buy_LoadData()
{
	if(!DKFile_Exists(DKAssets_LocalAssets()+"USER/buyItems.json")){
		DKLog("Buy_LoadData(): buyItems.json does not exist\n");
		return;
	}
	var json = DKFile_FileToString(DKAssets_LocalAssets()+"USER/buyItems.json");
	if(json){
		buyItems = JSON.parse(json);
	}
}

///////////////////////
function Buy_SaveData()
{
	var json = JSON.stringify(buyItems);//, null, "\t");
	DKFile_StringToFile(json, DKAssets_LocalAssets()+"USER/buyItems.json");
}

///////////////////////////
function Buy_LoadSettings()
{
	DKLog("Buy_LoadSettings()\n");//
	if(!DKFile_Exists(DKAssets_LocalAssets()+"USER/buySettings.json")){
		DKLog("Buy_LoadData(): buySettings.json does not exist\n", DKERROR);
		if(!buySettings.sortBy){ buySettings.sortBy = "Date"; }
		return;
	}
	var json = DKFile_FileToString(DKAssets_LocalAssets()+"USER/buySettings.json");
	if(json){
		buySettings = JSON.parse(json);
	}
	if(!buySettings.sortBy){ buySettings.sortBy = "Date"; }
}

///////////////////////////
function Buy_SaveSettings()
{
	DKLog("Buy_SaveSettings()\n", DKDEBUG);
	var json = JSON.stringify(buySettings);//, null, "\t");
	DKFile_StringToFile(json, DKAssets_LocalAssets()+"USER/buySettings.json");
}

//////////////////////////////////////////
function Buy_SortItems(property, acending)
{
	buyItems = buyItems.sort(function(a, b){
        if(acending){
            return (a[property] > b[property]) ? 1 : ((a[property] < b[property]) ? -1 : 0);
        } 
		else{
            return (b[property] > a[property]) ? 1 : ((b[property] < a[property]) ? -1 : 0);
        }
    });
}