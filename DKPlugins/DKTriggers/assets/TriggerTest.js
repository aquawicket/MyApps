DKCreate("DKWidget,TriggerTest0.html");
DKCreate("DKWidget,TriggerTest1.html");

///////////////////////////
function TriggerTest_Init()
{
	DKCreate("DKHookJS");
	DKCreate("DKJavascript,DK/DKTriggers/DKTriggers.js");
	DKTrigger_LoadTriggers("Triggers.txt");
}

///////////////////////////////////
function TriggerTest_OnEvent(event)
{
	
}
