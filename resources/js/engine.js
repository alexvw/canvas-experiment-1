//Experiment 1 Game engine src file
/*
 * @author avanderwoude, nvanderwoude
 */

//Experimental engine object. This prototype should not be instantiated, but instead is a 
//superclass of engine objects, and contains all the generic functions
var PLAYER_FRICTION = 0.05;
var PLAYER_MAX_SPEED = 100;
var PLAYER_ACCEL = 0.01;
function game_engine(){
	//engine prototype. church.
	this.totalSteps = 0;
	this.running = 0;
	//maybe
	//this.camera = function(){
	
	this.thePlayer = {};
	
	this.visibleObjects = [];
	
	this.enemies = [];
	
	this.init = function(){
		this.running = 1;
		this.totalSteps = 0;
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

		//update camera
		this.theViewPort.moveTowards(this.thePlayer.x,this.thePlayer.y);
		
		this.totalSteps++;
	}
	
	this.createPlayer = function(name){
		this.thePlayer = new Player(name, this.theViewPort);
	}

	this.createViewPort = function(x,y,width,height){
		this.theViewPort = new ViewPort(x,y,width,height);
	}

	function ViewPort(x,y,width,height){
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.accel = 1;
		this.width = width;
		this.height = height;
		this.delay = 120;
		this.posX = [];
		this.posY = [];
		for (var i = 1; i <= this.delay; i++) {
   			this.posX.push(0);
		}
		for (var j = 1; j <= this.delay; j++) {
   			this.posY.push(0);
		}
	}

	ViewPort.prototype.moveTowards = function(x,y){
		this.posX.push(x);
		this.posY.push(y);
		this.x = this.posX.shift();
		this.y = this.posY.shift();
	}

	ViewPort.prototype.isVisible = function(x,y,radius){
		if( x > (this.x + (this.width / 2)) ||  x < (this.x - (this.width / 2)) ||  y > (this.y + (this.height / 2)) ||  y < (this.y - (this.height / 2)))
			return false;
		else return true;
	}

	function Player(name,viewPort){
	 	this.friction = PLAYER_FRICTION;
	 	this.accel = PLAYER_ACCEL;
	 	this.maxSpeed = PLAYER_MAX_SPEED;

	 	this.viewPort = viewPort;

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
	
	Player.prototype.draw = function(ctx,x,y){
		//just this for now.  super quick bro
		ctx.fillStyle=this.color;
		ctx.fillRect(((this.x - this.viewPort.x)-(this.s/2)) + (this.viewPort.width/2),
			((this.y - this.viewPort.y)-(this.s/2)) + (this.viewPort.height/2), this.s, this.s);
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
	
	this.drawAll = function(context){
		//draw background
		//draw visible objects
		//draw enemies
		//draw player
		context.fillStyle = "#0000A0";
		context.fillRect(0,0,360,615);

		this.thePlayer.draw(context, 150, 300);
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

