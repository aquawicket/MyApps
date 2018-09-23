var proxy = "";
var proxy2 = "";
var proxy3 = "";
var proxy4 = ""
if(DK_GetBrowser() != "CEF"){
	proxy = "http://cors-anywhere.herokuapp.com/";
	proxy2 = "https://crossorigin.me/";
	proxy3 = "https://cors.now.sh/";
	proxy4 = "http://alloworigin.com/get?url=";
}
//var scrollpos = 0;
var item_arry = new Array();
var item_arry2 = new Array();
var search = "";
var sortbyprice = false;
var close5 = false;
var offerup = false;
var letgo = false;
var craigslist = true;
var ebay = false;
var fivemiles = false;
var carousell = false;
var low = "";
var high = "";

//TODO: Set geolocation
/*
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(Wowzer_SetLocation);    
}
else{ 
    DKLog("Geolocation is not supported by this browser.\n");
}
function Wowzer_SetLocation(position)
{
	DKLog("Latitude:"+position.coords.latitude+" Longitude"+position.coords.longitude+"\n");
}
*/
window.onhashchange = function(){
	DKLog("onhashchange: "+window.location.hash+"\n");
	sessionStorage.scrollPos = 0; //reset scroll on back button

	if(search != getUrlParameter(window.location.hash, "s")){
		search = getUrlParameter(window.location.hash, "s");
		Wowzer_DoSearch(search);
	}
	//else{
	//	Wowzer_ShowItems();
	//}
}

/////////////////////////
function Wowzer_Init()
{
	//DKLog("Wowzer_Init()\n");
	DKCreate("Wowzer.html", function(){});
	DKAddEvent("Wowzer_search", "click", Wowzer_OnEvent);
	DKAddEvent("Wowzer_options", "click", Wowzer_OnEvent);
	DKAddEvent("Wowzer_input", "keydown", Wowzer_OnEvent);
	DKAddEvent("Wowzer_logo", "click", Wowzer_OnEvent);
	DKAddEvent("GLOBAL", "mousedown", Wowzer_OnEvent);
	
	search = getUrlParameter(window.location.hash, "s");
	low = getUrlParameter(window.location.hash, "l");
	high = getUrlParameter(window.location.hash, "h");
	Wowzer_DoSearch(search, function(){
		//return scroll position in session storage
		var ele = document.getElementById("Wowzer_items");
		if(!DK_IE()){
			ele.scrollTop = sessionStorage.scrollPos || 0;
		}
	});
	
	//Test();
}

///////////////////////
function Wowzer_End()
{
	//DKLog("Wowzer_End()\n");
	DKClose("Wowzer.html");
	DKRemoveEvent("Wowzer_search", "click", Wowzer_OnEvent);
	DKRemoveEvent("Wowzer_options", "click", Wowzer_OnEvent);
	DKRemoveEvent("Wowzer_input", "keydown", Wowzer_OnEvent);
	DKRemoveEvent("Wowzer_logo", "click", Wowzer_OnEvent);
	DKRemoveEvent("GLOBAL", "mousedown", Wowzer_OnEvent);
}

/////////////////////////////////
function Wowzer_OnEvent(event)
{
	//DKLog("Wowzer_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	//set scroll position in session storage
	var ele = document.getElementById("Wowzer_items");
	if(!DK_IE()){
		sessionStorage.scrollPos = ele.scrollTop;
	}
	
	if(DK_Id(event, "Wowzer_logo")){
		if(!DK_IE()){
			sessionStorage.scrollPos = 0;
		}
		window.location.hash = "";
		window.location.reload(true); //reload page ignoring cache
	}
	
	if(DK_Id(event, "Wowzer_input")){ //Enter pressed
		if(!DK_IE()){
			sessionStorage.scrollPos = 0;
		}
		if(DKWidget_GetValue(event) == "13"){
			var input = DKWidget_GetValue("Wowzer_input");
			if(input){
				window.location.hash = setUrlParameter(window.location.hash, "s", input);
			}
			else{
				window.location.hash = removeUrlParameter(window.location.hash, "s");
			}
		}
	}
	
	if(DK_Id(event, "Wowzer_search")){ //Search clicked
		if(!DK_IE()){
			sessionStorage.scrollPos = 0;
		}
		var input = DKWidget_GetValue("Wowzer_input");
		if(input){
			window.location.hash = setUrlParameter(window.location.hash, "s", input);
		}
		else{
			window.location.hash = removeUrlParameter(window.location.hash, "s");
		}
	}
	
	if(DK_Id(event, "Wowzer_options")){
		if(!DKWidget_ElementExists("Wowzer_options.html")){
			DKCreate("Wowzer_options.js", function(){});
		}
		else{
			DKClose("Wowzer_options.js");
		}
	}
}

