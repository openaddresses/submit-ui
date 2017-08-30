import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
	selectedLicense: null,
	licenses: [
		{
			"name": "MIT",
			"text": "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and..."
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
			this.set('licensePresent', true)
		},
		changeRoute: function(route){
			if (this.get('selectedLicense')){
				this.set('licensePresent', true)
			} else {
				this.set('licensePresent', false)
			}
			if (this.get('licensePresent') == true) {
				this.transitionToRoute(route);
			}
		}
	}
});