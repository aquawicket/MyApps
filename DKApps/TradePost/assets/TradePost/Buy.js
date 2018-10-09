//TODO - we need to store everything to a JSON object so we can save/load.
//When scraping, make sure NOT to append items to the JSON object that already exist.
//

buyItems = []; //items stored here, for use with json
 
///////////////////
function Buy_Init()
{
	DKLog("Buy_Init()\n", DKDEBUG);
	DKCreate("TradePost/Buy.html");
	
	DKAddEvent("Buy_ScrapCraigslist", "click", Buy_OnEvent);
	DKAddEvent("Buy_ScrapLetGo", "click", Buy_OnEvent);
	DKAddEvent("Buy_ScrapOfferUp", "click", Buy_OnEvent);
	DKAddEvent("Buy_ScrapFacebook", "click", Buy_OnEvent);
	DKAddEvent("Buy_ScrapEbay", "click", Buy_OnEvent);
	
	Buy_LoadData();
	Buy_ShowItems();
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
	
	var string = "";

	if(DK_Id(event, "Buy_ScrapCraigslist")){
		Buy_CraigslistToArry("https://inlandempire.craigslist.org/search/sss?", function(){
		Buy_CraigslistToArry("https://inlandempire.craigslist.org/search/sss?s=120", function(){
		Buy_CraigslistToArry("https://inlandempire.craigslist.org/search/sss?s=240", function(){
		Buy_CraigslistToArry("https://inlandempire.craigslist.org/search/sss?s=360", function(){
		Buy_CraigslistToArry("https://inlandempire.craigslist.org/search/sss?s=480", function(){
			Buy_ShowItems(); 
		})
		})
		})
		})
		})
	}
	if(DK_Id(event, "Buy_ScrapLetGo")){
		Buy_LetGoToArry("https://us.letgo.com/en/q/"+string+"?lat=33.8124094&lng=-117.91926790000002", function(){ Buy_ShowItems(); })
	}
	if(DK_IdLike(event, "hide")){
		event.preventDefault();
		var num = DK_GetId(event).replace("hide","");
		DKLog("Hide item "+num+"\n");
		buyItems[num].hidden = true;
		Buy_ShowItems();
	}
	if(DK_IdLike(event, "searchEbay")){
		event.preventDefault();
		var num = DK_GetId(event).replace("searchEbay","");
		DKLog("searchEbay item "+num+"\n");
		//Open a new ebay tab searching for the title
		var link = "https://www.ebay.com/sch/i.html?_from=R40&_nkw="+buyItems[num].title; //Search
		link += "&LH_BIN=1"; //Buy It Now
		link += "&_sop=15"; //Sort by price lowest first
		link += "&LH_Sold=1"; //Show only sold items
		window.open(link, "_blank", "width=800,height=600");
	}
}

