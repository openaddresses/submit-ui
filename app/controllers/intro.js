import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
  country: null,
  region: null,
  regionPlaceholder: Ember.computed('country', function(){
    return "Search for a region in " + this.get('country').properties.label;
  }),
  actions: {
    changeRoute: function(route){
      var country = this.get('country').properties.country_a;
      var region = this.get('region').properties.region_a;
      // Create new record in store for this submission, with country and region from user input
      this.store.createRecord('submission', {country: country, region: region});
      this.transitionToRoute(route);
    },
    searchCountries: function(term) {
      if (Ember.isBlank(term)) { return []; }
      // change key used here
      const url = `https://search.mapzen.com/v1/autocomplete?api_key=mapzen-jLrDBSP&layers=country&text=${term}`;      
      return Ember.$.ajax({ url }).then(json => json.features);
    },
    searchRegions: function(term) {
      if (Ember.isBlank(term)) { return []; }
      var country = this.get('country').properties.country_a;
      // change key used here
      const url = `https://search.mapzen.com/v1/autocomplete?api_key=mapzen-jLrDBSP&layers=region&boundary.country=${country}&text=${term}`;      
      return Ember.$.ajax({ url }).then(json => json.features);
    },
    setPlace: function(selected){
      var lng = selected.geometry.coordinates[0];
      var lat = selected.geometry.coordinates[1];
      var coordinates = [];
      coordinates.push(lat);
      coordinates.push(lng);
      this.set('place', selected);
      this.transitionToRoute('index', {queryParams: {pin: this.get('pin'), bbox: null}});
    },
    clearPlace: function(){
      this.set('place', null);
    }
  }
});