var FACEBOOK_ID;
var USER_ID;
var PLAYLIST_ID;
var SHUFFLE;
	
//////////////////////
function Panel0_Init()
{
	DKDEBUGFUNC();
	DKCreate("DKMySql/DKMySql.js");
	DKCreate("Panel0.html");
	//Hide("DKConsole.html");
	DKAddEvent("GoButton", "click", Panel0_OnEvent);
	DKAddEvent("AddButton", "click", Panel0_OnEvent);
	DKAddEvent("PlaylistButton", "click", Panel0_OnEvent);
	DKAddEvent("PrevButton", "click", Panel0_OnEvent);
	DKAddEvent("NextButton", "click", Panel0_OnEvent);
	DKAddEvent("PlaylistDrop", "change", Panel0_OnEvent);
	DKAddEvent("Playlist", "change", Panel0_OnEvent);
	DKAddEvent("Playlist", "click", Panel0_OnEvent);
	DKAddEvent("LoginText", "click", Panel0_OnEvent);
	DKAddEvent("Text0", "click", Panel0_OnEvent);
	DKAddEvent("FullWindow", "click", Panel0_OnEvent);
	DKAddEvent("AddPlaylist", "click", Panel0_OnEvent);
	DKAddEvent("ShuffleButton", "click", Panel0_OnEvent);

	Panel0_AddUrl("https://www.youtube.com/watch?v=WFe8C8-iz_M");
	//Panel0_AddUrl("https://www.youtube.com/watch?v=U_tHEjiH7UA");
	//Panel0_AddUrl("http://64.31.98.34/Z%3A/Baraka.1992.720p.BluRay.x264.anoXmous/Baraka.1992.720p.BluRay.x264.anoXmous.mp4");
	
	//DKFacebook_Login(Panel0_FBconnect);
	Panel0_Connect(""); //connect to database
	//Panel0_PrepDatabase();
	
	Panel0_Update_PlaylistDrop();
	
	DKWidget_SetOption("PlaylistDrop", 0);
	Panel0_GetPLAYLIST_ID(DKWidget_GetValue("PlaylistDrop"));
	
	//if(DK_GetOS() == "Browser"){
	//	var x = document.getElementById("PlaylistDrop");
	//	x.options[0].selected = 'selected';
	//	Panel0_GetPLAYLIST_ID(x.options[x.selectedIndex].text);
	//}
	Panel0_Update_Playlist(); //load the default playlist
}

