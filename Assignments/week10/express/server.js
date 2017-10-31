/*
 *	John Chiodo
 *	jchiodo@hawk.iit.edu
 *	ITMD462 - Assignment6 week10
 *	10/31/2017
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

// searchID - will search an array and return the
// index if found, if not found return -1
function searchID(ArrayToSearch, key, value) { // 1 2
	for (var i = 0; i < ArrayToSearch.length; i++) {
		//console.log("inside: "+ ArrayToSearch.length);
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
	// get userid from URL	
	var userid = req.params.userid;

	// check for valid userid
	var index = searchID(userStore, "id", userid);
	console.log("--> debug GET object BEGIN");
	if (index === -1) {
		console.log("userId " + userid + " was not found");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, user \"" + userid + "\" was not found");
		console.log("--> debug GET object END\n");
	} else {
		console.log("Found userid = " + (index+1) + "\n"); 
		for (var key in userStore[index].user){
			if (userStore[index].user.hasOwnProperty(key)){
				console.log(userStore[index].user[key]);
			}
		}
		console.log("--> debug GET object END\n");

	// send response and user object
	res.status(200).json(userStore[index].user);
	}
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
	// get userid from URL	
	var userid = req.params.userid;

	// check for valid userid
	var index = searchID(userStore, "id", userid);
	console.log("--- debug GET /users/:userid/reminder check users BEGIN ---");
	if (index === -1) {
		console.log("ID " + userid + " was not found");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, userid \"" + userid + "\" was not found");
		console.log("--> debug GET /users/:userid/reminder check users END ---\n");
		return;
	} else {
		console.log("Found userid = " + (index +1) + ":"); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
		console.log("--> debug GET /users/:userid/reminder check users END\n");
	}

	// check if user has reminders
	console.log("--> debug GET /users/:userid/reminder check if user reminders begin");
	if (typeof userStore[index].reminder === "undefined"){
		console.log("ID " + userid + " has no reminders");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, userid \"" + userid + "\" has no reminders");
		console.log("--> debug GET /users/:userid/reminder check if user reminders end\n");
		return;
	} else {
		console.log("ID " + userid + " has reminders");
		console.log("--> debug GET /users/:userid/reminder check if user reminders end\n");
	}

	// need to repack the array and remove the "reminderID" key from all the reminders
	var reminderArray = [];
	userStore[index].reminder.forEach(function (eachReminder) {
		// get each key except reminderID
		var reminderArrayObj = {};
		reminderArrayObj.title = eachReminder.title;
		reminderArrayObj.description = eachReminder.description;
		reminderArrayObj.created = eachReminder.created;
		
		reminderArray.push(reminderArrayObj);  // push to temp array
		//console.log(JSON.stringify(reminderArrayObj));
	});

	// send 200 and the modified reminder array
	res.status(200).send(JSON.stringify(reminderArray));
});


// GET route - /users/{userId}/reminders/{reminderID}
//
// Returns 200 and  {"title" : "Example Title", 
//                   "description" : "Example Description",
//                   "created" : "2012-04-23T18:25:43.511Z"} 
// only for reminderID.
//
// Returns 404 if {userId} not found
//
// ***************************************
app.get('/users/:userid/reminder/:reminderid', function (req, res) {
	// get userid and reminderid from URL	
	var userid = req.params.userid;
	var reminderid = req.params.reminderid;

	// check for valid userid
	var index = searchID(userStore, "id", userid);
	console.log("--> debug GET /users/:userid/reminder/:reminderid check users BEGIN ---");
	if (index === -1) {
		console.log("ID " + userid + " was not found");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, userid \"" + userid + "\" was not found");
		console.log("--> debug GET /users/:userid/reminder/:reminderid check users END ---\n");
		return;
	} else {
		console.log("Found userid = " + userid + ":"); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
		console.log("--> debug GET /users/:userid/reminder/:reminderid check users END\n");
	}

	// check if user has reminders
	console.log("--> debug GET /users/:userid/reminder/:reminderid check if user reminders begin");
	if (typeof userStore[index].reminder === "undefined"){
		console.log("ID " + userid + " has no reminders");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, userid \"" + userid + "\" has no reminders");
		console.log("--> debug GET /users/:userid/reminder/:reminderid check if user reminders END\n");
		return;
	} else {
		console.log("ID " + userid + " has reminders");
		console.log("--> debug GET /users/:userid/reminder/:reminderid check if user reminders END\n");
	}

	// check for valid reminderID
	if (userStore[index].reminder.length === 0) {
		console.log("empty array");
	}

	var reminderIndex = searchID(userStore[index].reminder, "reminderID", reminderid);
	console.log("--> debug GET /users/:userid/reminder/:reminderid check reminderid BEGIN");
	if (reminderIndex === -1) {
		console.log("reminderID " + reminderid + " was not found");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, reminderid \"" + reminderid + "\" was not found");
		console.log("--> debug GET /users/:userid/reminder/:reminderid check reminderid END\n");
		return;
	} else {
		console.log("Found reminderid = " + reminderid + ", for userid = " + userid + ":"); 
		console.log("--> debug GET /users/:userid/reminder/:reminderid check reminderid END\n");
	}

	// build new send object without the "reminderID" key
	reminderObj = {};
	reminderObj.title = userStore[index].reminder[reminderIndex].title;
	reminderObj.description = userStore[index].reminder[reminderIndex].description;
	reminderObj.created = userStore[index].reminder[reminderIndex].created;

	// send 200 + reminderObj
	res.status(200).send(reminderObj);
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
	// get body from URL
	var userObj = req.body;
	console.log(JSON.stringify(userObj));
	// check for empty object, send status 400 
	if (Object.keys(userObj).length === 0) {
		console.log("--> debug POST /users body contents check BEGIN");
		console.log("POST: Body is empty");
		console.log("Sending HTTP Error - 400 for request: " + req.url);
		// send status 400, no data supplied
		res.status(400).send("Error: Data required for this operation");
		console.log("--> debug POST /users body contents check END \n");
		return;
	}

	/* add check for duplicate userID */

	tempUserIdObj = {};  // temp userid object
	tempUserObj = {};    // temp name and email object

	tempUserIdJsonObj = {};
	tempUserIdJsonObj.id = counterID; 	// set global userid counter
	var userIdJson = JSON.stringify(tempUserIdJsonObj); // while at this step, save id to send later 
	
	// build userid object
	tempUserObj.name = userObj[0].user.name;
	tempUserObj.email = userObj[0].user.email;
	
	tempUserIdObj.id = counterID;
	tempUserIdObj.user = tempUserObj;

	tempUserIdObj.reminderCounter = 1; // initialize reminderCounter and place into object

	counterID++; 	// increment for next userid
	userStore.push(tempUserIdObj); 	// add to end of array

	// *** console.log output ***
	console.log("--> POST /users debug dump BEGIN");
	userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
	console.log("--> POST /users debug dump END\n");

	// send status 200 and just userid object
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
		console.log("--> POST /users/:userid/reminder body contents check BEGIN");
		console.log("POST: Body is empty");
		console.log("Sending HTTP Error - 400 for request: " + req.url);
		// send status 400, no data supplied
		res.status(400).send("Error: Data required for this operation");
		console.log("--> POST /users/:userid/reminder body contents check END\n");
		return;
	}

	// check for valid userid
	var index = searchID(userStore, "id", userid);
	console.log("--> POST /users/:userid/reminder check users BEGIN");
	if (index === -1) {
		console.log("ID " + userid + " was not found");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, userid \"" + userid + "\" was not found");
		console.log("--> POST /users/:userid/reminder POST check users END\n");
		return;
	} else {
		console.log("Found userid = " + (index+1) + ":"); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
		console.log("--> POST /users/:userid/reminder check users END\n");
	}	

	// build reminder object
	tempReminder = {}; // empty temp object
	tempReminderIdObj = {}; // empty temp object for send

	tempReminderIdObj.reminderid = userStore[index].reminderCounter; // get current counter
	var reminderIdJson = JSON.stringify(tempReminderIdObj); // save JSON for sending
	
	tempReminder.reminderID = userStore[index].reminderCounter;  // insert counter
	tempReminder.title = reminderObj[0].reminder.title;             // insert title
	tempReminder.description = reminderObj[0].reminder.description; // insert description
	reminderTimeStamp = new Date();
	tempReminder.created =  reminderTimeStamp.toISOString();    // insert timestamp
	
	//console.log("--> " + JSON.stringify(tempReminder));
		
	// check if reminder array exists (i.e. first reminder)	
	if (typeof userStore[index].reminder === "undefined"){
		// does not exist, create array and add to index 0
		userStore[index].reminder = [];
		userStore[index].reminder[0] = tempReminder;
	} else { 
		// exists just add to reminderCounter index (reminderCounter starts at 1)
		//userStore[index].reminder[userStore[index].reminderCounter-1] = tempReminder;	
		//reminderArray.push(reminderArrayObj);  // push to temp array
		userStore[index].reminder.push(tempReminder);
	}

	userStore[index].reminderCounter++; // increment ReminderCounter

	// *** console.log output ***
	console.log("--> POST /users/:userid/reminder dump BEGIN");
	userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
	console.log("--> POST /users/:userid/reminder dump END\n");
	//console.log("Stuff length  " + userStore[index].reminder.length);
	// send status 200 and id
	res.status(200).send(reminderIdJson);
});


