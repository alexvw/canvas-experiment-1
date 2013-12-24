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
	var totalFrames = 0;
	
	var context;
	var canvas;
	var CANVAS_WIDTH;
	var CANVAS_HEIGHT;
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

		c = document.getElementById('c');
		canvasInit(c);

		//input init
		input.setup();
		//game init
		gameSetup();

		start();
	};
	//render loop
	renderLoop = function(){
		//gamestep
		expEngine.gameStep();
		
		//calculations
			//calculate FPS
			var n = new Date().getTime();
			l = n - d;
			f = (Math.abs(1000/l));
			if (f < 100)
				fps.push(f);
			fps.shift();
			var total =0;
			var i=0;
			while (i<fps.length){
				total += fps[i++];
			}
			real_fps = total/fps.length;
			
			if (totalFrames % 3 == 0){
				var coords = expEngine.thePlayer.getCoordinates();
				$('#status').html("FPS:" + real_fps.toFixed(1) +" P:"+coords[0].toFixed(1)+", "+coords[1].toFixed(1));
			}
				
		
		//draw
			expEngine.drawAll(this.context);
		
		//loop
		d = new Date().getTime();
		if (doLoop == true)
			totalFrames++;
		requestAnimFrame( renderLoop );
	};
	
	inputHandler = function(isTap, x, y, dx, dy){
		if (isTap)
			alert("Tap at "+x+","+y);
		else expEngine.playerInput(dx,dy);
	};
	
	//start
	start = function(){
		doLoop = true;
		
		$("#status").html("Started");
		renderLoop();
	};
	//game setup
	gameSetup = function(){
		//create viewport
		expEngine.createViewPort(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
		//create player
		expEngine.createPlayer("Player 1");
		
	}
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
	canvasInit = function(canvas){
		/*c.width = width-100;
		c.height = height;*/
		
		canvas.onselectstart = function () { return false; } // ie
		canvas.onmousedown = function () { return false; }// mozilla
		canvas.onmousemove = function() { return false; }
		
	    this.context = canvas.getContext('2d');
		
		this.CANVAS_WIDTH = $('#c').width();
		this.CANVAS_HEIGHT = $('#c').height();
	}
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