/*
 *	John Chiodo
 *	jchiodo@hawk.iit.edu
 *	ITMD462 - Assignment3 
 *	09/12/2017
*/

var main = function () {
	"use strict";
	
	var numberColors = ['red', 'blue', 'green', 'brown', 'coral', 'grey', 'blueviolet'];
	
	/* Attempting to reduce/eliminate the flicker of .relevant elements.
	
	   The .relevant elements are hidden when the page is 
	   initially displayed then shown when this function is run. 
	   	   
	   Requires selector.css file to be in same directory, css file also
	   has some basic styling.
	*/
	$("#hidden").show();
	
	// loop through each selector assigning a color and fade time
	for (var index = 1; index <= 7; index++) {
		$('.relevant p:nth-child(' + index + ')').hide();
		$('.relevant p:nth-child(' + index + ')')
			.css('color', numberColors[index - 1])
			.fadeIn(index * 1000);
	}
};

$(document).ready(main);
