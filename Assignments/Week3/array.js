/*
 *	John Chiodo
 *	jchiodo@hawk.iit.edu
 *	ITMD462 - Assignment3 
 *	09/12/2017
 */

var main = function () {
  "use strict";

  function max(numberArray) {

    var largestSoFar = numberArray[0]; // in case there are negative numbers
    numberArray.forEach(function (arraynum) {
      if (largestSoFar < arraynum) {
        largestSoFar = arraynum;
      }
    });
    return largestSoFar;
  }
  
  // sample arrays to parse
  var numberArray  = [1, 2, 23, -78, 43, 56, 90.01, 112, 2, 3, 4],
      numberArray2 = [101, 342, 123, -798, -43, 0, 91],
      numberArray3 = [-1, -2, -56, -78, -9043, -56];
  
  var largest1 = max(numberArray); // variable for console.log
  $("#array1").text(largest1);
  console.log("The largest number in the array is: " + largest1);

  var largest2 = max(numberArray2);
  $("#array2").text(largest2);
  console.log("The largest number in the array is: " + largest2);

  var largest3 = max(numberArray3);
  $("#array3").text(largest3);
  console.log("The largest number in the array is: " + largest3);
};

$(document).ready(main);
