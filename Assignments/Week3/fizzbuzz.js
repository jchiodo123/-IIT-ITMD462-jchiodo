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
		
    for (var number = first; number <= last; number++) {
      var fbresult = "";
      if (number % 15 === 0)
        fbresult = "FizzBuzz";
      else if (number % 3 === 0)
        fbresult = "Fizz";
      else if (number % 5 === 0)
        fbresult = "Buzz";
			
      // display the result
      if (fbresult == "") {
        // if not fizz/buzz/fizzbuzz, append to list
        $fizzlist.append($("<li>").text(number + " = " + number));
        console.log(number + " = " + number);
      } else { 
        // if fizz/buzz/fizzbuzz, append to list and add color class
        $fizzlist.append($("<li>").text(number + " = " + fbresult));
        $fizzlist.find('li:last').addClass(fbresult);
        console.log(number + " = " + fbresult);
      }
    }
  }
  
  // call fizzbuzz with range 1-100
  fizzbuzz(1, 100);  
  
};

$(document).ready(main);