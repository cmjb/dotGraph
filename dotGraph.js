DEBUG = 0;

window.requestAnimFrame = (function(callback) {
	return window.requestAnimFrame || window.RequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60 );};
})();


var dotGraphCanvas = function () {

};

dotGraphCanvas.arcList = {
/*	cir1 : { 
		start: 0,
		end: 2 * Math.PI,
		r: 10,
		x: 10,
		y: 10,
		arc1: {
				start: 1.0 * Math.PI,
				end: 1.5 * Math.PI,
				r: 10 -1,
				x: 10,
				y: 10
			 },
			 arc2: {
				start: 4.0 * Math.PI,
				end: 4.5 * Math.PI,
				r: 10 -1,
				x: 10,
				y: 10
			 }},*/
};

dotGraphCanvas.loadEventCalled = function()
{
	dotGraphCanvas.trace("loadEventCalled");
	var attr = dotGraphCanvas.getAttributes();
	var context = attr.context;
	var list = dotGraphCanvas.arcList;

	//dotGraphCanvas.trace("Creating circle: x " + attr.x + " y " + attr.y);


	/*var cir = {
		start: 0,
		end: 2 * Math.PI,
		r: attr.dotRadius
	}

	var arc1 = {
		start: 1.0 * Math.PI,
		end: 1.5 * Math.PI,
		r: attr.dotRadius -1 
	}


	var arc2 = {
		start: 4.0 * Math.PI,
		end: 4.5 * Math.PI,
		r: attr.dotRadius -1
	}*/

	//dotGraphCanvas.drawDot(attr, list.cir1, list.cir1.arc1, list.cir1.arc2);


	function animateArc() {
		/*var time = (new Date()).getTime() - startTime;
		var linearSpeed = 100;
		var x = linearSpeed * time / 1000;*/
		if(list.cir1 == null)
			return;
		if(list.cir2 == null)
			return;
 	
 		context.clearRect(0, 0, attr.canvas.width, attr.canvas.height);
		list.cir1.arc1.start += 0.06 * Math.PI;
		list.cir1.arc1.end += 0.06 * Math.PI;
		list.cir1.arc2.start += 0.06 * Math.PI;
		list.cir1.arc2.end += 0.06 * Math.PI;
		dotGraphCanvas.drawDot(attr, list.cir1, list.cir1.arc1, list.cir1.arc2);
		dotGraphCanvas.trace("Called update " + list.cir1.arc1.start + " " + list.cir1.arc1.end);

		


	}
	//dotGraphCanvas.animateArcList()
	window.requestAnimFrame(function () {
			dotGraphCanvas.animateArcList();
		})

}

dotGraphCanvas.createDot = function()
{
	var canvas = dotGraphCanvas.getAttributes().canvas;

	var newArc1 = {
		start: 1.0 * Math.PI,
		end: 1.5 * Math.PI,
		r: 10 -1
	};
	var newArc2 = {
		start: 4.0 * Math.PI,
		end: 4.5 * Math.PI,
		r: 10 -1
	};

	var newCir = {
		start: 0,
		end: 2 * Math.PI,
		r: 10,
		arc1: newArc1,
		arc2: newArc2,
		x: Math.floor((Math.random() * canvas.width) + 1),
		y: Math.floor((Math.random() * canvas.height) + 1)
	}

	for(var i = 1; i>0; i++)
	{
		if(dotGraphCanvas.arcList["cir"+i] == undefined)
		{
			dotGraphCanvas.arcList["cir"+i] = newCir;
			var num = i + i;
			dotGraphCanvas.line("cir"+i, "cir"+num)
			setTimeout(function() {
				console.log("hit")
				dotGraphCanvas.arcList["cir"+i] = null
			}, 12000)
			break;
		}
	}
}

