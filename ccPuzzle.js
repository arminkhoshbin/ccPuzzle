'use strict';

var fs = require('fs');

var cardIs = function(card) {
	var card = card.split(" ").join('');
	var cardLen = card.length;
	switch (cardLen) {
	    case 13:
	        if (card.charAt(0) == '4') {
	        	return 'Visa';
	        }
	        else {
	        	return 'Unknown';
	        }
	        break; 
	    case 15:
	        if (card.substring(0, 2) == '34' || card.substring(0, 2) == '37') {
	        	return 'AMEX';
	        }
	        else {
	        	return 'Unknown';
	        }
	        break; 
	    case 16: 
	        if (card.substring(0, 4) == '6011') {
	        	return 'Discover';
	        }
	        else if (card.charAt(0) == '4') {
	        	return 'Visa';
	        }
	        else if (['51', '52', '53', '54', '55'].indexOf(card.substring(0, 2)) != -1) {
	        	return 'MasterCard';
	        }
	        else {
	        	return 'Unknown';
	        }
	        break;
	}
}

var isValid = function(card) {
	var sum = 0;
	var card = card.split(" ").join('');
	var doubled = false;

	// Start from the right most digit
	for (var i = card.length - 1; i >= 0; i--) {
		var digit = parseInt(card.charAt(i), 10);

		if (doubled) {
			digit = 2 * digit;
			if (digit > 9) {
				digit = (digit % 10) + 1;
			}
		}

		doubled = !doubled;

		sum += digit;
	}

	if (sum % 10 == 0) return 'valid';
	else return 'invalid';
}

var checkCard = function(card) {
	var card = card.split(" ").join('');
	console.log(cardIs(card) + ":\t" + card + "\t(" + isValid(card) + ")");
}


fs.readFile('./sampleCards.txt', function (err, data) {
  if (err) throw err;
  var cards = data.toString().split("\n");
  for (var i = 0; i < cards.length; i++) {
  	checkCard(cards[i]);
  }
});