var currentItem;
var action;

/////////////////////////
function TradePost_Init()
{
	DKCreate("TradePost.html");
	DKCreate("../DKGui/DKMenu.js", function(){});
	DKAddEvent("GLOBAL", "DKCef_OnLoadingStateChange", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnBeforePopup", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnQueueNewBrowser", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnLoadError", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnLoadEnd", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFullscreen", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_ContextMenu", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnContextCreated", TradePost_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFileDialogDismissed", TradePost_OnEvent);
	
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
	
	TradePost_UpdateList();
}

////////////////////////
function TradePost_End()
{
	DKClose("TradePost.html");
}

/////////////////////////////////
function TradePost_OnEvent(event)
{	
	DKLog("TradePost_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");

	if(DK_Type(event, "DKCef_OnLoadEnd")){
		TradePost_PageLoaded(DK_GetValue(event));
		return;
	}
	if(DK_Type(event, "DKCef_OnFileDialogDismissed")){
		TradePost_UploadImage(DK_GetValue(event));
		return;
	}
	if(DK_IdLike(event, "catagory")){
		currentItem = DK_GetId(event).replace("catagory","");
		DKCreate("CatagoryMenu.js", function(){
			DKMenu_ValidatePosition("CatagoryMenu.html");
		});
		return;
	}
	if(DK_IdLike(event, "imageCell")){
		currentItem = DK_GetId(event).replace("imageCell","");
		DKCef_FileDialog("DKBrowser_cef");
		return;
	}
	if(DK_Id(event, "AddItem")){
		TradePost_AddItem();
		return;
	}
	if(DK_Id(event, "Craigslist")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://inlandempire.craigslist.org/d/for-sale/search/sss\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "Letgo")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://us.letgo.com/en\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "OfferUp")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://offerup.com\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "Facebook")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://www.facebook.com/marketplace\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "Ebay")){
		DK_QueueDuktape("DKBrowser_NewTab();");
		DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://www.ebay.com\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
	}
	if(DK_Id(event, "Test")){
		TradePost_Test();
	}
	if(DK_Id(event, "Refresh")){
		DK_Refresh();
	}
	if(DK_Type(event, "keyup")){
		TradePost_ChangeTitle(DK_GetId(event), DK_GetValue(DK_GetId(event)));
		return;
	}
	if(DK_Type(event, "change")){
		TradePost_ChangeTitle(DK_GetId(event), DK_GetValue(DK_GetId(event)));
		return;
	}
}

////////////////////////////
function TradePost_AddItem()
{
	//DKLog("TradePost_AddItem\n");
	
	var i = 0;
	while(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+i)){
		i++;
	}
	DKFile_MkDir(DKAssets_LocalAssets()+"Items/Item"+i);
	TradePost_UpdateList();
}

