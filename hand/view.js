'use strict';

import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import CardView from '../card/view';
import CardModel from '../card/model';
import BackboneRadio from 'backbone.radio';

let playerChannel = BackboneRadio.channel('playerChannel');
let gameChannel = BackboneRadio.channel('gameChannel');

export default Marionette.CollectionView.extend({
	initialize(options) {
		this.isDealer = options.isDealer || false;
		this.playerName = options.playerName;
		this.listenTo(this.collection, 'add', this.updateHandValue);
	},
	childView: CardView,
	onBeforeRender() {
		this.updateHandValue();
	},
	afterRenderCollection() {
		this.isWinner();
		this.isBust();
	},
	addCard(card) {
		this.collection.add(new CardModel(card));
	},
	isWinner() {
		console.log('check for winner');

		if (this.reduceValue(v => v === 21)) {
			console.log('winner');
			playerChannel.trigger('winner', this.playerName);
		}
	},
	isBust() {
		console.log('check for bust');

		if (this.reduceValue(v => v > 21)) {
			console.log('bust');
			playerChannel.trigger('loser', this.playerName);
		};
	},
	reduceValue(predicate) {
		return _.some(this.getHandValue(), predicate);
	},
	getHandValue() {
		let value = _.reduce(_.map(this.collection.models, (model) => model.getValue()), (memo, model) => {
		  if (_.isArray(memo)) {
		    return [memo[0] + model, memo[1] + model]; 
		  } else if (_.isArray(model)) {
		    return [memo + model[0], memo + model[1]]; 
		  } else {
		    return memo + model;
		  }
		});

		return value;
	},
	updateHandValue() {
		playerChannel.trigger('card:added', { 
			playerName: this.playerName, 
			handValue: this.getHandValue() 
		});
	},
});