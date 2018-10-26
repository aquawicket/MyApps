/////////////////////
function Letgo_Init()
{
	DKDEBUGFUNC();
}

////////////////////
function Letgo_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(Letgo_OnEvent);
}

/////////////////////////////
function Letgo_OnEvent(event)
{
	DKDEBUGFUNC(event);
}

///////////////////////
function Letgo_Scrape()
{
	DKDEBUGFUNC();
	Letgo_ToArry("https://us.letgo.com/en/category/cars", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/housing", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/electronics", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/cars-motors", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/sports-leisure-games", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/home-garden", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/movies-books-music", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/fashion-accessories", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/baby-child", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/other", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/services", function(){
		Letgo_ToArry("https://us.letgo.com/en/category/free-stuff", function(){
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
}

////////////////////////////////////
function Letgo_ToArry(url, callback)
{
	DKDEBUGFUNC(url, callback);
	Buy_GetUrlString(url, function(rstring){
		if(!rstring){ 
			DKWARN("Letgo_ToArry(): rstring invalid\n");
			return;
		}
		
		var div = document.createElement('div');
		div.innerHTML = rstring;
				
		var items = div.querySelectorAll('div[class*="feed-item"]');
		for(var i=0; i<items.length; i++){
			//DKINFO(items[i].innerHTML+"\n");
			var div1 = items[i].firstChild.firstChild.firstChild; // <div class="sc-...">
			if(!div1){ DKERROR("div1 invalid\n"); continue; }
			var div2 = div1.firstChild; // <div>
			if(!div2){ DKERROR("div2 invalid\n"); continue; }
			var inner = div2.firstChild; //<div class="inner">
			if(!inner){ DKERROR("inner invalid\n"); continue; }
			var img = inner.firstChild.firstChild; //<img>
			if(!img){ DKERROR("img invalid\n"); continue; }
			var footer = div2.childNodes[1]; //<div class="footer">
			if(!footer){ DKERROR("div3 invalid\n"); continue; }
			var div4 = footer.firstChild; // <div class="sc-...">
			if(!div4){ DKERROR("div4 invalid\n"); continue; }
			var p = div4.firstChild; //<p class="sc-..."> //url, title
			if(!p){ DKERROR("p invalid\n"); continue; }
			var p2 = div4.childNodes[1]; //<p class="sc-..."> //location
			if(!p2){ DKERROR("p2 invalid\n"); continue; }
			var a = p.firstChild; //< a href="url">
			if(!a){ DKERROR("a invalid\n"); continue; }
			
			var link = a.href; //url
			if(!link){ DKERROR("link invalid\n"); continue; }
			link = link.replace("file:///C:", "https://us.letgo.com");
			var title = a.title; //title
			if(!title){ DKERROR("title invalid\n"); continue; }
			var loc = p2.innerHTML; //location
			if(!loc){ DKERROR("loc invalid\n"); continue; }
			var img = img.src;
			if(!img){ DKERROR("img invalid\n"); continue; }
			
			if(Buy_CheckForDuplicate(link)){ continue; }
			
			/*
			DKINFO("##########################\n");
			DKINFO("url = "+link+"\n");
			DKINFO("title = "+title+"\n");
			DKINFO("img = "+img+"\n");
			DKINFO("loc = "+loc+"\n");
			DKINFO("price = "+price+"\n");
			*/
			
			buyItems.push({}); //new object
			var buyItem = buyItems[buyItems.length-1];
			buyItem.id = Buy_GetFirstAvailableId(); //id	
			buyItem.date = new Date().toJSON();
			buyItem.providerImg = "TradePost/letgo.png"; //host banner
			buyItem.title = title;
			buyItem.loc = loc;
			buyItem.img = img;
			buyItem.link = link;
			if(url == "https://us.letgo.com/en/category/cars"){ buyItem.catagory = "cars"; }
			if(url == "https://us.letgo.com/en/category/housing"){ buyItem.catagory = "housing"; }
			if(url == "https://us.letgo.com/en/category/electronics"){ buyItem.catagory = "electronics"; }
			if(url == "https://us.letgo.com/en/category/cars-motors"){ buyItem.catagory = "cars-motors"; }
			if(url == "https://us.letgo.com/en/category/sports-leisure-games"){ buyItem.catagory = "sports-leisure-games"; }
			if(url == "https://us.letgo.com/en/category/home-garden"){ buyItem.catagory = "home-garden"; }
			if(url == "https://us.letgo.com/en/category/movies-books-music"){ buyItem.catagory = "movies-books-music"; }
			if(url == "https://us.letgo.com/en/category/fashion-accessories"){ buyItem.catagory = "fashion-accessories"; }
			if(url == "https://us.letgo.com/en/category/baby-child"){ buyItem.catagory = "baby-child"; }
			if(url == "https://us.letgo.com/en/category/other"){ buyItem.catagory = "other"; }
			if(url == "https://us.letgo.com/en/category/services"){ buyItem.catagory = "services"; }
			if(url == "https://us.letgo.com/en/category/free-stuff"){ buyItem.catagory = "free"; }
		}				
		callback();
	});
}

//////////////////////////////////
function Letgo_TriggerGetPrice(id)
{
	DKDEBUGFUNC(id);
	queueSize++;
	setTimeout(function(){
		Letgo_UpdatePrice(id, function(rval){ 
			queueSize--;
			if(rval){
				Buy_SaveData();
			}
		});
	}, 5000*queueSize);
}

////////////////////////////////////////
function Letgo_UpdatePrice(id, callback)
{
	DKDEBUGFUNC(id, callback);
	//get item number
	var num = -1;
	for(var i=0; i<buyItems.length; i++){
		if(id == buyItems[i].id){
			num = i;
		}
	}
	if(num == -1){ 
		DKERROR("Letgo_UpdatePrice("+id+", "+callback+"): could not find item with matching id\n");
		return false; 
	}
	
	if(buyItems[num].price){
		DKWARN("Letgo_UpdatePrice("+id+"): already has a price\n");
		callback(false);
		return; 
	}
	var url = buyItems[num].link;
	Buy_GetUrlString(url, function(rstring){
		if(!rstring){ 
			DKWARN("Letgo_UpdatePrice(): rstring invalid\n"); 
			callback(false);
			return;
		}
		var div = document.createElement('div');
		div.innerHTML = rstring;
		
		var element = div.querySelector('div[class="price"][data-test="price"]');
		if(!element){ DKERROR("element invalid\n"); }
	
		var price = element.innerHTML;
		price = price.replace("<span>", "");
		price = price.replace("</span>", "");
		
		for(var i=0; i<buyItems.length; i++){
			if(buyItems[i].link == url){
				buyItems[i].price = price.replace("$","");
				var ele = document.getElementById("itemprice"+i);
				if(!ele){ DKERROR("can't find itemprice"+i+"\n"); continue; }
				ele.innerHTML = "$"+buyItems[i].price;
			}
		}
		
		callback(true);
	});
}