import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
  user_data: {
    "type":"FeatureCollection",
    "features":[{
      "type":"Feature",
      "properties":{
        "OBJECTID":1001,
        "ADDNUMBER":400,
        "STREET":"CAPITOL ST",
        "TYPE":"SF",
        "LAND_USE":"COMMERCIAL",
        "STORIES":"1",
        "EXTERIOR":"BRICK",
        "FULL_ADD":"400 E CAPTIOL ST NE",
        "CITY":"WASHINGTON",
        "ROAD_TYPE":"ST",
        "PREFIX_DIR":"E",
        "SUFFIX_DIR":"NE",
        "UNIT":3,
        "DISTRICT":"DISTRICT OF COLUMBIA",
        "LAST_UPDT":null,
        "UPDT_COMM":" ",
        "newadd":0,
        "oldadd":0,
        "Flood1990":" ",
        "GlobalID":"{C5CF962D-9863-4604-B3F8-BB85731B32F5}",
        "ESN":56,
        "JURISD":"COUNTY",
        "ADDNUM":"400",
        "ZIP_CODE":20003
      },
      "geometry":{
        "type":"Point",
        "coordinates":[-77.0005006,38.8905686]
      }
    },
    {
      "type":"Feature",
      "properties":{
        "OBJECTID":1001,
        "ADDNUMBER":3001,
        "STREET":"RIVER DRIVE",
        "TYPE":"SF",
        "LAND_USE":"COMMERCIAL",
        "STORIES":"1",
        "EXTERIOR":"BRICK",
        "FULL_ADD":"3001 CONNETICUT AVE NW",
        "CITY":"WASHINGTON",
        "ROAD_TYPE":"AVE",
        "PREFIX_DIR":"",
        "SUFFIX_DIR":"",
        "UNIT":null,
        "DISTRICT":"DISTRICT OF COLUMBIA",
        "LAST_UPDT":null,
        "UPDT_COMM":" ",
        "newadd":0,
        "oldadd":0,
        "Flood1990":" ",
        "GlobalID":"{C5CF962D-9863-4604-B3F8-BB85731B32F5}",
        "ESN":56,
        "JURISD":"COUNTY",
        "ADDNUM":"123",
        "ZIP_CODE":20008
      },
      "geometry":{
        "type":"Point",
        "coordinates":[-77.0501754,38.9253589]
      }
    }]
  },
  selectedDataset: "simple_data",
  columnHeadings: Ember.computed('user_data', function(){
    return Object.keys(this.user_data.features[0].properties);
  }),
  number: null,
  street: null,
  unit: null,
  city: null,
  district: null,
  region: null,
  postcode: null,
  joinStreet: false,
  // the following is super inefficient, but will be refactored once there's an API repsonse to work with.
  sampleNumber: Ember.computed('number', function(){
    return this.user_data.features[0].properties[this.number];
  }),
   sampleNumberTwo: Ember.computed('number', function(){
    return this.user_data.features[1].properties[this.number];
  }),
  sampleStreet: Ember.computed('street', function(){
    return this.user_data.features[0].properties[this.street];
  }),
  sampleStreetTwo: Ember.computed('street', function(){
    return this.user_data.features[1].properties[this.street];
  }),
  sampleUnit: Ember.computed('unit', function(){
    return this.user_data.features[0].properties[this.unit];
  }),
  sampleUnitTwo: Ember.computed('unit', function(){
    return this.user_data.features[1].properties[this.unit];
  }),
  sampleCity: Ember.computed('city', function(){
    return this.user_data.features[0].properties[this.city];
  }),
  sampleCityTwo: Ember.computed('city', function(){
    return this.user_data.features[1].properties[this.city];
  }),
  sampleDistrict: Ember.computed('district', function(){
    return this.user_data.features[0].properties[this.district];
  }),
  sampleDistrictTwo: Ember.computed('district', function(){
    return this.user_data.features[1].properties[this.district];
  }),
  sampleRegion: Ember.computed('region', function(){
    return this.user_data.features[0].properties[this.region];
  }),
  sampleRegionTwo: Ember.computed('region', function(){
    return this.user_data.features[1].properties[this.region];
  }),
  samplePostcode: Ember.computed('postcode', function(){
    return this.user_data.features[0].properties[this.postcode];
  }),
   samplePostcodeTwo: Ember.computed('postcode', function(){
    return this.user_data.features[1].properties[this.postcode];
  }),
  actions: {
    joinColumns: function(column){
      this.set('joinStreet', true);
    },
    addJoin: function(selected){
      var joinStreet = this.user_data.features[0].properties[selected];
      var joinStreetTwo = this.user_data.features[1].properties[selected];
      var originalStreet = this.get('sampleStreet');
      var originalStreetTwo = this.get('sampleStreetTwo');
      this.set('sampleStreet', originalStreet + " " + joinStreet);
      this.set('sampleStreetTwo', originalStreet + " " + joinStreetTwo);
    }
  }
});