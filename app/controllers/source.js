import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
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

	actions: {
		changeRoute: function(route){
			if (this.get('source') && this.get('frequency')){
				this.store.peekAll('submission').get('firstObject').set('source_name', this.get('source'));
				this.store.peekAll('submission').get('firstObject').set('update_frequency', this.get('frequency'));
				this.transitionToRoute(route);
			} else if (this.get('sourceError')){
				this.set('sourceMissing', true)
			} else if (this.get('frequencyError')){
				this.set('frequencyMissing', true)
			} 
		}
	}
});