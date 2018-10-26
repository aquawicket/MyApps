/////////////////////
function Login_Init()
{
	DKDEBUGFUNC();
	DKCreate("Login.html");
	DKAddEvent("LoginConnect", "click", Login_OnEvent);
}

////////////////////
function Login_End()
{
	DKDEBUGFUNC();
	DKRemoveEvents(Login_OnEvent);
	DKClose("Login.html");
}

/////////////////////////////
function Login_OnEvent(event)
{
	DKDEBUGFUNC(event);
	DKClose("Login.html");
	//DKClose("DKWidget");
	//DKClose("DKRocket");
}