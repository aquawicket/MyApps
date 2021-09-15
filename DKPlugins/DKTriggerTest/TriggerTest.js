CPP_DK_Create("DKTriggerTest/TriggerTest0.html");
CPP_DK_Create("DKTriggerTest/TriggerTest1.html");

///////////////////////////
function TriggerTest_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKTriggers/DKTriggers.js");
	DKTrigger_LoadTriggers("DKTriggerTest/Triggers.txt");
}

///////////////////////////////////
function TriggerTest_OnEvent(event)
{
	DKDEBUGFUNC(event);
}