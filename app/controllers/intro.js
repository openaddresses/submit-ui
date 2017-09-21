import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
	country: null,
	region: null,
	regionPlaceholder: Ember.computed('country', function(){
		return "Search for a region in " + this.get('country').attributes.name;
	}),
	
	actions: {
		changeRoute: function(route){
			// Create new record in store for this submission.
			this.store.createRecord('submission', {});
			this.transitionToRoute(route);
		},
		searchCountries: function(term) {
      if (Ember.isBlank(term)) { return []; }
      const url = 'api/countries'      
      return Ember.$.ajax({ url }).then(json => json.data);
    },
    searchRegions: function(term) {
      if (Ember.isBlank(term)) { return []; }
      const url = 'api/regions'      
      return Ember.$.ajax({ url }).then(json => json.data);
    }
	}
});