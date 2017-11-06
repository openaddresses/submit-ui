import Ember from 'ember';

export default Ember.Controller.extend({
  licenses: [{
    name: "license 1",
    url: "www.license-1.com"
  },{
    name: "license 2",
    url: "www.license-2.com"
  }],
  actions: {
    licenseExists: function(input){
      this.model.set('license_exists', input)
      this.model.set('license', null);
      this.model.set('license_url', null);
      this.model.set('user_submitted_url', null);
    },
    selectLicense: function(license){
      this.model.set('license', null)
      this.model.set('user_submitted_url', null)
      this.model.set('license', license.name)
      this.model.set('license_url', license.url)
    },
    changeRoute: function(route){
      this.transitionToRoute(route);
    },
    userSubmittedLicense: function(input){
      this.model.set('license', null)
      this.model.set('license_url', null)
      this.model.set('user_submitted_url', input.target.value)
    }
  }
});