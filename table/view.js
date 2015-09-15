import Marionette from 'backbone.marionette';
import template from './template.hbs';

export default Marionette.LayoutView.extend({
	attributes: {
		id: 'table'
	},
	template: template,
	regions: {
		dealerHand: '#dealerHandContainer',
		playerHand: '#playerHandContainer',
		pot: '#potContainer'
	}
});