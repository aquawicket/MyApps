CPP_DK_Create("DKCurl");

//TODO
var str = CPP_DK_GetArgs(); //Get arguments
//console.log("args = "+str+"\n");
var args = str.split(";");
if(args.length < 2){
	DKERROR("Incorrect number of arguments\n");
}
CPP_DKCurl_Download(args[0], args[1]);
CPP_DK_Exit();