import Backbone from 'backbone';

export default Backbone.Model.extend({
	defaults: {
		face: '',
		suit: '',
		value: 0
	},
	getValue() {
		return this.get('value');
	}
});