import Marionette from 'backbone.marionette';
import template from './template.hbs';

export default Marionette.LayoutView.extend({
	el: '#mainContainer',
	template: template,
	regions: {
		table: '#tableContainer',
		controls: '#controlsContainer'
	}
});