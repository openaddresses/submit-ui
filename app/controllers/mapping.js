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
        "STREET":"CAPTIOL ST",
        "TYPE":"SF",
        "LAND_USE":"COMMERCIAL",
        "STORIES":"1",
        "EXTERIOR":"BRICK",
        "FULL_ADD":"400 E CAPTIOL ST NE",
        "CITY":"WASHINGTON",
        "STREET_NAM":"CA",
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
        "ADDNUM":"129",
        "ZIP_CODE":20003
      },
      "geometry":{
        "type":"Point",
        "coordinates":[-84.26567376599093,37.660876106177746]
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
  sampleNumber: Ember.computed('number', function(){
    return this.user_data.features[0].properties[this.number];
  }),
  sampleStreet: Ember.computed('street', function(){
    return this.user_data.features[0].properties[this.street];
  }),
  sampleUnit: Ember.computed('unit', function(){
    return this.user_data.features[0].properties[this.unit];
  }),
  sampleCity: Ember.computed('city', function(){
    return this.user_data.features[0].properties[this.city];
  }),
  sampleDistrict: Ember.computed('district', function(){
    return this.user_data.features[0].properties[this.district];
  }),
  sampleRegion: Ember.computed('region', function(){
    return this.user_data.features[0].properties[this.region];
  }),
  samplePostcode: Ember.computed('postcode', function(){
    return this.user_data.features[0].properties[this.postcode];
  })
});