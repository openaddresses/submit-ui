import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
<<<<<<< HEAD
	// these are placeholders, country and region data will be supplied through api
	countries: [{title: 'United States'},{title: 'Canada'}],
	// regions:
	selectedCountry: null,
	// selectedRegion: null,
	
	actions: {
		selectCountry: function(selected){
			this.set('selectedCountry', selected);
		},
		// selectRegion: function(selected){
		// 	this.set('selectedRegion', selected);
		// 	console.log(this.get('selectedRegion').title)
		// }
	actions: {
		changeRoute: function(route){
			// Create new record in store for this submission.
			this.store.createRecord('submission', {});
			this.transitionToRoute(route);
		}
	}
});