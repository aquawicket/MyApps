DKCreate("DKCurl");

//TODO
var str = DK_GetArgs(); //Get arguments
//DKINFO("args = "+str+"\n");
var args = str.split(";");
if(args.length < 2){
	DKERROR("Incorrect number of arguments\n");
}
DKCurl_Download(args[0], args[1]);
DK_Exit();