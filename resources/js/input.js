//Experiment 1 input src file. Handles all device-specific input. possibly multiple of these in the future
/*
 * @author avanderwoude, nvanderwoude
 */
//TODO: Adapt this to fit our needs. Handles touch events, but not with all the features we
//need, and is too specific to throwing particles

function input_object(callback){
	var tc = callback; //function to pass input to. Abstracts input to be platform-dependent only here
	var FLICK_TIMEOUT = 1000;
	var TAP_DISTANCE = 50;
	this.inputHandlers = function(){
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
		
		//mouse and touch events
		$(c)
		.on('mousedown', function(e) {
			e.preventDefault();
			m_down = true;

			var position = $(c).position();
			
			//e.originalEvent.touches[0].pageX;
			
				m_x1 = e.pageX-position.left;
				  m_y1 = e.pageY-position.top;
				  m_x2 = e.pageX-position.left;
				  m_y2 = e.pageY-position.top;
			
			  m1 = frames;
			  return false;
		})
		.on('touchstart', function(e) {
			e.preventDefault();
			m_down = true;

			var position = $(c).position();
				m_x1 = e.originalEvent.touches[0].pageX-position.left;
				  m_y1 = e.originalEvent.touches[0].pageY-position.top;
				  m_x2 = e.originalEvent.touches[0].pageX-position.left;
				  m_y2 = e.originalEvent.touches[0].pageY-position.top;
			
			  m1 = frames;
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
			var position = $(c).position();
				m_x2 = e.pageX-position.left;
				  m_y2 = e.pageY-position.top;
			  var distx = (m_x2 - m_x1) / ((frames - m1)+1);
			  var disty = (m_y2 - m_y1) / ((frames - m1)+1);
			  check(m_x2,m_y2,distx,disty);
			  return false;
		})
		.on('touchend', function(e) {
			e.preventDefault();
			m_down = false;
			var position = $(c).position();
				m_x2 = e.originalEvent.changedTouches[0].pageX-position.left;
				  m_y2 = e.originalEvent.changedTouches[0].pageY-position.top;
			  var distx = (m_x2 - m_x1) / ((frames - m1)+1);
			  var disty = (m_y2 - m_y1) / ((frames - m1)+1);
			  check(m_x2,m_y2,distx,disty);
			  return false;
		});
		
		function check(x, y, dx, dy, time){
			if (time < FLICK_TIMEOUT)
				if (Math.sqrt((dx*dx)+(dy*dy)) < TAP_DISTANCE)
					//call tap
					tc(true, x, y, dx, dy, time);
				else tc(false, x,y,dx,dy,time);
		}
	}
};

