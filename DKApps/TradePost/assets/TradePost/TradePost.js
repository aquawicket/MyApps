items = []; //items stored here, for use with json
var currentItem;
var action;

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
	if(DK_IdLike(event, "post")){
		currentItem = DK_GetId(event).replace("post","");
		TradePost_PostItem(currentItem);
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
	if(DK_Id(event, "AddItem")){
		TradePost_AddItem();
		return;
	}
	if(DK_Id(event, "Craigslist")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://inlandempire.craigslist.org/d/for-sale/search/sss');");
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
	DKWidget_SetProperty(header_id, "height", "20rem");
	DKWidget_SetProperty(header_id, "border-width", "1rem");
	DKWidget_SetProperty(header_id, "border-right-width", "0rem");
	DKWidget_SetProperty(header_id, "border-color", "black");
	DKWidget_SetProperty(header_id, "border-style", "solid");
	DKWidget_SetProperty(header_id, "border-style", "solid");
	DKWidget_SetProperty(header_id, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_id, "id");
	
	//image
	var header_image = DKWidget_CreateElement("Header", "div", "header_image");
	DKWidget_SetProperty(header_image, "display", "inline-block");
	DKWidget_SetProperty(header_image, "width", "142rem");
	DKWidget_SetProperty(header_image, "height", "20rem");
	DKWidget_SetProperty(header_image, "border-width", "1rem");
	DKWidget_SetProperty(header_image, "border-right-width", "0rem");
	DKWidget_SetProperty(header_image, "border-color", "black");
	DKWidget_SetProperty(header_image, "border-style", "solid");
	DKWidget_SetProperty(header_image, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_image, "image");
	
	//title
	var header_title = DKWidget_CreateElement("Header", "div", "header_title");
	DKWidget_SetProperty(header_title, "display", "inline-block");
	DKWidget_SetProperty(header_title, "width", "120rem");
	DKWidget_SetProperty(header_title, "height", "20rem");
	DKWidget_SetProperty(header_title, "border-width", "1rem");
	DKWidget_SetProperty(header_title, "border-right-width", "0rem");
	DKWidget_SetProperty(header_title, "border-color", "black");
	DKWidget_SetProperty(header_title, "border-style", "solid");
	DKWidget_SetProperty(header_title, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_title, "title");
	
	//description
	var header_description = DKWidget_CreateElement("Header", "div", "header_description");
	DKWidget_SetProperty(header_description, "display", "inline-block");
	DKWidget_SetProperty(header_description, "width", "220rem");
	DKWidget_SetProperty(header_description, "height", "20rem");
	DKWidget_SetProperty(header_description, "border-width", "1rem");
	DKWidget_SetProperty(header_description, "border-right-width", "0rem");
	DKWidget_SetProperty(header_description, "border-color", "black");
	DKWidget_SetProperty(header_description, "border-style", "solid");
	DKWidget_SetProperty(header_description, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_description, "description");
	
	//make
	var header_make = DKWidget_CreateElement("Header", "div", "header_make");
	DKWidget_SetProperty(header_make, "display", "inline-block");
	DKWidget_SetProperty(header_make, "width", "100rem");
	DKWidget_SetProperty(header_make, "height", "20rem");
	DKWidget_SetProperty(header_make, "border-width", "1rem");
	DKWidget_SetProperty(header_make, "border-right-width", "0rem");
	DKWidget_SetProperty(header_make, "border-color", "black");
	DKWidget_SetProperty(header_make, "border-style", "solid");
	DKWidget_SetProperty(header_make, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_make, "make");
	
	//model
	var header_model = DKWidget_CreateElement("Header", "div", "header_model");
	DKWidget_SetProperty(header_model, "display", "inline-block");
	DKWidget_SetProperty(header_model, "width", "100rem");
	DKWidget_SetProperty(header_model, "height", "20rem");
	DKWidget_SetProperty(header_model, "border-width", "1rem");
	DKWidget_SetProperty(header_model, "border-right-width", "0rem");
	DKWidget_SetProperty(header_model, "border-color", "black");
	DKWidget_SetProperty(header_model, "border-style", "solid");
	DKWidget_SetProperty(header_model, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_model, "model");
	
	//condition
	var header_condition = DKWidget_CreateElement("Header", "div", "header_condition");
	DKWidget_SetProperty(header_condition, "display", "inline-block");
	DKWidget_SetProperty(header_condition, "width", "100rem");
	DKWidget_SetProperty(header_condition, "height", "20rem");
	DKWidget_SetProperty(header_condition, "border-width", "1rem");
	DKWidget_SetProperty(header_condition, "border-right-width", "0rem");
	DKWidget_SetProperty(header_condition, "border-color", "black");
	DKWidget_SetProperty(header_condition, "border-style", "solid");
	DKWidget_SetProperty(header_condition, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_condition, "condition");
	
	//catagory
	var header_catagory = DKWidget_CreateElement("Header", "div", "header_catagory");
	DKWidget_SetProperty(header_catagory, "display", "inline-block");
	DKWidget_SetProperty(header_catagory, "width", "100rem");
	DKWidget_SetProperty(header_catagory, "height", "20rem");
	DKWidget_SetProperty(header_catagory, "border-width", "1rem");
	DKWidget_SetProperty(header_catagory, "border-right-width", "0rem");
	DKWidget_SetProperty(header_catagory, "border-color", "black");
	DKWidget_SetProperty(header_catagory, "border-style", "solid");
	DKWidget_SetProperty(header_catagory, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_catagory, "catagory");
	
	//price
	var header_price = DKWidget_CreateElement("Header", "div", "header_price");
	DKWidget_SetProperty(header_price, "display", "inline-block");
	DKWidget_SetProperty(header_price, "width", "70rem");
	DKWidget_SetProperty(header_price, "height", "20rem");
	DKWidget_SetProperty(header_price, "border-width", "1rem");
	DKWidget_SetProperty(header_price, "border-right-width", "0rem");
	DKWidget_SetProperty(header_price, "border-color", "black");
	DKWidget_SetProperty(header_price, "border-style", "solid");
	DKWidget_SetProperty(header_price, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_price, "price");
	
	//date
	var header_date = DKWidget_CreateElement("Header", "div", "header_date");
	DKWidget_SetProperty(header_date, "display", "inline-block");
	DKWidget_SetProperty(header_date, "width", "70rem");
	DKWidget_SetProperty(header_date, "height", "20rem");
	DKWidget_SetProperty(header_date, "border-width", "1rem");
	DKWidget_SetProperty(header_date, "border-right-width", "0rem");
	DKWidget_SetProperty(header_date, "border-color", "black");
	DKWidget_SetProperty(header_date, "border-style", "solid");
	DKWidget_SetProperty(header_date, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_date, "date");
	
	//post
	var header_post = DKWidget_CreateElement("Header", "div", "header_post");
	DKWidget_SetProperty(header_post, "display", "inline-block");
	DKWidget_SetProperty(header_post, "width", "70rem");
	DKWidget_SetProperty(header_post, "height", "20rem");
	DKWidget_SetProperty(header_post, "border-width", "1rem");
	//DKWidget_SetProperty(header_post, "border-right-width", "0rem");
	DKWidget_SetProperty(header_post, "border-color", "black");
	DKWidget_SetProperty(header_post, "border-style", "solid");
	DKWidget_SetProperty(header_post, "background-color", "rgb(150,150,150)");
	DKWidget_SetValue(header_post, "post");

}

///////////////////////////////
function TradePost_UpdateList()
{
	DKLog("TradePost_UpdateList\n", DKDEBUG);
	DKWidget_SetInnerHtml("ItemList", ""); //clear	
	
	for(var row=0; row<items.length; row++){
		var div = DKWidget_CreateElement("ItemList", "div", "item"+items[row].id);
		DKWidget_SetProperty(div, "display", "inline-block");
		DKWidget_SetProperty(div, "width", "1150rem");
		DKWidget_SetProperty(div, "min-width", "450rem");
		DKWidget_SetProperty(div, "background-color", "rgb(200,200,200)");
		
		
		//id		
		var num = DKWidget_CreateElement(div, "div", "itemId"+items[row].id);
		DKWidget_SetProperty(num, "display", "inline-block");
		DKWidget_SetProperty(num, "overflow", "hidden");
		DKWidget_SetProperty(num, "width", "30rem");
		DKWidget_SetProperty(num, "height", "80rem");
		DKWidget_SetProperty(num, "border-width", "1rem");
		DKWidget_SetProperty(num, "border-right-width", "0rem");
		DKWidget_SetProperty(num, "border-color", "black");
		DKWidget_SetProperty(num, "border-style", "solid");
		DKWidget_SetValue(num, items[row].id);
			
			
		//image
		var imageCell = DKWidget_CreateElement(div, "div", "imageCell"+items[row].id);
		DKWidget_SetProperty(imageCell, "display", "inline-block");
		DKWidget_SetProperty(imageCell, "width", "142rem");
		DKWidget_SetProperty(imageCell, "height", "80rem");
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
		DKWidget_SetProperty(titleCell, "height", "80rem");
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
		DKWidget_SetProperty(descriptionCell, "height", "80rem");
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
		DKWidget_SetProperty(makeCell, "height", "80rem");
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
		DKWidget_SetProperty(modelCell, "height", "80rem");
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
		DKWidget_SetProperty(conditionCell, "height", "80rem");
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
		DKWidget_SetProperty(catagoryCell, "height", "80rem");
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
		DKWidget_SetProperty(priceCell, "height", "80rem");
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
		DKWidget_SetProperty(date, "height", "80rem");
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
		DKWidget_SetProperty(postCell, "display", "inline-block");
		DKWidget_SetProperty(postCell, "overflow", "hidden");
		DKWidget_SetProperty(postCell, "width", "70rem");
		DKWidget_SetProperty(postCell, "height", "80rem");
		DKWidget_SetProperty(postCell, "text-align", "center");
		DKWidget_SetProperty(postCell, "border-width", "1rem");
		//DKWidget_SetProperty(postCell, "border-right-width", "0rem");
		DKWidget_SetProperty(postCell, "border-color", "black");
		DKWidget_SetProperty(postCell, "border-style", "solid");
			
		var post = DKWidget_CreateElement(postCell, "button", "post"+items[row].id);
		DKWidget_SetProperty(post, "display", "inline-block");
		DKWidget_SetProperty(post, "width", "90%");
		DKWidget_SetProperty(post, "height", "25rem");
		DKWidget_SetProperty(post, "overflow-x", "hidden");
		DKWidget_SetInnerHtml(post, "Post");
		DKAddEvent(post, "click", TradePost_OnEvent);
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
	//TODO - we need to be able to work with this file dialog after it is opened. 
	//DKCef_FileDialog("DKBrowser_cef");
	
	//FIXME - crashes
	//DK_RunDuktape('DKCreate("DKGit/DKGit.js");');
	//DK_QueueDuktape('DKThread_DKQueue("GitCommit","GitMenu_GitCommit();");');
	
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
		
		var json_string = JSON.stringify(items[i]);
		DKLog(json_string+"\n");
		
		/*
		var item_object = JSON.parse(json_string);
		DKLog("item_object.id: "+item_object.id+"\n");
		DKLog("item_object.title: "+item_object.title+"\n");
		DKLog("item_object.description: "+item_object.description+"\n");
		DKLog("item_object.catagory: "+item_object.catagory+"\n");
		DKLog("item_object.price: "+item_object.price+"\n");
		*/
	}
}

////////////////////////////////////
function TradePost_PostItem(itemNum)
{
	DKLog("TradePost_PostItem("+itemNum+")\n", DKDEBUG);
	//action = "PostToCraigslist";
	//DK_QueueDuktape("DKBrowser_NewTab();");
	//DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://post.craigslist.org/c/inl');");
	
	action = "PostToLetGo";
	DK_QueueDuktape("DKBrowser_NewTab();");
	DK_QueueDuktape("DKCef_SetUrl('DKBrowser_cef', DKCef_GetCurrentBrowser('DKBrowser_cef'), 'https://us.letgo.com/en');");
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
		
		var code = PostToCraigslist.toString() + "PostToCraigslist('"+title+"','"+price+"','"+city+"','"+zip+"','"+description+"','"+make+"','"+model+"','"+condition+"','"+email+"','"+phone+"','"+name+"','"+street+"')";

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
		
		var code = PostToLetGo.toString() + "PostToLetGo('"+title+"','"+price+"','"+city+"','"+zip+"','"+description+"','"+make+"','"+model+"','"+condition+"','"+email+"','"+phone+"','"+name+"','"+street+"')";
		
		DKCef_RunJavascript(0, 1, code);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PostToCraigslist(title, price, city, zip, description, make, model, condition, email, phone, name, street)
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PostToLetGo(title, price, city, zip, description, make, model, condition, email, phone, name, street)
{
	console.log("PostToLetGo(many vars))\n");
	function WaitForElement(selector, time, callback){
		if(document.querySelector(selector) != null){
			callback && callback();
			return;
		}
		else{
			setTimeout(function(){
				WaitForElement(selector, time);
			}, time);
		}
	};

	var url = window.location.toString();
	
	if(url.indexOf("https://us.letgo.com/en") != -1){
		WaitForElement('button[data-test="chat-button"]', 0, function(){ 
			document.querySelector('button[data-test="sell-your-stuff-button"]').click();
			WaitForElement('div[class="dropZoneDefault"]', 0, function(){
				console.log("found dropZone\n");
				//var x = Number(DKWindow_GetX()) + (Number(DKWindow_GetWidth()) / 2);
				//var y = Number(DKWindow_GetY()) + 320;
				//DK_SetMousePos(x,y);
				//DK_LeftClick();
				
				//Let's drag and drop the images
			});
		});
		return;
	}
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
