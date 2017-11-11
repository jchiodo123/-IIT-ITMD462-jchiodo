# ITM462 Web Site App Development Class

ITM462 Assignment link:

https://blackboard.iit.edu/webapps/blackboard/content/listContent.jsp?course_id=_64399_1&content_id=_523362_1&mode=reset


## Assignment 8 - due 11/14/2014 - Assignments/week12

Description  
As a developer of your application
I want to be able to execute automated tests which exercise the functionality of the application
So that I can be ensure that my changes do not break existing functionality

Acceptance Criteria
   * Must write automated tests for the functionality from assignment 6/7.
   * At minimum all happy paths should be tested (i.e. successful GET returns expected info, GET against missing element returns 404, etc)
   * Must be executed when running npm test
   

### Setup win10 to work with mocha
If your "npm test" is not finding mocha then probably your path in
win10 is not setup, found this link and summarized below:  
https://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8  

In gitbash with vagrant loaded, get the path from npm:  
npm config get prefix  
get something like this:  
C:\Users\{yourName}\AppData\Roaming\npm  
then add to win10 environment variable (only modify user variable, top box)  

 * 1.) Search environment variables at your start menu's search box.
 * 2.) Click it then go to Environment Variables...
 * 3.) Click PATH, click Edit
 * 4.) Click New and try to copy and paste this: C:\Program Files\nodejs\node_modules\npm\bin

BUT use the path from the "npm config get prefix" step  

### Commands to install mocha/chai on vagrant box

from gitbash shell in project directory

 * sudo npm install --save-dev mocha --no-bin-links
 * sudo npm install --save-dev chai --no-bin-links
 * sudo npm install --save-dev chai-http --no-bin-links
 * optional: I might have not commented out require for mongoose
	* sudo npm install --save mongoose --no-bin-links

	
## Assignment 7 - due 11/07/2017 - Assignments/week11

Description  
As a user of your application
I want to be able to create reminders associated with my user through a user interface
So that I can be reminded of things

Acceptance Criteria
   *  Must expose the functionality from assignment 6 through a user interface.
    i.e. GET /user/{userId}/reminders should show a page listing all reminders in an easy to read format (see Amazeriffic for examples)
   * All functionality must be accessible through the interface (i.e. must have links from other pages which don't require manual url manipulation)

## Assignment 6 - due 10/31/2017 - Assignments/week10

        GET /users/{userId}
            * Must return a 200 with ONLY the relevant user information ( i.e. { "name" : "My Name", "email" : "my@email.com" } )
            * Return 404 if not found
        GET /users/{userId}/reminders
            * Must return a 200 with ONLY the relevant user's reminders as an array ( i.e. [{ "title" : "MyTItle", "description" : "My Desc", "created" : <<created_timestamp> }])
            * Return 404 if not found
            * GRAD STUDENTS MUST ALSO IMPLEMENT TITLE FILTERING
                * If query param "title" is present, only return reminders which match that title exactly (i.e. GET /users/{userId}/reminders?title=My%20Title )
        GET /users/{userId}/reminders/{reminderId}
            * Must return a 200 with ONLY the relevant user's reminder as a single object ( i.e. { "title" : "My TItle", "description" : "My Desc", "created" :< <created_timestamp> })
            * Return 404 if not found
        POST /users
            * Must create a user given the user input model defined below
            * Content-Type must be application-json
            * Return 200 along with ONLY the new user id upon success (i.e. { "id" : <someId> } )
        POST /users/{userId}/reminders
            * Must create a reminder given the reminder input model defined below (i.e. user does not provide created timestamp on creation)
            * Content-Type must be application-json
            * Return 200 along with ONLY the new reminder id upon success (i.e. { "id" : <someId> } )
        DELETE /users/{userId}
            * Must delete the user at the given id along with all of their reminders
            * Return 204 No Content upon success
            * Return 404 if user doesn't exist
        DELETE /users/{userId}/reminders
            * Must delete all the reminders for the user at the given id
            * Return 204 No Content upon success
            * Return 404 if user doesn't exist
        DELETE /users/{userId}/reminders/{reminderId}

            Must delete the specified reminder for the user at the given id
            Return 204 No Content upon success
            Return 404 if user or reminder doesn't exist

Model Definitions

Expected Input models
{  "user" : {    "name" : "Example Name",    "email" : "example@gmail.com"  } }
{  "reminder" : {    "title" : "Example Title",  "description" : "Example Description"  } }

Expected Output models (if different)

{  "reminder" : { "title" : "Example Title", "description" : "Example Description", "created" : "2012-04-23T18:25:43.511Z" }}

## Assignment 5 - due 10/10/2017 - Assignments/week7

NodeJS server which responds to the following calls

    GET /hands/{handId}
        * Should return an object which describes the hand
            * Return 200 with body of {“id”: <some-int-id>, “cards”: [<array-of-cards>]} is found
            * Return 404 if not {handId} not found
    GET /hands/{handId}/cards
        * Should return an 5 object array of cards which make up the given hand (i.e. [{”suit”: “spades”, rank: “a”},…])
            * Return 200 with body of [{”suit”: “spades”, rank: “a”},…] if found
            * Return 404 if {handId} not found
    POST /hands
        * Should take a 5 object array of cards which make up a poker hand, generate an id for it, store it in memory*, and return that id upon success
            * Return 200 with body of {“id” : some-id  }
            * All suites should be lowercase
            * All ranks should be a single lowercase letter, or a number (i.e. a not Ace and 10 not ten)
        * GRAD STUDENTS: Persist data in  mongoDB  using DEFAULT HOST AND PORT VALUES
    PUT /hands/{handId}
        * Should take a 5 object array of cards which make up a poker hand and update an existing ID with the provided cards
            * Return 204 No Content if successful
            * Return 404 if {handId} not found
			
## Vagrant Setup Notes:

#### first time sets up linux box and installs node.js and express.
install virtualbox  
install vagrant

#### in git bash shell ...
mkdir into working directory, where you want to put server etc.
cd into working dir

#### initialize server for first time
vagrant init arvindr21/mean-box

#### modify Vagrantfile  with the following:
config.vm.box = "arvindr21/mean-box"  
config.vm.define :TestServer  
config.vm.network "forwarded_port", guest: 3000, host: 3000  
		
#### in gitbash shell, bring up server
vagrant up

#### in git bash shell ssh into server, them cd to shared directory
vagrant ssh  
cd /vagrant

#### With this box, node.js is outdated, update it but need curl first (need sudo on vagrant box)
sudo apt-get install curl

#### now update update node.js
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -  
sudo apt-get install -y nodejs

#### check node.js version, like 6.10.0 or something later.
node -v

#### create or copy app.js, with basic node server (book page 190)
create app.js

#### from ssh shell, run app.js
node app.js

#### test your server
point browser to localhost:3000, should see text msg from app.js 

#### now try server with express
mkdir express 
cd into express

#### need to get express, answer prompts, package.json created.
npm init

#### to install express with vagrant (sudo and --no-bin-links needed)
sudo npm install --no-bin-links express --save

#### create or copy server.js, with basic node server (book page 192-193)
create server.js file
	
#### run server.js
node server.js

#### test server.js
point browser to localhost:3000, should see a different text msg from each route in server.js

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
