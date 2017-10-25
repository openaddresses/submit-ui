import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';
import { task, timeout } from 'ember-concurrency';
import ENV from '../config/environment';

export default Ember.Controller.extend(sharedActions, {
  country: null,
  region: null,
  regionPlaceholder: Ember.computed('country', function(){
    return "Search for a region in " + this.get('country').properties.label;
  }),
  searchCountries: task(function* (term) {
    yield timeout(167);
    if (Ember.isBlank(term)) { return []; }
    const url = `https://search.mapzen.com/v1/autocomplete?api_key=${ENV.searchKey}&layers=country&text=${term}`;      
    return Ember.$.ajax({ url }).then(json => json.features);
  }),
  searchRegions: task(function* (term) {
    yield timeout(167);
    if (Ember.isBlank(term)) { return []; }
    var country = this.get('country').properties.country_a;
    const url = `https://search.mapzen.com/v1/autocomplete?api_key=${ENV.searchKey}&layers=region&boundary.country=${country}&text=${term}`;      
    return Ember.$.ajax({ url }).then(json => json.features);
  }),
  actions: {
    changeRoute: function(route){
      var country = this.get('country').properties.country_a;
      var region = this.get('region').properties.region_a;
      // Create new record in store for this submission, with country and region from user input
      this.store.createRecord('submission', {country: country, region: region});
      this.transitionToRoute(route);
    }
  }
});