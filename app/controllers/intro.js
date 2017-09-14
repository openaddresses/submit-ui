import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
	// these are placeholders, country and region data will be supplied through api
	countries: [{title: 'United States'},{title: 'Canada'}],
	// regions:
	selectedCountry: null,
	// selectedRegion: null,
	
	actions: {
		selectCountry: function(selected){
			this.set('selectedCountry', selected);
			console.log(this.get('selectedCountry').title)
		},
		// selectRegion: function(selected){
		// 	this.set('selectedRegion', selected);
		// 	console.log(this.get('selectedRegion').title)
		// }
	}
});