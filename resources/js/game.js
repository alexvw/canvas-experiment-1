//Experiment 1 driver file. Requires engine.js and input.js to function, also relies on #c canvas element on page

//@author avanderwoude, nvanderwoude

//the game object, self executing	
$( document ).ready(function() {
		//lets go
		var theGame = new gameObject();
		theGame.init();
		});
function gameObject(){
	var expEngine = {};
	//the input namespace object
	var input = {};
	//game vars
	var doLoop = false;
	//used to calculate fps
	var l;
	var d;
	var n;
	var f;
	var fps = new Array(60,60,60,60,60,60,60,60,60,60,60,60,60,60,60
			,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60);
	//TODO

	/*
	 * Possible Objects:
	 * - game settings
	 *   - timer, score, lives
	 *   - difficulty settings, offsets and individual timers
	 * - render settings
	 * 	 - quality, fps, dimensions, scales
	 * - ???
	 * - PRofit
	 */

	this.init = function(){
		//TODO: setup functions

		//engine init
		expEngine = new game_engine("param");
		expEngine.init();
		//input init
		input = new input_object(inputHandler);

		//input init
		input.setup();
		//game init
		start();
	};
	//render loop
	renderLoop = function(){
		//gamestep
		expEngine.gameStep();
		
		//calculations
			//calculate FPS
			var n = new Date().getTime();
			l = d - n;
			f = (Math.abs(1000/l));
			fps.push(f);
			fps.shift();
			d = new Date();
			var total =0;
			var i=0;
			while (i<fps.length){
				total += fps[i++];
			}
			real_fps = total/fps.length;
			$('#status').html(real_fps);
		
		//draw
		
		//loop
		d = new Date().getTime();
		if (doLoop == true)
		requestAnimFrame( renderLoop );
	};
	
	inputHandler = function(isTap, x, y, dx, dy){
		if (isTap)
			alert("Tap at "+x+","+y);
		else alert("Flick "+x+","+y+" "+dx+","+dy);
	};
	
	//start
	start = function(){
		doLoop = true;
		$("#status").html("Started");
		renderLoop();
	};
	//save to serialized object
	save = function(){
		
	};
	//start a certain level
	startLevel = function(whichLevel){
		
	};
	quit = function(){
		
	};
	reset = function(){
		
	};	
};

	//requestAnim shim layer by Paul Irish
	//paulirish.com
	//thx paul
	window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
	      window.webkitRequestAnimationFrame || 
	      window.mozRequestAnimationFrame    || 
	      window.oRequestAnimationFrame      || 
	      window.msRequestAnimationFrame     || 
	      function(/* function */ callback, /* DOMElement */ element){
	        window.setTimeout(callback, 1000 / 60);
	      };
	})();