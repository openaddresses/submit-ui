import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import DataValidator from '../validator/data';

export default Ember.Controller.extend(sharedActions, {
	DataValidator,
	formats: ["Direct upload", "ArcGIS server link", "Download link (.zip, etc.)"],
	selectedFormat: null,
	formatChange: Ember.computed('selectedFormat', function(){
		this.set('data', null);
	}),
	data: null,
	proceed: Ember.computed('data', function(){
		// Add file validation here?
		if (this.get('data') !== null && this.get('data') !== "") {
			return true;
		} else {
			return false;
		}
	}),
	actions: {
		changeRoute(route, changeset){
			this.model.set('data_type', this.get('selectedFormat'));
			this.model.set('data_link', changeset.get('data_link'));
      this.transitionToRoute(route);
		}
	}
});