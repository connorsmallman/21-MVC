import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import CardView from '../card/view';
import template from './template.hbs';

export default Marionette.CompositeView.extend({
	initialize(options) {
		this.isDealer = options.isDealer || false;
	},
	collectionEvents: {
		'add': 'cardAdded'
	},
	cardAdded() {
		console.log('card added');
	},
	className: 'hand',
	template: template,
	templateHelpers() {
		let value = _.reduce(_.map(this.collection.models, (model) => model.getValue()), function(memo, model){
		  if (_.isArray(memo)) {
		    return [memo[0] + model, memo[1] + model]; 
		  } else if (_.isArray(model)) {
		    return [memo + model[0], memo + model[1]]; 
		  } else {
		    return memo + model;
		  }
		});

		return {
			handValue: (_.isArray(value)) ? `<span>${value[0]}</span><span>${value[1]}</span>` : `<span>${value}</span>`
		}
	},
	childView: CardView,
	childViewContainer: '#handCards',
	onBeforeRender() {
		//hide first card is isDealer;
		if(this.hideFirstCard) {
			this.collection.at(0).set({hide: true});
		}
	}
});