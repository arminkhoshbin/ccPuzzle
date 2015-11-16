def cardIs(card)
	card = card.delete(' ')

	cardLength = card.length

	case cardLength
	when 13
		if card[0] == '4'
			return 'Visa'
		else
			return 'Unknown'
		end
	when 15
		case card[0..1]
		when '34', '37'
			return 'AMEX'
		else
			return 'Unknown'
		end
	when 16
		if card[0..3] == '6011'
			return 'Discover'
		elsif card[0] == '4'
			return 'Visa'
		elsif ('51'..'55').include?(card[0..1])
			return 'MasterCard'
		else
			return 'Unknown'
		end
	else
		return 'Unknown'
	end

end


def isValid(card)
	card = card.delete(' ')
	doubled = false
	sum = 0
	i = card.length-1

	while i >= 0 do
		digit = Integer(card[i])
		if doubled
			digit = digit * 2
			if digit > 9
				digit = (digit % 10) + 1
			end
		end

		doubled = !doubled

		sum += digit

		i -= 1
	end

	if sum % 10 == 0
		return 'valid'
	else
		return 'invalid'
	end

end


file = File.open("./sampleCards.txt", "r")
for card in file
	card = card.delete("\n")
	puts cardIs(card) + ": " + card + "\t(" + isValid(card) + ")"
end