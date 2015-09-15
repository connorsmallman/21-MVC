import Backbone from 'backbone';
import CardModel from '../card/model';

export default Backbone.Collection.extend({
	model: CardModel
});