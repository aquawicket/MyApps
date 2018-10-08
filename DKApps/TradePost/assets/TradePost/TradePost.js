items = []; //items stored here, for use with json
var currentItem;
var action;
var rowHeight = "150rem";

/////////////////////////
function TradePost_Init()
{
	DKLog("TradePost_Init()\n", DKDEBUG);
	DKCreate("DKAdmin/DKAdmin.js", function(){});
	DKCreate("TradePost/TradePost.html");
	DKCreate("DKGui/DKMenu.js", function(){});
	DKAddEvent("GLOBAL", "DKCef_OnLoadingStateChange", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnBeforePopup", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnQueueNewBrowser", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnLoadError", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnLoadEnd", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFullscreen", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_ContextMenu", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnContextCreated", TradePost_OnEvent);
	//DKAddEvent("GLOBAL", "DKCef_OnFileDialogDismissed", TradePost_OnEvent);
	
	//DKAddEvent("GLOBAL", "mousemove", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "keydown", TradePost_OnEvent);
	
	DKAddEvent("AddItem", "click", TradePost_OnEvent);
	DKAddEvent("Craigslist", "click", TradePost_OnEvent);
	DKAddEvent("Letgo", "click", TradePost_OnEvent);
	DKAddEvent("Letgo", "click", TradePost_OnEvent);
	DKAddEvent("OfferUp", "click", TradePost_OnEvent);
	DKAddEvent("Facebook", "click", TradePost_OnEvent);
	DKAddEvent("Ebay", "click", TradePost_OnEvent);
	DKAddEvent("Test", "click", TradePost_OnEvent);
	DKAddEvent("Refresh", "click", TradePost_OnEvent);
	
	//Create Items folder if it does not exist.
	if(!DKFile_Exists(DKAssets_LocalAssets()+"Items")){
		DKFile_MkDir(DKAssets_LocalAssets()+"Items");
	}
	
	TradePost_UpdateHeader();
	TradePost_LoadItems();
	TradePost_UpdateList();
}

////////////////////////
function TradePost_End()
{
	DKLog("TradePost_End()\n", DKDEBUG);
	DKRemoveEvents(TradePost_OnEvent);
	DKClose("TradePost/TradePost.html");
}

/////////////////////////////////
function TradePost_OnEvent(event)
{	
	DKLog("TradePost_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
	if(DK_Type(event, "DKCef_OnLoadEnd")){
		TradePost_PageLoaded(DK_GetValue(event));
		return;
	}
	//if(DK_Type(event, "DKCef_OnFileDialogDismissed")){
	//	TradePost_UploadImage(DK_GetValue(event));
	//	return;
	//}
	if(DK_Type(event, "keydown")){
		DKLog("key: "+DK_GetValue(event)+"\n");
	}
	
	if(DK_IdLike(event, "imageCell")){
		currentItem = DK_GetId(event).replace("imageCell","");
		DKCreate("TradePost/ItemImages.js", function(){
			ItemImages_SetItem(currentItem);
			DKCreate("DKGui/DKFrame.js", function(){
				DKFrame_Widget("TradePost/ItemImages.html");
			});
		});
		return;
	}
	if(DK_IdLike(event, "condition")){
		currentItem = DK_GetId(event).replace("condition","");
		DKCreate("TradePost/ConditionMenu.js", function(){
			DKMenu_ValidatePosition("TradePost/ConditionMenu.html");
		});
		return;
	}
	if(DK_IdLike(event, "catagory")){
		currentItem = DK_GetId(event).replace("catagory","");
		DKCreate("TradePost/CatagoryMenu.js", function(){
			DKMenu_ValidatePosition("TradePost/CatagoryMenu.html");
		});
		return;
	}
	if(DK_IdLike(event, "letgoLink")){
		currentItem = DK_GetId(event).replace("letgoLink","");
		window.open("https://us.letgo.com/en", "_blank", "width=800,height=600");
		return;
	}
	if(DK_IdLike(event, "letgoPost")){
		currentItem = DK_GetId(event).replace("letgoPost","");
		TradePost_LetGoPost(currentItem);
		return;
	}
	if(DK_IdLike(event, "offerupLink")){
		currentItem = DK_GetId(event).replace("offerupLink","");
		window.open("https://offerup.com", "_blank", "width=800,height=600");
		return;
	}
	if(DK_IdLike(event, "offerupPost")){
		currentItem = DK_GetId(event).replace("offerupPost","");
		DKLog("offerupPost \n");
		return;
	}
	if(DK_IdLike(event, "craigslistLink")){
		currentItem = DK_GetId(event).replace("craigslistLink","");
		window.open("https://inlandempire.craigslist.org/d/for-sale/search/sss", "_blank", "width=800,height=600");
		return;
	}
	if(DK_IdLike(event, "craigslistPost")){
		currentItem = DK_GetId(event).replace("craigslistPost","");
		DKLog("craigslistPost \n");
		return;
	}
	if(DK_IdLike(event, "facebookLink")){
		currentItem = DK_GetId(event).replace("facebookLink","");
		window.open("https://www.facebook.com/marketplace", "_blank", "width=800,height=600");
		return;
	}
	if(DK_IdLike(event, "facebookPost")){
		currentItem = DK_GetId(event).replace("facebookPost","");
		DKLog("facebookPost \n");
		return;
	}
	if(DK_IdLike(event, "ebayLink")){
		currentItem = DK_GetId(event).replace("ebayLink","");
		window.open("https://www.ebay.com", "_blank", "width=800,height=600");
		return;
	}
	if(DK_IdLike(event, "ebayPost")){
		currentItem = DK_GetId(event).replace("ebayPost","");
		DKLog("ebayPost \n");
		return;
	}
	if(DK_IdLike(event, "postAll")){
		currentItem = DK_GetId(event).replace("postAll","");
		DKLog("postAll \n");
		//TODO - post to all selected locations
		//TradePost_PostItem(currentItem);
		return;
	}
	
	if(DK_Id(event, "AddItem")){
		TradePost_AddItem();
		return;
	}
	if(DK_Id(event, "Craigslist")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://us.letgo.com/en');");
	}
	if(DK_Id(event, "Letgo")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://us.letgo.com/en');");
	}
	if(DK_Id(event, "OfferUp")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://offerup.com');");
	}
	if(DK_Id(event, "Facebook")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://www.facebook.com/marketplace');");
	}
	if(DK_Id(event, "Ebay")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://www.ebay.com');");
	}
	if(DK_Id(event, "Test")){
		TradePost_Test();
	}
	if(DK_Id(event, "Refresh")){
		DK_Refresh();
	}
	if(DK_Type(event, "keyup")){
		TradePost_ChangeText(DK_GetId(event), DK_GetValue(DK_GetId(event)));
		return;
	}
	if(DK_Type(event, "change")){
		TradePost_ChangeText(DK_GetId(event), DK_GetValue(DK_GetId(event)));
		return;
	}
	
	if(DK_Id(event, "header_id")){
		DKLog("header_id\n");
	}
	if(DK_Id(event, "header_image")){
		DKLog("header_image\n");
	}
	if(DK_Id(event, "header_title")){
		DKLog("header_title\n");
	}
	if(DK_Id(event, "header_description")){
		DKLog("header_description\n");
	}
	if(DK_Id(event, "header_make")){
		DKLog("header_make\n");
	}
	if(DK_Id(event, "header_model")){
		DKLog("header_model\n");
	}
	if(DK_Id(event, "header_condition")){
		DKLog("header_condition\n");
	}
	if(DK_Id(event, "header_catagory")){
		DKLog("header_catagory\n");
	}
	if(DK_Id(event, "header_price")){
		DKLog("header_price\n");
	}
	if(DK_Id(event, "header_date")){
		DKLog("header_date\n");
	}
	if(DK_Id(event, "header_post")){
		DKLog("header_post\n");
	}
}

////////////////////////////////////////
function TradePost_GetFirstAvailableId()
{
	if(!items){ return false; }
	
	//FIXME - find the first available number id in the items.id's
	var id = 0;
	for(var i = 0; i<items.length; i++){
		if(items[i].id == id){
			id++; i=0;
		}
	}
	
	return id;
}

////////////////////////////
function TradePost_AddItem()
{
	DKLog("TradePost_AddItem\n", DKDEBUG);
	var i = 0;
	while(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+i)){
		i++;
	}
	DKFile_MkDir(DKAssets_LocalAssets()+"Items/Item"+i);
	items.push({});
	items[items.length-1].id = TradePost_GetFirstAvailableId();
	
	//save date
	var event = new Date();
	var jsonDate = event.toJSON();
	items[items.length-1].date = jsonDate;
	
	TradePost_SaveItem(items.length-1);
	TradePost_UpdateList();
	var elmnt = document.getElementById("item"+items[items.length-1].id);
	elmnt.scrollIntoView();
}

////////////////////////////////
function TradePost_SaveItem(row)
{
	var json = JSON.stringify(items[row]);
	DKFile_StringToFile(json, DKAssets_LocalAssets()+"Items/Item"+items[row].id+"/data.json");
}

///////////////////////////////////
function TradePost_GetRowFromId(id)
{
	var row;
	for(var i=0; i<items.length; i++){
		if(items[i].id == id){
			row = i;
		}
	}
	return row;
}

///////////////////////////////////////
function TradePost_ChangeText(id, text)
{
	DKLog("TradePost_ChangeText("+id+", "+text+")\n", DKDEBUG);
	if(id.includes("title")){
		var id = id.replace("title","");
		var row = TradePost_GetRowFromId(id);
		items[row].title = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("description")){
		var id = id.replace("description","");
		var row = TradePost_GetRowFromId(id);
		items[row].description = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("make")){
		var id = id.replace("make","");
		var row = TradePost_GetRowFromId(id);
		items[row].make = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("model")){
		var id = id.replace("model","");
		var row = TradePost_GetRowFromId(id);
		items[row].model = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("condition")){
		var id = id.replace("condition","");
		var row = TradePost_GetRowFromId(id);
		items[row].condition = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("catagory")){
		var id = id.replace("catagory","");
		var row = TradePost_GetRowFromId(id);
		items[row].catagory = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("price")){
		var id = id.replace("price","");
		var row = TradePost_GetRowFromId(id);
		items[row].price = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("letgoCheck")){
		var id = id.replace("letgoCheck","");
		var row = TradePost_GetRowFromId(id);
		items[row].letgoCheck = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("offerupCheck")){
		var id = id.replace("offerupCheck","");
		var row = TradePost_GetRowFromId(id);
		items[row].offerupCheck = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("craigslistCheck")){
		var id = id.replace("craigslistCheck","");
		var row = TradePost_GetRowFromId(id);
		items[row].craigslistCheck = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("facebookCheck")){
		var id = id.replace("facebookCheck","");
		var row = TradePost_GetRowFromId(id);
		items[row].facebookCheck = text;
		TradePost_SaveItem(row);
	}
	else if(id.includes("ebayCheck")){
		var id = id.replace("ebayCheck","");
		var row = TradePost_GetRowFromId(id);
		items[row].ebayCheck = text;
		TradePost_SaveItem(row);
	}
}

//////////////////////////////
function TradePost_LoadItems()
{
	items = []; //clear items
	for(var row = 0; row < 1000; row++){
		if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row)){
			if(!DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/data.json")){
				//DKFile_StringToFile("", DKAssets_LocalAssets()+"Items/Item"+row+"/data.json");
				items.push({});
				items[items.length-1].id = TradePost_GetFirstAvailableId();
			}
			else{
				var json = DKFile_FileToString(DKAssets_LocalAssets()+"Items/Item"+row+"/data.json");
				if(json){
					var item = JSON.parse(json);
					items.push(item); //add item to items
				}
				else{
					items.push({});
					items[items.length-1].id = TradePost_GetFirstAvailableId();
				}
			}
		}
	}
}

