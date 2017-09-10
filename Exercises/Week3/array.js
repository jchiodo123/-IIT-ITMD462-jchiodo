var main = function () {
    "use strict";

	function max(numberArray) {
		
		var largestSoFar = numberArray[0]; // in case there are negative numbers
		numberArray.forEach(function(arraynum){
			if(largestSoFar < arraynum) 
				largestSoFar = arraynum;
		});
		return largestSoFar;
	}

	var numberArray = [1, 2, 23, -78, 43, 56, 90.01, 112, 2, 3, 4];
	var largest = max(numberArray); // variable for console.log
	$("#array1").text(largest);
	console.log("The largest number in the array is: " + largest);	
	
	var numberArray = [101, 342, 123, -798, -43, 0, 91];
	var largest = max(numberArray);
	$("#array2").text(largest);
	console.log("The largest number in the array is: " + largest);	

	var numberArray = [-1, -2, -56, -78, -9043, -56];
	var largest = max(numberArray);
	$("#array3").text(largest);
	console.log("The largest number in the array is: " + largest);	
};

$(document).ready(main);