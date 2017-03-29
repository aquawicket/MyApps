(function() {
  var cx = '017643444788069204610:4gvhea_mvga'; // Insert your own Custom Search engine ID here
  var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
  gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
      '//www.google.com/cse/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
})();

////////////////////////
function DKSearch_Init()
{
	DKCreate("DKSearch.html");
}

///////////////////////
function DKSearch_End()
{
	DKClose("DKSearch.html");
}

////////////////////////////////
function DKSearch_OnEvent(event)
{	DKLog("DKSearch_OnEvent("+DK_GetId(event)+","+DK_GetType(event)+","+DKWidget_GetValue(event)+")\n", DKDEBUG);

}
