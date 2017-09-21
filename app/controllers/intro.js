import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
	// these are placeholders, country and region data will be supplied through api
	countries: [{title: 'United States'},{title: 'Canada'}],
	// countries: Ember.computed(function(){
	// 	Ember.$.ajax({
	// 		type: "GET",
 //    	contentType: "text/xml",
	// 		url: 'api/countries'
	// 	}).then(function(response){
	// 		console.log('test happened')
	// 		return response;
	// 	})
	// }),
	// regions:
	selectedCountry: null,
	// selectedRegion: null,
	
	actions: {
		selectCountry: function(selected){
			Ember.$.ajax({
				type: "GET",
      	contentType: "text/xml",
				url: 'api/countries'
			}).then(function(response){
				for(var i=0; i < response.countries.length; i++) {console.log(response.countries[i].name)}
			})
			this.set('selectedCountry', selected);
		},
		// selectRegion: function(selected){
		// 	this.set('selectedRegion', selected);
		// 	console.log(this.get('selectedRegion').title)
		// }
		changeRoute: function(route){
			// Create new record in store for this submission.
			this.store.createRecord('submission', {});
			this.transitionToRoute(route);
		}
	}
});