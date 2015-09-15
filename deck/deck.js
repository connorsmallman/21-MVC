import createCards from '../helpers/create-cards';

export default function(options) {
	let cards = [];

	this.initialize = () => {
		cards = createCards();

		this.shuffle();
	};

	this.shuffle = () => {
		let currentIndex = cards.length;
		let temporaryValue;
		let randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = cards[currentIndex];
			cards[currentIndex] = cards[randomIndex];
			cards[randomIndex] = temporaryValue;
		}
	};

	this.draw = () => {
		if (cards.length) {
    		let card = cards[0]
			
			cards.shift();

    		return card;
    	} else {
    		return new Error('Deck depleted');
  		}
	};

	this.regenerate = () => {
		this.initialize();
	}

	this.initialize();
}