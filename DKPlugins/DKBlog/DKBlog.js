
///////////////////////
function DKBlog_Init()
{
	//DKLog("DKBlog_Init() \n");
	DKCreate("DKBlog/DKBlog.html");
}

/////////////////////
function DKBlog_End()
{
	DKClose("DKBlog/DKBlog.html");
}

//////////////////////////////
function DKBlog_OnEvent(event)
{
	DKLog("DKBlog_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);
}