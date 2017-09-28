import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
  country: null,
  region: null,
  regionPlaceholder: Ember.computed('country', function(){
    return "Search for a region in " + this.get('country').attributes.name;
  }),
  actions: {
    changeRoute: function(route){
      var country = this.get('country').attributes.code;
      var region = this.get('region').name;
      // Create new record in store for this submission, with country and region from user input
      this.store.createRecord('submission', {country: country, region: region});
      this.transitionToRoute(route);
    },
    searchCountries: function(term) {
      if (Ember.isBlank(term)) { return []; }
      var url = 'api/countries';
      // view request format in mirage/config.js
      return Ember.$.ajax({ url }).then(json => json.data);
    },
    searchRegions: function(term) {
      if (Ember.isBlank(term)) { return []; }
      var country = this.get('country').attributes.code;
      var url = 'api/regions/' + country;
      // returns regions for the country provided in the request
      // view request format in mirage/config.js
      return Ember.$.ajax({ url });
    }
  }
});