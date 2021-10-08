//////////////////////////////
function DKMenuRightWeb_Init()
{
	CPP_DK_Create("DKDev/DKMenuRightWeb.html,DKDev/DKMenuRight.html");
	DKAddEvent("ConnectButton", "click", DKMenuRightWeb_OnEvent);
	DKAddEvent("UploadButton", "click", DKMenuRightWeb_OnEvent);
	DKMenuRightWeb_Update();
}

/////////////////////////////
function DKMenuRightWeb_End()
{
	DKRemoveEvents(DKMenuRightWeb_OnEvent);
	DKClose("DKDev/DKMenuRightWeb.html");
}

////////////////////////////////////
function DKMenuRightWeb_OnEvent(event)
{
	console.log("DKMenuRightWeb_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
	if(DK_Id(event, "ConnectButton")){
		DKMenuRightWeb_Connect();
	}
	if(DK_Id(event, "UploadButton")){
		DKMenuRightWeb_Upload("");
		console.log("*** Done Uploading WebApp \n");
	}
}

////////////////////////////////
function DKMenuRightWeb_Update()
{
	var assets = DKAssets_LocalAssets();
	DKWidget_SetAttribute("ServerBox", "value", DKFile_GetSetting(assets+"USER/Ftp.txt", "[FTP_SERVER]") );
	DKWidget_SetAttribute("NameBox", "value", DKFile_GetSetting(assets+"USER/Ftp.txt", "[FTP_NAME]") );
	DKWidget_SetAttribute("PassBox", "value", DKFile_GetSetting(assets+"USER/Ftp.txt", "[FTP_PASS]") );
	DKWidget_SetAttribute("PathBox", "value", DKFile_GetSetting(assets+"USER/Ftp.txt", "[FTP_PATH]") );
}

/////////////////////////////////
function DKMenuRightWeb_Connect()
{
	var url = DKWidget_GetValue("ServerBox") + DKWidget_GetValue("PathBox");
	if(DKCurl_FtpConnect(url, DKWidget_GetValue("NameBox"), DKWidget_GetValue("PassBox"), "81")){
		console.log("FTP: successfully connected. \n");
		dk.show("ftpcheck");
		
		// Save FTP setting to project file for app
		var assets = DKAssets_LocalAssets();
		DKFile_SetSetting(assets+"USER/Ftp.txt", "[FTP_SERVER]", DKWidget_GetValue("ServerBox"));
		DKFile_SetSetting(assets+"USER/Ftp.txt", "[FTP_NAME]", DKWidget_GetValue("NameBox"));
		DKFile_SetSetting(assets+"USER/Ftp.txt", "[FTP_PASS]", DKWidget_GetValue("PassBox"));
		DKFile_SetSetting(assets+"USER/Ftp.txt", "[FTP_PATH]", DKWidget_GetValue("PathBox"));
		DKFile_SetSetting(assets+"USER/Ftp.txt", "[FTP_PORT]", ""); //TODO
		return;
	}
	dk.hide("ftpcheck");
	console.log("FTP: connection failed. \n");
}

//////////////////////////////////////
function DKMenuRightWeb_Upload(folder)
{
	console.log("Uploading Web App ..... \n");
	var assets = DKAssets_LocalAssets()+"/";
	var files = DKFile_DirectoryContents(assets+folder);
	var arry = files.split(",");
	for(var i=0; i<arry.length; i++){
		if(DKFile_IsDirectory(assets+folder+arry[i])){
			//console.log("Uploading folders not supported yet \n");
			//console.log("Folder: "+arry[i]+"\n")
			DKMenuRightWeb_Upload(folder+arry[i]+"/");
			continue;
		}
		var ctime = DKFile_GetLocalCreationDate(assets+folder+arry[i]);
		var mtime = DKFile_GetLocalModifiedDate(assets+folder+arry[i]);
		var htmlurl = DKWidget_GetValue("ServerBox")+DKWidget_GetValue("PathBox")+folder+arry[i];
		var rtime = DKCurl_FileDate(htmlurl);
		//console.log(arry[i]+": ctime:"+String(ctime)+" mtime:"+String(mtime)+"\n");
		//console.log(htmlurl+": "+String(rtime)+"\n");
		if(!rtime){
			DKCurl_FtpUpload(assets+folder+arry[i], htmlurl);
			continue;
		}
		
		var time;
		if(ctime > mtime){ time = ctime; }
		else{ time = mtime; }
		//console.log("local_time:"+String(time)+" server_time:"+String(rtime)+"\n"); 

		if(ctime > rtime || mtime > rtime){
			DKCurl_FtpUpload(assets+folder+arry[i], htmlurl);
			continue;
		}
		
		console.log("Skipping: "+arry[i]+"\n");
	}
}