var ItemImages_itemNum;
var ItemImages_imageNum = 0;

//////////////////////////
function ItemImages_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("TradePost/ItemImages.html");
	DKAddEvent("ItemImages_upload", "click", ItemImages_OnEvent);
	DKAddEvent("GLOBAL", "DKCef_OnFileDialogDismissed", ItemImages_OnEvent);
}

/////////////////////////
function ItemImages_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(ItemImages_OnEvent);
	DKClose("TradePost/ItemImages.html");
}

//////////////////////////////////
function ItemImages_OnEvent(event)
{
	DKDEBUGFUNC(event);
	if(DK_Id(event, "ItemImages_left")){
		ItemImages_imageNum--;
		ItemImages_Update();
	}
	if(DK_Id(event, "ItemImages_right")){
		ItemImages_imageNum++;
		ItemImages_Update();
	}
	if(DK_Id(event, "ItemImages_upload")){
		//CPP_DKCef_FileDialog("FILE_DIALOG_OPEN", "Open Image");
		CPP_DKCef_FileDialog("FILE_DIALOG_OPEN_MULTIPLE", "Open Image");
	}
	if(DK_Type(event, "DKCef_OnFileDialogDismissed")){
		ItemImages_UploadImages(DK_GetValue(event));
		return;
	}
	if(DK_Id(event, "ItemImages_delete")){
		ItemImages_Delete(DKAssets_LocalAssets()+"USER/Items/Item"+ItemImages_itemNum+"/Img"+ItemImages_imageNum+".jpg");
	}
}

////////////////////////////////////
function ItemImages_SetItem(itemNum)
{
	DKDEBUGFUNC(itemNum);
	ItemImages_itemNum = itemNum;
	ItemImages_Update();
}

////////////////////////////
function ItemImages_Update()
{
	DKDEBUGFUNC();
	DKWidget_SetInnerHtml("ItemImages_div", ""); //clear
	
	var img = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_img");
	DKWidget_SetProperty(img, "width", "100%");
	DKWidget_SetProperty(img, "position", "absolute");
	if(DKFile_Exists(DKAssets_LocalAssets()+"USER/Items/Item"+ItemImages_itemNum+"/Img"+ItemImages_imageNum+".jpg")){
		DKWidget_SetAttribute(img, "src", DKAssets_LocalAssets()+"USER/Items/Item"+ItemImages_itemNum+"/Img"+ItemImages_imageNum+".jpg?"+new Date().getTime());
		
		var trash = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_delete");
		DKWidget_SetAttribute(trash, "src", "TradePost/trash.png");
		DKWidget_SetProperty(trash, "position", "absolute");
		DKWidget_SetProperty(trash, "bottom", "100rem");
		DKWidget_SetProperty(trash, "right", "10rem");
		DKAddEvent(trash, "click", ItemImages_OnEvent);
	}
	
	if(DKFile_Exists(DKAssets_LocalAssets()+"USER/Items/Item"+ItemImages_itemNum+"/Img"+Number(ItemImages_imageNum-1)+".jpg")){
		var leftArrow = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_left");
		DKWidget_SetAttribute(leftArrow, "src", "TradePost/imageLeft.png");
		DKWidget_SetProperty(leftArrow, "position", "absolute");
		DKWidget_SetProperty(leftArrow, "top", "30%");
		DKWidget_SetProperty(leftArrow, "height", "20%");
		DKAddEvent(leftArrow, "click", ItemImages_OnEvent);
	}
	if(DKFile_Exists(DKAssets_LocalAssets()+"USER/Items/Item"+ItemImages_itemNum+"/Img"+Number(ItemImages_imageNum+1)+".jpg")){
		var rightArrow = DKWidget_CreateElement("ItemImages_div", "img", "ItemImages_right");
		DKWidget_SetAttribute(rightArrow, "src", "TradePost/imageRight.png");
		DKWidget_SetProperty(rightArrow, "position", "absolute");
		DKWidget_SetProperty(rightArrow, "top", "30%");
		DKWidget_SetProperty(rightArrow, "height", "20%");
		DKWidget_SetProperty(rightArrow, "right", "0px");
		DKAddEvent(rightArrow, "click", ItemImages_OnEvent);
	}
}

///////////////////////////////////////
function ItemImages_UploadImages(files)
{
	DKDEBUGFUNC(files);
	if(!files){ return; }
	
	var arry = files.split(";");
	for(var i=0; i<arry.length; i++){
		console.log(arry[i]+"\n");
		
		var b=0;
		while(DKFile_Exists(DKAssets_LocalAssets()+"USER/Items/Item"+ItemImages_itemNum+"/Img"+b+".jpg")){
			b++;
		}
		DKFile_Copy(arry[i], DKAssets_LocalAssets()+"USER/Items/Item"+ItemImages_itemNum+"/Img"+b+".jpg", true);
		ItemImages_imageNum = b;
		ItemImages_Update();
	}
	DKWidget_SetAttribute("img"+ItemImages_itemNum, "src", DKAssets_LocalAssets()+"USER/Items/Item"+ItemImages_itemNum+"/Img0.jpg?"+new Date().getTime());
}

////////////////////////////////
function ItemImages_Delete(file)
{
	DKDEBUGFUNC(file);
	CPP_DK_Create("DKMessage/DKMessage.js", function(){
		DKFrame_Widget("DKMessage/DKMessage.html");
		DKMessage_Confirm("delete this file?", function(rval){
			//console.log("DKMessage_Confirm(): rval = "+rval+"\n");
			if(rval == true){
				DKFile_Delete(file);
				ItemImages_imageNum = 0;
				ItemImages_Update();
			}
		});
	});
}