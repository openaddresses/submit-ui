import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import SourceValidator from '../validator/source';

export default Ember.Controller.extend(sharedActions, {
	SourceValidator,
	source: null,
	frequency: null,
	sourceMissing: false,
	frequencyMissing: false,
	sourceError: Ember.computed('source', 'sourceMissing', function(){
		if (this.get('sourceMissing') === true && this.get('source') === null){
			return true;
		} else {
			return false;
		}
	}),
	frequencyError: Ember.computed('frequency', 'frequencyMissing', function(){
		if (this.get('frequencyMissing') === true && this.get('frequency') === null){
			return true;
		} else {
			return false;
		}
	}),
	errorState: Ember.computed('sourceError', 'frequencyError', function(){
		if (this.get('sourceError') || this.get('frequencyError')){
			return true;
		} else {
			return false;
		}
	}),

	actions: {
		changeRoute: function(route, changeset){
			this.model.set('source_name', changeset.get('source_name'));
			this.model.set('update_frequency', changeset.get('update_frequency'));
			this.transitionToRoute(route);
		}
	}
});