///////////////////////////////
function TradePost_UpdateList()
{
	//DKLog("TradePost_UpdateList\n");
	
	DKWidget_SetInnerHtml("ItemList", ""); //clear
	for(var row = 0; row < 1000; row++){
		//DKLog(DKAssets_LocalAssets()+"Items/Item"+row+"\n");
		if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row)){
			var div = DKWidget_CreateElement("ItemList", "div", "item"+row);
			DKWidget_SetProperty(div, "display", "inline-block");
			DKWidget_SetProperty(div, "width", "100%");
			//DKWidget_SetProperty(div, "min-width", "450rem");
			DKWidget_SetProperty(div, "background-color", "white");
			
			var num = DKWidget_CreateElement(div, "div", "itemId"+row);
			DKWidget_SetProperty(num, "display", "inline-block");
			DKWidget_SetProperty(num, "overflow", "hidden");
			DKWidget_SetProperty(num, "width", "30rem");
			DKWidget_SetProperty(num, "height", "80rem");
			DKWidget_SetProperty(num, "border-width", "1rem");
			DKWidget_SetProperty(num, "border-right-width", "0rem");
			DKWidget_SetProperty(num, "border-color", "black");
			DKWidget_SetProperty(num, "border-style", "solid");
			DKWidget_SetAttribute(num, "row", row);
			DKWidget_SetAttribute(num, "column", 1);
			DKWidget_SetValue(num, row);
			
			var imageCell = DKWidget_CreateElement(div, "div", "imageCell"+row);
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
			
			
				var img = DKWidget_CreateElement(imageCell, "img", "img"+row);
				DKWidget_SetProperty(img, "display", "block");
				DKWidget_SetProperty(img, "width", "100%");
				DKWidget_SetProperty(img, "margin", "auto");
			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/Img0.jpg")){
				DKWidget_SetAttribute(img, "src", DKAssets_LocalAssets()+"Items/Item"+row+"/Img0.jpg?"+new Date().getTime());
			}
			
			var titleCell = DKWidget_CreateElement(div, "div", "titleCell"+row);
			DKWidget_SetProperty(titleCell, "overflow", "hidden");
			DKWidget_SetProperty(titleCell, "width", "120rem");
			DKWidget_SetProperty(titleCell, "height", "80rem");
			DKWidget_SetProperty(titleCell, "display", "inline-block");
			DKWidget_SetProperty(titleCell, "border-width", "1rem");
			DKWidget_SetProperty(titleCell, "border-right-width", "0rem");
			DKWidget_SetProperty(titleCell, "border-color", "black");
			DKWidget_SetProperty(titleCell, "border-style", "solid");
			
			var title = DKWidget_CreateElement(titleCell, "textarea", "title"+row);
			DKWidget_SetProperty(title, "width", "100%");
			DKWidget_SetProperty(title, "height", "100%");
			DKWidget_SetProperty(title, "overflow-x", "hidden");
			DKWidget_SetProperty(title, "word-wrap", "break-word");
			DKWidget_SetProperty(title, "border-width", "0rem");
			DKWidget_SetProperty(title, "font-weight", "bold");
			DKAddEvent(title, "keyup", TradePost_OnEvent);
			DKAddEvent(title, "change", TradePost_OnEvent);

			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/title.txt")){
				DKWidget_SetValue(title, DKFile_FileToString(DKAssets_LocalAssets()+"Items/Item"+row+"/title.txt"));
			}
			
			var descriptionCell = DKWidget_CreateElement(div, "div", "descriptionCell"+row);
			DKWidget_SetProperty(descriptionCell, "overflow", "hidden");
			DKWidget_SetProperty(descriptionCell, "width", "220rem");
			DKWidget_SetProperty(descriptionCell, "height", "80rem");
			DKWidget_SetProperty(descriptionCell, "display", "inline-block");
			DKWidget_SetProperty(descriptionCell, "border-width", "1rem");
			DKWidget_SetProperty(descriptionCell, "border-right-width", "0rem");
			DKWidget_SetProperty(descriptionCell, "border-color", "black");
			DKWidget_SetProperty(descriptionCell, "border-style", "solid");

			var description = DKWidget_CreateElement(descriptionCell, "textarea", "description"+row);
			DKWidget_SetProperty(description, "width", "100%");
			DKWidget_SetProperty(description, "height", "100%");
			DKWidget_SetProperty(description, "overflow-x", "hidden");
			DKWidget_SetProperty(description, "word-wrap", "break-word");
			DKWidget_SetProperty(description, "border-width", "0rem");
			DKWidget_SetProperty(description, "font-weight", "bold");
			DKAddEvent(description, "keyup", TradePost_OnEvent);
			DKAddEvent(description, "change", TradePost_OnEvent);
			
			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/description.txt")){
				DKWidget_SetValue(description, DKFile_FileToString(DKAssets_LocalAssets()+"Items/Item"+row+"/description.txt"));
			}
			
			var catagoryCell = DKWidget_CreateElement(div, "div", "catagoryCell"+row);
			DKWidget_SetProperty(catagoryCell, "display", "inline-block");
			DKWidget_SetProperty(catagoryCell, "overflow", "hidden");
			DKWidget_SetProperty(catagoryCell, "width", "100rem");
			DKWidget_SetProperty(catagoryCell, "height", "80rem");
			//DKWidget_SetProperty(catagoryCell, "text-align", "center");
			DKWidget_SetProperty(catagoryCell, "border-width", "1rem");
			DKWidget_SetProperty(catagoryCell, "border-right-width", "0rem");
			DKWidget_SetProperty(catagoryCell, "border-color", "black");
			DKWidget_SetProperty(catagoryCell, "border-style", "solid");
			
			var catagory = DKWidget_CreateElement(catagoryCell, "textarea", "catagory"+row);
			DKWidget_SetAttribute(catagory, "type", "text");
			DKWidget_SetProperty(catagory, "display", "inline-block");
			DKWidget_SetProperty(catagory, "width", "100%");
			DKWidget_SetProperty(catagory, "height", "100%");
			DKWidget_SetProperty(catagory, "word-wrap", "break-word");
			DKWidget_SetProperty(catagory, "overflow-x", "hidden");
			DKAddEvent(catagory, "click", TradePost_OnEvent);
			DKAddEvent(catagory, "change", TradePost_OnEvent);
			
			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/catagory.txt")){
				DKWidget_SetValue(catagory, DKFile_FileToString(DKAssets_LocalAssets()+"Items/Item"+row+"/catagory.txt"));
			}
			
			var priceCell = DKWidget_CreateElement(div, "div", "priceCell"+row);
			DKWidget_SetProperty(priceCell, "display", "inline-block");
			DKWidget_SetProperty(priceCell, "overflow", "hidden");
			DKWidget_SetProperty(priceCell, "width", "70rem");
			DKWidget_SetProperty(priceCell, "height", "80rem");
			DKWidget_SetProperty(priceCell, "text-align", "center");
			DKWidget_SetProperty(priceCell, "border-width", "1rem");
			//DKWidget_SetProperty(priceCell, "border-right-width", "0rem");
			DKWidget_SetProperty(priceCell, "border-color", "black");
			DKWidget_SetProperty(priceCell, "border-style", "solid");
			
			var price = DKWidget_CreateElement(priceCell, "textarea", "price"+row);
			DKWidget_SetAttribute(price, "type", "text");
			DKWidget_SetProperty(price, "display", "inline-block");
			DKWidget_SetProperty(price, "width", "100%");
			DKWidget_SetProperty(price, "height", "100%");
			DKWidget_SetProperty(price, "word-wrap", "break-word");
			DKWidget_SetProperty(price, "overflow-x", "hidden");
			DKAddEvent(price, "keyup", TradePost_OnEvent);
			DKAddEvent(price, "change", TradePost_OnEvent);
			
			if(DKFile_Exists(DKAssets_LocalAssets()+"Items/Item"+row+"/price.txt")){
				DKWidget_SetValue(price, DKFile_FileToString(DKAssets_LocalAssets()+"Items/Item"+row+"/price.txt"));
			}
		}
	}
}

