//Experiment 1 Game engine src file
/*
 * @author avanderwoude, nvanderwoude
 */

//Experimental engine object. This prototype should not be instantiated, but instead is a 
//superclass of engine objects, and contains all the generic functions

function game_engine(){
	//engine prototype. church.
	
	
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

	 function player(){
	 	this.FRICTION = .5;
	 	this.SPEED = 1;

		this.x;
		this.y;
		this.dx;
		this.dy;

		this.tailArray = [];
		this.color;
		this.shape;

		this.step = function(){



			this.x += this.dx;
			this.y += this.dy;

			//FRICTION
			this.dx = this.FRICTION*this.dy;
			this.dy = this.FRICTION*this.dx;
		}

		this.activatePower = function(){
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

		this.move = function(dx , dy){
			this.dx += dx;
			this.dy += dy;
		}

		this.draw = function(){

		}


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

