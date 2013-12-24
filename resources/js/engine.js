//Experiment 1 Game engine src file
/*
 * @author avanderwoude, nvanderwoude
 */

//Experimental engine object. This prototype should not be instantiated, but instead is a 
//superclass of engine objects, and contains all the generic functions
var PLAYER_FRICTION = 0.009;
var PLAYER_MAX_SPEED = 100;
var PLAYER_ACCEL = 0.13;

var ENEMY_MOVEMENT = 3;
var CANVAS_WIDTH = 360;
var CANVAS_HEIGHT = 620;
function game_engine(){
	//engine prototype. church.
	this.totalSteps = 0;
	this.running = 0;
	//maybe
	//this.camera = function(){
	
	this.thePlayer = {};
	
	this.visibleObjects = [];
	
	this.enemies = [];
	
	this.bgCanvas = {};
	this.bgPattern = {};
	
	this.init = function(context){
		this.running = 1;
		this.totalSteps = 0;
	}
	
	this.start = function(context){
		this.backgroundInit(context);
	}
	
	this.backgroundInit = function(context){
		bgCanvas = document.createElement('canvas');
		bgCanvas.width  = 20;
		bgCanvas.height = 20;
		bgContext = bgCanvas.getContext('2d');
		bgContext.fillStyle="#aaaaFF";
		bgContext.fillRect(0,0,20,20);
		bgContext.fillStyle="#FFaaaa";
		bgContext.fillRect(0,0,10,10);
		bgContext.fillStyle="#aaFFaa";
		bgContext.fillRect(10,10,10,10);

		//setup background pattern
		this.bgPattern = context.createPattern(bgCanvas, "repeat");
		/*ctx.beginPath();
		ctx.fillStyle = pattern;
		ctx.fillRect(0,0,500,500);*/
	}
	
	//Below is Copy-pasted from axn, just an example for now
	/*this.RPID = RID;
	this.AttributeID = AID;
	this.status = STATUS;
	
	//getdata generic code
	this.getData = function(this_return){
			//check the status
			//gather appropriate data
			switch (this.status){
			case ("fail"):
			case ("pass"):
				this_return.data = {
					id: this.AttributeID
			};
				return this_return;
				break;
			case ("picker"):
				this_return.data = {
					id: $('#attr'+this.RPID+'-picker-select option:selected').attr('id')
			};
				return this_return;
				break;
			case ("pin"):
				this_return.data = {
					id: this.AttributeID,
					pincode: $('#attr'+this.RPID+'-PIN-input').val()
			};
				return this_return;
				break;
			default:
				//none of the above
				break;
			}
		};
		//disable all fields for this attribute
	this.disable = function(){
			$('#attr'+this.RPID+'-inputs, #attr'+this.RPID+'-picker').find('input, select').attr('disabled',true);
			$('#attr'+this.RPID+'-new-link').hide();
		};
	//enable fields for this attribute
	this.enable= function(){
		$('#attr'+this.RPID+'-inputs, #attr'+this.RPID+'-picker').find('input, select').attr('disabled',false);
		$('#attr'+this.RPID+'-new-link').show();
	};*/
	
	/*
	 * TODO: Game engine functions will go here. 
	 * 
	 * Possible global objects:
	 * - Orientation object
	 * - Player object
	 * - Array: Visible non-enemy objects
	 * - Array: Enemies
	 * - Array: radar blips
	 * 
	 * possible functions:
	 * - collision detection
	 * - bounce angle determination (expensive)
	 * - substep calc (very expensive) 
	 * - distance
	 * - force(object, dx, dy)?
	 * 
	 */
	
	this.gameStep = function(){
		//doublecheck for game bounds. Zero lives, game stopped, etc
		//check collisions
		//step objects
			//step player
			this.thePlayer.step();
			//step enemies

			for (var a=0;a<this.visibleObjects.length;a++){
	        	this.visibleObjects[a].step();
	        }
	        for (var a=0;a<this.enemies.length;a++){
	        	this.enemies[a].step();
	        }
		//update camera
		this.theCamera.moveTowards(this.thePlayer.x,this.thePlayer.y, this.thePlayer.dx, this.thePlayer.dy);


		
		this.totalSteps++;
	}
	
	this.createPlayer = function(name){
		this.thePlayer = new Player(name, this.theCamera);
	}

	this.createCamera = function(x,y,width,height){
		this.theCamera = new Camera(x,y,width,height);
	}

	function Camera(x,y,width,height){
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.accel = 1;
		this.width = width;
		this.height = height;
		this.delay = 5;
	}

	Camera.prototype.moveTowards = function(x,y,dx,dy){
		this.x = ((x + this.x*this.delay) / (this.delay+1)) - dx;
		this.y = ((y + this.y*this.delay) / (this.delay+1)) - dy;
	}

	Camera.prototype.isVisible = function(x,y,radius){
		if( x > (this.x + (this.width / 2)) ||  x < (this.x - (this.width / 2)) ||  y > (this.y + (this.height / 2)) ||  y < (this.y - (this.height / 2)))
			return false;
		else return true;
	}

	function Player(name, camera){
	 	this.friction = PLAYER_FRICTION;
	 	this.accel = PLAYER_ACCEL;
	 	this.maxSpeed = PLAYER_MAX_SPEED;

	 	this.camera = camera;
	 	this.name = name;
		this.x = 0;
		this.y = 0;
		this.dx = 0;
		this.dy = 0;
		this.speed = 0;
		
		//size
		this.s = 10;

		this.tailArray = [];
		this.color = "#ffffff";
		//not used for now
		//this.shape;
	}

	Player.prototype.step = function(){
		this.x += this.dx;
		this.y += this.dy;

		//FRICTION
		this.dx = (1-this.friction)*this.dx;
		this.dy = (1-this.friction)*this.dy;
	}
	
	Player.prototype.accelerate = function(dx,dy){
		this.dx += (dx * PLAYER_ACCEL);
		this.dy += (dy * PLAYER_ACCEL);
	}
	
	Player.prototype.draw = function(ctx){
		//just this for now.  super quick bro
		ctx.fillStyle=this.color;
		ctx.fillRect(((this.x - this.camera.x)-(this.s/2)) + (this.camera.width/2),
			((this.y - this.camera.y)-(this.s/2)) + (this.camera.height/2), this.s, this.s);
	}
	
	Player.prototype.getCoordinates = function(){
		return [this.x,this.y];
	}

	Player.prototype.activatePower = function(){
		var activatedPower = this.tailArray.shift();
		switch(activatedPower)
		{
			case 0:
			{

			}
			break;
			case 1:
			{

			}
			case 2:
			{

			}
			break;
		}
	}
	
	this.playerInput = function(dx,dy){
		this.thePlayer.accelerate(dx,dy);
	}
	
	function Entity(isEnemy,x,y){
		this.movementSpeed = ENEMY_MOVEMENT;
		
		this.isEnemy = isEnemy;
			
		this.x = x;
		this.y = y;
		
		//size
		this.s = 10;

		this.color = "#ffffff";
		//not used for now
		//this.shape;
	}
	
	Entity.prototype.step = function(){
		this.x += (Math.random()*2)-1;
		this.y += (Math.random()*2)-1;
	}
	
	Entity.prototype.draw = function(relativePlayer){
		var eX = ( relativePlayer.x - this.x);
		var eY = ( relativePlayer.y - this.y);
		
		context.fillStyle="#000";
		context.fillRect(eX-10,eY-10,20,20);
	}
	
	this.createEntity = function(type,x,y){
		switch (type){
		case 0:
			this.visibleObjects.push(new Entity(false,x,y));
			break;
		case 1:
			this.enemies.push(new Entity(true,x,y));
			break;
		}
		
	}
	
	this.drawAll = function(context){
		var TP = this.thePlayer;
		//draw background
		context.fillStyle=this.bgPattern;
		var bgX = 0-(this.theCamera.x % 20);
		var bgY = 0-(this.theCamera.y % 20);
		// offset
        context.translate(-bgX, -bgY);
        //draw
		context.fillRect(-80,-80,440,700);
        // undo offset
        context.translate(bgX, bgY);
		//draw visible objects
		//draw enemies
        for (var a=0;a<this.visibleObjects.length;a++){
        	this.visibleObjects[a].draw(TP);
        }
        for (var a=0;a<this.enemies.length;a++){
        	this.enemies[a].draw(TP);
        }
		//draw player
		TP.draw(context);

	}
	 
	 /* - player object
	 *   functions:
	 *   - step()
	 *   - draw()
	 *   - activatePower()
	 *   - collideWith(Object)
	 *   objects:
	 *   - list of attached powers
	 *   - stats, lives, health? etc
	 *   - x,y,dx,dy
	 * 
	 * - enemy object
	 *   functions:
	 *   - step()
	 *   	- all AI, movement logic goes here
	 *   - draw()
	 *   - hitWith(power)
	 *   - kill()
	 *   objects:
	 *   - x,y,dx,dy
	 *   - health?
	 *   -
	 *   - lifetime delta
	 *   
	 * - scenery object prototype
	 *   - used for all non-enemy objects
	 *   - x,y
	 *   - flags for collision, etc
	 * 
	 * - scenery object children
	 *   - specific collide() functions maybe
	 *   
	 * - step() function
	 *   - steps all other objects, performs all checks, increments timers, etc
	 *   
	 *  
	 *   
	 */
};

