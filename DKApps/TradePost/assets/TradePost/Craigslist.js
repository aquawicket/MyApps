//////////////////////////
function Craigslist_Init()
{
	DKLog("Craigslist_Init()\n", DKDEBUG);
}

/////////////////////////
function Craigslist_End()
{
	DKLog("Craigslist_End()\n", DKDEBUG);
	DKRemoveEvents(Craigslist_OnEvent);
}

//////////////////////////////////
function Craigslist_OnEvent(event)
{
	DKLog("Craigslist_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}

////////////////////////////
function Craigslist_Scrape()
{
	DKLog("Craigslist_Scrape()\n", DKDEBUG);
	/*
	Helper_Queue( function(){
		Craigslist_ToArry("https://inlandempire.craigslist.org/search/sss?", function(){ Buy_Update(); })
	});
	Helper_Queue( function(){
		Craigslist_ToArry("https://inlandempire.craigslist.org/search/sss?s=120", function(){ Buy_Update(); })
	});
	Helper_Queue( function(){
		Craigslist_ToArry("https://inlandempire.craigslist.org/search/sss?s=240", function(){ Buy_Update(); })
	});
	Helper_Queue( function(){
		Craigslist_ToArry("https://inlandempire.craigslist.org/search/sss?s=360", function(){ Buy_Update(); })
	});
	Helper_Queue( function(){
		Craigslist_ToArry("https://inlandempire.craigslist.org/search/sss?s=480", function(){ Buy_Update(); })
	});
	*/
	
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/ata", function(){	//antiques
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/ppa", function(){	//appliances
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/ara", function(){	//arts+crafts
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/sna", function(){	//atvs/utvs/snow
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/pta", function(){	//auto parts
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/wta", function(){	//auto wheels & tires
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/ava", function(){	//aviation
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/baa", function(){	//baby+kids
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/bar", function(){	//barter
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/haa", function(){	//beauty+hlth
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/bip", function(){	//bike parts
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/bia", function(){	//bikes
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/bpa", function(){	//boat parts
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/boo", function(){	//boats
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/bka", function(){	//books
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/bfa", function(){	//busniess
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/cta", function(){	//cars+trucks
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/ema", function(){	//cds/dvd/vhs
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/moa", function(){	//cell phones
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/cla", function(){	//clothes+acc
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/cba", function(){	//collectibles
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/syp", function(){	//computer parts
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/sya", function(){	//computers
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/ela", function(){	//electronics
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/gra", function(){	//farm+garden
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/zip", function(){	//free stuff
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/fua", function(){	//furniture
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/gms", function(){	//garage sales
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/foa", function(){	//general
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/hva", function(){	//heavy equipment
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/hsa", function(){	//household
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/jwa", function(){	//jewelry
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/maa", function(){	//materials
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/mpa", function(){	//motorcycle parts
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/mca", function(){	//motorcycles
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/msa", function(){	//music instr
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/pha", function(){	//photo+video
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/rva", function(){	//RVs
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/sga", function(){	//sporting
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/tia", function(){	//tickets
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/tla", function(){	//tools
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/taa", function(){	//toys+games
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/tra", function(){	//trailers
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/vga", function(){	//video games
	Craigslist_ToArry("https://inlandempire.craigslist.org/search/waa", function(){	//wanted
		Buy_Update();
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
	})
	})
	})
	})
	})
}

