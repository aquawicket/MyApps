////////////////////////
function Facebook_Init()
{
	DKDEBUGFUNC();
}

///////////////////////
function Facebook_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(Facebook_OnEvent);
}

////////////////////////////////
function Facebook_OnEvent(event)
{
	DKDEBUGFUNC(event);
}

//////////////////////////
function Facebook_Scrape()
{
	DKDEBUGFUNC();
	Facebook_ToArry("https://www.facebook.com/marketplace", function(){ 
		Buy_Update(); 
		return;
	})
}

///////////////////////////////////////
function Facebook_ToArry(url, callback)
{
	DKDEBUGFUNC(url, callback);	
	Buy_GetUrlString(url, function(rstring){
		if(!rstring){ 
			DKWARN("Facebook_ToArry(): rstring invalid\n"); 
			return;
		}
		//console.log(rstring+"\n");
		//var div = document.createElement('div');
		//div.innerHTML = rstring;
		
		//We have to extract the items through raw text
		//TODO
		DKFile_StringToFile(rstring, "facebookMarket.html", true);
		
		var first_link = rstring.indexOf("share_uri");
		console.log("first_link found at "+first_link+"\n");
		/*
		for(var i=0; i<items.length; i++){
			console.log("Item Found\n");
			//TODO
		}
		*/
		
		callback();
	});
}