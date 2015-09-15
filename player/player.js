export default class Player {
	constructor(name) {
    	this.name = name;
    	this.hand = [];
		this.score = 0;
  	}
	
	getName() {
		return this.name;
	}

	getHand() {
		return this.hand;
	}
}