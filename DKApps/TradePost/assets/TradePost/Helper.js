var funcQueue = [];
var globalTimer;

//////////////////////
function Helper_Init()
{
	DKDEBUGFUNC();
}

/////////////////////
function Helper_End()
{
	DKDEBUGFUNC();
}

//////////////////////////////
function Helper_OnEvent(event)
{
	DKDEBUGFUNC(event);
}

///////////////////////////////////////////
function Helper_LoadGoogleMapsApi(callback)
{
	DKDEBUGFUNC(callback);
	url = "https://maps.googleapis.com/maps/api/js?v=3.exp";
	if(!url){ 
		DKERROR("LoadJs("+url+"): url invalid\n");
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
		DKERROR("Cannot load "+url+"\n");
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
	DKDEBUGFUNC(addressA, addressB);
	Helper_LoadGoogleMapsApi(function(rval){
		DKINFO("Helper_LoadGoogleMapsApi() returned "+rval+"\n");
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
				DKWARN("Helper_GetDistance(): Could not get distance. Please check addresses\n");
				// ensure your address is formatted properly
			}
		});
	});
}

/////////////////////////////////
function CallQueuedFunction(func)
{
	DKDEBUGFUNC(func);
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
	DKDEBUGFUNC(func);
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
	DKDEBUGFUNC(num, callback);
	var result = num * 2;
	DKINFO("####### TimesTwo("+num+") #######\n");
	callback(result);
}

//////////////////////////////////
function Pinger_ping(ip, callback)
{
	DKDEBUGFUNC(ip, callback);
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
	DKDEBUGFUNC();
	url = "ws://localhost:3000";
	w = new WebSocket(url);
	
	w.onopen = function(){
		console.log("open web socket");
		w.send("thank you for accepting this Web Socket request");
	}
	w.onmessage = function(e){
		console.log("OpenWebSocket(): Message received: "+e.data.toString());
	}
	w.onclose = function(e){
		console.log("closed");
	}
	w.onerror = function(e){
		console.log("error");
	}
	
	setTimeout( function(){
		//w.onclose = function () {}; // disable onclose handler first
		w.close();
	}, 5000);
}

////////////////////////////
function getParameters(func)
{
	DKDEBUGFUNC(func);
	return new RegExp(func.name+'\\s*\\((.*?)\\)').exec(func.toString().replace(/\n/g, ''))[1].replace(/\/\*.*?\*\//g, '').replace(/ /g, '');
}