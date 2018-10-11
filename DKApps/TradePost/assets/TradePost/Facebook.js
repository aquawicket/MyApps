////////////////////////
function Facebook_Init()
{
	DKLog("Facebook_Init()\n", DKDEBUG);
}

///////////////////////
function Facebook_End()
{
	DKLog("Facebook_End()\n", DKDEBUG);
	DKRemoveEvents(Facebook_OnEvent);
}

////////////////////////////////
function Facebook_OnEvent(event)
{
	DKLog("Facebook_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}

//////////////////////////
function Facebook_Scrape()
{
	Facebook_ToArry("https://www.facebook.com/marketplace", function(){ 
		Buy_Update(); 
		return;
	})
}

///////////////////////////////////////
function Facebook_ToArry(url, callback)
{
	DKLog("Facebook_ToArry("+url+",callback)\n");
	
	Buy_GetUrlString(url, function(rstring){
		if(!rstring){ 
			DKLog("Facebook_ToArry(): rstring invalid\n", DKWARN); 
			return;
		}
		//DKLog(rstring+"\n");
		//var div = document.createElement('div');
		//div.innerHTML = rstring;
		
		//We have to extract the items through raw text
		//TODO
		DKFile_StringToFile(rstring, "facebookMarket.html", true);
		
		var first_link = rstring.indexOf("share_uri");
		DKLog("first_link found at "+first_link+"\n");
		/*
		for(var i=0; i<items.length; i++){
			DKLog("Item Found\n");
			//TODO
		}
		*/
		
		callback();
	});
}