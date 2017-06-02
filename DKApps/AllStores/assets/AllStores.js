var proxy = "";
var proxy2 = "";
var proxy3 = "";
if(DK_GetBrowser() != "CEF"){
	var proxy = "http://cors-anywhere.herokuapp.com/";
	var proxy2 = "https://crossorigin.me/";
	var proxy3 = "https://cors.now.sh/";
}
//var scrollpos = 0;
var item_arry = new Array();

//TODO: Set geolocation
/*
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(AllStores_SetLocation);    
}
else{ 
    DKLog("Geolocation is not supported by this browser.\n", DKINFO);
}
function AllStores_SetLocation(position)
{
	DKLog("Latitude:"+position.coords.latitude+" Longitude"+position.coords.longitude+"\n", DKINFO);
}
*/
window.onhashchange = function(){
	sessionStorage.scrollPos = 0; //reset scroll on back button
}

/////////////////////////
function AllStores_Init()
{
	//DKLog("AllStores_Init()\n", DKINFO);
	DKCreate("AllStores.html", function(){});
	DKAddEvent("AllStores_search", "click", AllStores_OnEvent);
	DKAddEvent("AllStores_options", "click", AllStores_OnEvent);
	DKAddEvent("AllStores_input", "keydown", AllStores_OnEvent);
	DKAddEvent("AllStores_logo", "click", AllStores_OnEvent);
	DKAddEvent("GLOBAL", "mousedown", AllStores_OnEvent);
	
	var search = location.search.split('s=')[1];
	AllStores_DoSearch(search, function(){
		//return scroll position in session storage
		var ele = document.getElementById("AllStores_items");
		if(!DK_IE()){
			ele.scrollTop = sessionStorage.scrollPos || 0;
		}
	});
}

///////////////////////
function AllStores_End()
{
	//DKLog("AllStores_End()\n", DKINFO);
}

/////////////////////////////////
function AllStores_OnEvent(event)
{
	//DKLog("AllStores_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKINFO);
	
	//set scroll position in session storage
	var ele = document.getElementById("AllStores_items");
	if(!DK_IE()){
		sessionStorage.scrollPos = ele.scrollTop;
	}
	
	if(DK_Id(event, "AllStores_logo")){
		if(!DK_IE()){
			sessionStorage.scrollPos = 0;
		}
		if(window.location.protocol == "http:"){
			window.location.href = "";
		}
		AllStores_DoSearch(""); //file protocol
	}
	
	if(DK_Id(event, "AllStores_search")){ //Search clicked
		if(!DK_IE()){
			sessionStorage.scrollPos = 0;
		}
		var input = DKWidget_GetValue("AllStores_input");
		if(window.location.protocol == "http:"){
			if(input){
				window.location.href = "?s="+input;
			}
			else{
				window.location.href = "";
			}
		}
		AllStores_DoSearch(input); //file protocol
	}
	
	if(DK_Id(event, "AllStores_options")){
		DKCreate("AllStores_options.js", function(){});
	}
	
	if(DK_Id(event, "AllStores_input")){ //Enter pressed
		if(!DK_IE()){
			sessionStorage.scrollPos = 0;
		}
		if(DKWidget_GetValue(event) == "13"){
			var input = DKWidget_GetValue("AllStores_input");
			if(window.location.protocol == "http:"){
				if(input){
					window.location.href = "?s="+input;
				}
				else{
					window.location.href = "";
				}
			}
		}
		AllStores_DoSearch(input); //file protocol
	}
}

////////////////////////////
function AllStores_Loading()
{
	var loading = document.createElement('img');
	loading.id = "loading";
	loading.src = "loading.gif";
	loading.style.overflow = "hidden";
	if(loading){
		document.getElementById("AllStores_items").appendChild(loading);
	}
}

/////////////////////////////////////////////
function AllStores_DoSearch(string, callback)
{
	//DKLog("AllStores_DoSearch("+string+")\n", DKINFO);
	
	item_arry = new Array();
	AllStores_Loading(); 
	
	if(string){
		AllStores_CloseFiveToArry(proxy+"https://www.close5.com/s/"+string, function(){ AllStores_ShowItems(); AllStores_Loading(); 
		AllStores_OfferUpToArry(proxy2+"https://offerup.com/search/?q="+string, function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_FiveMilesToArry("https://www.5milesapp.com/q/"+string, function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_LetGoToArry(proxy+"https://us.letgo.com/en/q/"+string, function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_CraigslistToArry(proxy+"https://orangecounty.craigslist.org/search/sss?query="+string, function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_EbayToArry(proxy+"http://www.ebay.com/sch/i.html?_from=R40&_nkw="+string+"&_in_kw=1&_ex_kw=&_sacat=0&_udlo=&_udhi=&LH_BIN=1&_ftrt=901&_ftrv=1&_sabdlo=&_sabdhi=&_samilow=&_samihi=&_fsradio2=%26LH_PrefLoc%3D99&_sadis=25&_stpos=92802&_fspt=1&_sargn=-1%26saslc%3D1&_salic=1&_sop=12&_dmd=1&_ipg=50", function(){ AllStores_ShowItems(); AllStores_Loading();
			document.getElementById("AllStores_items").removeChild(document.getElementById("loading"));
			callback && callback();
		});
		});
		});
		});
		});
		});
	}
	else{
		AllStores_CloseFiveToArry(proxy+"https://www.close5.com", function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_OfferUpToArry(proxy2+"https://offerup.com", function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_FiveMilesToArry("https://www.5milesapp.com", function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_LetGoToArry(proxy+"https://us.letgo.com/en", function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_CraigslistToArry(proxy+"https://orangecounty.craigslist.org/search/sss", function(){ AllStores_ShowItems(); AllStores_Loading();
		AllStores_CarousellToArry(proxy+"https://us.carousell.com/search/products", function(){ AllStores_ShowItems(); AllStores_Loading();
			document.getElementById("AllStores_items").removeChild(document.getElementById("loading"));
			callback && callback();
		});
		});
		});
		});
		});
		});
	}
}