/////////////////////////////////
function TradePost_UpdateHeader()
{
	//id		
	var header_id = DKWidget_CreateElement("Header", "div", "header_id");
	DKWidget_SetProperty(header_id, "display", "inline-block");
	DKWidget_SetProperty(header_id, "width", "30rem");
	DKWidget_SetProperty(header_id, "border-width", "1rem");
	DKWidget_SetProperty(header_id, "border-right-width", "0rem");
	DKWidget_SetProperty(header_id, "border-color", "black");
	DKWidget_SetProperty(header_id, "border-style", "solid");
	DKWidget_SetProperty(header_id, "border-style", "solid");
	DKWidget_SetProperty(header_id, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_id, "id");
	DKAddEvent(header_id, "click", TradePost_OnEvent);
	
	//image
	var header_image = DKWidget_CreateElement("Header", "div", "header_image");
	DKWidget_SetProperty(header_image, "display", "inline-block");
	DKWidget_SetProperty(header_image, "width", "142rem");
	DKWidget_SetProperty(header_image, "border-width", "1rem");
	DKWidget_SetProperty(header_image, "border-right-width", "0rem");
	DKWidget_SetProperty(header_image, "border-color", "black");
	DKWidget_SetProperty(header_image, "border-style", "solid");
	DKWidget_SetProperty(header_image, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_image, "image");
	DKAddEvent(header_image, "click", TradePost_OnEvent);
	
	//title
	var header_title = DKWidget_CreateElement("Header", "div", "header_title");
	DKWidget_SetProperty(header_title, "display", "inline-block");
	DKWidget_SetProperty(header_title, "width", "120rem");
	DKWidget_SetProperty(header_title, "border-width", "1rem");
	DKWidget_SetProperty(header_title, "border-right-width", "0rem");
	DKWidget_SetProperty(header_title, "border-color", "black");
	DKWidget_SetProperty(header_title, "border-style", "solid");
	DKWidget_SetProperty(header_title, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_title, "title");
	DKAddEvent(header_title, "click", TradePost_OnEvent);
	
	//description
	var header_description = DKWidget_CreateElement("Header", "div", "header_description");
	DKWidget_SetProperty(header_description, "display", "inline-block");
	DKWidget_SetProperty(header_description, "width", "220rem");
	DKWidget_SetProperty(header_description, "border-width", "1rem");
	DKWidget_SetProperty(header_description, "border-right-width", "0rem");
	DKWidget_SetProperty(header_description, "border-color", "black");
	DKWidget_SetProperty(header_description, "border-style", "solid");
	DKWidget_SetProperty(header_description, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_description, "description");
	DKAddEvent(header_description, "click", TradePost_OnEvent);
	
	//make
	var header_make = DKWidget_CreateElement("Header", "div", "header_make");
	DKWidget_SetProperty(header_make, "display", "inline-block");
	DKWidget_SetProperty(header_make, "width", "100rem");
	DKWidget_SetProperty(header_make, "border-width", "1rem");
	DKWidget_SetProperty(header_make, "border-right-width", "0rem");
	DKWidget_SetProperty(header_make, "border-color", "black");
	DKWidget_SetProperty(header_make, "border-style", "solid");
	DKWidget_SetProperty(header_make, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_make, "make");
	DKAddEvent(header_make, "click", TradePost_OnEvent);
	
	//model
	var header_model = DKWidget_CreateElement("Header", "div", "header_model");
	DKWidget_SetProperty(header_model, "display", "inline-block");
	DKWidget_SetProperty(header_model, "width", "100rem");
	DKWidget_SetProperty(header_model, "border-width", "1rem");
	DKWidget_SetProperty(header_model, "border-right-width", "0rem");
	DKWidget_SetProperty(header_model, "border-color", "black");
	DKWidget_SetProperty(header_model, "border-style", "solid");
	DKWidget_SetProperty(header_model, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_model, "model");
	DKAddEvent(header_model, "click", TradePost_OnEvent);
	
	//condition
	var header_condition = DKWidget_CreateElement("Header", "div", "header_condition");
	DKWidget_SetProperty(header_condition, "display", "inline-block");
	DKWidget_SetProperty(header_condition, "width", "100rem");
	DKWidget_SetProperty(header_condition, "border-width", "1rem");
	DKWidget_SetProperty(header_condition, "border-right-width", "0rem");
	DKWidget_SetProperty(header_condition, "border-color", "black");
	DKWidget_SetProperty(header_condition, "border-style", "solid");
	DKWidget_SetProperty(header_condition, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_condition, "condition");
	DKAddEvent(header_condition, "click", TradePost_OnEvent);
	
	//catagory
	var header_catagory = DKWidget_CreateElement("Header", "div", "header_catagory");
	DKWidget_SetProperty(header_catagory, "display", "inline-block");
	DKWidget_SetProperty(header_catagory, "width", "100rem");
	DKWidget_SetProperty(header_catagory, "border-width", "1rem");
	DKWidget_SetProperty(header_catagory, "border-right-width", "0rem");
	DKWidget_SetProperty(header_catagory, "border-color", "black");
	DKWidget_SetProperty(header_catagory, "border-style", "solid");
	DKWidget_SetProperty(header_catagory, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_catagory, "catagory");
	DKAddEvent(header_catagory, "click", TradePost_OnEvent);
	
	//price
	var header_price = DKWidget_CreateElement("Header", "div", "header_price");
	DKWidget_SetProperty(header_price, "display", "inline-block");
	DKWidget_SetProperty(header_price, "width", "70rem");
	DKWidget_SetProperty(header_price, "border-width", "1rem");
	DKWidget_SetProperty(header_price, "border-right-width", "0rem");
	DKWidget_SetProperty(header_price, "border-color", "black");
	DKWidget_SetProperty(header_price, "border-style", "solid");
	DKWidget_SetProperty(header_price, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_price, "price");
	DKAddEvent(header_price, "click", TradePost_OnEvent);
	
	//date
	var header_date = DKWidget_CreateElement("Header", "div", "header_date");
	DKWidget_SetProperty(header_date, "display", "inline-block");
	DKWidget_SetProperty(header_date, "width", "70rem");
	DKWidget_SetProperty(header_date, "border-width", "1rem");
	DKWidget_SetProperty(header_date, "border-right-width", "0rem");
	DKWidget_SetProperty(header_date, "border-color", "black");
	DKWidget_SetProperty(header_date, "border-style", "solid");
	DKWidget_SetProperty(header_date, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_date, "date");
	DKAddEvent(header_date, "click", TradePost_OnEvent);
	
	//post
	var header_post = DKWidget_CreateElement("Header", "div", "header_post");
	DKWidget_SetProperty(header_post, "display", "inline-block");
	DKWidget_SetProperty(header_post, "width", "165rem");
	DKWidget_SetProperty(header_post, "border-width", "1rem");
	//DKWidget_SetProperty(header_post, "border-right-width", "0rem");
	DKWidget_SetProperty(header_post, "border-color", "black");
	DKWidget_SetProperty(header_post, "border-style", "solid");
	DKWidget_SetProperty(header_post, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_post, "post");
	DKAddEvent(header_post, "click", TradePost_OnEvent);

}

