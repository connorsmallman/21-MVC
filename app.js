import Marionette from 'backbone.marionette';
import LayoutView from './layout/view';
import TableView from './table/view';
import HandView from './hand/view';
import HandCollection from './hand/collection';
import CardView from './card/view';
import Deck from './deck/deck.js';
import Player from './player/player.js';

let App = Marionette.Application.extend({
	initialize() {
		this.layoutView = new LayoutView();
		this.deck = new Deck();

		this.players = [];
		this.players.dealer = new Player('dealer');
		this.players.player = new Player('player');

		this.layoutView.render();
	},
	onStart() {
		//create table
		let tableView = new TableView();
		//render table
		this.layoutView.getRegion('table').show(tableView);
		//add cards to players
		for (let player in this.players) {
			this.players[player].hand[0] = this.deck.draw();
			this.players[player].hand[1] = this.deck.draw();

			tableView
				.getRegion(this.players[player].getName() + 'Hand')
				.show(new HandView({ collection: new HandCollection(this.players[player].getHand()) }));
		}

		function *deal() {
			yield console.log('hello');
		}

		var deal = deal();

		deal.next();
	}
});

let app = new App();

app.start();