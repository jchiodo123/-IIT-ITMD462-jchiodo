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

var counterID = 1;
var handStore = new Array();

app = express();
// middleware for parsing incoming text as JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// ***************************************
// START SERVER
// ***************************************
http.createServer(app).listen(port);
console.log("Server Running on "+port+".\nLaunch http://localhost:"+port);
console.log("CTRL+C to exit")

// searchID - will search a card array and return the
// index if found, if not found return -1
function searchID(ArrayToSearch, key, value) {
	for (var i = 0; i < ArrayToSearch.length; i++) {
		if (ArrayToSearch[i][key] == value) {
			return i; // found it 
		}
	}
	return -1; // not found
}

// ***************************************
// ROUTES
// ***************************************
	
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
		console.log("--- debug POST error begin ---")
		console.log("POST: Body is empty");
		console.log('*** Sending HTTP Error - 400 for request: ' + req.url);
		// send status 400, no data supplied
		res.status(400).send("Error: Data required for this operation");
		console.log("--- debug POST end ---\n");
		return;
	} 

	tempHand = {};
	tempHand.id = counterID; 	// set id and out in object
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
		console.log("--- debug PUT error begin ---")
		console.log("PUT: Body is empty");
		console.log('*** Sending HTTP Error - 400 for request: ' + req.url);
		// send status 400, no data supplied to update
		res.status(400).send("Error: Data required for this operation");
		console.log("--- debug PUT end ---\n");
		return;
	} 
	
	var index = searchID(handStore, "id", id);
	
	// *** console.log output ***
	console.log("--- debug PUT begin ---")
	if (index === -1) {
		console.log("==> id " + id + " was not found");
		console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
		console.log("--- debug PUT end ---\n")
		// send status 404, handId not found
		res.status(404).send("Sorry, handId \"" + id + "\" was not found");
	} else {
		// *** console.log output ***
		console.log("==> Found iD = " + (index+1) + "\n"); 
		for (var key in handStore[index].cards){
			if (handStore[index].cards.hasOwnProperty(key)){
				console.log(handStore[index].cards[key]);
			}
		}
		// replace the hand 
		handStore[index].cards = handObj.slice();
		
		// *** console.log output ***
		console.log("\n==> Replaced with:" + "\n"); 
		for (var key in handStore[index].cards){
			if (handStore[index].cards.hasOwnProperty(key)){
				console.log(handStore[index].cards[key]);
			}
		}
		
		console.log('\n*** Sending HTTP 204 for put: ' + req.url);
		console.log("--- debug PUT end ---\n")
		// send status 204
		res.status(204).send("\nUpdate for handId \"" + id + "\" was successful");
	}
});

//// middleware that handles the routes not defined
//// for 404 response. It has been placed at the bottom
//// of the stack.
//// https://expressjs.com/en/starter/faq.html
app.use(function(req, res) {
	console.log("--- Bad Route begin ---")
	console.log('*** Sending HTTP Error - 404 for request: ' + req.url);
	console.log("--- Bad Route end ---\n")
	// send status 404, invalid route
	res.status(404).send('Sorry, Can not find that resource.');
});