///////////////////////////////
function TradePost_UpdateList()
{
	DKLog("TradePost_UpdateList\n", DKDEBUG);
	DKWidget_SetInnerHtml("ItemList", ""); //clear	
	
	for(var row=0; row<items.length; row++){
		var div = DKWidget_CreateElement("ItemList", "div", "item"+items[row].id);
		DKWidget_SetProperty(div, "display", "inline-block");
		DKWidget_SetProperty(div, "width", "1250rem");
		DKWidget_SetProperty(div, "min-width", "450rem");
		DKWidget_SetProperty(div, "background-color", "rgb(200,200,200)");
		
		
		//id		
		var num = DKWidget_CreateElement(div, "div", "itemId"+items[row].id);
		DKWidget_SetProperty(num, "display", "inline-block");
		DKWidget_SetProperty(num, "overflow", "hidden");
		DKWidget_SetProperty(num, "width", "30rem");
		DKWidget_SetProperty(num, "height", rowHeight);
		DKWidget_SetProperty(num, "border-width", "1rem");
		DKWidget_SetProperty(num, "border-right-width", "0rem");
		DKWidget_SetProperty(num, "border-color", "black");
		DKWidget_SetProperty(num, "border-style", "solid");
		DKWidget_SetValue(num, items[row].id);
			
			
		//image
		var imageCell = DKWidget_CreateElement(div, "div", "imageCell"+items[row].id);
		DKWidget_SetProperty(imageCell, "display", "inline-block");
		DKWidget_SetProperty(imageCell, "width", "142rem");
		DKWidget_SetProperty(imageCell, "height", rowHeight);
		DKWidget_SetProperty(imageCell, "text-align", "center");
		DKWidget_SetProperty(imageCell, "overflow", "hidden");
		DKWidget_SetProperty(imageCell, "border-width", "1rem");
		DKWidget_SetProperty(imageCell, "border-right-width", "0rem");
		DKWidget_SetProperty(imageCell, "border-color", "black");
		DKWidget_SetProperty(imageCell, "border-style", "solid");
		DKAddEvent(imageCell, "click", TradePost_OnEvent);
			
		var img = DKWidget_CreateElement(imageCell, "img", "img"+items[row].id);
		DKWidget_SetProperty(img, "display", "block");
		DKWidget_SetProperty(img, "width", "100%");
		DKWidget_SetProperty(img, "margin", "auto");
		if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+items[row].id+"/Img0.jpg")){
			DKWidget_SetAttribute(img, "src", DKAssets_LocalAssets()+"Items/Item"+items[row].id+"/Img0.jpg?"+new Date().getTime());
		}
			
		
		//title	
		var titleCell = DKWidget_CreateElement(div, "div", "titleCell"+items[row].id);
		DKWidget_SetProperty(titleCell, "overflow", "hidden");
		DKWidget_SetProperty(titleCell, "width", "120rem");
		DKWidget_SetProperty(titleCell, "height", rowHeight);
		DKWidget_SetProperty(titleCell, "display", "inline-block");
		DKWidget_SetProperty(titleCell, "border-width", "1rem");
		DKWidget_SetProperty(titleCell, "border-right-width", "0rem");
		DKWidget_SetProperty(titleCell, "border-color", "black");
		DKWidget_SetProperty(titleCell, "border-style", "solid");
		
		var title = DKWidget_CreateElement(titleCell, "textarea", "title"+items[row].id);
		DKWidget_SetProperty(title, "width", "100%");
		DKWidget_SetProperty(title, "height", "100%");
		DKWidget_SetProperty(title, "overflow-x", "hidden");
		DKWidget_SetProperty(title, "word-wrap", "break-word");
		DKWidget_SetProperty(title, "border-width", "0rem");
		DKWidget_SetProperty(title, "font-weight", "bold");
		DKWidget_SetProperty(title, "font-family", "Verdana,sans-serif");
		DKWidget_SetProperty(title, "font-size", "11rem");
		DKAddEvent(title, "keyup", TradePost_OnEvent);
		DKAddEvent(title, "change", TradePost_OnEvent);
		if(items[row].title){
			DKWidget_SetValue(title, items[row].title);
		}
			
			
		//description
		var descriptionCell = DKWidget_CreateElement(div, "div", "descriptionCell"+items[row].id);
		DKWidget_SetProperty(descriptionCell, "overflow", "hidden");
		DKWidget_SetProperty(descriptionCell, "width", "220rem");
		DKWidget_SetProperty(descriptionCell, "height", rowHeight);
		DKWidget_SetProperty(descriptionCell, "display", "inline-block");
		DKWidget_SetProperty(descriptionCell, "border-width", "1rem");
		DKWidget_SetProperty(descriptionCell, "border-right-width", "0rem");
		DKWidget_SetProperty(descriptionCell, "border-color", "black");
		DKWidget_SetProperty(descriptionCell, "border-style", "solid");

		var description = DKWidget_CreateElement(descriptionCell, "textarea", "description"+items[row].id);
		DKWidget_SetProperty(description, "width", "100%");
		DKWidget_SetProperty(description, "height", "100%");
		DKWidget_SetProperty(description, "overflow-x", "hidden");
		DKWidget_SetProperty(description, "word-wrap", "break-word");
		DKWidget_SetProperty(description, "border-width", "0rem");
		DKWidget_SetProperty(description, "font-family", "Verdana,sans-serif");
		DKWidget_SetProperty(description, "font-size", "11rem");
		DKAddEvent(description, "keyup", TradePost_OnEvent);
		DKAddEvent(description, "change", TradePost_OnEvent);
		if(items[row].description){
			DKWidget_SetValue(description, items[row].description);
		}
		
		
		//make
		var makeCell = DKWidget_CreateElement(div, "div", "makeCell"+items[row].id);
		DKWidget_SetProperty(makeCell, "overflow", "hidden");
		DKWidget_SetProperty(makeCell, "width", "100rem");
		DKWidget_SetProperty(makeCell, "height", rowHeight);
		DKWidget_SetProperty(makeCell, "display", "inline-block");
		DKWidget_SetProperty(makeCell, "border-width", "1rem");
		DKWidget_SetProperty(makeCell, "border-right-width", "0rem");
		DKWidget_SetProperty(makeCell, "border-color", "black");
		DKWidget_SetProperty(makeCell, "border-style", "solid");
		
		var make = DKWidget_CreateElement(makeCell, "textarea", "make"+items[row].id);
		DKWidget_SetProperty(make, "width", "100%");
		DKWidget_SetProperty(make, "height", "100%");
		DKWidget_SetProperty(make, "overflow-x", "hidden");
		DKWidget_SetProperty(make, "word-wrap", "break-word");
		DKWidget_SetProperty(make, "border-width", "0rem");
		DKWidget_SetProperty(make, "font-family", "Verdana,sans-serif");
		DKWidget_SetProperty(make, "font-size", "11rem");
		DKAddEvent(make, "keyup", TradePost_OnEvent);
		DKAddEvent(make, "change", TradePost_OnEvent);
		if(items[row].make){
			DKWidget_SetValue(make, items[row].make);
		}
		
		
		//model
		var modelCell = DKWidget_CreateElement(div, "div", "modelCell"+items[row].id);
		DKWidget_SetProperty(modelCell, "overflow", "hidden");
		DKWidget_SetProperty(modelCell, "width", "100rem");
		DKWidget_SetProperty(modelCell, "height", rowHeight);
		DKWidget_SetProperty(modelCell, "display", "inline-block");
		DKWidget_SetProperty(modelCell, "border-width", "1rem");
		DKWidget_SetProperty(modelCell, "border-right-width", "0rem");
		DKWidget_SetProperty(modelCell, "border-color", "black");
		DKWidget_SetProperty(modelCell, "border-style", "solid");
		
		var model = DKWidget_CreateElement(modelCell, "textarea", "model"+items[row].id);
		DKWidget_SetProperty(model, "width", "100%");
		DKWidget_SetProperty(model, "height", "100%");
		DKWidget_SetProperty(model, "overflow-x", "hidden");
		DKWidget_SetProperty(model, "word-wrap", "break-word");
		DKWidget_SetProperty(model, "border-width", "0rem");
		DKWidget_SetProperty(model, "font-family", "Verdana,sans-serif");
		DKWidget_SetProperty(model, "font-size", "11rem");
		DKAddEvent(model, "keyup", TradePost_OnEvent);
		DKAddEvent(model, "change", TradePost_OnEvent);
		if(items[row].model){
			DKWidget_SetValue(model, items[row].model);
		}
		
		
		//condition
		var conditionCell = DKWidget_CreateElement(div, "div", "conditionCell"+items[row].id);
		DKWidget_SetProperty(conditionCell, "display", "inline-block");
		DKWidget_SetProperty(conditionCell, "overflow", "hidden");
		DKWidget_SetProperty(conditionCell, "width", "100rem");
		DKWidget_SetProperty(conditionCell, "height", rowHeight);
		DKWidget_SetProperty(conditionCell, "border-width", "1rem");
		DKWidget_SetProperty(conditionCell, "border-right-width", "0rem");
		DKWidget_SetProperty(conditionCell, "border-color", "black");
		DKWidget_SetProperty(conditionCell, "border-style", "solid");
			
		var condition = DKWidget_CreateElement(conditionCell, "textarea", "condition"+items[row].id);
		DKWidget_SetAttribute(condition, "type", "text");
		DKWidget_SetProperty(condition, "display", "inline-block");
		DKWidget_SetProperty(condition, "width", "100%");
		DKWidget_SetProperty(condition, "height", "100%");
		DKWidget_SetProperty(condition, "word-wrap", "break-word");
		DKWidget_SetProperty(condition, "overflow-x", "hidden");
		DKAddEvent(condition, "click", TradePost_OnEvent);
		DKAddEvent(condition, "change", TradePost_OnEvent);
		if(items[row].condition){
			DKWidget_SetValue(condition, items[row].condition);
		}
		
	
		//catagory
		var catagoryCell = DKWidget_CreateElement(div, "div", "catagoryCell"+items[row].id);
		DKWidget_SetProperty(catagoryCell, "display", "inline-block");
		DKWidget_SetProperty(catagoryCell, "overflow", "hidden");
		DKWidget_SetProperty(catagoryCell, "width", "100rem");
		DKWidget_SetProperty(catagoryCell, "height", rowHeight);
		DKWidget_SetProperty(catagoryCell, "border-width", "1rem");
		DKWidget_SetProperty(catagoryCell, "border-right-width", "0rem");
		DKWidget_SetProperty(catagoryCell, "border-color", "black");
		DKWidget_SetProperty(catagoryCell, "border-style", "solid");
			
		var catagory = DKWidget_CreateElement(catagoryCell, "textarea", "catagory"+items[row].id);
		DKWidget_SetAttribute(catagory, "type", "text");
		DKWidget_SetProperty(catagory, "display", "inline-block");
		DKWidget_SetProperty(catagory, "width", "100%");
		DKWidget_SetProperty(catagory, "height", "100%");
		DKWidget_SetProperty(catagory, "word-wrap", "break-word");
		DKWidget_SetProperty(catagory, "overflow-x", "hidden");
		DKAddEvent(catagory, "click", TradePost_OnEvent);
		DKAddEvent(catagory, "change", TradePost_OnEvent);
		if(items[row].catagory){
			DKWidget_SetValue(catagory, items[row].catagory);
		}
			
			
		//price
		var priceCell = DKWidget_CreateElement(div, "div", "priceCell"+items[row].id);
		DKWidget_SetProperty(priceCell, "display", "inline-block");
		DKWidget_SetProperty(priceCell, "overflow", "hidden");
		DKWidget_SetProperty(priceCell, "width", "70rem");
		DKWidget_SetProperty(priceCell, "height", rowHeight);
		DKWidget_SetProperty(priceCell, "text-align", "center");
		DKWidget_SetProperty(priceCell, "border-width", "1rem");
		DKWidget_SetProperty(priceCell, "border-right-width", "0rem");
		DKWidget_SetProperty(priceCell, "border-color", "black");
		DKWidget_SetProperty(priceCell, "border-style", "solid");
			
		var price = DKWidget_CreateElement(priceCell, "textarea", "price"+items[row].id);
		DKWidget_SetAttribute(price, "type", "text");
		DKWidget_SetProperty(price, "display", "inline-block");
		DKWidget_SetProperty(price, "width", "100%");
		DKWidget_SetProperty(price, "height", "100%");
		DKWidget_SetProperty(price, "word-wrap", "break-word");
		DKWidget_SetProperty(price, "overflow-x", "hidden");
		DKWidget_SetProperty(price, "font-size", "15rem");
		DKAddEvent(price, "keyup", TradePost_OnEvent);
		DKAddEvent(price, "change", TradePost_OnEvent);
		if(items[row].price){
			DKWidget_SetValue(price, items[row].price);
		}
		
		
		//date		
		var date = DKWidget_CreateElement(div, "div", "date"+items[row].id);
		DKWidget_SetProperty(date, "display", "inline-block");
		DKWidget_SetProperty(date, "overflow", "hidden");
		DKWidget_SetProperty(date, "width", "70rem");
		DKWidget_SetProperty(date, "height", rowHeight);
		DKWidget_SetProperty(date, "border-width", "1rem");
		DKWidget_SetProperty(date, "border-right-width", "0rem");
		DKWidget_SetProperty(date, "border-color", "black");
		DKWidget_SetProperty(date, "border-style", "solid");
		var _date = new Date(items[row].date).toUTCString()
		if(_date){
			DKWidget_SetValue(date, _date);
		}
		
		
		//post
		var postCell = DKWidget_CreateElement(div, "div", "postCell"+items[row].id);
		DKWidget_SetProperty(postCell, "position", "relative");
		DKWidget_SetProperty(postCell, "display", "inline-block");
		DKWidget_SetProperty(postCell, "overflow", "hidden");
		DKWidget_SetProperty(postCell, "width", "165rem");
		DKWidget_SetProperty(postCell, "height", rowHeight);
		DKWidget_SetProperty(postCell, "border-width", "1rem");
		//DKWidget_SetProperty(postCell, "border-right-width", "0rem");
		DKWidget_SetProperty(postCell, "border-color", "black");
		DKWidget_SetProperty(postCell, "border-style", "solid");
		
		
		var letgoCheck = DKWidget_CreateElement(postCell, "input", "letgoCheck"+items[row].id);
		DKWidget_SetAttribute(letgoCheck, "type", "checkbox");
		DKWidget_SetProperty(letgoCheck, "position", "absolute");
		DKWidget_SetProperty(letgoCheck, "top", "3rem");
		DKWidget_SetProperty(letgoCheck, "width", "16px");
		DKWidget_SetProperty(letgoCheck, "height", "16px");
		DKWidget_SetValue(letgoCheck, items[row].letgoCheck);
		DKAddEvent(letgoCheck, "change", TradePost_OnEvent);
		
		var letgoLink = DKWidget_CreateElement(postCell, "img", "letgoLink"+items[row].id);
		DKWidget_SetAttribute(letgoLink, "src", DKAssets_LocalAssets()+"/TradePost/letgo_small.png");
		DKWidget_SetProperty(letgoLink, "position", "absolute");
		DKWidget_SetProperty(letgoLink, "left", "20rem");
		DKAddEvent(letgoLink, "click", TradePost_OnEvent);
		
		var letgoAge = DKWidget_CreateElement(postCell, "div", "letgoAge"+items[row].id);
		DKWidget_SetProperty(letgoAge, "position", "absolute");
		DKWidget_SetProperty(letgoAge, "top", "6rem");
		DKWidget_SetProperty(letgoAge, "left", "53rem");
		DKWidget_SetProperty(letgoAge, "font-weight", "bold");
		DKWidget_SetInnerHtml(letgoAge, "8d");
		
		var letgoPost = DKWidget_CreateElement(postCell, "img", "letgoPost"+items[row].id);
		DKWidget_SetAttribute(letgoPost, "src", DKAssets_LocalAssets()+"/TradePost/post.png");
		DKWidget_SetProperty(letgoPost, "position", "absolute");
		DKWidget_SetProperty(letgoPost, "top", "3rem");
		DKWidget_SetProperty(letgoPost, "left", "80rem");
		DKAddEvent(letgoPost, "click", TradePost_OnEvent);
		
		
		var offerupCheck = DKWidget_CreateElement(postCell, "input", "offerupCheck"+items[row].id);
		DKWidget_SetAttribute(offerupCheck, "type", "checkbox");
		DKWidget_SetProperty(offerupCheck, "position", "absolute");
		DKWidget_SetProperty(offerupCheck, "top", "33rem");
		DKWidget_SetProperty(offerupCheck, "width", "16px");
		DKWidget_SetProperty(offerupCheck, "height", "16px");
		DKWidget_SetValue(offerupCheck, items[row].offerupCheck);
		DKAddEvent(offerupCheck, "change", TradePost_OnEvent);
		
		var offerupLink = DKWidget_CreateElement(postCell, "img", "offerupLink"+items[row].id);
		DKWidget_SetAttribute(offerupLink, "src", DKAssets_LocalAssets()+"/TradePost/offerup_small.png");
		DKWidget_SetProperty(offerupLink, "position", "absolute");
		DKWidget_SetProperty(offerupLink, "top", "30rem");
		DKWidget_SetProperty(offerupLink, "left", "20rem");
		DKAddEvent(offerupLink, "click", TradePost_OnEvent);
		
		var offerupAge = DKWidget_CreateElement(postCell, "div", "offerupAge"+items[row].id);
		DKWidget_SetProperty(offerupAge, "position", "absolute");
		DKWidget_SetProperty(offerupAge, "top", "36rem");
		DKWidget_SetProperty(offerupAge, "left", "53rem");
		DKWidget_SetProperty(offerupAge, "font-weight", "bold");
		DKWidget_SetInnerHtml(offerupAge, "4h");
		
		var offerupPost = DKWidget_CreateElement(postCell, "img", "offerupPost"+items[row].id);
		DKWidget_SetAttribute(offerupPost, "src", DKAssets_LocalAssets()+"/TradePost/post.png");
		DKWidget_SetProperty(offerupPost, "position", "absolute");
		DKWidget_SetProperty(offerupPost, "top", "33rem");
		DKWidget_SetProperty(offerupPost, "left", "80rem");
		DKAddEvent(offerupPost, "click", TradePost_OnEvent);
		
		
		var craigslistCheck = DKWidget_CreateElement(postCell, "input", "craigslistCheck"+items[row].id);
		DKWidget_SetAttribute(craigslistCheck, "type", "checkbox");
		DKWidget_SetProperty(craigslistCheck, "position", "absolute");
		DKWidget_SetProperty(craigslistCheck, "top", "63rem");
		DKWidget_SetProperty(craigslistCheck, "width", "16px");
		DKWidget_SetProperty(craigslistCheck, "height", "16px");
		DKWidget_SetValue(craigslistCheck, items[row].craigslistCheck);
		DKAddEvent(craigslistCheck, "change", TradePost_OnEvent);
		
		var craigslistLink = DKWidget_CreateElement(postCell, "img", "craigslistLink"+items[row].id);
		DKWidget_SetAttribute(craigslistLink, "src", DKAssets_LocalAssets()+"/TradePost/craigslist_small.jpg");
		DKWidget_SetProperty(craigslistLink, "position", "absolute");
		DKWidget_SetProperty(craigslistLink, "top", "60rem");
		DKWidget_SetProperty(craigslistLink, "left", "20rem");
		DKAddEvent(craigslistLink, "click", TradePost_OnEvent);
		
		var craigslistAge = DKWidget_CreateElement(postCell, "div", "craigslistAge"+items[row].id);
		DKWidget_SetProperty(craigslistAge, "position", "absolute");
		DKWidget_SetProperty(craigslistAge, "top", "66rem");
		DKWidget_SetProperty(craigslistAge, "left", "53rem");
		DKWidget_SetProperty(craigslistAge, "font-weight", "bold");
		DKWidget_SetInnerHtml(craigslistAge, "2d");
		
		var craigslistPost = DKWidget_CreateElement(postCell, "img", "craigslistPost"+items[row].id);
		DKWidget_SetAttribute(craigslistPost, "src", DKAssets_LocalAssets()+"/TradePost/post.png");
		DKWidget_SetProperty(craigslistPost, "position", "absolute");
		DKWidget_SetProperty(craigslistPost, "top", "63rem");
		DKWidget_SetProperty(craigslistPost, "left", "80rem");
		DKAddEvent(craigslistPost, "click", TradePost_OnEvent);
		
		
		var facebookCheck = DKWidget_CreateElement(postCell, "input", "facebookCheck"+items[row].id);
		DKWidget_SetAttribute(facebookCheck, "type", "checkbox");
		DKWidget_SetProperty(facebookCheck, "position", "absolute");
		DKWidget_SetProperty(facebookCheck, "top", "93rem");
		DKWidget_SetProperty(facebookCheck, "width", "16px");
		DKWidget_SetProperty(facebookCheck, "height", "16px");
		DKWidget_SetValue(facebookCheck, items[row].facebookCheck);
		DKAddEvent(facebookCheck, "change", TradePost_OnEvent);
		
		var facebookLink = DKWidget_CreateElement(postCell, "img", "facebookLink"+items[row].id);
		DKWidget_SetAttribute(facebookLink, "src", DKAssets_LocalAssets()+"/TradePost/facebook_small.png");
		DKWidget_SetProperty(facebookLink, "position", "absolute");
		DKWidget_SetProperty(facebookLink, "top", "90rem");
		DKWidget_SetProperty(facebookLink, "left", "20rem");
		DKAddEvent(facebookLink, "click", TradePost_OnEvent);
		
		var facebookAge = DKWidget_CreateElement(postCell, "div", "facebookAge"+items[row].id);
		DKWidget_SetProperty(facebookAge, "position", "absolute");
		DKWidget_SetProperty(facebookAge, "top", "96rem");
		DKWidget_SetProperty(facebookAge, "left", "53rem");
		DKWidget_SetProperty(facebookAge, "font-weight", "bold");
		DKWidget_SetInnerHtml(facebookAge, "13w");
		
		var facebookPost = DKWidget_CreateElement(postCell, "img", "facebookPost"+items[row].id);
		DKWidget_SetAttribute(facebookPost, "src", DKAssets_LocalAssets()+"/TradePost/post.png");
		DKWidget_SetProperty(facebookPost, "position", "absolute");
		DKWidget_SetProperty(facebookPost, "top", "93rem");
		DKWidget_SetProperty(facebookPost, "left", "80rem");
		DKAddEvent(facebookPost, "click", TradePost_OnEvent);
		
		
		var ebayCheck = DKWidget_CreateElement(postCell, "input", "ebayCheck"+items[row].id);
		DKWidget_SetAttribute(ebayCheck, "type", "checkbox");
		DKWidget_SetProperty(ebayCheck, "position", "absolute");
		DKWidget_SetProperty(ebayCheck, "top", "123rem");
		DKWidget_SetProperty(ebayCheck, "width", "16px");
		DKWidget_SetProperty(ebayCheck, "height", "16px");
		DKWidget_SetValue(ebayCheck, items[row].ebayCheck);
		DKAddEvent(ebayCheck, "change", TradePost_OnEvent);
		
		var ebayLink = DKWidget_CreateElement(postCell, "img", "ebayLink"+items[row].id);
		DKWidget_SetAttribute(ebayLink, "src", DKAssets_LocalAssets()+"/TradePost/ebay_small.png");
		DKWidget_SetProperty(ebayLink, "position", "absolute");
		DKWidget_SetProperty(ebayLink, "top", "120rem");
		DKWidget_SetProperty(ebayLink, "left", "20rem");
		DKAddEvent(ebayLink, "click", TradePost_OnEvent);
		
		var ebayAge = DKWidget_CreateElement(postCell, "div", "ebayAge"+items[row].id);
		DKWidget_SetProperty(ebayAge, "position", "absolute");
		DKWidget_SetProperty(ebayAge, "top", "126rem");
		DKWidget_SetProperty(ebayAge, "left", "53rem");
		DKWidget_SetProperty(ebayAge, "font-weight", "bold");
		DKWidget_SetInnerHtml(ebayAge, "5d");
		
		var ebayPost = DKWidget_CreateElement(postCell, "img", "ebayPost"+items[row].id);
		DKWidget_SetAttribute(ebayPost, "src", DKAssets_LocalAssets()+"/TradePost/post.png");
		DKWidget_SetProperty(ebayPost, "position", "absolute");
		DKWidget_SetProperty(ebayPost, "top", "123rem");
		DKWidget_SetProperty(ebayPost, "left", "80rem");
		DKAddEvent(ebayPost, "click", TradePost_OnEvent);
		
		
		var postAll = DKWidget_CreateElement(postCell, "img", "postAll"+items[row].id);
		DKWidget_SetAttribute(postAll, "src", DKAssets_LocalAssets()+"/TradePost/postAll.png");
		DKWidget_SetProperty(postAll, "position", "absolute");
		DKWidget_SetProperty(postAll, "top", "2rem");
		DKWidget_SetProperty(postAll, "left", "110rem");
		DKAddEvent(postAll, "click", TradePost_OnEvent);
	}
}