///////////////////////////////////////
function Buy_CheckForDuplicate(itemUrl)
{
	for(var i=0; i<buyItems.length; i++){
		if(itemUrl == buyItems[i].link){
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

////////////////////////////////////////////
function Buy_CraigslistToArry(url, callback)
{
	DKLog("Buy_CraigslistToArry("+url+", callback)\n", DKDEBUG);
	Buy_GetUrlString(url, function(rstring){
		if(!rstring){ 
			DKLog("Buy_CraigslistToArry(): rstring invalid\n", DKWARN); 
			return;
		}
				
		var div = document.createElement('div');
		div.innerHTML = rstring;
			
		var items = div.getElementsByClassName("result-row");
		for(var i=0; i<items.length; i++){
			//DKLog(items[i].innerHTML+"\n");
			
			//check for duplicate
			if(items[i].getElementsByClassName("result-image gallery")[0].href.indexOf("https://") == -1){
				if(Buy_CheckForDuplicate("https://inlandempire.craigslist.org"+items[i].getElementsByClassName("result-image gallery")[0].href)){
					continue;
				}
			}
			else{
				if(Buy_CheckForDuplicate(items[i].getElementsByClassName("result-image gallery")[0].href)){
					continue;
				}
			}
			
			buyItems.push({}); //new object
			buyItems[buyItems.length-1].id = Buy_GetFirstAvailableId(); //id
			buyItems[buyItems.length-1].date = new Date().toJSON();
			buyItems[buyItems.length-1].providerImg = "TradePost/craigslist.png"; //host banner
			buyItems[buyItems.length-1].title = items[i].getElementsByClassName("result-title hdrlnk")[0].innerHTML;  //title
			if(items[i].getElementsByClassName("result-hood")[0]){
				buyItems[buyItems.length-1].loc = items[i].getElementsByClassName("result-hood")[0].innerHTML; //location
			}
			var img = items[i].getElementsByClassName("result-image gallery")[0].getAttribute("data-ids");
			if(img){
				img = img.replace("0:", "");
				img = img.replace("1:", "");
				var arry = img.split(",");
				buyItems[buyItems.length-1].img = "https://images.craigslist.org/"+arry[0]+"_300x300.jpg"; //image
			}
			else{
				buyItems[buyItems.length-1].img = "https://www.craigslist.org/images/peace.jpg"; //no image
			}	
			if(items[i].getElementsByClassName("result-image gallery")[0].href.indexOf("https://") == -1){
				buyItems[buyItems.length-1].link = "https://inlandempire.craigslist.org"+items[i].getElementsByClassName("result-image gallery")[0].href; //url
			}
			else{
				buyItems[buyItems.length-1].link = items[i].getElementsByClassName("result-image gallery")[0].href;  //url
			}
			buyItems[buyItems.length-1].link = buyItems[buyItems.length-1].link.replace("file:///C:",""); //url fix
			buyItems[buyItems.length-1].link = buyItems[buyItems.length-1].link.replace("http://digitalknob.com",""); //url fix
			if(items[i].getElementsByClassName("result-price")[0]){
				buyItems[buyItems.length-1].price = items[i].getElementsByClassName("result-price")[0].innerHTML; //price
			}
			else{
				buyItems[buyItems.length-1].price = "$0"; //price
			}
		}	
		callback();
	});
}

///////////////////////////////////////
function Buy_LetGoToArry(url, callback)
{
	Buy_GetUrlString(url, function(rstring){
		if(!rstring){ 
			DKLog("Buy_LetGoToArry(): rstring invalid\n", DKWARN); 
			return;
		}
		
		var div = document.createElement('div');
		div.innerHTML = rstring;
				
		var items = div.querySelectorAll('div[class*="feed-item"]');
		for(var i=0; i<items.length; i++){
			//DKLog("##########################"+items[i].innerHTML+"\n");
			buyItems.push({}); //new object
			buyItems[buyItems.length-1].id = Buy_GetFirstAvailableId(); //id	
			buyItems[buyItems.length-1].date = new Date().toJSON();
			buyItems[buyItems.length-1].providerImg = "TradePost/letgo.png"; //host banner
			
			var base = items[i].firstChild.firstChild.firstChild.firstChild;
			if(!base){ continue; }
			var item = base.firstChild;
			if(!item){ continue; }
			var link = item.firstChild.href;
			if(!link){ continue; }
			var title = item.firstChild.title;
			DKLog("##########################\n");
			DKLog(item.innerHTML+"\n");
			link = link.replace("file:///C:", "https://us.letgo.com");
			//DKLog("url = "+link+"\n");
			DKLog("title = "+title+"\n");
			/*
			if(items[i].getElementsByClassName("img portrait")[0]){
				buyItems[buyItems.length-1].title = items[i].getElementsByClassName("img portrait")[0].title;  //title
				buyItems[buyItems.length-1].loc = items[i].getElementsByClassName("city")[0].innerHTML;  //location
				buyItems[buyItems.length-1].img = items[i].getElementsByClassName("img portrait")[0].firstChild.src; //image
				buyItems[buyItems.length-1].link = item_data[5] = items[i].getElementsByClassName("img portrait")[0];  //url
				//buyItems[buyItems.length-1].link = buyItems[buyItems.length-1].link.replace("file:///C:",""); //url fix
				//buyItems[buyItems.length-1].link = buyItems[buyItems.length-1].link.replace("http://digitalknob.com",""); //url fix
				buyItems[buyItems.length-1].price = "$0"; //price
			}
			if(items[i].getElementsByClassName("img landscape")[0]){
				buyItems[buyItems.length-1].title = items[i].getElementsByClassName("img landscape")[0].title;  //title
				buyItems[buyItems.length-1].loc = items[i].getElementsByClassName("city")[0].innerHTML;  //location
				buyItems[buyItems.length-1].img = items[i].getElementsByClassName("img landscape")[0].firstChild.src; //image
				buyItems[buyItems.length-1].link = items[i].getElementsByClassName("img landscape")[0];  //url
				//buyItems[buyItems.length-1].link = buyItems[buyItems.length-1].link.replace("file:///C:",""); //url fix
				//buyItems[buyItems.length-1].link = buyItems[buyItems.length-1].link.replace("http://digitalknob.com",""); //url fix
				buyItems[buyItems.length-1].price = "$0"; //price
			}
			*/
		}				
		callback();
	});
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

////////////////////////
function Buy_ShowItems()
{
	DKLog("Buy_ShowItems()\n", DKDEBUG);
	//sort by price
	//Buy_Filter();
	DKWidget_SetInnerHtml("Buy_ItemCount", "Items: "+buyItems.length);
	
	var shown = 0;
	DKWidget_SetInnerHtml("Buy_Container", "");
	for(var i=0; i<buyItems.length; i++){
		if(buyItems[i].hidden == true){
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
		
		var itemurl = document.createElement('a');
		itemurl.id = "itemurl"+i;
		itemurl.href = buyItems[i].link;
		itemurl.style.display = "block";
		itemurl.style.width = "230px";
		itemurl.style.width = "230rem";
		itemurl.style.height = "300px";
		itemurl.style.height = "300rem";
		itemurl.target = "_blank";
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
		
		var itemprice = document.createElement('span');
		itemprice.id = "itemprice"+i;
		if(buyItems[i].price){
			itemprice.innerHTML = buyItems[i].price;
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
		
		DKAddEvent(hide.id, "click", Buy_OnEvent);
		DKAddEvent(searchEbay.id, "click", Buy_OnEvent);
	}
	
	DKWidget_SetInnerHtml("Buy_ItemsShown", "Shown: "+shown);
	Buy_SaveData();
}

///////////////////////
function Buy_LoadData()
{
	if(!DKFile_Exists(DKAssets_LocalAssets()+"buyItems.json")){
		DKLog("Buy_LoadData(): buyItems.json does not exist\n");
		return;
	}
	var json = DKFile_FileToString(DKAssets_LocalAssets()+"buyItems.json");
	if(json){
		buyItems = JSON.parse(json);
	}
}

///////////////////////
function Buy_SaveData()
{
	var json = JSON.stringify(buyItems);
	DKFile_StringToFile(json, DKAssets_LocalAssets()+"buyItems.json");
}