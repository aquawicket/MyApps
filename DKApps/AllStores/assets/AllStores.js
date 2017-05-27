var item_arry = new Array();

/////////////////////////
function AllStores_Init()
{
	DKLog("AllStores_Init()\n", DKINFO);
	DKCreate("AllStores.html", function(){});
	
	AllStores_LetGoToArry(function(){
		AllStores_CraigslistToArry(function(){
			AllStores_ShowItems();
		});
	});
	
	
}

///////////////////////
function AllStores_End()
{
	DKLog("AllStores_End()\n", DKINFO);
}

/////////////////////////////////
function AllStores_OnEvent(event)
{
	DKLog("Tempalte_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKINFO);
}

////////////////////////////////////////
function AllStores_LetGoToArry(callback)
{
	AllStores_GetUrlString("https://us.letgo.com/en", function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.querySelectorAll('[itemtype="http://schema.org/Product"]');
			for(var i=0; i<items.length; i++){
				
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "letgo";
				
				if(items[i].getElementsByClassName("img portrait")[0]){
					item_data[2] = items[i].getElementsByClassName("img portrait")[0].title;  //title
					item_data[3] = items[i].getElementsByClassName("city")[0].innerHTML;  //location
					item_data[4] = items[i].getElementsByClassName("img portrait")[0].firstChild.src; //image
					item_data[5] = items[i].getElementsByClassName("img portrait")[0];  //url
				}
				if(items[i].getElementsByClassName("img landscape")[0]){
					item_data[2] = items[i].getElementsByClassName("img landscape")[0].title;  //title
					item_data[3] = items[i].getElementsByClassName("city")[0].innerHTML;  //location
					item_data[4] = items[i].getElementsByClassName("img landscape")[0].firstChild.src; //image
					item_data[5] = items[i].getElementsByClassName("img landscape")[0];  //url
				}
				item_arry.push(item_data);
			}

			callback();			
		}
	});
}

/////////////////////////////////////////////
function AllStores_CraigslistToArry(callback)
{
	AllStores_GetUrlString("https://orangecounty.craigslist.org/search/sss", function(rstring){
		if(rstring){	
			var div = document.createElement('div');
			div.innerHTML = rstring;
			
			var items = div.getElementsByClassName("result-row");
			for(var i=0; i<items.length; i++){

				//DKLog(items[i].innerHTML+"\n", DKINFO);
				var item_data = new Array();
				item_data[0] = "id";
				item_data[1] = "craigslist";
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
				item_data[5] = "https://orangecounty.craigslist.org"+items[i].getElementsByClassName("result-image gallery")[0].href;  //url
				item_data[5] = item_data[5].replace("file:///C:","");
				item_arry.push(item_data);
			}
			
			callback();
		}
	});
}

///////////////////////////////
function AllStores_PrintItems()
{
	for(var i=0; i<item_arry.length; i++){
		DKLog(i+": title:"+item_arry[i][2]+" loc:"+item_arry[i][3]+" img:"+item_arry[i][4]+" url:"+item_arry[i][5]+"\n", DKINFO);
	}
}

//////////////////////////////
function AllStores_ShowItems()
{
	for(var i=0; i<item_arry.length; i++){
		
		var itemdiv = document.createElement('div');
		itemdiv.style.display = "inline-block";
		itemdiv.style.width = "230rem";
		itemdiv.style.height = "400rem";
		itemdiv.style.textAlign = "center";
		itemdiv.style.margin = "4rem";
		//itemdiv.style.borderStyle = "solid";
		//itemdiv.style.borderWidth = "1rem";
		//itemdiv.style.borderColor = "red";
		itemdiv.style.background = "white";
		itemdiv.style.overflow = "hidden";
		
		var imgdiv = document.createElement('div');
		imgdiv.style.display = "block";
		imgdiv.style.width = "230rem";
		imgdiv.style.height = "300rem";
		//imgdiv.style.borderStyle = "solid";
		//imgdiv.style.borderWidth = "1rem";
		//imgdiv.style.borderColor = "blue";
		itemdiv.appendChild(imgdiv);
		
		var itemurl = document.createElement('a');
		itemurl.href = item_arry[i][5];
		itemurl.style.display = "block";
		itemurl.style.width = "230rem";
		itemurl.style.height = "300rem";
		imgdiv.appendChild(itemurl);
		
		var itemimg = document.createElement('img');
		itemimg.src = item_arry[i][4];
		itemimg.style.display = "block";
		//itemimg.style.width = "100%";
		itemimg.style.maxWidth = "230rem";
		itemimg.style.maxHeight = "300rem";
		itemimg.style.margin = "auto";
		itemurl.appendChild(itemimg);
		
		
		var infodiv = document.createElement('div');
		infodiv.style.display = "block";
		infodiv.style.width = "230rem";
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
		itemtitle.style.fontSize = "20rem";
		itemtitle.style.overflow = "hidden";
		infodiv.appendChild(itemtitle);
		
		var itemloc = document.createElement('span');
		if(item_arry[i][3]){
			itemloc.innerHTML = item_arry[i][3];
		}
		itemloc.style.display = "block";
		itemloc.style.fontSize = "16rem";
		itemdiv.appendChild(itemloc);
		
		document.getElementById("AllStores.html").appendChild(itemdiv);
	}
}

//////////////////////////////////////////////
function AllStores_GetUrlString(url, callback)
{
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
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200 || request.status==0){
				callback(request.responseText);
			}
			else{
				DKLog("AJAX ERROR: "+request.statusText, DKWARN); //report error
				DKLog("status: "+request.status, DKWARN);
				return false;
			}
		}
	}
	
	request.send(); 
}