/////////////////////////////////////////////
function AllStores_LetGoToArry(url, callback)
{
	AllStores_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.querySelectorAll('[itemtype="http://schema.org/Product"]');
			for(var i=0; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n", DKINFO);
				
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "letgo.png";
				
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
		}
		
		callback();
	});
}

//////////////////////////////////////////////////
function AllStores_CraigslistToArry(url, callback)
{
	AllStores_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("result-row");
			for(var i=0; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n", DKINFO);
				
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "craigslist.png";
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
					item_data[5] = "https://orangecounty.craigslist.org"+items[i].getElementsByClassName("result-image gallery")[0].href;  //url
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
		}
		
		callback();
	});
}

/////////////////////////////////////////////////
function AllStores_CloseFiveToArry(url, callback)
{
	if(DK_IE()){
		callback();
		return;
	}
	
	AllStores_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("four wide large screen four wide widescreen four wide computer four wide tablet eight wide mobile column");
			for(var i=0; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n", DKINFO);
				
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "close5.png";
				var spans = items[i].getElementsByTagName("span");
				item_data[2] = items[i].getElementsByTagName("span")[spans.length-1].innerHTML;  //title
				item_data[3] = ""; //location
				item_data[4] = items[i].getElementsByTagName("img")[0].src; //img
				item_data[4] = item_data[4].replace("file:///C:","https://www.close5.com");
				item_data[4] = item_data[4].replace("http://digitalknob.com","https://www.close5.com");
				item_data[5] = "https://www.close5.com"+items[i].getElementsByTagName("a")[0].href; //url
				item_data[5] = item_data[5].replace("file:///C:","");
				item_data[5] = item_data[5].replace("http://digitalknob.com","");
				if(items[i].getElementsByTagName("span")[spans.length-2]){
					item_data[6] = "$"+items[i].getElementsByTagName("span")[spans.length-2].innerHTML;  //price
				}
				else{
					item_data[6] = "$0"; //price
				}
				item_arry.push(item_data);
			}	
		}
		
		callback();
	});
}

////////////////////////////////////////////////
function AllStores_OfferUpToArry(url, callback)
{
	AllStores_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			//DKLog(rstring+"\n", DKINFO);
			
			var items = div.getElementsByClassName("item-pic");
			for(var i=0; i<items.length; i++){
				//DKLog(items[i].parentNode.innerHTML+"\n", DKINFO);
				
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "offerup.png";
				item_data[2] = items[i].getElementsByTagName("img")[0].alt;  //title
				item_data[3] = items[i].parentNode.getElementsByClassName("item-info-distance")[0].innerHTML; //location
				item_data[4] = items[i].getElementsByTagName("img")[0].src; //img
				item_data[5] = items[i].getElementsByTagName("a")[0].href; //url
				item_data[5] = item_data[5].replace("file:///C:","");
				item_data[5] = item_data[5].replace("http://digitalknob.com","");
				item_data[6] = items[i].parentNode.getElementsByClassName("item-info-price")[0].innerHTML; //location
				item_arry.push(item_data);
			}
		}
		
		callback();
	});
}

/////////////////////////////////////////////////
function AllStores_FiveMilesToArry(url, callback)
{
	//DKLog("AllStores_FiveMilesToArry()\n", DKINFO);
	if(DK_GetBrowser() != "CEF"){
		callback();
		return; //Only available with CEF, so return.
	}
	
	AllStores_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("waterItem waterItemInit waterItemInvisible");
			for(var i=1; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n", DKINFO);
				
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "5miles.png";
				item_data[2] = items[i].getElementsByClassName("waterItemImg")[0].alt; //Title
				var alinks = items[i].getElementsByClassName("waterItem_a_link")
				item_data[3] = items[i].getElementsByClassName("waterItem_a_link")[alinks.length-1].innerHTML; //location
				item_data[4] = items[i].getElementsByClassName("waterItemImg")[0].src; //img
				if(items[i].getElementsByClassName("waterItemImg_par")[0]){
					item_data[5] = "https://www.5milesapp.com/"+items[i].getElementsByClassName("waterItemImg_par")[0].href; //link
					item_data[5] = item_data[5].replace("file:///C:","");
					item_data[5] = item_data[5].replace("http://digitalknob.com/","");
				}
				item_data[6] = items[i].getElementsByClassName("waterItem_price_now")[0].innerHTML; //price
				item_arry.push(item_data);
			}
		}
		
		callback();
	});
}

