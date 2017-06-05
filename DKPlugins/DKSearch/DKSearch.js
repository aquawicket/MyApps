////////////////////////
function DKSearch_Init()
{
	DKCreate("DKSearch/DKSearch.html");
}

///////////////////////
function DKSearch_End()
{
	DKClose("DKSearch.html");
}

////////////////////////////////
function DKSearch_OnEvent(event)
{	DKLog("DKSearch_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");

}
