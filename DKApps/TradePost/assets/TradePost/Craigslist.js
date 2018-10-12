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
		Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/sss?", function(){ Buy_Update(); })
	});
	Helper_Queue( function(){
		Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/sss?s=120", function(){ Buy_Update(); })
	});
	Helper_Queue( function(){
		Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/sss?s=240", function(){ Buy_Update(); })
	});
	Helper_Queue( function(){
		Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/sss?s=360", function(){ Buy_Update(); })
	});
	Helper_Queue( function(){
		Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/sss?s=480", function(){ Buy_Update(); })
	});
	*/
	
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/ata", function(){	//antiques
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/ppa", function(){	//appliances
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/ara", function(){	//arts+crafts
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/sna", function(){	//atvs/utvs/snow
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/pta", function(){	//auto parts
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/wta", function(){	//auto wheels & tires
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/ava", function(){	//aviation
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/baa", function(){	//baby+kids
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/bar", function(){	//barter
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/haa", function(){	//beauty+hlth
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/bip", function(){	//bike parts
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/bia", function(){	//bikes
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/bpa", function(){	//boat parts
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/boo", function(){	//boats
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/bka", function(){	//books
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/bfa", function(){	//busniess
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/cta", function(){	//cars+trucks
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/ema", function(){	//cds/dvd/vhs
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/moa", function(){	//cell phones
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/cla", function(){	//clothes+acc
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/cba", function(){	//collectibles
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/syp", function(){	//computer parts
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/sya", function(){	//computers
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/ela", function(){	//electronics
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/gra", function(){	//farm+garden
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/zip", function(){	//free stuff
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/fua", function(){	//furniture
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/gms", function(){	//garage sales
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/foa", function(){	//general
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/hva", function(){	//heavy equipment
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/hsa", function(){	//household
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/jwa", function(){	//jewelry
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/maa", function(){	//materials
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/mpa", function(){	//motorcycle parts
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/mca", function(){	//motorcycles
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/msa", function(){	//music instr
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/pha", function(){	//photo+video
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/rva", function(){	//RVs
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/sga", function(){	//sporting
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/tia", function(){	//tickets
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/tla", function(){	//tools
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/taa", function(){	//toys+games
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/tra", function(){	//trailers
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/vga", function(){	//video games
	Craigslist_ToArry("https://"+buySettings.craigslistLocation+".craigslist.org/search/waa", function(){	//wanted
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
	if(!buySettings.craigslistAntiques && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ata"){ callback(); return; }	//antiques
	if(!buySettings.craigslistAppliances && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ppa"){ callback(); return; }	//appliances
	if(!buySettings.craigslistArtsCrafts && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ara"){ callback(); return; }	//arts+crafts
	if(!buySettings.craigslistAtvsUtvsSnow && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/sna"){ callback(); return; }	//atvs/utvs/snow
	if(!buySettings.craigslistAutoParts && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/pta"){ callback(); return; }	//auto parts
	if(!buySettings.craigslistAutoWheelsTires && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/wta"){ callback(); return; }	//auto wheels & tires
	if(!buySettings.craigslistAviation && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ava"){ callback(); return; }	//aviation
	if(!buySettings.craigslistBabyKids && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/baa"){ callback(); return; }	//baby+kids
	if(!buySettings.craigslistBarter && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bar"){ callback(); return; }	//barter
	if(!buySettings.craigslistBeautyHlth && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/haa"){ callback(); return; }	//beauty+hlth
	if(!buySettings.craigslistBikeParts && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bip"){ callback(); return; }	//bike parts
	if(!buySettings.craigslistBikes && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bia"){ callback(); return; }	//bikes
	if(!buySettings.craigslistBoatParts && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bpa"){ callback(); return; }	//boat parts
	if(!buySettings.craigslistBoats && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/boo"){ callback(); return; }	//boats
	if(!buySettings.craigslistBooks && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bka"){ callback(); return; }	//books
	if(!buySettings.craigslistBusniess && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bfa"){ callback(); return; }	//busniess
	if(!buySettings.craigslistCarsTrucks && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/cta"){ callback(); return; }	//cars+trucks
	if(!buySettings.craigslistCdsDvdVhs && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ema"){ callback(); return; }	//cds/dvd/vhs
	if(!buySettings.craigslistCellPhones && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/moa"){ callback(); return; }	//cell phones
	if(!buySettings.craigslistClothesAcc && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/cla"){ callback(); return; }	//clothes+acc
	if(!buySettings.craigslistCollectibles && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/cba"){ callback(); return; }	//collectibles
	if(!buySettings.craigslistComputerParts && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/syp"){ callback(); return; }	//computer parts
	if(!buySettings.craigslistComputers && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/sya"){ callback(); return; }	//computers
	if(!buySettings.craigslistElectronics && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ela"){ callback(); return; }	//electronics
	if(!buySettings.craigslistFarmGarden && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/gra"){ callback(); return; }	//farm+garden
	if(!buySettings.craigslistFreeStuff && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/zip"){ callback(); return; }	//free stuff
	if(!buySettings.craigslistFurniture && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/fua"){ callback(); return; }	//furniture
	if(!buySettings.craigslistGarageSales && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/gms"){ callback(); return; }	//garage sales
	if(!buySettings.craigslistGeneral && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/foa"){ callback(); return; }	//general
	if(!buySettings.craigslistHeavyEquipment && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/hva"){ callback(); return; }	//heavy equipment
	if(!buySettings.craigslistHousehold && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/hsa"){ callback(); return; }	//household
	if(!buySettings.craigslistJewelry && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/jwa"){ callback(); return; }	//jewelry
	if(!buySettings.craigslistMaterials && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/maa"){ callback(); return; }	//materials
	if(!buySettings.craigslistMotorcycleParts && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/mpa"){ callback(); return; }	//motorcycle parts
	if(!buySettings.craigslistMotorcycles && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/mca"){ callback(); return; }	//motorcycles
	if(!buySettings.craigslistMusicInstr && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/msa"){ callback(); return; }	//music instr
	if(!buySettings.craigslistPhotoVideo && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/pha"){ callback(); return; }	//photo+video
	if(!buySettings.craigslistRVs && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/rva"){ callback(); return; }	//RVs
	if(!buySettings.craigslistSporting && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/sga"){ callback(); return; }	//sporting
	if(!buySettings.craigslistTickets && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/tia"){ callback(); return; }	//tickets
	if(!buySettings.craigslistTools && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/tla"){ callback(); return; }	//tools
	if(!buySettings.craigslistToysGames && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/taa"){ callback(); return; }	//toys+games
	if(!buySettings.craigslistTrailers && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/tra"){ callback(); return; }	//trailers
	if(!buySettings.craigslistVideoGames && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/vga"){ callback(); return; }	//video games
	if(!buySettings.craigslistWanted && url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/waa"){ callback(); return; }	//wanted

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
				if(Buy_CheckForDuplicate("https://"+buySettings.craigslistLocation+".craigslist.org"+items[i].getElementsByClassName("result-image gallery")[0].href)){
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
			
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ata"){ buyItem.catagory = "antiques"; }	//antiques
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ppa"){ buyItem.catagory = "appliances"; }	//appliances
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ara"){ buyItem.catagory = "arts+crafts"; }	//arts+crafts
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/sna"){ buyItem.catagory = "atvs/utvs/snow"; }	//atvs/utvs/snow
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/pta"){ buyItem.catagory = "auto parts"; }	//auto parts
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/wta"){ buyItem.catagory = "auto wheels & tires"; }	//auto wheels & tires
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ava"){ buyItem.catagory = "aviation"; }	//aviation
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/baa"){ buyItem.catagory = "baby+kids"; }	//baby+kids
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bar"){ buyItem.catagory = "barter"; }	//barter
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/haa"){ buyItem.catagory = "beauty+hlth"; }	//beauty+hlth
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bip"){ buyItem.catagory = "bike parts"; }	//bike parts
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bia"){ buyItem.catagory = "bikes"; }	//bikes
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bpa"){ buyItem.catagory = "boat parts"; }	//boat parts
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/boo"){ buyItem.catagory = "boats"; }	//boats
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bka"){ buyItem.catagory = "books"; }	//books
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/bfa"){ buyItem.catagory = "busniess"; }	//busniess
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/cta"){ buyItem.catagory = "cars+trucks"; }	//cars+trucks
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ema"){ buyItem.catagory = "cds/dvd/vhs"; }	//cds/dvd/vhs
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/moa"){ buyItem.catagory = "cell phones"; }	//cell phones
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/cla"){ buyItem.catagory = "clothes+acc"; }	//clothes+acc
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/cba"){ buyItem.catagory = "collectibles"; }	//collectibles
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/syp"){ buyItem.catagory = "computer parts"; }	//computer parts
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/sya"){ buyItem.catagory = "computers"; }	//computers
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/ela"){ buyItem.catagory = "electronics"; }	//electronics
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/gra"){ buyItem.catagory = "farm+garden"; }	//farm+garden
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/zip"){ buyItem.catagory = "free stuff"; }	//free stuff
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/fua"){ buyItem.catagory = "furniture"; }	//furniture
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/gms"){ buyItem.catagory = "garage sales"; }	//garage sales
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/foa"){ buyItem.catagory = "general"; }	//general
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/hva"){ buyItem.catagory = "heavy equipment"; }	//heavy equipment
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/hsa"){ buyItem.catagory = "household"; }	//household
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/jwa"){ buyItem.catagory = "jewelry"; }	//jewelry
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/maa"){ buyItem.catagory = "materials"; }	//materials
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/mpa"){ buyItem.catagory = "motorcycle parts"; }	//motorcycle parts
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/mca"){ buyItem.catagory = "motorcycles"; }	//motorcycles
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/msa"){ buyItem.catagory = "music instr"; }	//music instr
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/pha"){ buyItem.catagory = "photo+video"; }	//photo+video
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/rva"){ buyItem.catagory = "RVs"; }	//RVs
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/sga"){ buyItem.catagory = "sporting"; }	//sporting
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/tia"){ buyItem.catagory = "tickets"; }	//tickets
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/tla"){ buyItem.catagory = "tools"; }	//tools
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/taa"){ buyItem.catagory = "toys+games"; }	//toys+games
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/tra"){ buyItem.catagory = "trailers"; }	//trailers
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/vga"){ buyItem.catagory = "video games"; }	//video games
			if(url == "https://"+buySettings.craigslistLocation+".craigslist.org/search/waa"){ buyItem.catagory = "wanted"; }	//wanted
			
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
				buyItem.link = "https://"+buySettings.craigslistLocation+".craigslist.org"+items[i].getElementsByClassName("result-image gallery")[0].href; //url
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

////////////////////////////////////////
function Craigslist_IsFiltered(catagory)
{
	if(!buySettings.craigslistAntiques && catagory == "antiques"){ return true; }
	if(!buySettings.craigslistAppliances && catagory == "appliances"){ return true; }
	if(!buySettings.craigslistArtsCrafts && catagory == "arts+crafts"){ return true; }
	if(!buySettings.craigslistAtvsUtvsSnow && catagory == "atvs/utvs/snow"){ return true; }
	if(!buySettings.craigslistAutoParts && catagory == "auto parts"){ return true; }
	if(!buySettings.craigslistAutoWheelsTires && catagory == "auto wheels & tires"){ return true; }
	if(!buySettings.craigslistAviation && catagory == "aviation"){ return true; }
	if(!buySettings.craigslistBabyKids && catagory == "baby+kids"){ return true; }
	if(!buySettings.craigslistBarter && catagory == "barter"){ return true; }
	if(!buySettings.craigslistBeautyHlth && catagory == "beauty+hlth"){ return true; }
	if(!buySettings.craigslistBikeParts && catagory == "bike parts"){ return true; }
	if(!buySettings.craigslistBikes && catagory == "bikes"){ return true; }
	if(!buySettings.craigslistBoatParts && catagory == "boat parts"){ return true; }
	if(!buySettings.craigslistBoats && catagory == "boats"){ return true; }
	if(!buySettings.craigslistBooks && catagory == "books"){ return true; }
	if(!buySettings.craigslistBusniess && catagory == "busniess"){ return true; }
	if(!buySettings.craigslistCarsTrucks && catagory == "cars+trucks"){ return true; }
	if(!buySettings.craigslistCdsDvdVhs && catagory == "cds/dvd/vhs"){ return true; }
	if(!buySettings.craigslistCellPhones && catagory == "cell phones"){ return true; }
	if(!buySettings.craigslistClothesAcc && catagory == "clothes+acc"){ return true; }
	if(!buySettings.craigslistCollectibles && catagory == "collectibles"){ return true; }
	if(!buySettings.craigslistComputerParts && catagory == "computer parts"){ return true; }
	if(!buySettings.craigslistComputers && catagory == "computers"){ return true; }
	if(!buySettings.craigslistElectronics && catagory == "electronics"){ return true; }
	if(!buySettings.craigslistFarmGarden && catagory == "farm+garden"){ return true; }
	if(!buySettings.craigslistFreeStuff && catagory == "free stuff"){ return true; }
	if(!buySettings.craigslistFurniture && catagory == "furniture"){ return true; }
	if(!buySettings.craigslistGarageSales && catagory == "garage sales"){ return true; }
	if(!buySettings.craigslistGeneral && catagory == "general"){ return true; }
	if(!buySettings.craigslistHeavyEquipment && catagory == "heavy equipment"){ return true; }
	if(!buySettings.craigslistHousehold && catagory == "household"){ return true; }
	if(!buySettings.craigslistJewelry && catagory == "jewelry"){ return true; }
	if(!buySettings.craigslistMaterials && catagory == "materials"){ return true; }
	if(!buySettings.craigslistMotorcycleParts && catagory == "motorcycle parts"){ return true; }
	if(!buySettings.craigslistMotorcycles && catagory == "motorcycles"){ return true; }
	if(!buySettings.craigslistMusicInstr && catagory == "music instr"){ return true; }
	if(!buySettings.craigslistPhotoVideo && catagory == "photo+video"){ return true; }
	if(!buySettings.craigslistRVs && catagory == "RVs"){ return true; }
	if(!buySettings.craigslistSporting && catagory == "sporting"){ return true; }
	if(!buySettings.craigslistTickets && catagory == "tickets"){ return true; }
	if(!buySettings.craigslistTools && catagory == "tools"){ return true; }
	if(!buySettings.craigslistToysGames && catagory == "toys+games"){ return true; }
	if(!buySettings.craigslistTrailers && catagory == "trailers"){ return true; }
	if(!buySettings.craigslistVideoGames && catagory == "video games"){ return true; }
	if(!buySettings.craigslistWanted && catagory == "wanted"){ return true; }
}