// DELETE route - /users/{userid}
//
// Deletes the userid and all reminders
// Returns 204 if successful
// Returns 404 is userid not found
//
// ***************************************
app.delete('/users/:userid', function (req, res) {
	
	var userid = req.params.userid;
	
	// check for valid userid
	var index = searchID(userStore, "id", userid);
	console.log("--> POST /users/:userid/reminder check users BEGIN");
	if (index === -1) {
		console.log("ID " + userid + " was not found");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, userid \"" + userid + "\" was not found");
		console.log("--> POST /users/:userid/reminder POST check users END\n");
		return;
	} else {
		console.log("Found userid = " + (index+1) + ":"); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
		console.log("--> POST /users/:userid/reminder check users END\n");
	}

	userStore.splice(index, 1);

	// send status 204
	res.sendStatus(204);

});


// DELETE route - /users/{userid}/reminders
//
// Deletes the all reminders for userid
// Returns 204 if successful
// Returns 404 is userid not found
//
// Note: 
//     No error sent if you delete an empty reminder array.
//     No error sent if userid has no reminders.
//
// ***************************************
app.delete('/users/:userid/reminders', function (req, res) {
	
	var userid = req.params.userid;
	
	// check for valid userid
	var index = searchID(userStore, "id", userid);
	console.log("--> POST /users/:userid/reminder check users BEGIN");
	if (index === -1) {
		console.log("ID " + userid + " was not found");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, userid \"" + userid + "\" was not found");
		console.log("--> POST /users/:userid/reminder POST check users END\n");
		return;
	} else {
		console.log("Found userid = " + (index+1) + ":"); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
		console.log("--> POST /users/:userid/reminder check users END\n");
	}

	// check if user has reminders
	console.log("--> debug DELETE /users/:userid/reminders check if user reminders BEGIN");
	if (typeof userStore[index].reminder === "undefined"){
		console.log("ID " + userid + " has no reminders");
		console.log('Not an error, sending HTTP 204');
		res.sendStatus(204);
		console.log("--> debug DELETE /users/:userid/reminders check if user reminders END\n");
		return;
	} else {
		console.log("ID " + userid + " has reminders");
		console.log("--> debug DELETE /users/:userid/reminders check if user reminders END\n");
	}
	// userStore[index].reminder.splice(index, 1);
	userStore[index].reminder = [];
	userStore[index].reminderCounter = 1;

	// send status 204
	res.sendStatus(204);

});


