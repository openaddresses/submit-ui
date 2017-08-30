import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
	selected_license: null,
	licenses: [
		{
			"name": "license 1",
			"text": "all the rules"
		},
		{
			"name": "license 2",
			"text": "some of the rules"
		}
	],
	licensePresent: null,
	actions: {
		selectLicense: function(license){
			this.set('selectedLicense', license);
		},
		changeRoute: function(route){
			if (this.get('license')){
				this.set('licensePresent', true)
			} else {
				console.log("test")
				this.set('licensePresent', false)
			}
			if (this.get('licensePresent') == true) {
				this.transitionToRoute(route);
			}
		}
	}
});