/*
 *	John Chiodo
 *	jchiodo@hawk.iit.edu
 *	ITMD462 - Assignment week7
 *	10/10/2017
 */

// ***************************************
// BASIC SETUP
// ***************************************
var express = require("express");
var	http = require("http");
var	app;
var port = process.env.port || 3000;

var counterID = 1;  // start IDs at 1
var handStore = []; // stores the objects
var userStore = []; // stores the user objects

app = express();
// middleware for parsing incoming text as JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// ***************************************
// START SERVER
// ***************************************
http.createServer(app).listen(port);
console.log("Server Running on "+port+".\nLaunch http://localhost:"+port);
console.log("CTRL+C to exit");

// searchID - will search a card array and return the
// index if found, if not found return -1
function searchID(ArrayToSearch, key, value) {
	for (var i = 0; i < ArrayToSearch.length; i++) {
		if (ArrayToSearch[i][key] === parseInt(value)) {
			return i; // found it 
		}
	}
	return -1; // not found
}

// ***************************************
// ROUTES
// ***************************************

// GET route - /users/{userId}
//
// Returns 200 and {"name" : "Example Name", 
//                  "email" : "example@gmail.com"} 
// Returns 404 if {userid} not found
//
// ***************************************
app.get('/users/:userid', function (req, res) {
	
	var userid = req.params.userid;

	var index = searchID(userStore, "id", userid);
	
	// *** console.log output ***
	console.log("--- debug GET object begin ---");
	if (index === -1) {
		console.log("==> userId " + userid + " was not found");
		console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).send("Sorry, user \"" + userid + "\" was not found");
		console.log("--- debug GET object end ---\n");
	} else {
		console.log("==> Found userid = " + (index+1) + "\n"); 
		for (var key in userStore[index].user){
			if (userStore[index].user.hasOwnProperty(key)){
				console.log(userStore[index].user[key]);
			}
		}
		console.log("--- debug GET object end ---\n");


	if (typeof userStore[index].reuser === "undefined"){
		console.log('the property is not available...');
	} else {
		console.log('the property is available...');
	}

	// if (typeof userStore[index].user === "undefined"){
	// 	console.log('the property is not available...');
	// } else {
	// 	console.log('the property is available...');
	// }
		
		// send response with entire object
		res.status(200).json(userStore[index].user);
	}
	//console.log("Route userid: " + userid);
	//res.sendStatus(200);
});


// GET route - /users/{userId}/reminders
//
// Returns 200 and  {"title" : "Example Title", 
//                   "description" : "Example Description",
//                   "created" : "2012-04-23T18:25:43.511Z"} 
// for all reminders.
// 
// Returns 404 if {userId} not found
//
// ***************************************
app.get('/users/:userid/reminder', function (req, res) {
	var userid = req.params.userid;
	console.log("Route userid/reminder: " + userid);
	res.sendStatus(200);
});


// GET route - /users/{userId}/reminders/{reminderID}
//
// Returns 200 and  {"title" : "Example Title", 
//                   "description" : "Example Description",
//                   "created" : "2012-04-23T18:25:43.511Z"} 
// only for remonderID.
//
// Returns 404 if {userId} not found
//
// ***************************************
app.get('/users/:userid/reminder/:reminderid', function (req, res) {
	var userid = req.params.userid;
	var reminderid = req.params.reminderid;
	console.log("Route userid/reminder/reminderid: " + userid);
	console.log("Route userid/reminder/reminderid: " + reminderid);
	res.sendStatus(200);
});


// POST route - /users
//
// Input model:
// { "user" : {"name" : "Example Name",
//             "email" : "example@gmail.com" }}
//
// Returns 200 and {"id" : <someId>} if successful
// Returns 404 if {userid} not found
//

app.post('/users/', function (req, res) {
	
	var userObj = req.body;
	
	// check for empty object, send status 400 
	if (Object.keys(userObj).length === 0) {
		console.log("--- debug POST error begin ---");
		console.log("POST: Body is empty");
		console.log('*** Sending HTTP Error - 400 for request: ' + req.url);
		// send status 400, no data supplied
		res.status(400).send("Error: Data required for this operation");
		console.log("--- debug POST end ---\n");
		return;
	}

	tempUser = {};
	tempUser.id = counterID; 	// set id
	var userIdJson = JSON.stringify(tempUser); // save id to send later 
	counterID++; 				// increment for next id
	tempUser.user = userObj;	// place array into object
	userStore.push(tempUser); 	// add to end of array

	// *** console.log output ***
	console.log("--- debug POST begin ---");
	userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
	console.log("--- debug POST end ---\n");
	TS = new Date();
	console.log("Current timestamp: " + TS.toISOString() +"\n");

	// send status 200 and id
	res.status(200).send(userIdJson);
});


