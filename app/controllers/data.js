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
		// Add file validation here?
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
		changeRoute: function(route){
			// Create new record in store for this submission. 
			// this.store.createRecord('submission', {
			// 	id: 1234,
			// 	data_type: this.get('selectedFormat'),
			// 	data_link: this.get('data')
			// });
			// submission.save().then(function(){
				// this.transitionToRoute(route);
			// })
		}
	}
});