//////////////////////////////
function Panel0_OnEvent(event)
{
	DKDEBUGFUNC(event);
	
	if(DK_GetOS() == "Browser"){
		DKVideo_RegisterEndVideo("DKVideo", Panel0_NextVideo);
	}
	
	if(DK_Id(event, "GoButton")){
		var url = DKWidget_GetValue("UrlBox");
		DKVideo_Change("DKVideo", url);
	}
	if(DK_Id(event, "AddButton")){
		var url = DKWidget_GetValue("UrlBox");
		Panel0_AddUrl(url);
	}
	if(DK_Id(event, "PlaylistButton")){
		//var x = document.getElementById("Playlist");
		//x.options[0].selected = 'selected';
		DKWidget_SetOption("Playlist", 0);
		//DKVideo_Change("DKVideo", x.options[x.selectedIndex].text);
		DKVideo_Change("DKVideo", DKWidget_GetValue("Playlist"));
	}
	if(DK_Id(event, "PrevButton")){
		//var x = document.getElementById("Playlist");
		//x.options[x.selectedIndex-1].selected = 'selected';
		//DKWidget_SetOption("Playlist", ?); //TODO
		//DKVideo_Change("DKVideo", x.options[x.selectedIndex].text);
		DKVideo_Change("DKVideo", DKWidget_GetValue("Playlist"));
	}
	if(DK_Id(event, "NextButton")){
		//var x = document.getElementById("Playlist");
		//x.options[x.selectedIndex+1].selected = 'selected';
		//DKVideo_Change("DKVideo", x.options[x.selectedIndex].text);
		Panel0_NextVideo();
	}
	if(DK_Id(event, "PlaylistDrop")){
		//if(DK_GetOS() == "BROWSER"){
		//	var x = document.getElementById("PlaylistDrop");
		//	Panel0_GetPLAYLIST_ID(x.options[x.selectedIndex].text);
		//}
		Panel0_GetPLAYLIST_ID(DKWidget_GetValue("PlaylistDrop"));
		Panel0_Update_Playlist();
	}
	if(DK_Id(event, "Playlist")){
		//var x = document.getElementById("Playlist");
		//DKVideo_Change("DKVideo", x.options[x.selectedIndex].text);
		DKVideo_Change("DKVideo", DKWidget_GetValue("Playlist"));
	}
	if(DK_Id(event, "LoginText")){
		DKFacebook_Login(Panel0_FBconnect);
	}
	if(DK_Id(event, "Text0")){
		window.open("http://digitalknob.com/DKPlayer", "_blank", "toolbar=no, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
		close();
	}
	if(DK_Id(event, "FullWindow")){
		var top = DKWidget_GetProperty("Panel3.html", "top");
		
		if(top == "0px"){
			DKWidget_SetProperty("Panel3.html", "top", "90px");
			DKWidget_SetProperty("Panel3.html", "left", "20px");
			DKWidget_SetProperty("Panel3.html", "bottom", "200px");
			DKWidget_SetProperty("Panel3.html", "right", "41%");
		}
		else{
			DKWidget_SetProperty("Panel3.html", "top", "0px");
			DKWidget_SetProperty("Panel3.html", "left", "0px");
			DKWidget_SetProperty("Panel3.html", "bottom", "0px");
			DKWidget_SetProperty("Panel3.html", "right", "0px");
		}
	}
	if(DK_Id(event, "AddPlaylist")){
		var name = DKWidget_GetValue("newlist");
		if(!name){
			alert("Please type in a Playlist name, next to the add button");
			return;
		}
		DKWidget_SetValue("newlist","");
		Panel0_AddPlaylist(name);
	}
	if(DK_Id(event, "ShuffleButton")){
		if(!SHUFFLE){
			SHUFFLE = 1;
			DKWidget_SetAttribute("ShuffleButton","src","shuffle_on.png");
			DKINFO("Shuffle On\n");
		}
		else{
			SHUFFLE = 0;
			DKWidget_SetAttribute("ShuffleButton","src","shuffle_off.png");
			DKINFO("Shuffle Off\n");
		}
	}
}

////////////////////////////////
function Panel0_FBconnect(value)
{
	DKDEBUGFUNC(value);
	if(value.status === 'connected'){
		DKFacebook_Query('/me', "name", Panel0_FBresponse);
		DKFacebook_Query('/me', "id", Panel0_FBresponse);
	}
}

////////////////////////////////////////
function Panel0_FBresponse(param, value)
{
	DKDEBUGFUNC(param, value);
	if(param == "name"){
		DKWidget_SetInnerHtml("LoginText", value);
	}
	if(param == "id"){
		FACEBOOK_ID = value;
		DKWidget_SetAttribute("ProfilePic", "src", "http://graph.facebook.com/"+FACEBOOK_ID+"/picture");
		DKWidget_Show("ProfilePic");
		Panel0_GetUSER_ID();
		Panel0_Update_PlaylistDrop();
		//var x = document.getElementById("PlaylistDrop");
		//x.options[0].selected = 'selected';
		//Panel0_GetPLAYLIST_ID(x.options[x.selectedIndex].text);
		DKWidget_SetOption("PlaylistDrop", 0);
		Panel0_GetPLAYLIST_ID(DKWidget_GetValue("PlaylistDrop"));
		Panel0_Update_Playlist(); //load the default playlist
	}
}

/////////////////////////////////////
function Panel0_AddPlaylist(playlist)
{
	DKDEBUGFUNC(playlist);
	Panel0_GetPLAYLIST_ID(playlist);
	Panel0_Update_PlaylistDrop();
	//var x = document.getElementById("PlaylistDrop");
	//x.options[0].selected = 'selected';
	//Panel0_GetPLAYLIST_ID(x.options[x.selectedIndex].text);
	DKWidget_SetOption("PlaylistDrop", 0);
	Panel0_GetPLAYLIST_ID(DKWidget_GetValue("PlaylistDrop"));
	Panel0_Update_Playlist(); //load the default playlist
}

///////////////////////////
function Panel0_AddUrl(url)
{
	DKDEBUGFUNC(url);
	if(!PLAYLIST_ID){ return; }
	if(!url){ return; }
	var i = 0;
	while(DKWidget_GetElement("option"+String(i))){ i++; }
	var id = DKWidget_CreateElement("Playlist", "option", "option"+String(i));
	DKWidget_SetAttribute(id, "text", url);
	
	//add to mysql
	var query = "INSERT INTO PLAYLIST_URLS (PLAYLIST_ID, URL) VALUES ('"+PLAYLIST_ID+"','"+url+"')";
	var result = DKMySql_Query(query);
	DKINFO(result+"\n");
}

///////////////////////////
function Panel0_NextVideo()
{
	DKDEBUGFUNC();
	DKINFO("Loading next video...\n");
	//var x = document.getElementById("Playlist");
	
	if(!SHUFFLE){
		DKWidget_SetOption(DKWidget_GetOption("Playlist")+1);
		//x.options[x.selectedIndex+1].selected = 'selected';
	}
	else{
		if(DK_GetOS() == "BROWSER"){
			var x = document.getElementById("Playlist");
			var max = x.options.length;
			var current = x.selectedIndex;
			var random_num = current;
			while(random_num == current){
				random_num = Math.floor(Math.random() * max);
			}
			x.options[random_num].selected = 'selected';
		}
	}
	
	DKVideo_Change("DKVideo", x.options[x.selectedIndex].text);
}
/////////////////////////
function Panel0_Connect()
{
	DKDEBUGFUNC();
	DKMySql_Connect("10.6.171.92", "DKData", "DigitalKnob123!", "");
	DKMySql_Database("DKData");
}

//////////////////////////////
function Panel0_PrepDatabase()
{
	DKDEBUGFUNC();
	//Create USER table
	var query = "CREATE TABLE USERS (ID INT(10) NOT NULL AUTO_INCREMENT, PRIMARY KEY (ID))";
	DKMySql_Query(query);
	var query = "ALTER TABLE USERS ADD FACEBOOK_ID VARCHAR(60) NOT NULL";
	DKMySql_Query(query);
	var query = "ALTER TABLE USERS ADD EMAIL VARCHAR(60) NOT NULL";
	DKMySql_Query(query);
	var query = "ALTER TABLE USERS ADD PASS VARCHAR(60) NOT NULL";
	DKMySql_Query(query);
	
	//Create PLAYLISTS table
	var query = "CREATE TABLE PLAYLISTS (ID INT(10) NOT NULL AUTO_INCREMENT, PRIMARY KEY (ID))";
	DKMySql_Query(query);
	var query = "ALTER TABLE PLAYLISTS ADD NAME VARCHAR(60) NOT NULL";
	DKMySql_Query(query);
	var query = "ALTER TABLE PLAYLISTS ADD USER_ID VARCHAR(60) NOT NULL";
	DKMySql_Query(query);
	var query = "ALTER TABLE PLAYLISTS ADD ACCESS VARCHAR(60) NOT NULL";
	DKMySql_Query(query);
	
	//Create PLAYLIST_URLS table
	var query = "CREATE TABLE PLAYLIST_URLS (ID INT(10) NOT NULL AUTO_INCREMENT, PRIMARY KEY (ID))";
	DKMySql_Query(query);
	var query = "ALTER TABLE PLAYLIST_URLS ADD PLAYLIST_ID VARCHAR(60) NOT NULL";
	DKMySql_Query(query);
	var query = "ALTER TABLE PLAYLIST_URLS ADD URL VARCHAR(60) NOT NULL";
	DKMySql_Query(query);	
}

////////////////////////////
function Panel0_GetUSER_ID()
{
	DKDEBUGFUNC();
	if(!FACEBOOK_ID){ return; }

	//Create USER from FACEBOOK_ID
	if(FACEBOOK_ID){
		var query = "SELECT FACEBOOK_ID FROM USERS WHERE FACEBOOK_ID='"+FACEBOOK_ID+"'";
		var result = DKMySql_Query(query);
		if(result == "1,"){ //not found
			var query = "INSERT INTO USERS (FACEBOOK_ID) VALUES ('"+FACEBOOK_ID+"')";
			DKMySql_Query(query);
		}
	}
	
	//Get USER_ID
	if(FACEBOOK_ID){
		var query = "SELECT ID FROM USERS WHERE FACEBOOK_ID='"+FACEBOOK_ID+"'";
		var result = DKMySql_Query(query);
		if(result == "1,"){ //not found
			DKWARN("Cannot locate the USER_ID for "+FACEBOOK_ID+"\n");
			return;
		}
		else{
			result = result.split(",");
			if(result[1]){
				USER_ID = result[1];
			}
		}
	}
}


////////////////////////////////////
function Panel0_GetPLAYLIST_ID(name)
{
	DKDEBUGFUNC(name);
	if(!USER_ID){ userid = ""; }
	else{ userid = USER_ID; }
	
	var query;
	if(userid == "1"){
		query = "SELECT ID FROM PLAYLISTS WHERE NAME='"+name+"'";
	}
	else{
		query = "SELECT ID FROM PLAYLISTS WHERE USER_ID='"+userid+"' AND NAME='"+name+"'";
	}
	
	var result = DKMySql_Query(query);
	if(result == "1,"){ //not found
		var query = "INSERT INTO PLAYLISTS (USER_ID, NAME) VALUES ('"+userid+"','"+name+"')";
		DKMySqlQuery(query);
	}
	else{
		result = result.split(",");
		if(result[1]){
			PLAYLIST_ID = result[1];
		}
	}
}

/////////////////////////////////////
function Panel0_Update_PlaylistDrop()
{
	DKDEBUGFUNC();
	if(!USER_ID){ userid = ""; }
	else{ userid = USER_ID; }
	
	//clear all options
	if(DK_GetOS() == "BROWSER"){
		var x = document.getElementById("PlaylistDrop");
		var olength = x.options.length;
		for(i = 0; i < olength; i++) {
			x.options[0] = null;
		}
	}
	
	var query;
	if(userid == "1"){
		query = "SELECT NAME FROM PLAYLISTS ORDER BY ID ASC";
	}
	else{
		query = "SELECT NAME FROM PLAYLISTS WHERE USER_ID='"+userid+"' ORDER BY ID ASC";
	}
	
	var result = DKMySql_Query(query);
	if(result == "1,"){ //not found
		DKWARN("No Playlists found for USER_ID:"+userid+"\n");
		return;
	}

	var playlists = result.split(",");
	for(p = 1; p < playlists.length; p++) {
		if(playlists[p]){
			//var v = 0;
			//while(GetElement("ploption"+String(v))){ v++; }
			//var id = CreateElement("PlaylistDrop", "option", "ploption"+String(v));
			//SetAttribute(id, "text", playlists[p]);
	
			var option = DKWidget_CreateElement("PlaylistDrop", "option", "option");
			DKWidget_SetAttribute(option, "value", playlists[p]);
			DKWidget_SetInnerHtml(option, playlists[p]);
			DKWidget_SetAttribute(option, "selected", "selected");
		}
	}
}


/////////////////////////////////
function Panel0_Update_Playlist()
{
	DKDEBUGFUNC();
	if(!PLAYLIST_ID){ return; }
	
	//clear all options
	if(DK_GetOS() == "BROWSER"){
		var x = document.getElementById("Playlist");
		var olength = x.options.length;
		for(i = 0; i < olength; i++) {
			x.options[0] = null;
		}
	}
	
	var query = "SELECT URL FROM PLAYLIST_URLS WHERE PLAYLIST_ID='"+PLAYLIST_ID+"'";
	var result = DKMySql_Query(query);
	if(result == "1,"){ //not found
		DKWARN("Playlist ("+PLAYLIST_ID+") empty\n");
		return;
	}
	
	//populate playlist 
	var urls = result.split(",");
	for(u = 1; u < urls.length; u++) {
		
		var option = DKWidget_CreateElement("Playlist", "option", "option");
		DKWidget_SetAttribute(option, "value", urls[u]);
		DKWidget_SetInnerHtml(option, urls[u]);
		//var option = document.createElement("option");
		//if(urls[u]){
		//	option.text = urls[u];
		//	x.add(option);
		//}
	}
	
	//We could autoplay the first video here..  
	x.options[0].selected = 'selected';
	//if(!USER_ID){
		DKVideo_Queue("DKVideo", x.options[x.selectedIndex].text);
	//}
	//else{
		//DKVideo_Change("DKVideo", x.options[x.selectedIndex].text);
	//}
}