/*
 *	John Chiodo
 *	jchiodo@hawk.iit.edu
 *	ITMD462 - Assignment8 week12
 *	11/14/2017
 */

// ***************************************
// BASIC SETUP
// ***************************************

// Override some jshint warnings
/* jshint node: true */

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
//var	http = require('http');

// middleware for parsing incoming text as JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('../public'));
// Only necessary if serving a static file at the root route.
var path = require('path');
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// read env variable DEBUG_MODE_ON, if not set
// then default it to false, no console output
if (typeof(process.env.DEBUG_MODE_ON) === 'undefined') {
	process.env.DEBUG_MODE_ON = false;
}
console.log('DEBUG_MODE_ON is set to: '+ process.env.DEBUG_MODE_ON);
var LOG = process.env.DEBUG_MODE_ON === 'true' ? console.log.bind(console) : function () {};

// Misc. variables
var counterID = 1;  // start IDs at 1
var userStore = []; // stores the user objects

// ***************************************
// START SERVER
// ***************************************
// http.createServer(app).listen(port);
// console.log('Server Running on '+port+'.\nLaunch http://localhost:'+port);
// console.log('CTRL+C to exit');

console.log('Server Running on port: '+port+'');
console.log('CTRL+C to exit');

// searchID - will search an array and return the
// index if found, if not found return -1
function searchID(ArrayToSearch, key, value) { // 1 2
	for (var i = 0; i < ArrayToSearch.length; i++) {
		//LOG("inside: "+ ArrayToSearch.length);
		if (ArrayToSearch[i][key] === parseInt(value)) {
			return i; // found it 
		}
	}
	return -1; // not found
}

// ************************************************
// ROUTES
// ************************************************

// GET route - /users/{userId}
//
// Returns 200 and {"name" : "Example Name", 
//                  "email" : "example@gmail.com"} 
//
// Returns 404 if {userid} not found
// Testcase(s): TID003, TID009
// ************************************************

app.get('/users/:userid',	function (req, res) {
	// get userid from URL	
	var userid = req.params.userid;

	// check for valid userid
	var index = searchID(userStore, 'id', userid);
	LOG('--> debug GET object BEGIN');
	if (index === -1) {
		LOG('userId ' + userid + ' was not found');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' was not found');
		LOG('--> debug GET object END\n');
	} else {
		LOG('Found userid = ' + (index+1) + '\n'); 
		for (var key in userStore[index].user){
			if (userStore[index].user.hasOwnProperty(key)){
				LOG(userStore[index].user[key]);
			}
		}
		LOG('--> debug GET object END\n');

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
// Returns 404 if {userid} not found
// Returns 404 if user has not reminders
//
// Testcase(s): TID005, TID010, TID011
// ************************************************
app.get('/users/:userid/reminders', function (req, res) {
	// get userid from URL	
	var userid = req.params.userid;

	// check for valid userid
	var index = searchID(userStore, 'id', userid);
	LOG('--- debug GET /users/:userid/reminder check users BEGIN ---');
	if (index === -1) {
		LOG('ID ' + userid + ' was not found');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' was not found');
		LOG('--> debug GET /users/:userid/reminder check users END ---\n');
		return;
	} else {
		LOG('Found userid = ' + (index +1) + ':'); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				LOG(key +':', eachUser[key]);
			}
		}
	});
		LOG('--> debug GET /users/:userid/reminder check users END\n');
	}

	// check if user has reminders
	LOG('--> debug GET /users/:userid/reminder check if user reminders begin');
	if (typeof userStore[index].reminder === 'undefined' ||  userStore[index].reminder.length < 1){
		LOG('ID '+ userid + ' has no reminders');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' has no reminders');
		LOG('--> debug GET /users/:userid/reminder check if user reminders end\n');
		return;
	} else {
		LOG('ID ' + userid +  ' has reminders');
		LOG('--> debug GET /users/:userid/reminder check if user reminders end\n');
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
	});

	// send 200 and the modified reminder array
	res.status(200).json(reminderArray);
});


