
/////////////////////////
function CoolClock_Init()
{
	DKCreate("CoolClock/CoolClock.css", function(){});
	DKCreate("CoolClock/CoolClock.html", function(){});
	
	var canvas = document.getElementById('CoolClock_canvas');
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = '#28d1fa';

	ctx.lineWidth = 17;
	ctx.lineCap = 'round';
	ctx.shadowBlur = 15;
	ctx.shadowColor = '#28d1fa';

	function degToRad(degree) {
	var factor = Math.PI/180;
	return degree*factor;
	}

	function renderTime() {
  
  var now = new Date();
  var today = now.toDateString();
  var time = now.toLocaleTimeString();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var milliseconds = now.getMilliseconds();
  var newSeconds = seconds+ (milliseconds/1000);
  
  // Background
  gradient = ctx.createRadialGradient(200,200,5,200,200,300);
  gradient.addColorStop(0,'#09303a');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,400,400);
  
  // Hours
  ctx.beginPath();
  ctx.arc(200, 200, 170, degToRad(270), degToRad((hours*30)-90));
  ctx.stroke();
  
  // Minutes
   ctx.beginPath();
  ctx.arc(200, 200, 140, degToRad(270), degToRad((minutes*6)-90));
  ctx.stroke();
  // Seconds
   ctx.beginPath();
  ctx.arc(200, 200, 110, degToRad(270), degToRad((newSeconds*6)-90));
  ctx.stroke();
  // Date 
  ctx.font = "20px Helvetica";
  ctx.fillStyle = '#28d1fa';
  ctx.fillText(today, 140, 200);
  
  // Time
  ctx.font = "15px Helvetica";
  ctx.fillStyle = '#28d1fa';
  ctx.fillText(time, 140, 230);
  
}
setInterval(renderTime, 40);
}

//////////////////////////
function CoolClock_Event()
{
	DKLog("CoolClock_Event()");
}

////////////////////////
function CoolClock_End()
{
	
}