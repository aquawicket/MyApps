///////////////////////
function Offerup_Init()
{
	DKDEBUGFUNC();
}

//////////////////////
function Offerup_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(Offerup_OnEvent);
}

///////////////////////////////
function Offerup_OnEvent(event)
{
	DKDEBUGFUNC(event);
}

/////////////////////////
function Offerup_Scrape()
{
	DKDEBUGFUNC();
	Offerup_ToArry("https://offerup.com/explore/k/antiques", function(){
	Offerup_ToArry("https://offerup.com/explore/k/appliances", function(){
	Offerup_ToArry("https://offerup.com/explore/k/arts-crafts", function(){
	Offerup_ToArry("https://offerup.com/explore/k/audio-equipment", function(){
	Offerup_ToArry("https://offerup.com/explore/k/auto-parts", function(){
	Offerup_ToArry("https://offerup.com/explore/k/baby-kids", function(){
	Offerup_ToArry("https://offerup.com/explore/k/beauty-health", function(){
	Offerup_ToArry("https://offerup.com/explore/k/bicycles", function(){
	Offerup_ToArry("https://offerup.com/explore/k/boats-marine", function(){
	Offerup_ToArry("https://offerup.com/explore/k/books-magazines", function(){
	Offerup_ToArry("https://offerup.com/explore/k/business-equipment", function(){
	Offerup_ToArry("https://offerup.com/explore/k/campers-rvs", function(){
	Offerup_ToArry("https://offerup.com/explore/k/cars-trucks", function(){
	Offerup_ToArry("https://offerup.com/explore/k/cds-dvds", function(){
	Offerup_ToArry("https://offerup.com/explore/k/cell-phones", function(){
	Offerup_ToArry("https://offerup.com/explore/k/clothing-shoes", function(){
	Offerup_ToArry("https://offerup.com/explore/k/collectibles", function(){
	Offerup_ToArry("https://offerup.com/explore/k/computer-equipment", function(){
	Offerup_ToArry("https://offerup.com/explore/k/electronics", function(){
	Offerup_ToArry("https://offerup.com/explore/k/exercise", function(){
	Offerup_ToArry("https://offerup.com/explore/k/free", function(){
	Offerup_ToArry("https://offerup.com/explore/k/furniture", function(){
	Offerup_ToArry("https://offerup.com/explore/k/games-toys", function(){
	Offerup_ToArry("https://offerup.com/explore/k/general", function(){
	Offerup_ToArry("https://offerup.com/explore/k/home-garden", function(){
	Offerup_ToArry("https://offerup.com/explore/k/household", function(){
	Offerup_ToArry("https://offerup.com/explore/k/jewelry-accessories", function(){
	Offerup_ToArry("https://offerup.com/explore/k/motorcycles", function(){
	Offerup_ToArry("https://offerup.com/explore/k/musical-instruments", function(){
	Offerup_ToArry("https://offerup.com/explore/k/pet-supplies", function(){	
	Offerup_ToArry("https://offerup.com/explore/k/photography", function(){
	Offerup_ToArry("https://offerup.com/explore/k/software", function(){
	Offerup_ToArry("https://offerup.com/explore/k/sports-outdoors", function(){
	Offerup_ToArry("https://offerup.com/explore/k/tickets", function(){
	Offerup_ToArry("https://offerup.com/explore/k/tools-machinery", function(){
	Offerup_ToArry("https://offerup.com/explore/k/tvs", function(){
	Offerup_ToArry("https://offerup.com/explore/k/video-equipment", function(){
	Offerup_ToArry("https://offerup.com/explore/k/video-games", function(){
	Offerup_ToArry("https://offerup.com/explore/k/wedding", function(){
	Offerup_ToArry("https://offerup.com/explore/k/free", function(){
		Buy_Update();
		return;
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
	})
}

//////////////////////////////////////
function Offerup_ToArry(url, callback)
{
	DKDEBUGFUNC(url, callback);
	Buy_GetUrlString(url, function(rstring){
		if(!rstring){ 
			DKWARN("Offerup_ToArry(): rstring invalid\n"); 
			return;
		}
	
		var div = document.createElement('div');
		div.innerHTML = rstring;
		
		var items = div.querySelectorAll('a[class*="db-item-tile"]');
		for(var i=0; i<items.length; i++){
			//console.log(items[i].innerHTML+"\n");
			var div1 = items[i].firstChild; //<div class="_b31be13">
			if(!div1){ DKERROR("div1 invalid\n"); continue; }
			var div2 = div1.firstChild; //<div class="_178faes">
			if(!div2){ DKERROR("div2 invalid\n"); continue; }
			var sub_div1 = div1.childNodes[1]; //<div class="_1g9xn5a">
			if(!sub_div1){ DKERROR("sub_div1 invalid\n"); continue; }
			var price_div_par = sub_div1.childNodes[1]; //
			if(!price_div_par){ DKERROR("price_div_par invalid\n"); continue; }
			var price_div = price_div_par.firstChild; //<span class="_1hwuc5f4">
			if(!price_div){ DKERROR("price_div invalid\n"); continue; }
			var loc_div = sub_div1.childNodes[2].firstChild; //<span class="_19rx43s2">
			if(!loc_div){ DKERROR("loc_div invalid\n"); continue; }
			var div3 = div2.firstChild; //<div class="_1pq2fo4">
			if(!div3){ DKERROR("div3 invalid\n"); continue; }
			var img1 = div3.firstChild; //<img>
			if(!img1){ DKERROR("img1 invalid\n"); continue; }
			
			var link = items[i].href;
			link = link.replace("file:///C:", "https://offerup.com");
			var img = img1.src;
			var title = img1.alt;
			var price = Number(price_div.innerHTML.replace("$",""));
			var loc = loc_div.innerHTML.replace(", CA","");
			title = title.replace(" for Sale in "+loc, "");
			
			if(Buy_CheckForDuplicate(link)){ continue; }
			
			console.log("##########################\n");
			console.log("url = "+link+"\n");
			console.log("title = "+title+"\n");
			console.log("loc = "+loc+"\n");
			console.log("img = "+img+"\n");
			console.log("price = "+price+"\n");

			buyItems.push({}); //new object
			var buyItem = buyItems[buyItems.length-1];
			buyItem.id = Buy_GetFirstAvailableId(); //id	
			buyItem.date = new Date().toJSON();
			buyItem.providerImg = "TradePost/offerup.png"; //host banner
			buyItem.title = title;
			buyItem.loc = loc;
			buyItem.img = img;
			buyItem.link = link;
			buyItem.price = price;
			if(url == "https://offerup.com/explore/k/antiques"){ buyItem.catagory = "antiques"; }
			if(url == "https://offerup.com/explore/k/appliances"){ buyItem.catagory = "appliances"; }
			if(url == "https://offerup.com/explore/k/arts-crafts"){ buyItem.catagory = "arts-crafts"; }
			if(url == "https://offerup.com/explore/k/audio-equipment"){ buyItem.catagory = "audio-equipment"; }
			if(url == "https://offerup.com/explore/k/auto-parts"){ buyItem.catagory = "auto-parts"; }
			if(url == "https://offerup.com/explore/k/baby-kids"){ buyItem.catagory = "baby-kids"; }
			if(url == "https://offerup.com/explore/k/beauty-health"){ buyItem.catagory = "beauty-health"; }
			if(url == "https://offerup.com/explore/k/bicycles"){ buyItem.catagory = "bicycles"; }
			if(url == "https://offerup.com/explore/k/boats-marine"){ buyItem.catagory = "boats-marine"; }
			if(url == "https://offerup.com/explore/k/books-magazines"){ buyItem.catagory = "books-magazines"; }
			if(url == "https://offerup.com/explore/k/business-equipment"){ buyItem.catagory = "business-equipment"; }
			if(url == "https://offerup.com/explore/k/campers-rvs"){ buyItem.catagory = "campers-rvs"; }
			if(url == "https://offerup.com/explore/k/cars-trucks"){ buyItem.catagory = "cars-trucks"; }
			if(url == "https://offerup.com/explore/k/cds-dvds"){ buyItem.catagory = "cds-dvds"; }
			if(url == "https://offerup.com/explore/k/cell-phones"){ buyItem.catagory = "cell-phones"; }
			if(url == "https://offerup.com/explore/k/clothing-shoes"){ buyItem.catagory = "clothing-shoes"; }
			if(url == "https://offerup.com/explore/k/collectibles"){ buyItem.catagory = "collectibles"; }
			if(url == "https://offerup.com/explore/k/computer-equipment"){ buyItem.catagory = "computer-equipment"; }
			if(url == "https://offerup.com/explore/k/electronics"){ buyItem.catagory = "electronics"; }
			if(url == "https://offerup.com/explore/k/exercise"){ buyItem.catagory = "exercise"; }
			if(url == "https://offerup.com/explore/k/free"){ buyItem.catagory = "free"; }
			if(url == "https://offerup.com/explore/k/furniture"){ buyItem.catagory = "furniture"; }
			if(url == "https://offerup.com/explore/k/games-toys"){ buyItem.catagory = "games-toys"; }
			if(url == "https://offerup.com/explore/k/general"){ buyItem.catagory = "general"; }
			if(url == "https://offerup.com/explore/k/home-garden"){ buyItem.catagory = "home-garden"; }
			if(url == "https://offerup.com/explore/k/household"){ buyItem.catagory = "household"; }
			if(url == "https://offerup.com/explore/k/jewelry-accessories"){ buyItem.catagory = "jewelry-accessories"; }
			if(url == "https://offerup.com/explore/k/motorcycles"){ buyItem.catagory = "motorcycles"; }
			if(url == "https://offerup.com/explore/k/musical-instruments"){ buyItem.catagory = "musical-instruments"; }
			if(url == "https://offerup.com/explore/k/pet-supplies"){ buyItem.catagory = "pet-supplies"; }
			if(url == "https://offerup.com/explore/k/photography"){ buyItem.catagory = "photography"; }
			if(url == "https://offerup.com/explore/k/software"){ buyItem.catagory = "software"; }
			if(url == "https://offerup.com/explore/k/sports-outdoors"){ buyItem.catagory = "sports-outdoors"; }
			if(url == "https://offerup.com/explore/k/tickets"){ buyItem.catagory = "tickets"; }
			if(url == "https://offerup.com/explore/k/tools-machinery"){ buyItem.catagory = "tools-machinery"; }
			if(url == "https://offerup.com/explore/k/tvs"){ buyItem.catagory = "tvs"; }
			if(url == "https://offerup.com/explore/k/video-equipment"){ buyItem.catagory = "video-equipment"; }
			if(url == "https://offerup.com/explore/k/video-games"){ buyItem.catagory = "video-games"; }
			if(url == "https://offerup.com/explore/k/wedding"){ buyItem.catagory = "wedding"; }
		}
		callback();
	});
}