// POST route - /users/{userid}/reminders
//
// Input model:
// { "reminder" : {"title" : "Example Title",  
//                 "description" : "Example Description"} }
//
// Returns 200 and {"id" : <someId>} if successful
// Returns 404 if {userID} not found
//

app.post('/users/:userid/reminder', function (req, res) {
	
	var reminderObj = req.body;
	var userid = req.params.userid;
	
	// check for empty object, send status 400 
	if (Object.keys(reminderObj).length === 0) {
		console.log("--- debug POST error begin ---");
		console.log("POST: Body is empty");
		console.log('*** Sending HTTP Error - 400 for request: ' + req.url);
		// send status 400, no data supplied
		res.status(400).send("Error: Data required for this operation");
		console.log("--- debug POST end ---\n");
		return;
	}

	var index = searchID(userStore, "id", userid);

	// *** console.log output ***
	console.log("--- debug GET cards begin ---");
	if (index === -1) {
		console.log("==> ID " + id + " was not found");
		console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).send("Sorry, handId \"" + id + "\" was not found");
		console.log("--- debug GET cards end ---\n");
	} else {
		console.log("==> Found userid = " + (index+1) + "\n"); 
		for (var key in userStore[index].user){
			if (userStore[index].user.hasOwnProperty(key)){
				console.log(userStore[index].user[key]);
			}
		}
		console.log("--- debug GET object end ---\n");
	}	

	// check for existing reminders and get next reminder index

	var reminderIndex = 0;
	if (typeof userStore[index].reminder === "undefined"){
		console.log('No reminder array...');
		reminderIndex++;


	} else {
		// reminderIndex = (userStore[index].length) - 1;
		remainderIndex = (userStore[index].reminder.length) - 1;
		console.log("Next reminder index: "  + reminderIndex);
	
	}

	tempReminder = {};

	tempReminderJson = {};
	tempReminderJson.id = reminderIndex;
	var reminderIdJson = JSON.stringify(tempReminderJson);
	
	TS = new Date();
	reminderObj.created =  TS.toISOString();
	
	tempReminder.reminder = reminderObj;
	userStore[index].reminder = tempReminder;

	// tempUser.id = counterID; 	// set id
	// var userIdJson = JSON.stringify(tempUser); // save id to send later 
	// counterID++; 				// increment for next id
	// tempUser.user = userObj;	// place array into object
	// userStore.push(tempUser); 	// add to end of array

	// *** console.log output ***
	console.log("--- debug POST begin ---");
	userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
	console.log("--- debug POST end ---\n");

	// console.log("-->>: "  + userStore[index].reminder[reminderIndex].description);
	TS = new Date();
	console.log("Current timestamp: " + TS.toISOString() +"\n");

	// send status 200 and id
	res.status(200).send(reminderIdJson);
});






///////////////////////////////////////////////////////////////////	
// GET route - /hands/{handId}/cards
//
// Returns 200 and the cards array if successful
// Returns 404 if {handId} not found
//
// ***************************************
app.get('/hands/:id/cards', function (req, res) {
	var id = req.params.id;

	// search for handID
	var index = searchID(handStore, "id", id);
	
	// *** console.log output ***
	console.log("--- debug GET cards begin ---");
	if (index === -1) {
		console.log("==> ID " + id + " was not found");
		console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).send("Sorry, handId \"" + id + "\" was not found");
		console.log("--- debug GET cards end ---\n");
	} else {
		console.log("==> Found ID = " + (index+1) + "\n"); 
		for (var key in handStore[index].cards){
			if (handStore[index].cards.hasOwnProperty(key)){
				console.log(handStore[index].cards[key]);
			}
		}
		console.log("--- debug GET cards end ---\n");
		
		// send response with card array
		res.status(200).json(handStore[index].cards);
	}
});

