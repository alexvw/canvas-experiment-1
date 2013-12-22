//Experiment 1 driver file. Requires engine.js and input.js to function, also relies on #c canvas element on page
//@author avanderwoude, nvanderwoude

//the game engine namespace object
var expEngine;
//the input namespace object
var input;
//game vars
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

function init(){
	//TODO: setup functions

	//engine init
	expEngine = expEngine || new experimental_game_engine(1, -1, "new");
	expEngine.prototype = new 2d_battle_engine();
	//input init
	input = input || new experimental_game_input(1, -1, "new");
	input.prototype = new input_object();

	//input init
	inputSetup();
	//game init
	gameSetup();
}

//TODO: determine params
function experimental_engine(RID, AID, STATUS) {
	2d_battle_engine.call(this, RID, AID, STATUS);
	//TODO: set init params
	
	//override example. May not use, idk
	/*this.getData = function(){
		if (!this.validation())
			return false;
		//object to be returned
		//{"id",:"0","attributeType":"Name","name"="John Smith"}
		var this_return = {
				id: this.RPID,
				attributeType: "FullName",
				status: this.status,
				data: {}
		}
		//check the status
		//gather appropriate data
		switch (this.status){
		case ("new"):
			this_return.data = {
				fullName: $('#attr'+this.RPID+'-inputs').find('#FullName').val()
				}
			return this_return;
			break;
		}
			//call generic validation
			return this.prototype.getData.call(this, this_return);	
	}*/
}

//render loop
function renderLoop(){
	
}
//save to serialized object
function save(){
	
}
//start a certain level
function startLevel(whichLevel){
	
}

function quit(){
	
}

function reset(){
	
}

//...