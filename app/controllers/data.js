import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
	dataFormat: null,
	proceed: false,

	actions: {
		selectDataFormat: function(dataFormat){
			this.set('dataFormat', dataFormat);
		}
	}
});