export default function() {
	let suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
	let faces = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];
	let cards = [];

	for (var i = 0; i < suits.length; i++) {
		for(var j = 0; j < faces.length; j++) {
		  var value;

		  if (faces[j] === 'Ace') {
		    value = [1, 11];
		  } else if (isNaN(Number(faces[j]))) {
		    value = 10;
		  } else {
		    value = Number(faces[j]);
		  }

		  cards.push({
		    suit: suits[i],
		    face: faces[j],
		    value: value
		  });
		}
	}

	return cards;
}