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
      this.model.set('attribution', null);
      this.model.set('attribution_text', null);
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
    },
    setShareAlike: function(input){
      // input === "true" ? this.model.set('share_alike', true) : this.model.set('share_alike', null)
      if (input === true){
        this.model.set('share_alike', true);
      } else {
        this.model.set('share_alike', null);
      }
    },
    setAttribution: function(input){
      this.model.set('attribution', input);
      if (input === false || input === "unknown"){
        this.model.set('attribution_text', null);
      }
    },
    setAttributionText: function(text){
      console.log(text)
      this.model.set('attribution_text', text.target.value);
    }
  }
});