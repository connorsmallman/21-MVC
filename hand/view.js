import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import CardView from '../card/view';
import template from './template.hbs';

export default Marionette.CompositeView.extend({
	className: 'hand',
	template: template,
	templateHelpers() {
		let value = _.reduce(_.map(this.collection.models, (model) => model.getValue()), function(memo, model){
		  if (Array.isArray(memo)) {
		    return [memo[0] + model, memo[1] + model]; 
		  } else if (Array.isArray(model)) {
		    return [memo + model[0], memo + model[1]]; 
		  } else {
		    return memo + model;
		  }
		});

		return {
			handValue: (Array.isArray(value)) ? `<span>${value[0]}</span><span>${value[1]}</span>` : `<span>${value}</span>`
		}
	},
	intialize(options = {isDealer: false}) {
		this.isDealer = options.isDealer;
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