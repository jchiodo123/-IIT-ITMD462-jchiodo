# ITM462 Web Site App Development Class

ITM462 Assignment link:

https://blackboard.iit.edu/webapps/blackboard/content/listContent.jsp?course_id=_64399_1&content_id=_523362_1&mode=reset

-------------------------------------------------------------------
## Assignment 3 - due 9/12/2017 - Assignments/Week3

### Selector Exercise Requirements - Impliment in selectors.html + selectors.js 

1. selector.html
2. selector.css 
3. selector.js

Description:

The selector.js will unhide the relevant div via .show() and in turn select each element
from the relevant class, using n-child(x) selector, and add .css('color'), then fadeIn().

The colors are stored in array numbersColors and each number if faded in 1 sec 
later that the previous number.

The hidden div and .show() are attemptng to elimnate the extra refresh from 
hide()/fadeIn() which looks like all elements flicker before being faded in.

NOTE: Requires selector.css to be in the same directory.

### FizzBuzz Exercise Requirements - Implement in fizzbuzz.js

1. fizzbuzz.html
2. fizzbuzz.js

### Array Exercise Requirements - Implement in array.js

1. array.html
2. array.css
3. array.js

Description:

Many different ways to get largest (or smallest), I chose to iterate over
each element with a foreach loop, comparing each array to previous storing 
the largest.

Other options is to sort the array and select the first array item, have to
account for numnbers in array and could be costly if array is large, when you
only want the largest number

Another method is using Math.max() and the spread generator
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
