//Experiment 1 driver file. Requires engine.js and input.js to function, also relies on #c canvas element on page

//@author avanderwoude, nvanderwoude

//the game object, self executing	
$( document ).ready(function() {
		window.resizeTo(340,640);
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
	
	var timeLimit = 100;
	var score = 0;
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
		
		score = 0;
		timeLimit = 3000;

		start();
	};
	//render loop
	renderLoop = function(){
	
	if (timeLimit - totalFrames < 1)
		stop();
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
				//var coords = expEngine.thePlayer.getCoordinates();
				$('#status').html("Time Left: " + ((timeLimit-totalFrames)/60).toFixed(1) +"  Score: "+score.toFixed(0));
			}
				
		
		//draw
			expEngine.drawAll(this.context);
		
		//loop
		d = new Date().getTime();
		if (doLoop == true){
			totalFrames++;
		requestAnimFrame( renderLoop );
		}
	};
	
	
	
	inputHandler = function(isTap, x, y, dx, dy){
		//alert("dx:"+dx+" dy:"+dy);
		if (isTap)
			;//alert("Tap at "+x+","+y);
		else expEngine.playerInput(dx,dy);
	};
	
	//start
	start = function(){
		doLoop = true;
		
		$("#status").html("Started");
		expEngine.start(this.context);
		renderLoop();
	};
	stop = function(){
		doLoop = false;
		setTimeout(end,250);
	}
	end = function(){
		$('#status').html("<br><br><h3>Time's Up! Final Score: "+score.toFixed(0)+"</h3><br>"+
		"<a onclick='location.reload(true)'> Try Again </a>");
		$(c).hide();
	}
	//game setup
	gameSetup = function(){
		//create camera
		expEngine.createCamera(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);
		//create player
		expEngine.createPlayer("Player 1");
		expEngine.createEntity(1,0,260);
		//set collisionHandler
		
		expEngine.collideHandler = this.handleCollision;

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
	};
	kill = function(objToKill){
	
	var objType = objToKill.constructor.name;
	if (objType == "Entity"){
			score += 1;
			timeLimit += (300/score);
			expEngine.kill(objToKill);
			expEngine.createEntity(1,(Math.random()*1000)-500,(Math.random()*1000)-500);
			expEngine.createEntity(1,(Math.random()*1000)-500,(Math.random()*1000)-500);
		}
	}
	
	//interactive game functions
	handleCollision = function(obj1, obj2){
		var obj1Type = obj1.constructor.name;
		var obj2Type = obj2.constructor.name;
		//switch (obj1Type+obj2Type){
			//do something
		//}
		//alert("COLLISION: " + obj1Type + " with " + obj2Type);
		//do something about the collision
			kill(obj2);
	}
};

		$(c)
		.on('mouseup', function(e) {
			$('span#notify').hide();
			$( this ).unbind( event );
		})
		.on('touchend', function(e) {
			$('span#notify').hide();
			$( this ).unbind( event );
		});

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