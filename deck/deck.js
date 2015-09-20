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

	this.draw = (amount = 1) => {
		if (cards.length) {
			let hand = cards.splice(0, amount);

			return (hand.length > 1) ? hand : hand[0];
  	} else {
  		return new Error('Deck depleted');
		}
	};

	this.regenerate = () => {
		this.initialize();
	}

	this.initialize();
}