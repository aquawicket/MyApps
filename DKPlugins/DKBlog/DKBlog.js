///////////////////////
function DKBlog_Init()
{
	DKDEBUGFUNC();
	CPP_DK_Create("DKBlog/DKBlog.html");
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