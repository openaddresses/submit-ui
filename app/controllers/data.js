import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
	formats: ["Direct upload", "ArcGIS server link", "Download link (.zip, etc.)"],
	selectedFormat: null,
	formatChange: Ember.computed('selectedFormat', function(){
		this.set('data', null);
	}),
	data: null,
	proceed: Ember.computed('data', function(input){
		// file validation here?
		if (this.get('data') !== null && this.get('data') !== "") {
			return true;
		} else {
			return false;
		}
	}),
	actions: {
		updateData(input){
			this.set('data', input);
		},
		updateFormat(input){
		},
		uploadData(input){
		}
	}
});