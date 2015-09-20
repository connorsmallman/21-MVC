'use strict';

import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import CardView from '../card/view';
import BackboneRadio from 'backbone.radio';

let handValueChannel = BackboneRadio.channel('handValueChannel');

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
	updateHandValue() {
		handValueChannel.trigger('card:added', { 
			playerName: this.playerName, 
			handValue: this.getHandValue() 
		});
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
	}
});