////////////////////////////////////////
function TradePost_ChangeTitle(id, text)
{
	//DKLog("TradePost_ChangeTitle("+id+", "+text+")\n");
	
	if(id.includes("title")){
		id = id.replace("title","");
		DKFile_StringToFile(text, DKAssets_LocalAssets()+"Items/Item"+id+"/title.txt");
	}
	else if(id.includes("description")){
		id = id.replace("description","");
		DKFile_StringToFile(text, DKAssets_LocalAssets()+"Items/Item"+id+"/description.txt");
	}
	else if(id.includes("catagory")){
		id = id.replace("catagory","");
		DKFile_StringToFile(text, DKAssets_LocalAssets()+"Items/Item"+id+"/catagory.txt");
	}
	else if(id.includes("price")){
		id = id.replace("price","");
		DKFile_StringToFile(text, DKAssets_LocalAssets()+"Items/Item"+id+"/price.txt");
	}
	
}

////////////////////////////////////
function TradePost_UploadImage(file)
{
	if(!file){ return; }
	DKFile_Copy(file, DKAssets_LocalAssets()+"Items/Item"+currentItem+"/Img0.jpg", true);
	DKWidget_SetAttribute("img"+currentItem, "src", DKAssets_LocalAssets()+"Items/Item"+currentItem+"/Img0.jpg?"+new Date().getTime());
}


/////////////////////////
function TradePost_Test()
{
	DKLog("TradePost_Test\n");
	
	action = "PostToCraigslist";
	DK_QueueDuktape("DKBrowser_NewTab();");
	DK_QueueDuktape("DKCef_SetUrl(\"DKBrowser_cef\", \"https://post.craigslist.org/c/inl\", DKCef_GetCurrentBrowser(\"DKBrowser_cef\"));");
}

////////////////////////////////////
function TradePost_PageLoaded(value)
{
	DKLog("TradePost_PageLoaded("+value+")\n");
	if(action == "PostToCraigslist"){
		//DK_RunJavascript("console.log(\"test\");", 1);
		var code = LetRunThisInAnotherContext.toString() + "LetRunThisInAnotherContext('test')";
		DKLog(code);
		DK_RunJavascript(code, 1);
		
		action = "";
	}
}

/////////////////////////////////////////
function LetRunThisInAnotherContext(text)
{
	var url = window.location.toString();
	console.log("url = " + url);
	
	//first Craigslist post page
	if(url.indexOf("https://post.craigslist.org") != -1 && url.indexOf("s=type") != -1){
		console.log("We are on the first post page");
		var button = document.querySelector('input[value=fso]');
		if(button){ button.click(); }
		var submit = document.querySelector('button[name=go]');
		if(submit){ submit.click(); }
	}
}

