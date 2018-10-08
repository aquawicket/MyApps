//TODO - we need to store everything to a JSON object so we can save/load.
//When scraping, make sure NOT to append items to the JSON object that already exist.
//

buyItems = []; //items stored here, for use with json
 
var item_arry = new Array();

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
		Buy_CraigslistToArry("https://inlandempire.craigslist.org/search/sss?query="+string, function(){ 
			Buy_ShowItems(); 
		})
	}
	if(DK_Id(event, "Buy_ScrapLetGo")){
		Buy_LetGoToArry("https://us.letgo.com/en/q/"+string+"?lat=33.8124094&lng=-117.91926790000002", function(){ Buy_ShowItems(); })
	}
}

////////////////////////////////////////////
function Buy_CraigslistToArry(url, callback)
{
	//buyItems = []; //clear
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
			
			//TODO: fill JSON object
			buyItems.push({});
			//buyItems[items.length-1].id = "id"; //FIXME: undefined
			/*
			buyItems[items.length-1].provider = "craigslist";
			buyItems[items.length-1].title = items[i].getElementsByClassName("result-title hdrlnk")[0].innerHTML;  //title
			buyItems[items.length-1].loc = items[i].getElementsByClassName("result-hood")[0].innerHTML;
			*/
			
			var item_data = new Array();
			item_data[0] = "id";
			item_data[1] = "TradePost/craigslist.png";
			item_data[2] = items[i].getElementsByClassName("result-title hdrlnk")[0].innerHTML;  //title
			if(items[i].getElementsByClassName("result-hood")[0]){
				item_data[3] = items[i].getElementsByClassName("result-hood")[0].innerHTML;  //location
			}
			var img = items[i].getElementsByClassName("result-image gallery")[0].getAttribute("data-ids");
			if(img){
				img = img.replace("0:", "");
				img = img.replace("1:", "");
				var arry = img.split(",");
				item_data[4] = "https://images.craigslist.org/"+arry[0]+"_300x300.jpg";
			}
			else{
				item_data[4] = "https://www.craigslist.org/images/peace.jpg";
			}	
			if(items[i].getElementsByClassName("result-image gallery")[0].href.indexOf("https://") == -1){
				item_data[5] = "https://inlandempire.craigslist.org"+items[i].getElementsByClassName("result-image gallery")[0].href;  //url
			}
			else{
				item_data[5] = items[i].getElementsByClassName("result-image gallery")[0].href;  //url
			}
			item_data[5] = item_data[5].replace("file:///C:","");
			item_data[5] = item_data[5].replace("http://digitalknob.com","");
			if(items[i].getElementsByClassName("result-price")[0]){
				item_data[6] = items[i].getElementsByClassName("result-price")[0].innerHTML; //price
			}
			else{
				item_data[6] = "$0"; //price
			}
			item_arry.push(item_data);
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
				
		var items = div.querySelectorAll('[itemtype="http://schema.org/Product"]');
		for(var i=0; i<items.length; i++){
			//DKLog(items[i].innerHTML+"\n");
				
			var item_data = new Array();
			item_data[0] = "id";
			item_data[1] = "TradePost/letgo.png";
				
			if(items[i].getElementsByClassName("img portrait")[0]){
				item_data[2] = items[i].getElementsByClassName("img portrait")[0].title;  //title
				item_data[3] = items[i].getElementsByClassName("city")[0].innerHTML;  //location
				item_data[4] = items[i].getElementsByClassName("img portrait")[0].firstChild.src; //image
				item_data[5] = items[i].getElementsByClassName("img portrait")[0];  //url
				//item_data[5] = item_data[5].replace("file:///C:","");
				//item_data[5] = item_data[5].replace("http://digitalknob.com","");
				item_data[6] = "$0"; //price
			}
			if(items[i].getElementsByClassName("img landscape")[0]){
				item_data[2] = items[i].getElementsByClassName("img landscape")[0].title;  //title
				item_data[3] = items[i].getElementsByClassName("city")[0].innerHTML;  //location
				item_data[4] = items[i].getElementsByClassName("img landscape")[0].firstChild.src; //image
				item_data[5] = items[i].getElementsByClassName("img landscape")[0];  //url
				//item_data[5] = item_data[5].replace("file:///C:","");
				//item_data[5] = item_data[5].replace("http://digitalknob.com","");
				item_data[6] = "$0"; //price
			}
			item_arry.push(item_data);
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
	//Wowzer_Filter();

	DKWidget_SetInnerHtml("Buy_Container", "");
	for(var i=0; i<item_arry.length; i++){	
		var itemdiv = document.createElement('div');
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
		//var url = item_arry[i][5];
		//itemdiv.onclick = function(){ window.open(url, "_blank", "width=800,height=600"); }
		
		var imgdiv = document.createElement('div');
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
		itemurl.href = item_arry[i][5];
		itemurl.style.display = "block";
		itemurl.style.width = "230px";
		itemurl.style.width = "230rem";
		itemurl.style.height = "300px";
		itemurl.style.height = "300rem";
		itemurl.target = "_blank";
		imgdiv.appendChild(itemurl);
		
		var itemimg = document.createElement('img');
		itemimg.src = item_arry[i][4];
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
		host.src = item_arry[i][1];
		host.style.position = "absolute";
		host.style.top = "0px";
		host.style.top = "0rem";
		host.style.right = "0px";
		host.style.right = "0rem";
		host.style.width = "100px";
		host.style.width = "100rem";
		itemurl.appendChild(host);
		
		var infodiv = document.createElement('div');
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
		
		var itemtitle = document.createElement('a');
		itemtitle.innerHTML = item_arry[i][2];
		itemtitle.style.display = "block";
		itemtitle.style.fontWeight = "bold";
		itemtitle.style.fontSize = "20px";
		itemtitle.style.fontSize = "20rem";
		itemtitle.style.overflow = "hidden";
		infodiv.appendChild(itemtitle);
		
		var itemprice = document.createElement('span');
		if(item_arry[i][6]){
			itemprice.innerHTML = item_arry[i][6];
		}
		itemprice.style.display = "block";
		itemprice.style.fontSize = "18px";
		itemprice.style.fontSize = "18rem";
		itemdiv.appendChild(itemprice);
		
		var itemloc = document.createElement('span');
		if(item_arry[i][3]){
			itemloc.innerHTML = item_arry[i][3];
		}
		itemloc.style.display = "block";
		itemloc.style.fontSize = "15px";
		itemloc.style.fontSize = "15rem";
		itemdiv.appendChild(itemloc);
		
		document.getElementById("Buy_Container").appendChild(itemdiv);
	}
}