// DELETE route - /users/{userid}/reminders/{reminderid}
//
// Deletes reminderid from userid
// Returns 204 if successful
// Returns 404 is userid not found
//
// Note: 
//     No error sent if you delete an reminder that does not exist.
//     No error sent if userid has no reminders.
//
// ***************************************
app.delete('/users/:userid/reminders/:reminderid', function (req, res) {
	
	var userid = req.params.userid;
	var reminderid = req.params.reminderid;
	
	// check for valid userid
	var index = searchID(userStore, "id", userid);
	console.log("--> POST /users/:userid/reminder/:reminderid check users BEGIN");
	if (index === -1) {
		console.log("ID " + userid + " was not found");
		console.log("Sending HTTP Error - 404 for request: " + req.url);
		res.status(404).send("Sorry, userid \"" + userid + "\" was not found");
		console.log("--> POST /users/:userid/reminder/:reminderid check users END\n");
		return;
	} else {
		console.log("Found userid = " + (index+1) + ":"); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				console.log(key +":", eachUser[key]);
			}
		}
	});
		console.log("--> POST /users/:userid/reminder/:reminderid check users END\n");
	}

	// check if user has reminders
	console.log("--> debug DELETE /users/:userid/reminder/:reminderid check if user reminders BEGIN");
	if (typeof userStore[index].reminder === "undefined"){
		console.log("ID " + userid + " has no reminders");
		console.log('Not an error, sending HTTP 204');
		res.sendStatus(204);
		// console.log("Sending HTTP Error - 404 for request: " + req.url);
		// res.status(404).send("Sorry, userid \"" + userid + "\" was not found");
		console.log("--> debug DELETE /users/:userid/reminders/:reminderid check if user reminders END\n");
		return;
	} else {
		console.log("ID " + userid + " has reminders");
		console.log("--> debug DELETE /users/:userid/reminders/:reminderid check if user reminders END\n");
	}

	console.log("stuff: " + index +", " + reminderid);
	var reminderIndex = searchID(userStore[index].reminder, "reminderID", reminderid);
	console.log("--> debug DELETE /users/:userid/reminder/:reminderid check reminderid BEGIN");
	if (reminderIndex === -1) {
		console.log("reminderID " + reminderid + " was not found");
		console.log('Not an error, sending HTTP 204');
		res.sendStatus(204);
		// console.log("Sending HTTP Error - 404 for request: " + req.url);
		// res.status(404).send("Sorry, reminderid \"" + reminderid + "\" was not found");
		console.log("--> debug DELETE /users/:userid/reminder/:reminderid check reminderid END\n");
		return;
	} else {
		console.log("Found reminderid = " + reminderid + ", for userid = " + userid + ":"); 
		console.log("--> debug DELETE /users/:userid/reminder/:reminderid check reminderid END\n");
	}

	// remove the reminder from the array	
	userStore[index].reminder.splice(reminderIndex, 1);

	// send status 204
	res.sendStatus(204);

});

///////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////	
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






// middleware that handles the routes not defined
// for 404 response. It has been placed at the bottom
// of the stack.
// https://expressjs.com/en/starter/faq.html
app.use(function(req, res) {
	console.log("--- Bad Route begin ---");
	console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
	console.log("--- Bad Route end ---\n");
	// send status 404, invalid route
	res.status(404).send('Sorry, Can not find that resource.');
});