/////////////////////////////////////////
function Craigslist_ToArry(url, callback)
{
	DKLog("Craigslist_ToArry("+url+", callback)\n", DKDEBUG);
	if(!buySettings.craigslistAntiques && url == "https://inlandempire.craigslist.org/search/ata"){ callback(); return; }	//antiques
	if(!buySettings.craigslistAppliances && url == "https://inlandempire.craigslist.org/search/ppa"){ callback(); return; }	//appliances
	if(!buySettings.craigslistArtsCrafts && url == "https://inlandempire.craigslist.org/search/ara"){ callback(); return; }	//arts+crafts
	if(!buySettings.craigslistAtvsUtvsSnow && url == "https://inlandempire.craigslist.org/search/sna"){ callback(); return; }	//atvs/utvs/snow
	if(!buySettings.craigslistAutoParts && url == "https://inlandempire.craigslist.org/search/pta"){ callback(); return; }	//auto parts
	if(!buySettings.craigslistAutoWheelsTires && url == "https://inlandempire.craigslist.org/search/wta"){ callback(); return; }	//auto wheels & tires
	if(!buySettings.craigslistAviation && url == "https://inlandempire.craigslist.org/search/ava"){ callback(); return; }	//aviation
	if(!buySettings.craigslistBabyKids && url == "https://inlandempire.craigslist.org/search/baa"){ callback(); return; }	//baby+kids
	if(!buySettings.craigslistBarter && url == "https://inlandempire.craigslist.org/search/bar"){ callback(); return; }	//barter
	if(!buySettings.craigslistBeautyHlth && url == "https://inlandempire.craigslist.org/search/haa"){ callback(); return; }	//beauty+hlth
	if(!buySettings.craigslistBikeParts && url == "https://inlandempire.craigslist.org/search/bip"){ callback(); return; }	//bike parts
	if(!buySettings.craigslistBikes && url == "https://inlandempire.craigslist.org/search/bia"){ callback(); return; }	//bikes
	if(!buySettings.craigslistBoatParts && url == "https://inlandempire.craigslist.org/search/bpa"){ callback(); return; }	//boat parts
	if(!buySettings.craigslistBoats && url == "https://inlandempire.craigslist.org/search/boo"){ callback(); return; }	//boats
	if(!buySettings.craigslistBooks && url == "https://inlandempire.craigslist.org/search/bka"){ callback(); return; }	//books
	if(!buySettings.craigslistBusniess && url == "https://inlandempire.craigslist.org/search/bfa"){ callback(); return; }	//busniess
	if(!buySettings.craigslistCarsTrucks && url == "https://inlandempire.craigslist.org/search/cta"){ callback(); return; }	//cars+trucks
	if(!buySettings.craigslistCdsDvdVhs && url == "https://inlandempire.craigslist.org/search/ema"){ callback(); return; }	//cds/dvd/vhs
	if(!buySettings.craigslistCellPhones && url == "https://inlandempire.craigslist.org/search/moa"){ callback(); return; }	//cell phones
	if(!buySettings.craigslistClothesAcc && url == "https://inlandempire.craigslist.org/search/cla"){ callback(); return; }	//clothes+acc
	if(!buySettings.craigslistCollectibles && url == "https://inlandempire.craigslist.org/search/cba"){ callback(); return; }	//collectibles
	if(!buySettings.craigslistComputerParts && url == "https://inlandempire.craigslist.org/search/syp"){ callback(); return; }	//computer parts
	if(!buySettings.craigslistComputers && url == "https://inlandempire.craigslist.org/search/sya"){ callback(); return; }	//computers
	if(!buySettings.craigslistElectronics && url == "https://inlandempire.craigslist.org/search/ela"){ callback(); return; }	//electronics
	if(!buySettings.craigslistFarmGarden && url == "https://inlandempire.craigslist.org/search/gra"){ callback(); return; }	//farm+garden
	if(!buySettings.craigslistFreeStuff && url == "https://inlandempire.craigslist.org/search/zip"){ callback(); return; }	//free stuff
	if(!buySettings.craigslistFurniture && url == "https://inlandempire.craigslist.org/search/fua"){ callback(); return; }	//furniture
	if(!buySettings.craigslistGarageSales && url == "https://inlandempire.craigslist.org/search/gms"){ callback(); return; }	//garage sales
	if(!buySettings.craigslistGeneral && url == "https://inlandempire.craigslist.org/search/foa"){ callback(); return; }	//general
	if(!buySettings.craigslistHeavyEquipment && url == "https://inlandempire.craigslist.org/search/hva"){ callback(); return; }	//heavy equipment
	if(!buySettings.craigslistHousehold && url == "https://inlandempire.craigslist.org/search/hsa"){ callback(); return; }	//household
	if(!buySettings.craigslistJewelry && url == "https://inlandempire.craigslist.org/search/jwa"){ callback(); return; }	//jewelry
	if(!buySettings.craigslistMaterials && url == "https://inlandempire.craigslist.org/search/maa"){ callback(); return; }	//materials
	if(!buySettings.craigslistMotorcycleParts && url == "https://inlandempire.craigslist.org/search/mpa"){ callback(); return; }	//motorcycle parts
	if(!buySettings.craigslistMotorcycles && url == "https://inlandempire.craigslist.org/search/mca"){ callback(); return; }	//motorcycles
	if(!buySettings.craigslistMusicInstr && url == "https://inlandempire.craigslist.org/search/msa"){ callback(); return; }	//music instr
	if(!buySettings.craigslistPhotoVideo && url == "https://inlandempire.craigslist.org/search/pha"){ callback(); return; }	//photo+video
	if(!buySettings.craigslistRVs && url == "https://inlandempire.craigslist.org/search/rva"){ callback(); return; }	//RVs
	if(!buySettings.craigslistSporting && url == "https://inlandempire.craigslist.org/search/sga"){ callback(); return; }	//sporting
	if(!buySettings.craigslistTickets && url == "https://inlandempire.craigslist.org/search/tia"){ callback(); return; }	//tickets
	if(!buySettings.craigslistTools && url == "https://inlandempire.craigslist.org/search/tla"){ callback(); return; }	//tools
	if(!buySettings.craigslistToysGames && url == "https://inlandempire.craigslist.org/search/taa"){ callback(); return; }	//toys+games
	if(!buySettings.craigslistTrailers && url == "https://inlandempire.craigslist.org/search/tra"){ callback(); return; }	//trailers
	if(!buySettings.craigslistVideoGames && url == "https://inlandempire.craigslist.org/search/vga"){ callback(); return; }	//video games
	if(!buySettings.craigslistWanted && url == "https://inlandempire.craigslist.org/search/waa"){ callback(); return; }	//wanted

	Buy_GetUrlString(url, function(rstring){
		if(!rstring){ 
			DKLog("Craigslist_ToArry(): rstring invalid\n", DKWARN); 
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
			var buyItem = buyItems[buyItems.length-1];
			buyItem.id = Buy_GetFirstAvailableId(); //id
			buyItem.date = new Date().toJSON();
			buyItem.providerImg = "TradePost/craigslist.png"; //host banner
			
			if(url == "https://inlandempire.craigslist.org/search/ata"){ buyItem.catagory = "antiques"; }	//antiques
			if(url == "https://inlandempire.craigslist.org/search/ppa"){ buyItem.catagory = "appliances"; }	//appliances
			if(url == "https://inlandempire.craigslist.org/search/ara"){ buyItem.catagory = "arts+crafts"; }	//arts+crafts
			if(url == "https://inlandempire.craigslist.org/search/sna"){ buyItem.catagory = "atvs/utvs/snow"; }	//atvs/utvs/snow
			if(url == "https://inlandempire.craigslist.org/search/pta"){ buyItem.catagory = "auto parts"; }	//auto parts
			if(url == "https://inlandempire.craigslist.org/search/wta"){ buyItem.catagory = "auto wheels & tires"; }	//auto wheels & tires
			if(url == "https://inlandempire.craigslist.org/search/ava"){ buyItem.catagory = "aviation"; }	//aviation
			if(url == "https://inlandempire.craigslist.org/search/baa"){ buyItem.catagory = "baby+kids"; }	//baby+kids
			if(url == "https://inlandempire.craigslist.org/search/bar"){ buyItem.catagory = "barter"; }	//barter
			if(url == "https://inlandempire.craigslist.org/search/haa"){ buyItem.catagory = "beauty+hlth"; }	//beauty+hlth
			if(url == "https://inlandempire.craigslist.org/search/bip"){ buyItem.catagory = "bike parts"; }	//bike parts
			if(url == "https://inlandempire.craigslist.org/search/bia"){ buyItem.catagory = "bikes"; }	//bikes
			if(url == "https://inlandempire.craigslist.org/search/bpa"){ buyItem.catagory = "boat parts"; }	//boat parts
			if(url == "https://inlandempire.craigslist.org/search/boo"){ buyItem.catagory = "boats"; }	//boats
			if(url == "https://inlandempire.craigslist.org/search/bka"){ buyItem.catagory = "books"; }	//books
			if(url == "https://inlandempire.craigslist.org/search/bfa"){ buyItem.catagory = "busniess"; }	//busniess
			if(url == "https://inlandempire.craigslist.org/search/cta"){ buyItem.catagory = "cars+trucks"; }	//cars+trucks
			if(url == "https://inlandempire.craigslist.org/search/ema"){ buyItem.catagory = "cds/dvd/vhs"; }	//cds/dvd/vhs
			if(url == "https://inlandempire.craigslist.org/search/moa"){ buyItem.catagory = "cell phones"; }	//cell phones
			if(url == "https://inlandempire.craigslist.org/search/cla"){ buyItem.catagory = "clothes+acc"; }	//clothes+acc
			if(url == "https://inlandempire.craigslist.org/search/cba"){ buyItem.catagory = "collectibles"; }	//collectibles
			if(url == "https://inlandempire.craigslist.org/search/syp"){ buyItem.catagory = "computer parts"; }	//computer parts
			if(url == "https://inlandempire.craigslist.org/search/sya"){ buyItem.catagory = "computers"; }	//computers
			if(url == "https://inlandempire.craigslist.org/search/ela"){ buyItem.catagory = "electronics"; }	//electronics
			if(url == "https://inlandempire.craigslist.org/search/gra"){ buyItem.catagory = "farm+garden"; }	//farm+garden
			if(url == "https://inlandempire.craigslist.org/search/zip"){ buyItem.catagory = "free stuff"; }	//free stuff
			if(url == "https://inlandempire.craigslist.org/search/fua"){ buyItem.catagory = "furniture"; }	//furniture
			if(url == "https://inlandempire.craigslist.org/search/gms"){ buyItem.catagory = "garage sales"; }	//garage sales
			if(url == "https://inlandempire.craigslist.org/search/foa"){ buyItem.catagory = "general"; }	//general
			if(url == "https://inlandempire.craigslist.org/search/hva"){ buyItem.catagory = "heavy equipment"; }	//heavy equipment
			if(url == "https://inlandempire.craigslist.org/search/hsa"){ buyItem.catagory = "household"; }	//household
			if(url == "https://inlandempire.craigslist.org/search/jwa"){ buyItem.catagory = "jewelry"; }	//jewelry
			if(url == "https://inlandempire.craigslist.org/search/maa"){ buyItem.catagory = "materials"; }	//materials
			if(url == "https://inlandempire.craigslist.org/search/mpa"){ buyItem.catagory = "motorcycle parts"; }	//motorcycle parts
			if(url == "https://inlandempire.craigslist.org/search/mca"){ buyItem.catagory = "motorcycles"; }	//motorcycles
			if(url == "https://inlandempire.craigslist.org/search/msa"){ buyItem.catagory = "music instr"; }	//music instr
			if(url == "https://inlandempire.craigslist.org/search/pha"){ buyItem.catagory = "photo+video"; }	//photo+video
			if(url == "https://inlandempire.craigslist.org/search/rva"){ buyItem.catagory = "RVs"; }	//RVs
			if(url == "https://inlandempire.craigslist.org/search/sga"){ buyItem.catagory = "sporting"; }	//sporting
			if(url == "https://inlandempire.craigslist.org/search/tia"){ buyItem.catagory = "tickets"; }	//tickets
			if(url == "https://inlandempire.craigslist.org/search/tla"){ buyItem.catagory = "tools"; }	//tools
			if(url == "https://inlandempire.craigslist.org/search/taa"){ buyItem.catagory = "toys+games"; }	//toys+games
			if(url == "https://inlandempire.craigslist.org/search/tra"){ buyItem.catagory = "trailers"; }	//trailers
			if(url == "https://inlandempire.craigslist.org/search/vga"){ buyItem.catagory = "video games"; }	//video games
			if(url == "https://inlandempire.craigslist.org/search/waa"){ buyItem.catagory = "wanted"; }	//wanted
			
			buyItem.title = items[i].getElementsByClassName("result-title hdrlnk")[0].innerHTML;  //title
			if(items[i].getElementsByClassName("result-hood")[0]){
				buyItem.loc = items[i].getElementsByClassName("result-hood")[0].innerHTML; //location
				buyItem.loc = buyItem.loc.replace("(","");
				buyItem.loc = buyItem.loc.replace(")","");
			}
			var img = items[i].getElementsByClassName("result-image gallery")[0].getAttribute("data-ids");
			if(img){
				img = img.replace("0:", "");
				img = img.replace("1:", "");
				var arry = img.split(",");
				buyItem.img = "https://images.craigslist.org/"+arry[0]+"_300x300.jpg"; //image
			}
			else{
				//buyItem.img = "https://www.craigslist.org/images/peace.jpg"; //no image
			}	
			if(items[i].getElementsByClassName("result-image gallery")[0].href.indexOf("https://") == -1){
				buyItem.link = "https://inlandempire.craigslist.org"+items[i].getElementsByClassName("result-image gallery")[0].href; //url
			}
			else{
				buyItem.link = items[i].getElementsByClassName("result-image gallery")[0].href;  //url
			}
			buyItem.link = buyItem.link.replace("file:///C:",""); //url fix
			buyItem.link = buyItem.link.replace("http://digitalknob.com",""); //url fix
			if(items[i].getElementsByClassName("result-price")[0]){
				buyItem.price = Number(items[i].getElementsByClassName("result-price")[0].innerHTML.replace("$","")); //price
			}
			//else{
				//buyItem.price = "$0"; //price
			//}
		}	
		callback();
	});
}