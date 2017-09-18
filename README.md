# ITM462 Web Site App Development Class

ITM462 Assignment link:

https://blackboard.iit.edu/webapps/blackboard/content/listContent.jsp?course_id=_64399_1&content_id=_523362_1&mode=reset

-------------------------------------------------------------------

## Assignment 4 - due 9/19/2017 - Assignments/week4

### Write a function handAssessor(array) which accepts an array of 5 “cards”

1. poker.html - just for launching poker.js
2. poker.js 

Used a histogram method for multiple rank hands (pair, 2 pair, three of a kind,
full house, four of a kind) and sorting for sequential hands (straight, 
straight flush, royal flush)

poker.js will printout to console of all possible the winning hands in order.

-------------------------------------------------------------------

## Assignment 3 - due 9/12/2017 - Assignments/week3

### Selector Exercise Requirements - Impliment in selectors.html + selectors.js 

1. selector.html
2. **selector.css - optional, see below** 
3. selector.js

Description:

The selector.js will unhide the relevant div via .show() and in turn select each element
from the relevant class, using n-child(x) selector, add .css('color'), then fadeIn().

The colors for the numbers are stored in array numbersColors and each number is faded 
in ~1 sec later that the previous number.

The id hidden and .show() are attempting to eliminate the flicker from 
initial display of the page to the time the js script is modifying the numbers.

NOTE: Requires selector.css to be in the same directory.

### FizzBuzz Exercise Requirements - Implement in fizzbuzz.js

1. **fizzbuzz.html - Display results in webpage.**
2. **fizzbuzz.css - add some colors to FizzBuzz.**
3. fizzbuzz.js

Description:

Used modulus operator to determine if evenly divisible by 3, 5 and 15.

I so set appropriate name to string variable (i.e Fizz, Buzz or FizzBuzz)
and printed to ul list object. Added some color to the different categories
via css rules using the same name (i.e .Fizz, .Buzz, .FizzBuzz).

Output also displayed to console.

### Array Exercise Requirements - Implement in array.js

1. **array.html - Display results in webpage.**
2. array.js

Description:

Many different ways to get largest number, I chose to iterate over
each element with a foreach loop, comparing each array element 
to the previous storing the largest.

The index.html will show 3 sample arrays and the largest number.
Displaying the results in webpage and in the console.

Other options are to sort the array and select the first array item, 
but could be costly if the array is large.

Another method is using Math.max() and the spread generator.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator

	function max(numberArray) {
		var largest = Math.max(...numberArray);
		return largest;
	}
 
-------------------------------------------------------------------

## Assignment 2 - due 9/05/2017 - Exercises/Week2

Added Amazeriffic example from book.

1. index.html
2. stylesheets/reset.css
3. stylesheets/style.css
4. javascripts/app.js

-------------------------------------------------------------------

## Assignment 1- due 8/28/2017 

Created IIT-ITMD462-jchiodo github directory.