// GET route - /hands/{handId}
//
// Returns 200 the handId and the cards array if successful
// Returns 404 if handId not found
//
// ***************************************
app.get('/hands/:id', function (req, res) {
	
	var id = req.params.id;
	
	// search for handId
	var index = searchID(handStore, "id", id);
	
	// *** console.log output ***
	console.log("--- debug GET object begin ---");
	if (index === -1) {
		console.log("==> Id " + id + " was not found");
		console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).send("Sorry, handId \"" + id + "\" was not found");
		console.log("--- debug GET object end ---\n");
	} else {
		console.log("==> Found Id = " + (index+1) + "\n"); 
		for (var key in handStore[index].cards){
			if (handStore[index].cards.hasOwnProperty(key)){
				console.log(handStore[index].cards[key]);
			}
		}
		console.log("--- debug GET object end ---\n");
		
		// send response with entire object
		res.status(200).json(handStore[index]);
	}
});

//// POST route - /hands
//// places hand in memory store and returns an Id.
//// 
//// Return codes:
//// 200 if successful
//// 400 Bad Request if no data
//// ***************************************

app.post('/hands/', function (req, res) {
	
	var handObj = req.body;
	
	// check for empty object, send status 400 
	if (Object.keys(handObj).length === 0) {
		console.log("--- debug POST error begin ---");
		console.log("POST: Body is empty");
		console.log('*** Sending HTTP Error - 400 for request: ' + req.url);
		// send status 400, no data supplied
		res.status(400).send("Error: Data required for this operation");
		console.log("--- debug POST end ---\n");
		return;
	} 

	tempHand = {};
	tempHand.id = counterID; 	// set id
	var handIdJson = JSON.stringify(tempHand); // save id to send later 
	counterID++; 				// increment for next id
	tempHand.cards = handObj;	// place array into object
	handStore.push(tempHand); 	// add to end of array

	// *** console.log output ***
	console.log("--- debug POST begin ---");
	handStore.forEach(function (eachCard) {
	    for (var key in eachCard) {
			if (eachCard.hasOwnProperty(key)){
				console.log(key +":", eachCard[key]);
			}
		}
	});
	console.log("--- debug POST end ---\n");
	
	// send status 200 and id
	res.status(200).send(handIdJson);
});

//// PUT /hands/{handId}
//// updates handId cards.
////
//// Return codes:
//// 204 No Content if successful
//// 404 Not Found if {handId} not found
//// 400 Bad Request if no data

app.put('/hands/:id', function (req, res) {
	
	var id = req.params.id;
	var handObj = req.body;
	
	// check for empty object, send status 400 
	if (Object.keys(handObj).length === 0) {
		console.log("--- debug PUT error begin ---");
		console.log("PUT: Body is empty");
		console.log('*** Sending HTTP Error - 400 for request: ' + req.url);
		// send status 400, no data supplied to update
		res.status(400).send("Error: Data required for this operation");
		console.log("--- debug PUT end ---\n");
		return;
	} 
	
	var index = searchID(handStore, "id", id);
	
	// *** console.log output ***
	console.log("--- debug PUT begin ---");
	if (index === -1) {
		console.log("==> id " + id + " was not found");
		console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
		console.log("--- debug PUT end ---\n");
		// send status 404, handId not found
		res.status(404).send("Sorry, handId \"" + id + "\" was not found");
	} else {
		// *** console.log output ***
		console.log("==> Found iD = " + (index+1) + "\n"); 
		var key;
		for (key in handStore[index].cards){
			if (handStore[index].cards.hasOwnProperty(key)){
				console.log(handStore[index].cards[key]);
			}
		}
		// replace the hand 
		handStore[index].cards = handObj.slice();
		
		// *** console.log output ***
		console.log("\n==> Replaced with:" + "\n"); 
		for (key in handStore[index].cards){
			if (handStore[index].cards.hasOwnProperty(key)){
				console.log(handStore[index].cards[key]);
			}
		}
		
		console.log('\n*** Sending HTTP 204 for put: ' + req.url);
		console.log("--- debug PUT end ---\n");
		// send status 204
		res.status(204).send("\nUpdate for handId \"" + id + "\" was successful");
	}
});

//// middleware that handles the routes not defined
//// for 404 response. It has been placed at the bottom
//// of the stack.
//// https://expressjs.com/en/starter/faq.html
app.use(function(req, res) {
	console.log("--- Bad Route begin ---");
	console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
	console.log("--- Bad Route end ---\n");
	// send status 404, invalid route
	res.status(404).send('Sorry, Can not find that resource.');
});