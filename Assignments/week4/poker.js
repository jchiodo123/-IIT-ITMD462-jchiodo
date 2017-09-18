var main = function () {
    "use strict";

	var hand = [
	{ "rank":"king", "suit":"diamonds" },
	{ "rank":"king", "suit":"diamonds" },
	{ "rank":"nine", "suit":"spades" },
	{ "rank":"two", "suit":"diamonds" },
	{ "rank":"two", "suit":"diamonds" }
	];
	
	function handAssessor(pokerHand) {
		
		var resultArray = new Array(13); // 13 possible card ranks
		var rankArray = new Array(5);	 // 5 cards to a hand
		var finalResultStr = "";
		var isFlush = true;
		var isStraight = false;
		var isStraightFlush = false;
		var IsRoyalStraight = false;
		var isRoyalFlush = false;
		
		console.log("Your hand is:");
		hand.forEach(function (card) {
			console.log("\t" + card.rank + " of " + card.suit);	
			});
		
		
		// initialize resultArray with 0
		for ( var i = 0; i < 13; i++ ) {
			resultArray[i] = 0;
		}
		
		// convert string ranks to numbers 1-13
		hand.forEach(function (hand) {
			switch (hand.rank) {
				case "ace":
					hand.rank = "1";
					break;
				case "two":
					hand.rank = "2";
					break;			
				case "three":
					hand.rank = "3";
					break;			
				case "four":
					hand.rank = "4";
					break;
				case "five":
					hand.rank = "5";
					break;
				case "six":
					hand.rank = "6";
					break;
				case "seven":
					hand.rank = "7";
					break;
				case "eight":
					hand.rank = "8";
					break;
				case "nine":
					hand.rank = "9";
					break;
				case "ten":
					hand.rank = "10";
					break;
				case "jack":
					hand.rank = "11";
					break;
				case "queen":
					hand.rank = "12";
					break;
				case "king":
					hand.rank = "13";
					break;
				default:
					console.log("Error: Playing Card not recognized");
			}
		});
		
		// Check for flush
		var suitCheck = hand[0].suit;
		for (var i = 1; i < hand.length; i++) {
				if (hand[0].suit != hand[i].suit) {
					isFlush = false;
					}
			}
		// console.log("isFlush?: " + isFlush);
		
		// load up array with ranks to check for sequence winner (straight)
		for (var i = 0; i < rankArray.length; i++) {
			rankArray[i] = hand[i].rank;
			};
		
		// sort results (number array)
		var sortedRankArray = rankArray.sort(function(a, b){return a-b});
		// //console.log("\tThe sorted rankArray is: " + sortedRankArray);
		
		// Check for straight
		if (rankArray[4] - rankArray[0] == 4) {
			isStraight = true;
			}	
		
		// check for straight with ace high A, 10, J, Q, K [1,..10,11,12,13] 
		if (rankArray[0] == 1 && rankArray[1] == 10 && rankArray[2] == 11
			&& rankArray[3] == 12 && rankArray[4] == 13) {
			IsRoyalStraight = true;
			}
			
		// if hand is sequential winner then it can not be multiple rank winner
		// check and print results for winners
		if (isStraight && !isFlush) {
			console.log("Your best hand is: Straight");
			}
		
		// check and print results for StraightFLush
		if (isStraight && isFlush) {
			isStraightFlush = true;
			console.log("Your best hand is: Straight Flush");
			console.log("Your 2nd best hand is: Flush");
			console.log("Your 3rd best hand is: Straight");
			}
		
		// check and print results for RoyalFlush
		if (IsRoyalStraight && isFlush) {
			isRoyalFlush = true;
			console.log("Your best hand is: Royal Flush!!");
			console.log("Your 2nd best hand is: Straight Flush");
			console.log("Your 3rd best hand is: Flush");
			console.log("Your 4th best hand is: Straight");
		}
		
		// If hand is one of the sequence winner it can not be a multiple rank winner
		// skip multiple rank test.
		if (!(isStraight || isRoyalFlush || isStraightFlush)) {
			
			/* Mark each card in an array and create a histogram, check the
			 * resulting pattern to determine which multiple rank hand is a 
			 * possible winner.
			 */
		
			// Place each card in result array, creating a histogram for same rank hands
			for (var i = 0; i < 5; i++ ) {
				resultArray[(hand[i].rank)-1] += 1;
				};		
			//console.log("\tThe resultArray is: " + resultArray);
			
			// remove all zeros
			for (var i = 0; i < resultArray.length; i++ ) { 
				if (resultArray[i] == 0) {
					resultArray.splice(i,1);  // data[i] is replaced with data
					i--; 
					}
				} 
			//console.log("\tThe de-zeroed resultArray is: " + resultArray);

			// Reverse sort results (number array)
			var revResultArray = resultArray.sort(function(a, b){return b-a});
			
			//console.log("\tThe sorted resultArray is: " + revResultArray);
			
			// Concatenate results into string
			for (var i = 0; i < revResultArray.length; i++ ) {
					finalResultStr += revResultArray[i].toString();
				}
			
			/* Check pattern and print results for multiple rank winners.
			 * Patterns are:
			 * 41 - four of a kind
			 * 32 - full house
			 * 311 - three of a kind
			 * 221 - two pair
			 * 2111 - pair
			 * 11111 - Bust
			 *
			 * special cases (check isFlush):
			 * Four of a kind higher than flush.
			 * 11111 can be a flush.
			 */
			 
			switch (finalResultStr) {
				case "41":
					if (isFlush) { // four of a kind is higher than flush
						console.log("Your best hand is: Four of a kind");
						console.log("Your 2nd best hand is: Flush");
						console.log("Your 3rd best hand is: Two Pair");
						console.log("Your 4th best hand is: Pair");
						} else {
						console.log("Your best hand is: Four of a kind");
						console.log("Your 2nd best hand is: Two Pair");
						console.log("Your 3rd best hand is: Pair");
						}
					break;
				case "32":
					console.log("Your best hand is: Full House");
					console.log("Your 2nd best hand is: Three of a Kind");
					console.log("Your 3rd best hand is: Pair");
					break;
				case "311":
					console.log("Your best hand is: Three of a kind");
					console.log("Your 2nd best hand is: Pair");
					break;
				case "221":
					console.log("Your best hand is: Two Pair");
					console.log("Your 2nd best hand is: Pair");
					break;
				case "2111":
					console.log("Your best hand is: Pair");
					break;
				case "11111":
					if (isFlush) { // check for flush vs Bust
							console.log("Your best hand is: Flush");
						} else {
							console.log("Your hand is a BUST!");
						}
					break;
				default:
					console.log("Undefined hand");
				}
			}
	}
	
	handAssessor(hand);
};

$(document).ready(main);