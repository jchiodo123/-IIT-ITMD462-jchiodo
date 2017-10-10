# ITM462 Web Site App Development Class

ITM462 Assignment link:

https://blackboard.iit.edu/webapps/blackboard/content/listContent.jsp?course_id=_64399_1&content_id=_523362_1&mode=reset

## Assignment 7 - due 10/10/2017 - Assigments/week7

NodeJS server which responds to the following calls

    GET /hands/{handId}
        Should return an object which describes the hand
            Return 200 with body of {“id”: <some-int-id>, “cards”: [<array-of-cards>]} is found
            Return 404 if not {handId} not found
    GET /hands/{handId}/cards
        Should return an 5 object array of cards which make up the given hand (i.e. [{”suit”: “spades”, rank: “a”},…])
            Return 200 with body of [{”suit”: “spades”, rank: “a”},…] if found
            Return 404 if {handId} not found
    POST /hands
        Should take a 5 object array of cards which make up a poker hand, generate an id for it, store it in memory*, and return that id upon success
            Return 200 with body of {“id” : some-id  }
            All suites should be lowercase
            All ranks should be a single lowercase letter, or a number (i.e. a not Ace and 10 not ten)
        *GRAD STUDENTS: Persist data in  mongoDB  using DEFAULT HOST AND PORT VALUES
    PUT /hands/{handId}
        Should take a 5 object array of cards which make up a poker hand and update an existing ID with the provided cards
            Return 204 No Content if successful
            Return 404 if {handId} not found

		
			
## Vagrant setup Notes:

### first time sets up linux box and installs node.js
### and express. Only need to do many of these commands once

	install virtualbox
	install vagrant

### in git bash shell ...
	mkdir into working directory, where you want to put server etc.
	cd into working dir

### initialize server for first time
	vagrant init arvindr21/mean-box

### modify Vagrantfile  with the following:
	
	config.vm.box = "arvindr21/mean-box"
	config.vm.define :TestServer
	config.vm.network "forwarded_port", guest: 3000, host: 3000
		
### in gitbash shell, bring up server
	vagrant up

### in gitbash shell, logon to server ...
### from git bash ssh into server, shared directory is /vagrant
	vagrant ssh
	cd /vagrant

### With this box, node.js is outdated, update it
### but need curl first

	sudo apt-get install curl

### now update update node.js
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt-get install -y nodejs

### check node.js version, like 6.10.0 or something later.
	node -v

### create or copy app.js, with basic node server
### book page 190
	create app.js

### from ssh shell, run app.js
	node app.js

### test your server
point browser to localhost:3000, should see text msg from app.js 
this is working, done

### now try server with express
	mkdir express
	cd into express

### need to get express, answer prompts, package.json created.
	npm init

### to install express with vagrant (sudo and --no-bin-links needed)
	sudo npm install --no-bin-links express --save

### create or copy server.js, with basic node server
### book page 192-193
	create server.js file
	
### run server.js
	node server.js

### test server.js
point browser to localhost:3000, should see a different text msg 
from each route in server.js, this is working, done			
						
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
