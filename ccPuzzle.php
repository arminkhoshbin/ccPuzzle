<?php

function cardIs($card) {
	$card = str_replace(' ', '', $card);
	$cardLength = strlen($card);

	switch ($cardLength) {
		case 13:
			if ($card[0] == '4') {
	        	return 'Visa';
	        }
	        else {
	        	return 'Unknown';
	        }
	    	break;
	    case 15:
	    	if (substr($card, 0, 2) == '34' || substr($card, 0, 2) == '37') {
	    		return 'AMEX';
	    	}
	    	else {
	        	return 'Unknown';
	        }
	    	break;
	    case 16:
	    	if ($card[0] == '4') {
	        	return 'Visa';
	        }
	        else if (substr($card, 0, 4) == '6011') {
	        	return 'Discover';
	        }
	        else if (in_array(substr($card, 0, 2), range('51', '55'))) {
	        	return 'MasterCard';
	        }
	        else {
	        	return 'Unknown';
	        }
	}
}


function isValid($card) {
	$card = str_replace(' ', '', $card);
	$doubled = false;
	$sum = 0;

	for ($i = (strlen($card) - 1); $i >= 0; $i--) {
		$digit = intval($card[$i]);

		if ($doubled) {
			$digit = 2 * $digit;
			if ($digit > 9) {
				$digit = ($digit % 10) + 1;
			}
		}

		$doubled = !$doubled;

		$sum += $digit;

	}

	if ($sum % 10 == 0) {
		return 'valid';
	}
	else {
		return 'invalid';
	}

}


$file = file("./sampleCards.txt");

foreach ($file as $card) {
	$card = str_replace("\n", '', $card);
	echo cardIs($card) . ": " . $card . "\t(" . isValid($card) . ")\n";
}