dotGraphCanvas.line = function(cir1, cir2)
{
	dotGraphCanvas.trace(dotGraphCanvas.arcList[cir1]);
	dotGraphCanvas.trace(dotGraphCanvas.arcList[cir2])
	if(dotGraphCanvas.arcList[cir2] != undefined)
	{
		dotGraphCanvas.trace("Test")
		var startx = dotGraphCanvas.arcList[cir1].x;
		var starty = dotGraphCanvas.arcList[cir1].y;
		var endx = dotGraphCanvas.arcList[cir2].x;
		var endy = dotGraphCanvas.arcList[cir2].y;

		dotGraphCanvas.trace(startx)
		dotGraphCanvas.trace(starty)
		dotGraphCanvas.trace(endx)
		dotGraphCanvas.trace(endy)

		var attr = dotGraphCanvas.getAttributes();
		attr.context.beginPath();
      	attr.context.moveTo(startx, starty);
      	attr.context.lineTo(endx, endy);
      	attr.context.stroke();

	}
}

dotGraphCanvas.animateArcList = function()
{	

	var attr = dotGraphCanvas.getAttributes();
	var context = attr.context;
	var list = dotGraphCanvas.arcList;
	attr.canvas.width = window.innerWidth;
	attr.canvas.height = window.innerHeight;

 	context.clearRect(0, 0, attr.canvas.width, attr.canvas.height);
 	for(var i = 1; i <= Object.keys(dotGraphCanvas.arcList).length; i++)
 	{

 		var ele = list["cir"+i];
 		if (ele == undefined)
 			continue;

 		ele.arc1.start += 0.06 * Math.PI;
 		ele.arc1.end += 0.06 * Math.PI;
 		ele.arc2.start += 0.06 * Math.PI;
 		ele.arc2.end += 0.06 * Math.PI;
 		dotGraphCanvas.drawDot(attr, ele, ele.arc1, ele.arc2);
		//dotGraphCanvas.trace("Called update " + ele.start + " " + ele.end);

 	}


	/*list.cir1.arc1.start += 0.06 * Math.PI;
	list.cir1.arc1.end += 0.06 * Math.PI;
	list.cir1.arc2.start += 0.06 * Math.PI;
	list.cir1.arc2.end += 0.06 * Math.PI;
	dotGraphCanvas.drawDot(attr, list.cir1, list.cir1.arc1, list.cir1.arc2);
	dotGraphCanvas.trace("Called update " + list.cir1.start + " " + list.cir1.end);*/
	window.requestAnimFrame(function () {

		dotGraphCanvas.animateArcList();
		//dotGraphCanvas.createDot();
		if(dots >= dotLimit)
		{
			//delete dotGraphCanvas.arcList["cir"+Math.floor((Math.random() * dotLimit) + 1)];
			return;
		}
		tick++;

		if(tick == tickLimit)
		{
			dotGraphCanvas.createDot();
			dots++;
			tick = 0;
		}
	})

}
var tick = 0;
var tickLimit = 50;
var dotLimit = 50;
var dots = 0;
dotGraphCanvas.drawDot = function (attr, cir, arc1, arc2)
{
	var context = attr.context;
	context.beginPath();
	context.arc(cir.x, cir.y, cir.r, 0, cir.end, false);
	context.fillStyle = "#CCCCCC";
	context.fill();
	context.lineWidth = 5;

	context.beginPath();
	context.arc(cir.x, cir.y, arc1.r, arc1.start, arc1.end, false);
	context.lineWidth = 4;
	context.strokeStyle = "#BBBBBB";
	context.stroke();

	context.beginPath();
	context.arc(cir.x, cir.y, arc2.r, arc2.start, arc2.end, false);
	context.lineWidth = 4;
	context.strokeStyle = "#BBBBBB";
	context.stroke();

}

dotGraphCanvas.getAttributes = function()
{
	var canvas = document.getElementById("dg-field");
	var context = canvas.getContext("2d");
	//dotGraphCanvas.trace("createdContext");

	var attr = {
		canvas: canvas,
		context: context,
		x: canvas.width / 2,
		y: canvas.height / 2,
		dotRadius: 10
	};

	return attr;
}

dotGraphCanvas.trace = function (msg)
{
	if(!DEBUG)
		return;
	console.log("%cdotGraph: " + msg, "font-weight:bold;color:#CC0000");
}

window.addEventListener("load", dotGraphCanvas.loadEventCalled, false);