////////////////////////////
function Wowzer_Loading()
{
	var loading = document.createElement('img');
	loading.id = "loading";
	loading.src = "loading.gif";
	loading.style.overflow = "hidden";
	if(loading){
		document.getElementById("Wowzer_items").appendChild(loading);
	}
}

/////////////////////////////////////////////
function Wowzer_DoSearch(string, callback)
{
	//DKLog("Wowzer_DoSearch("+string+")\n");
	
	item_arry = new Array();
	Wowzer_Loading(); 
	
	if(string){
		Wowzer_CloseFiveToArry(proxy+"https://www.close5.com/s/l/"+string+"/anaheim-california", function(){ Wowzer_ShowItems(); Wowzer_Loading(); 
		Wowzer_OfferUpToArry(proxy2+"https://offerup.com/search/?q="+string, function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_FiveMilesToArry("https://www.5milesapp.com/q/"+string, function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_LetGoToArry(proxy+"https://us.letgo.com/en/q/"+string+"?lat=33.8124094&lng=-117.91926790000002", function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_CraigslistToArry(proxy+"https://inlandempire.craigslist.org/search/sss?query="+string, function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_EbayToArry(proxy+"https://www.ebay.com/sch/i.html?_from=R40&_nkw="+string+"&_in_kw=1&_ex_kw=&_sacat=0&_udlo=&_udhi=&LH_BIN=1&_ftrt=901&_ftrv=1&_sabdlo=&_sabdhi=&_samilow=&_samihi=&_fsradio2=%26LH_PrefLoc%3D99&_sadis=25&_stpos=92802&_fspt=1&_sargn=-1%26saslc%3D1&_salic=1&_sop=12&_dmd=1&_ipg=50", function(){ Wowzer_ShowItems(); Wowzer_Loading();
			document.getElementById("Wowzer_items").removeChild(document.getElementById("loading"));
			callback && callback();
		});
		});
		});
		});
		});
		});
	}
	else{
		Wowzer_CloseFiveToArry(proxy+"https://www.close5.com/l/anaheim-california", function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_OfferUpToArry(proxy2+"https://offerup.com", function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_FiveMilesToArry("https://www.5milesapp.com", function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_LetGoToArry(proxy+"https://us.letgo.com/en/search?lat=33.8124094&lng=-117.91926790000002", function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_CraigslistToArry(proxy+"https://inlandempire.craigslist.org/search/sss", function(){ Wowzer_ShowItems(); Wowzer_Loading();
		Wowzer_CarousellToArry(proxy+"https://us.carousell.com/search/products", function(){ Wowzer_ShowItems(); Wowzer_Loading();
			document.getElementById("Wowzer_items").removeChild(document.getElementById("loading"));
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
function Wowzer_LetGoToArry(url, callback)
{
	if(!letgo){
		callback();
		return;
	}
	
	Wowzer_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.querySelectorAll('[itemtype="http://schema.org/Product"]');
			for(var i=0; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n");
				
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
function Wowzer_CraigslistToArry(url, callback)
{
	if(!craigslist){
		callback();
		return;
	}
	
	Wowzer_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("result-row");
			for(var i=0; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n");
				
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
		}
		
		callback();
	});
}

/////////////////////////////////////////////////
function Wowzer_CloseFiveToArry(url, callback)
{
	if(!close5){
		callback();
		return;
	}
	
	if(DK_IE()){
		callback();
		return;
	}
	
	Wowzer_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("four wide large screen four wide widescreen four wide computer four wide tablet eight wide mobile column");
			for(var i=0; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n");
				
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
function Wowzer_OfferUpToArry(url, callback)
{
	if(!offerup){
		callback();
		return;
	}
	
	Wowzer_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			//DKLog(rstring+"\n");
			
			var items = div.getElementsByClassName("item-pic");
			for(var i=0; i<items.length; i++){
				//DKLog(items[i].parentNode.innerHTML+"\n");
				
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
function Wowzer_FiveMilesToArry(url, callback)
{
	if(!fivemiles){
		callback();
		return;
	}
	
	//DKLog("Wowzer_FiveMilesToArry()\n");
	if(DK_GetBrowser() != "CEF"){
		callback();
		return; //Only available with CEF, so return.
	}
	
	Wowzer_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("waterItem waterItemInit waterItemInvisible");
			for(var i=1; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n");
				
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
function Wowzer_CarousellToArry(url, callback)
{
	if(!carousell){
		callback();
		return;
	}
	
	callback();
	return;  //Not implemented yet,  return;
		
	Wowzer_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("card pdt-card");
			for(var i=1; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n");
				
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
function Wowzer_EbayToArry(url, callback)
{
	if(!ebay){
		callback();
		return;
	}
	//DKLog("Wowzer_EbayToArry()\n");
	
	url = url.replace(" ","+");	
	Wowzer_GetUrlString(url, function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			DKLog(rstring+"\n");
			
			var items = div.getElementsByClassName("sresult lvresult clearfix li shic");
			for(var i=1; i<items.length; i++){
				//DKLog(items[i].innerHTML+"\n");
				
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
function Wowzer_Filter()
{
	item_arry2 = item_arry.slice(0);
	
	//sort by price
	if(sortbyprice){
		item_arry2.sort(compareSecondColumn);
		function compareSecondColumn(a, b) {
			if(Number(a[6].replace(/[^0-9\.]+/g,"")) === Number(b[6].replace(/[^0-9\.]+/g,""))){
				return 0;
			}
			else {
				return (Number(a[6].replace(/[^0-9\.]+/g,"")) < Number(b[6].replace(/[^0-9\.]+/g,""))) ? -1 : 1;
			}
		}
	}
	
	//Close5
	if(!close5){
		for(var i=0; i<item_arry2.length; i++){
			if(item_arry2[i][1] == "close5.png"){
				item_arry2.splice(i, 1);
				i--;
			}
		}
	}
	
	//OfferUp
	if(!offerup){
		for(var i=0; i<item_arry2.length; i++){
			if(item_arry2[i][1] == "offerup.png"){
				item_arry2.splice(i, 1);
				i--;
			}
		}
	}
	
	//LetGo
	if(!letgo){
		for(var i=0; i<item_arry2.length; i++){
			if(item_arry2[i][1] == "letgo.png"){
				item_arry2.splice(i, 1);
				i--;
			}
		}
	}
	
	//Craigslist
	if(!craigslist){
		for(var i=0; i<item_arry2.length; i++){
			if(item_arry2[i][1] == "craigslist.png"){
				item_arry2.splice(i, 1);
				i--;
			}
		}
	}
	
	//Ebay
	if(!ebay){
		for(var i=0; i<item_arry2.length; i++){
			if(item_arry2[i][1] == "ebay.png"){
				item_arry2.splice(i, 1);
				i--;
			}
		}
	}
	
	//5miles
	if(!fivemiles){
		for(var i=0; i<item_arry2.length; i++){
			if(item_arry2[i][1] == "5miles.png"){
				item_arry2.splice(i, 1);
				i--;
			}
		}
	}
	
	//Price low
	if(low){
		for(var i=0; i<item_arry2.length; i++){
			if(Number(item_arry2[i][6].replace(/[^0-9\.]+/g,"")) < Number(low)){ 
				item_arry2.splice(i, 1);
				i--;
			}
		}
	}
	
	//Price high
	if(high){
		for(var i=0; i<item_arry2.length; i++){
			if(Number(item_arry2[i][6].replace(/[^0-9\.]+/g,"")) > Number(high)){ 
				item_arry2.splice(i, 1);
				i--;
			}
		}
	}
}

//////////////////////////////
function Wowzer_ShowItems()
{
	//sort by price
	Wowzer_Filter();

	DKWidget_SetInnerHtml("Wowzer_items", "");
	for(var i=0; i<item_arry2.length; i++){	
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
		itemurl.href = item_arry2[i][5];
		itemurl.style.display = "block";
		itemurl.style.width = "230px";
		itemurl.style.width = "230rem";
		itemurl.style.height = "300px";
		itemurl.style.height = "300rem";
		imgdiv.appendChild(itemurl);
		
		var itemimg = document.createElement('img');
		itemimg.src = item_arry2[i][4];
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
		host.src = item_arry2[i][1];
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
		itemtitle.innerHTML = item_arry2[i][2];
		itemtitle.style.display = "block";
		itemtitle.style.fontWeight = "bold";
		itemtitle.style.fontSize = "20px";
		itemtitle.style.fontSize = "20rem";
		itemtitle.style.overflow = "hidden";
		infodiv.appendChild(itemtitle);
		
		var itemprice = document.createElement('span');
		if(item_arry2[i][6]){
			itemprice.innerHTML = item_arry2[i][6];
		}
		itemprice.style.display = "block";
		itemprice.style.fontSize = "18px";
		itemprice.style.fontSize = "18rem";
		itemdiv.appendChild(itemprice);
		
		var itemloc = document.createElement('span');
		if(item_arry2[i][3]){
			itemloc.innerHTML = item_arry2[i][3];
		}
		itemloc.style.display = "block";
		itemloc.style.fontSize = "15px";
		itemloc.style.fontSize = "15rem";
		itemdiv.appendChild(itemloc);
		
		document.getElementById("Wowzer_items").appendChild(itemdiv);
		
	}
}

//////////////////////////////////////////////
function Wowzer_GetUrlString(url, callback)
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
	
	//DKLog("request.open(\"GET\","+url+",true)");
	request.open("GET",url,true);
	request.send(); 

	request.onload=function(){
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
}

//////////////////////////////////
function getUrlParameter(url, key) 
{
    if (!url) url = window.location.href;
    key = key.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/////////////////////////////////////////
function setUrlParameter(url, key, value)
{
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = url.indexOf('?') !== -1 ? "&" : "?";
  if (url.match(re)) {
    return url.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return url + separator + key + "=" + value;
  }
}

/////////////////////////////////////
function removeUrlParameter(url, key)
{
    //prefer to use l.search if you have a location/link object
    var urlparts= url.split('?');   
		if (urlparts.length>=2) {
			var prefix= encodeURIComponent(key)+'=';
			var pars= urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
			for (var i= pars.length; i-- > 0;) {    
            //idiom for string.startsWith
				if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
					pars.splice(i, 1);
				}
			}

			url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
			return url;
    } 
	else{
        return url;
    }
}

///////// TESTS ///////////////////////////////////////////
//////////////////////////////////////////////////////////
function Test()
{
	var script = document.createElement('script');
	script.src = "https://www.google.com";
	script.id = "test_script";
	//script.type = "text/javascript";
	//script.type = "text/html";
	//script.type = "text/plain";
	
    script.onerror = function(){
		DKLog("script.onerror\n");
	};
	script.onload = function(){
		DKLog("script.onload\n");
		DKLog(script.text+"\n");
	};

	/*
	script.onreadystatechange = function(){
		DKLog("script.onreadystatechange\n");
		if(script.readyState == 'loaded'){
			// Our script has download, but hasn't executed.
			// It won't execute until we do:
			DKLog("script.readystate = loaded\n");
		}
	};
	*/
	document.body.appendChild(script);
}
