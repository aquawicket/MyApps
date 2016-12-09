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
	DKLog("TriggerTest_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
}
