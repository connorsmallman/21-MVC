import Marionette from 'backbone.marionette';
import template from './template.hbs';

export default Marionette.ItemView.extend({
	className: 'card',
	template: template
});