////////////////////////////////////
function TradePost_UploadImage(file)
{
	DKLog("TradePost_UploadImage("+file+")\n", DKDEBUG);
	if(!file){ return; }
	DKFile_Copy(file, DKAssets_LocalAssets()+"Items/Item"+currentItem+"/Img0.jpg", true);
	DKWidget_SetAttribute("img"+currentItem, "src", DKAssets_LocalAssets()+"Items/Item"+currentItem+"/Img0.jpg?"+new Date().getTime());
}


/////////////////////////
function TradePost_Test()
{
	DKLog("TradePost_Test\n", DKDEBUG);
	
	DKLog("######### ITEMS ##########\n");
	for(var i=0; i<items.length; i++){
		/*
		DKLog("\n");
		DKLog("items["+i+"]id: "+items[i].id+"\n");
		DKLog("items["+i+"]title: "+items[i].title+"\n");
		DKLog("items["+i+"]description: "+items[i].description+"\n");
		DKLog("items["+i+"]catagory: "+items[i].catagory+"\n");
		DKLog("items["+i+"]price: "+items[i].price+"\n");
		*/
		
		//var json_string = JSON.stringify(items[i]);
		//DKLog(json_string+"\n");
		
		/*
		var item_object = JSON.parse(json_string);
		DKLog("item_object.id: "+item_object.id+"\n");
		DKLog("item_object.title: "+item_object.title+"\n");
		DKLog("item_object.description: "+item_object.description+"\n");
		DKLog("item_object.catagory: "+item_object.catagory+"\n");
		DKLog("item_object.price: "+item_object.price+"\n");
		*/
	}
	
	
	//Wait for a Open Files window to appear, set the path, select all files, open
	DKCreate("DKHandles");
	if(!DKHandles_WaitForWindow("Open Files", 5)){
		DKLog("Open Files never showed up\n", DKERROR);
		return;
	}
	if(!DKHandles_WaitForWindow("Address", 1)){
		DKLog("address bar never showed up\n", DKERROR);
		return;
	}
	
	var currentHandle = DKHandles_CurrentHandle();
	
	if(!DKHandles_SetWindowHandle("Address", 3)){
		DKLog("DKHandles_SetWindowHandle(\"Address\"): failed\n");
	}
	var currentHandle = DKHandles_CurrentHandle();
	var top = DKHandles_GetTop(currentHandle);
	var left = DKHandles_GetLeft(currentHandle);
	var right = DKHandles_GetRight(currentHandle);
	var bottom = DKHandles_GetBottom(currentHandle);
	DKLog("top = "+top+"\n");
	DKLog("left = "+left+"\n");
	DKLog("right = "+right+"\n");
	DKLog("bottom = "+bottom+"\n");
	
	//Process url bar
	DK_SetMousePos(left+10,top+10);
	DK_LeftClick();
	//We need the correct images path of the current item
	var path = "C:/digitalknob/MyApps/DKApps/TradePost/assets/Items/Item6";
	DK_SetClipboard(path);
	DK_PressKey(17); DK_Sleep(100); // ctrl down
	DK_StrokeKey(86); DK_Sleep(100); // v
	DK_ReleaseKey(17); DK_Sleep(100); // ctrl up
	DK_StrokeKey(13); DK_Sleep(100); // enter
	
	//Process folders window
	DK_StrokeKey(9); DK_Sleep(100); // tab
	DK_StrokeKey(9); DK_Sleep(100); // tab
	DK_StrokeKey(9); DK_Sleep(100); // tab
	DK_PressKey(17); DK_Sleep(100); // ctrl down
	DK_StrokeKey(65); DK_Sleep(100); // a 
	DK_ReleaseKey(17); DK_Sleep(100); // ctrl up
	
	//This will press open
	//DK_StrokeKey(13); //enter
}

