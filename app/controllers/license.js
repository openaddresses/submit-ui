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
    if (this.get('selectedLicense') && this.get('providedLicense').text) {
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
      this.model.set('license', license)
      this.set('licensePresent', true)
    },
    changeRoute: function(route){
        this.transitionToRoute(route);
    }
  }
});