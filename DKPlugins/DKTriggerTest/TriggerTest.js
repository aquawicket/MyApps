DKCreate("DKTriggerTest/TriggerTest0.html");
DKCreate("DKTriggerTest/TriggerTest1.html");

///////////////////////////
function TriggerTest_Init()
{
	DKCreate("DKHookJS");
	DKCreate("DKTriggers/DKTriggers.js");
	DKTrigger_LoadTriggers("DKTriggerTest/Triggers.txt");
}

///////////////////////////////////
function TriggerTest_OnEvent(event)
{
	
}