////////////////////////////////////
function TradePost_PostItem(itemNum)
{
	DKLog("TradePost_PostItem("+itemNum+")\n", DKDEBUG);
	//action = "PostToCraigslist";
	//DK_QueueDuktape("DKBrowser_NewTab();");
	//DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://post.craigslist.org/c/inl');");
}

////////////////////////////////////
function TradePost_PageLoaded(value)
{
	DKLog("TradePost_PageLoaded("+value+")\n", DKDEBUG);
	
	if(DKCef_GetBrowsers() < 2){ return; }
	var url = DKCef_GetUrl("", 1);
	//DKLog("url = "+url);
	
	if(action == "PostToCraigslist"){
		if(url.indexOf("s=preview") != -1){ action = ""; return;} //End posting in on the preview screen
		var title = document.getElementById("title"+currentItem).value;
		var price = document.getElementById("price"+currentItem).value.replace("$","");
		var city = "Lake Elsinore";
		var zip = "92570";
		var description = escape(document.getElementById("description"+currentItem).value);
		DKLog(description);
		var make = " ";
		var model = " ";
		var condition = "new";
		var email = "dummy@email.com";
		var phone = "7146316285";
		var name = "Paul";
		var street = "Patterson St.";
		var images = DKAssets_LocalAssets()+"Items/Item"+items[currentItem].id;
		
		var code = PostToCraigslist.toString() + "PostToCraigslist('"+title+"','"+price+"','"+city+"','"+zip+"','"+description+"','"+make+"','"+model+"','"+condition+"','"+email+"','"+phone+"','"+name+"','"+street+"','"+images+"')";

		DKCef_RunJavascript(0, 1, code);
	}
	
	if(action == "PostToLetGo"){
		//TODO - create a condition to quit here
		var title = document.getElementById("title"+currentItem).value;
		var price = document.getElementById("price"+currentItem).value.replace("$","");
		var city = "Lake Elsinore";
		var zip = "92570";
		var description = escape(document.getElementById("description"+currentItem).value);
		DKLog(description);
		var make = " ";
		var model = " ";
		var condition = "new";
		var email = "dummy@email.com";
		var phone = "7146316285";
		var name = "Paul";
		var street = "Patterson St.";
		var images = DKAssets_LocalAssets()+"Items/Item"+items[currentItem].id;
		
		var code = PostToLetGo.toString() + "PostToLetGo('"+title+"','"+price+"','"+city+"','"+zip+"','"+description+"','"+make+"','"+model+"','"+condition+"','"+email+"','"+phone+"','"+name+"','"+street+"','"+images+"')";
		
		DKCef_RunJavascript(0, 1, code);
	}
	action = "";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PostToCraigslist(title, price, city, zip, description, make, model, condition, email, phone, name, street, images)
{
	console.log("PostToCraigslist(many vars))\n");
	var url = window.location.toString();
	
	//Craigslist post page - type
	if(url.indexOf("https://post.craigslist.org") != -1 && url.indexOf("s=type") != -1){
		document.querySelector('input[value="fso"]').click();
		document.querySelector('button[name="go"]').click();
		return;
	}
	
	//Craigslist post page - Catagory
	if(url.indexOf("https://post.craigslist.org") != -1 && url.indexOf("s=cat") != -1){
		document.querySelector('input[value="96"]').click();
		document.querySelector('button[name="go"]').click();
		return;
	}
	
	//Craigslist post page - Edit
	if(url.indexOf("https://post.craigslist.org") != -1 && url.indexOf("s=edit") != -1 && url.indexOf("s=editimage") == -1){
		document.querySelector('input[id="PostingTitle"]').value = title;
		document.querySelector('input[name="price"]').value = Number(price);
		document.querySelector('input[id="GeographicArea"]').value = city;
		document.querySelector('input[id="postal_code"]').value = zip;
		document.querySelector('textarea[id="PostingBody"]').value = description;
		document.querySelector('input[name="sale_manufacturer"]').value = make;
		document.querySelector('input[name="sale_model"]').value = model;
		//document.querySelector('select[name="condition"]').value = condition;
		document.querySelector('input[name="FromEMail"]').value = email;
		document.querySelector('input[name="ConfirmEMail"]').value = email;
		document.querySelector('input[name="contact_text_ok"]').click();
		document.querySelector('input[name="contact_phone"]').value = phone;
		document.querySelector('input[name="contact_name"]').value = name;
		document.querySelector('input[name="xstreet0"]').value = street;
		document.querySelector('input[name="city"]').value = city;
		document.querySelector('button[name="go"]').click();
		return;
	}
	
	//Craigslist post page - Location
	if(url.indexOf("https://post.craigslist.org") != -1 && url.indexOf("s=geoverify") != -1){
		document.querySelector('button[class="continue bigbutton"]').click();
		return;
	}
	
	//Craigslist post page - Edit Image
	if(url.indexOf("https://post.craigslist.org") != -1 && url.indexOf("s=editimage") != -1){
		//TODO - add images
		document.querySelector('button[class="done bigbutton"]').click();
		return;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PostToLetGo(title, price, city, zip, description, make, model, condition, email, phone, name, street, images)
{
	console.log("PostToLetGo(many vars))\n");
	/*
	function sleep(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	*/
	
	function WaitForElement(selector, time, callback){
		console.log("WaitForElement("+selector+", "+time+")\n");
		if(document.querySelector(selector) != null){
			console.log("WaitForElement("+selector+", "+time+") = true\n");
			callback && callback(true);
			return true;
		}
		else{
			console.log("WaitForElement("+selector+", "+time+") = false\n");
			if(time < 100){
				console.log("WaitForElement("+selector+", "+time+") = time < 100\n");
				callback && callback(false);
				return false
			}
			setTimeout( function(){ WaitForElement(selector, time-100, callback); }, 100); //test every 10th of a second
		}
	};

	
	var url = window.location.toString();
		
	if(url.indexOf("https://us.letgo.com/en") != -1){
		WaitForElement('button[data-test="chat-button"]', 5000, function(rval){  //wait for 5 seconds
			if(rval == false){
				console.log("'button[data-test=\"chat-button\"] NOT FOUND'\n");
				return;
			}
			document.querySelector('button[data-test="sell-your-stuff-button"]').click(); //Sell button
			WaitForElement('div[class="dropZoneDefault"]', 5000, function(rval){
				if(rval == false){
					console.log("'div[class=\"dropZoneDefault\"]' NOT FOUND!");
					return;
				}
				images = images.replace(",","");
				DK_Run(DKAssets_LocalAssets()+"TradePost/AutoOpener.exe", images); //run the auto opener tool
				var x = Number(DKWindow_GetX()) + (Number(DKWindow_GetWidth()) / 2);
				var y = Number(DKWindow_GetY()) + 320;
				DK_SetMousePos(x,y);
				DK_LeftClick();
				WaitForElement('input[name="price"]', 5000, function(rval){ //Price
					if(rval == false){
						console.log("'input[name=\"price\"]' NOT FOUND!");
						return;
					}
					console.log("'input[name=\"price\"]' FOUND!");
					document.querySelector('input[name="price"]').value = 30;
					WaitForElement('button[type="submit"]', 5000, function(rval){ //Submit Price
						if(rval == false){
							console.log("'button[type=\"submit\"]' NOT FOUND!");
							return;
						}
						document.querySelector('button[type="submit"]').click();
						WaitForElement('button[role="button"]', 5000, function(rval){ //Aditional Options
							if(rval == false){ 
								console.log("'button[type=\"submit\"]' NOT FOUND!"); 
								return;
							}
							document.querySelector('button[role="button"]').click();
							return;
						});
					});	
				});
			});	
		});
	}
}

/////////////////////////////////////////
function TradePost_LetGoPost(currentItem)
{
	DKLog("TradePost_LetGoPost("+currentItem+")", DKINFO);
	action = "PostToLetGo";
	DK_QueueDuktape("DKBrowser_NewTab();");
	DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://us.letgo.com/en');");
}

///////////////////////
escape = function(str){
  return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
};