// GET route - /users/{userId}/reminders/{reminderID}
//
// Returns 200 and  {"title" : "Example Title", 
//                   "description" : "Example Description",
//                   "created" : "2012-04-23T18:25:43.511Z"} 
// for only for reminderID associated with userid.
//
// Returns 404 if {userId} not found
// Returns 404 if no reminders for {userid}
// Returns 404 if {reminderid} not found
//
// Testcase(s): TID004, TID012, TID013, TID014
// ************************************************
app.get('/users/:userid/reminders/:reminderid', function (req, res) {
	// get userid and reminderid from URL	
	var userid = req.params.userid;
	var reminderid = req.params.reminderid;

	// check for valid userid
	var index = searchID(userStore, 'id', userid);
	LOG('--> debug GET /users/:userid/reminder/:reminderid check users BEGIN ---');
	if (index === -1) {
		LOG('ID ' + userid + ' was not found');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' was not found');
		LOG('--> debug GET /users/:userid/reminder/:reminderid check users END ---\n');
		return;
	} else {
		LOG('Found userid = ' + userid + ':'); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				LOG(key + ':', eachUser[key]);
			}
		}
	});
		LOG('--> debug GET /users/:userid/reminder/:reminderid check users END\n');
	}

	// check if user has any reminders
	LOG('--> debug GET /users/:userid/reminder/:reminderid check if user reminders begin');
	if (typeof userStore[index].reminder === 'undefined' ||  userStore[index].reminder.length < 1){
		LOG('ID ' + userid + ' has no reminders');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' has no reminders');
		LOG('--> debug GET /users/:userid/reminder/:reminderid check if user reminders END\n');
		return;
	} else {
		LOG('ID ' + userid + ' has reminders');
		LOG('--> debug GET /users/:userid/reminder/:reminderid check if user reminders END\n');
	}

	// check for valid reminderID
	var reminderIndex = searchID(userStore[index].reminder, 'reminderID', reminderid);
	LOG('--> debug GET /users/:userid/reminder/:reminderid check reminderid BEGIN');
	if (reminderIndex === -1) {
		LOG('reminderID ' + reminderid + ' was not found');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, reminderid ' + reminderid + ' was not found');
		LOG('--> debug GET /users/:userid/reminder/:reminderid check reminderid END\n');
		return;
	} else {
		LOG('Found reminderid = ' + reminderid + ', for userid = ' + userid + ':'); 
		LOG('--> debug GET /users/:userid/reminder/:reminderid check reminderid END\n');
	}

	// build new send object without the "reminderID" key
	var reminderObj = {};
	reminderObj.title = userStore[index].reminder[reminderIndex].title;
	reminderObj.description = userStore[index].reminder[reminderIndex].description;
	reminderObj.created = userStore[index].reminder[reminderIndex].created;

	// send 200 + reminderObj
	res.status(200).json(reminderObj);
});


// POST route - /users
//
// Input model: { "user" : {"name" : "Example Name",
//                "email" : "example@gmail.com" }}
//
// Returns 200 and {"id" : <userid>} if successful
//
// Returns 400 if no body in URL
//
// Testcase(s): TID001, TID015
// ************************************************

app.post('/users/', function (req, res) {
	// get body from URL
	var userObj = req.body;
	
	// check for empty object, send status 400 
	if (Object.keys(userObj).length === 0) {
		LOG('--> debug POST /users body contents check BEGIN');
		LOG('POST: Body is empty');
		LOG('Sending HTTP Error - 400 for request: ' + req.url);
		// send status 400, no data supplied
		res.status(400).json('Error: Data required for this operation');
		LOG('--> debug POST /users body contents check END \n');
		return;
	}

	var tempUserIdObj = {};  // temp userid object
	var tempUserObj = {};    // temp name and email object

	var tempUserIdJsonObj = {};
	tempUserIdJsonObj.id = counterID; 	// set global userid counter
		
	// build userid object
	tempUserObj.name = userObj.user.name;
	tempUserObj.email = userObj.user.email;
	
	tempUserIdObj.id = counterID;
	tempUserIdObj.user = tempUserObj;

	tempUserIdObj.reminderCounter = 1; // initialize reminderCounter and place into object

	counterID++; 	// increment for next userid
	userStore.push(tempUserIdObj); 	// add to end of array

	// LOG output
	LOG('--> POST /users debug dump BEGIN');
	userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				LOG(key +':', eachUser[key]);
			}
		}
	});
	LOG('--> POST /users debug dump END\n');

	// send status 200 and just userid object
	res.status(200).json(tempUserIdJsonObj);
});


// POST route - /users/{userid}/reminders
//
// Input model: { "reminder" : {"title" : "Example Title",  
//                "description" : "Example Description"} }
//
// Returns 200 and {"id" : <reminderId>} if successful
//
// Returns 404 if {userID} not found
// Returns 400 if no body in URL
//
// Testcase(s): TID002, TID016, TID017
// ************************************************

