var funcQueue = [];
var globalTimer;

//////////////////////
function Helper_Init()
{
	DKLog("Helper_Init()\n", DKDEBUG);
}

/////////////////////
function Helper_End()
{
	DKLog("Helper_End()\n", DKDEBUG);
}

//////////////////////////////
function Helper_OnEvent(event)
{
	DKLog("Helper_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n", DKDEBUG);
}

///////////////////////////////////////////
function Helper_LoadGoogleMapsApi(callback)
{
	DKLog("Helper_LoadGoogleMapsApi(callback)\n", DKDEBUG);
	url = "https://maps.googleapis.com/maps/api/js?v=3.exp";
	if(!url){ 
		DKLog("LoadJs("+url+"): url invalid\n", DKERROR);
		return false; 
	}
	// Adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.id = url;
	script.src = url;
	script.async = true; // optionally
	if(typeof script == "undefined"){ 
		DKLog("Cannot load "+url+" \n", DKERROR);
		return false; 
	}
	head.appendChild(script);
	var done = false;
	script.onload = script.onreadystatechange = function(){
		if(!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")){
			done = true;
			callback && callback(true);
		}
	};
	return true;
}

///////////////////////////////////////////////
function Helper_GetDistance(addressA, addressB)
{
	Helper_LoadGoogleMapsApi(function(rval){
		DKLog("Helper_LoadGoogleMapsApi() returned "+rval+"\n");
		var directionsService = new google.maps.DirectionsService();

		var request = {
			origin      : addressA, // a city, full address, landmark etc
			destination : addressB,
			travelMode  : google.maps.DirectionsTravelMode.DRIVING
		};

		directionsService.route(request, function(response, status){
			if(status == google.maps.DirectionsStatus.OK){
				var meters = response.routes[0].legs[0].distance.value; // the distance in metres
				var miles = meters / 1609.344;
				alert( miles ); 
			}
			else{
				DKLog("Helper_GetDistance(): Could not get distance. Please check addresses.\n", DKWARN);
				// ensure your address is formatted properly
			}
		});
	});
}

/////////////////////////////////
function CallQueuedFunction(func)
{
	func();
	funcQueue.shift();
	if(funcQueue.length < 1){
		clearInterval(globalTimer);
		globalTimer = false;
	}
}

///////////////////////////
function Helper_Queue(func)
{
	funcQueue.push(func);
	
	if(!globalTimer){
		globalTimer = setInterval(function(){
			CallQueuedFunction(funcQueue[0]);
		}, 1000);
	}
}



////////////////////////////////////
function TestFunction(num, callback)
{
	var result = num * 2;
	DKLog("####### TimesTwo("+num+") #######\n");
	callback(result);
}

//////////////////////////////////
function Pinger_ping(ip, callback)
{
	if(!this.inUse){
		this.inUse = true;
		this.callback = callback
		this.ip = ip;
		var _that = this;
		this.img = new Image();
		this.img.onload = function() {_that.good();};
		this.img.onerror = function() {_that.good();};
		this.start = new Date().getTime();
		this.img.src = "http://" + ip;
		this.timer = setTimeout(function() { _that.bad();}, 1500);
	}
}

////////////////////////
function OpenWebSocket()
{
	url = "ws://localhost:7681";
	
	w = new WebSocket(url);
	
	w.onopen = function(){
		console.log("open web socket");
		w.send("thank you for accepting this Web Socket request");
	}
	w.onmessage = function(e){
		console.log(e.data.toString());
	}
	w.onclose = function(e){
		console.log("closed");
	}
	w.onerror = function(e){
		console.log("error");
	}
	
	/*
	window.onload = function(){
		document.getElementById("sendButton").onclick = function(){
			w.send(document.detElementById("inputMessage").value);
		}
	}
	*/
}