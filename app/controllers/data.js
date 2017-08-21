import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
	actions: {
		selectDataFormat: function(dataFormat){
			console.log('selected ' + dataFormat);
		}
	}
});