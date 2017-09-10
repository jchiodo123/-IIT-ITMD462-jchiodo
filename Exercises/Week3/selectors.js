/*
 *	John Chiodo
 *	jchiodo@hawk.iit.edu
 *	ITMD462 - Assignment3 
 *	09/12/2017
*/

<!doctype html>
<html>
	<head>
	  <title>Assignment Week 3 - Selectors</title>
	  <link href='selectors.css' rel='stylesheet' type='text/css'>
	</head>

	<body>
		<h1>Hi</h1>
		<h2 class="important">Hi Again</h2>
		<p>Random paragraph</p>
		
		<div id="hidden" class="relevant">
			<p class="a">first</p>
			<p class="a">second</p>
			<p>third</p>
			<p>fourth</p>
			<p class="a">fifth</p>
			<p class="a">sixth</p>
			<p>seventh</p>
		</div>
		
		<script src="http://code.jquery.com/jquery-3.2.1.min.js"></script>
		<script src="selectors.js"></script>
	</body>
</html>var main = function () {
	"use strict";
	
	/* The .relevant elements are hidden when the page is 
	   initially displayed then shown when this function is run. 
	   Attempting to reduce/eliminate the flicker of .relevant 
	   elements.
	*/
	$("#hidden").show();
	
	$(".relevant p:nth-child(1)").hide();  // need to hide before fadeIn()
	$(".relevant p:nth-child(1)").addClass("color1").fadeIn(2000);
	
	$(".relevant p:nth-child(2)").hide();	
	$(".relevant p:nth-child(2)").addClass("color2").fadeIn(3000);
	
	$(".relevant p:nth-child(3)").hide();
	$(".relevant p:nth-child(3)").addClass("color3").fadeIn(4000);
	
	$(".relevant p:nth-child(4)").hide();
	$(".relevant p:nth-child(4)").addClass("color4").fadeIn(5000);
	
	$(".relevant p:nth-child(5)").hide();
	$(".relevant p:nth-child(5)").addClass("color5").fadeIn(6000);
	
	$(".relevant p:nth-child(6)").hide();
	$(".relevant p:nth-child(6)").addClass("color6").fadeIn(7000);
	
	$(".relevant p:nth-child(7)").hide();
	$(".relevant p:nth-child(7)").addClass("color7").fadeIn(8000);
	
};

$(document).ready(main);
