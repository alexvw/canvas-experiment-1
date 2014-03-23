<html>
<!DOCTYPE html>
<head>
<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Experiment 1</title>
	<meta name="author" content="Alex Vander Woude, Nick Vander Woude">
	<meta name="description" content="Experiment 1">
	<!-- lets just go with this one -->
	<meta name="viewport" content="width=360">
	
	<!-- cdn includes -->
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600' rel='stylesheet' type='text/css'>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" rel="stylesheet">
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    
	<!-- local includes -->
	<link href="resources/css/system.css" rel="stylesheet">
	<link href="resources/css/ui.css" rel="stylesheet">
</head>
<body>
	<section class="menu" id="main-menu">
		<article id="canvas" >
			<canvas id="c" width=370 height=610 ontouchstart="touchStart(event);"
  ontouchmove="touchMove(event);"
  ontouchend="touchEnd(event);"
  ontouchcancel="touchCancel(event);">Sorry, your device does not support HTML5 Canvas.</canvas>
		</article>
		<span id="status">Loading...</span>
	</section>
</body>

<!-- footer includes for better loading-->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script src="resources/js/engine.js"></script>
	<script src="resources/js/game.js"></script>
	<script src="resources/js/input.js"></script>
</html>