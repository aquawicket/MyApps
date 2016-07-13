DKCreate("DKTriggerTest/TriggerTest0.html");
DKCreate("DKTriggerTest/TriggerTest1.html");

///////////////////////////
function TriggerTest_Init()
{
	DKCreate("DKTriggers/DKTriggers.js");
	DKTrigger_LoadTriggers("DKTriggerTest/Triggers.txt");
}

///////////////////////////////////
function TriggerTest_OnEvent(event)
{
	
}