app.post('/users/:userid/reminders', function (req, res) {
	
	var reminderObj = req.body;
	var userid = req.params.userid;

	// check for empty object, send status 400 
	if (Object.keys(reminderObj).length === 0) {
		LOG('--> POST /users/:userid/reminder body contents check BEGIN');
		LOG('POST: Body is empty');
		LOG('ending HTTP Error - 400 for request: ' + req.url);
		// send status 400, no data supplied
		res.status(400).json('Error: Data required for this operation');
		LOG('--> POST /users/:userid/reminder body contents check END\n');
		return;
	}

	// check for valid userid
	var index = searchID(userStore, 'id', userid);
	LOG('--> POST /users/:userid/reminder check users BEGIN');
	if (index === -1) {
		LOG('ID ' + userid + ' was not found');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' was not found');
		LOG('--> POST /users/:userid/reminder POST check users END\n');
		return;
	} else {
		LOG('Found userid = ' + (index+1) + ':');
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				LOG(key + ':', eachUser[key]);
			}
		}
	});
		LOG('--> POST /users/:userid/reminder check users END\n');
	}	

	// build reminder object
	var tempReminder = {}; // empty temp object
	var tempReminderIdObj = {}; // empty temp object for send

	tempReminderIdObj.reminderid = userStore[index].reminderCounter; // get current counter
		
	tempReminder.reminderID = userStore[index].reminderCounter;  // insert counter
	tempReminder.title = reminderObj.reminder.title;             // insert title
	tempReminder.description = reminderObj.reminder.description; // insert description
	var reminderTimeStamp = new Date();
	tempReminder.created =  reminderTimeStamp.toISOString();    // insert timestamp
	
	// check if reminder array exists (i.e. first reminder)	
	if (typeof userStore[index].reminder === 'undefined'){
		// does not exist, create array and add to index 0
		userStore[index].reminder = [];
		userStore[index].reminder[0] = tempReminder;
	} else { 
		// array exists, push to array
		userStore[index].reminder.push(tempReminder);
	}

	userStore[index].reminderCounter++; // increment ReminderCounter

	// LOG output
	LOG('--> POST /users/:userid/reminder dump BEGIN');
	userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				LOG(key + ':', eachUser[key]);
			}
		}
	});
	LOG('--> POST /users/:userid/reminder dump END\n');
	
	// send status 200 and id
	res.status(200).json(tempReminderIdObj);
});


// DELETE route - /users/{userid}
//
// Deletes the userid and all reminders
//
// Returns 204 if successful
// Returns 404 is {userid} not found
//
// Testcase(s): TID006, TID018
// ************************************************
app.delete('/users/:userid', function (req, res) {
	
	var userid = req.params.userid;
	
	// check for valid userid
	var index = searchID(userStore, 'id', userid);
	LOG('--> DELETE /users/:userid/reminder check users BEGIN');
	if (index === -1) {
		LOG('ID ' + userid + ' was not found');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' was not found');
		LOG('--> DELETE /users/:userid/reminder POST check users END\n');
		return;
	} else {
		LOG('Found userid = ' + (index+1) + ':'); 
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				LOG(key + ':', eachUser[key]);
			}
		}
	});
		LOG('\nDeleting userid ' + userid + ' and all reminders');
		LOG('--> DELETE /users/:userid/reminder check users END\n');
	}

	// delete userid from userStore array
	userStore.splice(index, 1);

	// send status 204 No Content
	res.sendStatus(204);
});


