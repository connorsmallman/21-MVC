import Marionette from 'backbone.marionette';
import template from './template.hbs';

export default Marionette.LayoutView.extend({
	attributes: {
		id: 'table'
	},
	template: template,
	regions: {
    dealerHandValue: '#dealerHandValueContainer',
		dealerHand: '#dealerHandContainer',
    playerHandValue: '#playerHandValueContainer',
		playerHand: '#playerHandContainer',
		pot: '#potContainer'
	}
});