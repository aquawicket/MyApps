/////////////////////
function Login_Init()
{
	DKCreate("Login.html");
	DKAddEvent("LoginConnect", "click", Login_OnEvent);
}

////////////////////
function Login_End()
{
	DKRemoveEvents(Login_OnEvent);
	DKClose("Login.html");
}

/////////////////////////////
function Login_OnEvent(event)
{
	DKLog("Login_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DK_GetValue(event)+")\n");
	
}