// DELETE route - /users/{userid}/reminders
//
// Deletes the all reminders for userid
//
// Returns 204 if successful
// Returns 404 is {userid} not found
// Retruns 204 if user has no reminders
//
// Note: 
//     No error sent if you delete an empty reminder array.
//     No error sent if userid has no reminders.
//
// Testcase(s): TID007, TID019, TID020
// ************************************************
app.delete('/users/:userid/reminders', function (req, res) {
	
	var userid = req.params.userid;
	
	// check for valid userid
	var index = searchID(userStore, 'id', userid);
	LOG('--> DELETE /users/:userid/reminder check users BEGIN');
	if (index === -1) {
		LOG('ID ' + userid + ' was not found');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' was not found');
		LOG('--> DELETE /users/:userid/reminder POST check users END\n');
		return;
	} else {
		LOG('Found userid = ' + (index+1) + ':');
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				LOG(key + ':', eachUser[key]);
			}
		}
	});
		LOG('--> DELETE /users/:userid/reminder check users END\n');
	}

	// check if user has reminders
	LOG('--> debug DELETE /users/:userid/reminders check if user reminders BEGIN');
	if (typeof userStore[index].reminder === 'undefined'){
		LOG('ID ' + userid + ' has no reminders');
		LOG('Not an error, sending HTTP 204');
		res.sendStatus(204);
		LOG('--> debug DELETE /users/:userid/reminders check if user reminders END\n');
		return;
	} else {
		LOG('ID ' + userid + ' has reminders');
		LOG('Deleting all reminders associated with userid ' + userid);
		LOG('--> debug DELETE /users/:userid/reminders check if user reminders END\n');
	}

	// clear reminder array and reset reminderCounter
	userStore[index].reminder = [];
	userStore[index].reminderCounter = 1;

	// send status 204 No Content
	res.sendStatus(204);
});


// DELETE route - /users/{userid}/reminders/{reminderid}
//
// Deletes reminderid from userid
//
// Returns 204 if successful
// Returns 404 is {userid} not found
// Returen 404 is user has no reminders
// Returns 404 is {reminderid} not found
//
// Testcase(s): TID008, TID021, TID022, TID023
// ************************************************
app.delete('/users/:userid/reminders/:reminderid', function (req, res) {
	
	var userid = req.params.userid;
	var reminderid = req.params.reminderid;
	
	// check for valid userid
	var index = searchID(userStore, 'id', userid);
	LOG('--> DELETE /users/:userid/reminder/:reminderid check users BEGIN');
	if (index === -1) {
		LOG('ID ' + userid + ' was not found');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, userid ' + userid + ' was not found');
		LOG('--> DELETE /users/:userid/reminder/:reminderid check users END\n');
		return;
	} else {
		LOG('Found userid = ' + (index+1) + ':');
		userStore.forEach(function (eachUser) {
	    for (var key in eachUser) {
			if (eachUser.hasOwnProperty(key)){
				LOG(key + ':', eachUser[key]);
			}
		}
	});
		LOG('--> DELETE /users/:userid/reminder/:reminderid check users END\n');
	}

	// check if user has reminders
	LOG('--> debug DELETE /users/:userid/reminder/:reminderid check if user reminders BEGIN');
	if (typeof userStore[index].reminder === 'undefined' ||  userStore[index].reminder.length < 1){
		LOG('ID ' + userid + ' has no reminders');
		LOG('Not an error, sending HTTP 204');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(204).json('Sorry, userid ' + userid + ' was not found');
		LOG('--> debug DELETE /users/:userid/reminders/:reminderid check if user reminders END\n');
		return;
	} else {
		LOG('ID ' + userid + ' has reminders');
		LOG('--> debug DELETE /users/:userid/reminders/:reminderid check if user reminders END\n');
	}

	// check for reminder
	var reminderIndex = searchID(userStore[index].reminder, 'reminderID', reminderid);
	LOG('--> debug DELETE /users/:userid/reminder/:reminderid check reminderid BEGIN');
	if (reminderIndex === -1) {
		LOG('reminderID ' + reminderid + ' was not found');
		LOG('Not an error, sending HTTP 204');
		LOG('Sending HTTP Error - 404 for request: ' + req.url);
		res.status(404).json('Sorry, reminderid ' + reminderid + ' was not found');
		LOG('--> debug DELETE /users/:userid/reminder/:reminderid check reminderid END\n');
		return;
	} else {
		LOG('Found reminderid = ' + reminderid + ', for userid = ' + userid + ':');
		LOG('Deleting reminderid = ' + reminderid + ', for userid = ' + userid + ':'); 
		LOG('--> debug DELETE /users/:userid/reminder/:reminderid check reminderid END\n');
	}

	// remove the reminder from the array	
	userStore[index].reminder.splice(reminderIndex, 1);

	// send status 204 No Content
	res.sendStatus(204);
});

// middleware that handles the routes not defined
// for 404 response. It has been placed at the bottom
// of the stack.
// https://expressjs.com/en/starter/faq.html
app.use(function(req, res) {
	LOG('--- Bad Route begin ---');
	LOG('*** Sending HTTP Error - 404 for request: ' + req.url);
	LOG('--- Bad Route end ---\n');
	// send status 404, invalid route
	res.status(404).json('Sorry, Can not find that resource.');
});

// export for testing
module.exports = app.listen(port);