/////////////////////////////////////////////////
function AllStores_CarousellToArry(url, callback)
{
	callback();
	return;  //Not implemented yet,  return;
		
	AllStores_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("card pdt-card");
			for(var i=1; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n", DKINFO);
				
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "carousell.png";
				item_data[2] = "";
				item_data[3] = "";
				item_data[4] = "";
				item_data[5] = "";
				item_data[6] = "$0"; //price
				
				/*
				item_data[2] = items[i].getElementsByClassName("waterItemImg")[0].alt; //img
				var alinks = items[i].getElementsByClassName("waterItem_a_link")
				item_data[3] = items[i].getElementsByClassName("waterItem_a_link")[alinks.length-1].innerHTML; //location
				item_data[4] = items[i].getElementsByClassName("waterItemImg")[0].src; //img
				if(items[i].getElementsByClassName("waterItemImg_par")[0]){
					item_data[5] = "https://www.5milesapp.com/"+items[i].getElementsByClassName("waterItemImg_par")[0].href; //img
					item_data[5] = item_data[5].replace("file:///C:","");
					item_data[5] = item_data[5].replace("http://digitalknob.com/","");
				}
				item_data[6] = items[i].getElementsByClassName("waterItem_price_now")[0].innerHTML; //img
				*/
				item_arry.push(item_data);
			}
		}
		
		callback();
	});
}

////////////////////////////////////////////
function AllStores_EbayToArry(url, callback)
{
	//DKLog("AllStores_EbayToArry()\n", DKINFO);
	
	url = url.replace(" ","+");	
	AllStores_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			//DKLog(rstring+"\n", DKINFO);
			
			var items = div.getElementsByClassName("sresult lvresult clearfix li shic");
			for(var i=1; i<items.length; i++){
				DKLog(items[i].innerHTML+"\n", DKINFO);
				
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "ebay.png";
				item_data[2] = items[i].getElementsByTagName("img")[0].alt; //TItle
				item_data[3] = items[i].getElementsByClassName("lvdetails left space-zero full-width")[0].innerHTML; //location
				if(item_data[4] = items[i].getElementsByTagName("img")[0].src == "https://ir.ebaystatic.com/pictures/aw/pics/s_1x2.gif"){
					item_data[4] = items[i].getElementsByTagName("img")[0].getAttribute("imgurl"); //img
				}
				else{
					item_data[4] = items[i].getElementsByTagName("img")[0].src; //img
				}
				item_data[5] = items[i].getElementsByTagName("a")[0].href; //url
				item_data[6] = items[i].getElementsByClassName("bold")[0].innerHTML; //price	
				item_arry.push(item_data);
			}
		}
		callback();
	});
}

///////////////////////////
function AllStores_Filter()
{
	var sortbyprice = true;
	
	//sort by price
	if(sortbyprice){
		item_arry.sort(compareSecondColumn);
		function compareSecondColumn(a, b) {
			if(Number(a[6].replace(/[^0-9\.]+/g,"")) === Number(b[6].replace(/[^0-9\.]+/g,""))){
				return 0;
			}
			else {
				return (Number(a[6].replace(/[^0-9\.]+/g,"")) < Number(b[6].replace(/[^0-9\.]+/g,""))) ? -1 : 1;
			}
		}
	}
}

//////////////////////////////
function AllStores_ShowItems()
{
	//sort by price
	AllStores_Filter();

	DKWidget_SetInnerHtml("AllStores_items", "");
	for(var i=0; i<item_arry.length; i++){	
		var itemdiv = document.createElement('div');
		itemdiv.style.display = "inline-block";
		itemdiv.style.width = "230px";
		itemdiv.style.width = "230rem";
		itemdiv.style.height = "420px";
		itemdiv.style.height = "420rem";
		itemdiv.style.textAlign = "center";
		itemdiv.style.margin = "4px";
		itemdiv.style.margin = "4rem";
		//itemdiv.style.borderStyle = "solid";
		//itemdiv.style.borderWidth = "1rem";
		//itemdiv.style.borderColor = "red";
		itemdiv.style.background = "white";
		itemdiv.style.overflow = "hidden";
		
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
		infodiv.style.height = "75px";
		infodiv.style.height = "75rem";
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
		
		document.getElementById("AllStores_items").appendChild(itemdiv);
		
	}
}

//////////////////////////////////////////////
function AllStores_GetUrlString(url, callback)
{
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
	
	//DKLog("request.open(\"GET\","+url+",true)", DKINFO);
	request.open("GET",url,true);
	
	/*
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200 || request.status==0){
				callback(request.responseText);
			}
			else{
				DKLog("AJAX ERROR: "+request.statusText, DKWARN); //report error
				DKLog("status: "+request.status, DKWARN);
				callback();
				return false;
			}
		}
	}
	*/
	
	request.onload=function(){
		callback(request.responseText);
	}
	
	
	request.send(); 
}