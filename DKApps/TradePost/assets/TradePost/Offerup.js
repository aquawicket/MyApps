///////////////////////
function Offerup_Init()
{
	DKLog("Offerup_Init()\n", DKDEBUG);
}

//////////////////////
function Offerup_End()
{
	DKLog("Offerup_End()\n", DKDEBUG);
	DKRemoveEvents(Offerup_OnEvent);
}

///////////////////////////////
function Offerup_OnEvent(event)
{
	DKLog("Offerup_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}

//////////////////////////
function Offerup_Scrape(){
		DKLog("Offerup_Scrape()\n", DKDEBUG);
		Buy_OfferUpToArry("https://offerup.com/explore/k/antiques", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/appliances", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/arts-crafts", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/audio-equipment", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/auto-parts", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/baby-kids", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/beauty-health", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/bicycles", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/boats-marine", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/books-magazines", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/business-equipment", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/campers-rvs", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/cars-trucks", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/cds-dvds", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/cell-phones", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/clothing-shoes", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/collectibles", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/computer-equipment", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/electronics", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/exercise", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/free", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/furniture", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/games-toys", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/general", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/home-garden", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/household", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/jewelry-accessories", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/motorcycles", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/musical-instruments", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/pet-supplies", function(){	
		Buy_OfferUpToArry("https://offerup.com/explore/k/photography", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/software", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/sports-outdoors", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/tickets", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/tools-machinery", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/tvs", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/video-equipment", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/video-games", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/wedding", function(){
		Buy_OfferUpToArry("https://offerup.com/explore/k/free", function(){
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