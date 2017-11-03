import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    licenseExists: function(input){
      this.model.set('license_exists', input)
    }
  }
});
