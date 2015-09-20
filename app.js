import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import LayoutView from './layout/view';
import TableView from './table/view';
import HandView from './hand/view';
import HandCollection from './hand/collection';
import CardModel from './card/model';
import CardView from './card/view';
import HandValueView from './values/view';
import HandValueModel from './values/model';
import Deck from './deck/deck.js';
import Player from './player/player.js';
import BackboneRadio from 'backbone.radio';

let handValueChannel = BackboneRadio.channel('handValueChannel');

let App = Marionette.Application.extend({
	initialize() {
		this.layoutView = new LayoutView();
		this.deck = new Deck();

		this.players = [];
		this.players.dealer = new Player('dealer');
		this.players.player = new Player('player');

		this.layoutView.render();

		handValueChannel.on('card:added', this.updateHandValue, this);
	},
	onStart() {
		//create table
		this.tableView = new TableView();
		//render table
		this.layoutView.getRegion('table').show(this.tableView);

		this.startGame();
		this.promptPlayer((answer) => {
			if (answer.toLowerCase() === 'hit') {
				this.dealToPlayer();
			} else {

			}
		});
		//setup game
		//deal 2 cards to each player
		//check to see if any winner or bust

		//next round
		//1. ask user if they want to:
			//hit
				//run step 2
			//stay
				//run step 3
		//2. deal to player
			//if not bust or no winners
				//repeat step 1
		//3. deal to dealer
			//if not bust or no winner or hand value is below 17
				//repeat step 3
			//if not bust or no winners and over 17
				//repeat step 1
	},
	startGame(view) {
		for (let n in this.players) {
			let cards = this.deck.draw(2);
			let playerName = this.players[n].getName();
			let view = new HandView({ playerName, collection: new HandCollection(cards) });

			this.tableView.getRegion(playerName + 'Hand').show(view);
		}
	},
	promptPlayer(callback) {
		var question = prompt('What would you like todo');

		if (question != null) {
			callback(question);
		}
	},
	dealToPlayer() {
		this.tableView.getRegion('playerHand').currentView.collection.add(new CardModel(this.deck.draw()));
		//this.isBust('player');
	},
	isBust(player) {
		var value = this.tableView.getRegion(player + 'Hand').currentView.collection
						.map(model => model.getValue())
						.reduce((memo, num) => {
							console.log(memo);
							console.log(num);
						});

		return (value > 21) ? true : false;
	},
	updateHandValue(player) {
		let model = new HandValueModel({handValue: player.handValue });
		let view = new HandValueView({ model });

		this
			.tableView
			.getRegion(player.playerName + 'HandValue')
			.show(view);
	},
});

let app = new App();

app.start();
