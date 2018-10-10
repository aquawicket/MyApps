var funcQueue = [];
//var funcQueueSize = 0;
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
	
	/*
	setTimeout(function(){
		Buy_LetGoGetPrice(id, function(rval){ 
			queueSize--;
			if(rval){
				Buy_SaveData();
			}
		});
	}, 5000*queueSize);
	*/
	
	
	//setTimeout(func, 5000*funcQueueSize);
	//funcQueueSize++;
}



////////////////////////////////////
function TestFunction(num, callback)
{
	var result = num * 2;
	DKLog("####### TimesTwo("+num+") #######\n");
	callback(result);
}
