///////////////////////
function DKBlog_Init()
{
	
	CPP_DK_Create("DKBlog/DKBlog.html");
}

/////////////////////
function DKBlog_End()
{
	
	DKClose("DKBlog/DKBlog.html");
}

//////////////////////////////
function DKBlog_OnEvent(event)
{
	DKDEBUGFUNC(event);
}