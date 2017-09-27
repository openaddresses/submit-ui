import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
	selectedLicense: null,
	providedLicense:
		{
			"name": "User-provided license",
			"text": null
		},
	providedAndSelectedLicense: Ember.computed('providedLicense', 'selectedLicense', function(){
		if (this.get('selectedLicense') && this.get('providedLicense').text){
				return true;
		}
	}),
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
			if (this.get('providedAndSelectedLicense')){
				this.set('licensePresent', null);
			} else if (this.get('selectedLicense') || this.get('providedLicense')){
				this.set('licensePresent', true);
			} else {
				this.set('licensePresent', false);
			}
			if (this.get('licensePresent')) {
				if (this.get('providedLicense').text) {
					this.model.set('license', this.get('providedLicense'));
				} else {
					this.model.set('license', this.get('selectedLicense'));
				}
				this.transitionToRoute(route);
			}
		}
	}
});