DKCreate("DKWidget,TriggerTest0.html");
DKCreate("DKWidget,TriggerTest1.html");

///////////////////////////
function TriggerTest_Init()
{
	DKCreate("DKHookJS");
	DKCreate("DKJavascript,DKTriggers/DKTriggers.js");
	DKTrigger_LoadTriggers("Triggers.txt");
}

///////////////////////////////////
function TriggerTest_OnEvent(event)
{
	
}
