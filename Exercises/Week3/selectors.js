var main = function () {
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
