/*
 *	John Chiodo
 *	jchiodo@hawk.iit.edu
 *	ITMD462 - Assignment3 
 *	09/12/2017
 */

var main = function () {
	"use strict";

	function fizzbuzz(first, last) {	
		var $fizzlist = $("#fboutput");
		
		for (var i = first; i <= last; i++) {
			var fbresult = "";
			if (i % 15 === 0)
				fbresult = "FizzBuzz";
			else if (i % 3 === 0)
				fbresult = "Fizz";
			else if (i % 5 === 0)
				fbresult = "Buzz";
			
			// display the result
			if (fbresult == "") {
				// if not fizz/buzz/fizzbuzz, append to list
				$fizzlist.append($("<li>").text(i + " = " + i));
				console.log(i + " = " + i);
			} else { 
				// if fizz/buzz/fizzbuzz, append to list and add color class
				$fizzlist.append($("<li>").text(i + " = " + fbresult));
				$fizzlist.find('li:last').addClass(fbresult);
				console.log(i + " = " + fbresult);
			}
			
		}
	}
  
	fizzbuzz(1, 100);  
  
};

$(document).ready(main);