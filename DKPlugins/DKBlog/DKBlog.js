///////////////////////
function DKBlog_Init()
{
	DKDEBUGFUNC();
	DKCreate("DKBlog/DKBlog.html");
}

/////////////////////
function DKBlog_End()
{
	DKDEBUGFUNC();
	DKClose("DKBlog/DKBlog.html");
}

//////////////////////////////
function DKBlog_OnEvent(event)
{
	DKDEBUGFUNC(event);
}