//Experiment 1 input src file. Handles all device-specific input. possibly multiple of these in the future
/*
 * @author avanderwoude, nvanderwoude
 */
//TODO: Adapt this to fit our needs. Handles touch events, but not with all the features we
//need, and is too specific to throwing particles

function input_object(callback){
	var tc = callback; //function to pass input to. Abstracts input to be platform-dependent only here
	var FLICK_TIMEOUT = 1000;
	var TAP_DISTANCE = 20;
	var mouse1 = [0,0];
	var mouse2 = [0,0];
	var now;
	var canvas = document.getElementById('c');
	
	this.setup = function(){
		//block defaults
		// do nothing in the event handler except canceling the event
		$(c).ondragstart = function(e) {
		    if (e && e.preventDefault) { e.preventDefault(); }
		    if (e && e.stopPropagation) { e.stopPropagation(); }
		    return false;
		}

		// do nothing in the event handler except canceling the event
		$(c).onselectstart = function(e) {
		    if (e && e.preventDefault) { e.preventDefault(); }
		    if (e && e.stopPropagation) { e.stopPropagation(); }
		    return false;
		}
		
		document.body.ontouchstart = function(e) {
		    if (e && e.preventDefault) { e.preventDefault(); }
		    if (e && e.stopPropagation) { e.stopPropagation(); }
		    return false;
		}

		document.body.ontouchmove = function(e) {
		    if (e && e.preventDefault) { e.preventDefault(); }
		    if (e && e.stopPropagation) { e.stopPropagation(); }
		    return false;
		}
		
		/*//watch the keyboard for input
		$(document).keydown(function (e) {
			keys[e.keyCode] = true;
		});
		$(document).keyup(function (e) {
				keys[e.keyCode] = false;
			});
		
		//handle multiple input types
		$(document.body).on('keydown', function(e) {
		    switch (e.which) {
				// key code for esc 
			    case 27:
			        console.log('esc');
			        break;
			    // key code for left arrow
			    case 37:
			        console.log('left arrow key pressed!');
			        break;
			    // key code for up arrow
			    case 38:
			        console.log('up arrow key pressed!');
			        break;
			    // key code for right arrow
			    case 39:
			        console.log('right arrow key pressed!');
			        break;
		    	// key code for down arrow
		        case 40:
		            console.log('down arrow key pressed!');
		            break;
		    }
		    return false;
		});*/
		
		function getMousePos(canvas, evt) {
	        var rect = canvas.getBoundingClientRect();
	        return [evt.clientX - rect.left,
	  	          evt.clientY - rect.top];
		}
		
		//mouse and touch events
		$(c)
		.on('mousedown', function(e) {
			e.preventDefault();
			m_down = true;
			now = new Date();
			mouse1 = getMousePos(canvas, e);
			return false;
		})
		.on('touchstart', function(e) {
			e.preventDefault();
			m_down = true;
			now = new Date();
			var position = $(c).position();
				mouse1[0] = e.originalEvent.touches[0].pageX-position.left;
				mouse1[1] = e.originalEvent.touches[0].pageY-position.top;
			return false;
		})/*
		.mousemove(function(e) {
			//if (m_down){
				var position = $(c).position();
				m_x2 = e.pageX-position.left;
				  m_y2 = e.pageY-position.top;
			//}
		})*/
		.on('mouseup', function(e) {
			e.preventDefault();
			m_down = false;
			mouse2 = getMousePos(canvas, e);
			  var distx = (mouse2[0] - mouse1[0]) ;
			  var disty = (mouse2[1] - mouse1[1]) ;
			  //check
			  var elapsed = (new Date()).getTime() - now.getTime();
			  check(mouse2[0],mouse2[1],distx,disty,elapsed);
			  return false;
		})
		.on('touchend', function(e) {
			e.preventDefault();
			m_down = false;
			var position = $(c).position();
				mouse2[0] = e.originalEvent.changedTouches[0].pageX-position.left;
				  mouse2[1] = e.originalEvent.changedTouches[0].pageY-position.top;
			  var distx = (mouse2[0] - mouse1[0]) ;
			  var disty = (mouse2[1] - mouse1[1]) ;
			  //check
			  var elapsed = (new Date()).getTime() - now.getTime();
			  
			  
			  check(mouse2[0],mouse2[1],distx,disty,elapsed);
			  return false;
		});
		
		function check(x, y, dx, dy, time){
			var multi = time/10;
			if (time < FLICK_TIMEOUT)
				if (Math.sqrt((dx*dx)+(dy*dy)) < TAP_DISTANCE){
					//alert("Tap: " +x+ ", "+ y + " / "+ dx/multi+", "+ dy/multi +" / "+time);
					//call tap
					tc(true, x, y, -dx/multi, -dy/multi);
				}
					
				else{
				tc(false, x,y,-dx/multi,-dy/multi);
					//alert("swipe: " +x+ ", "+ y + " / "+ dx/multi +", "+ dy/multi +" / "+time);
					
				}
		}
	}
};