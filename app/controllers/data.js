import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
	formats: ["Direct upload", "ArcGIS server link", "Download link (.zip, etc.)"],
	selectedFormat: null,
	data: null,
	proceed: Ember.computed('data', function(){
		// file validation here?
		if (this.get('data')) {
			return true;
		} else {
			return false;
		}
	}),
	actions: {
		updateData(input){
			console.log(input)
		}
	}
});