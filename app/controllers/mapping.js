import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
  user_data: {
    "type":"FeatureCollection",
    "features":[{
      "type":"Feature",
      "properties":{
        "OBJECTID":1001,
        "ADDNUMBER":129,
        "STREET":"DONALD DR",
        "SUITE":" ",
        "NAME":"",
        "ACCESS":" ",
        "TYPE":"SF",
        "LAND_USE":"RESIDENTIAL",
        "STORIES":"1",
        "EXTERIOR":"BRICK",
        "COMMENT":" ",
        "FULL_ADD":"129 DONALD DR",
        "CITY":"RICHMOND",
        "ADDRESS":"DONALD DR 129",
        "PREFIX_DIR":" ",
        "STREET_NAM":"DONALD",
        "ROAD_TYPE":"DR",
        "SUFFIX_DIR":" ",
        "LAST_UPDT":null,
        "UPDT_COMM":" ",
        "newadd":0,
        "oldadd":0,
        "Flood":" ",
        "Flood1990":" ",
        "ENGRD_STRC":" ",
        "GlobalID":"{C5CF962D-9863-4604-B3F8-BB85731B32F5}",
        "ESN":56,
        "JURISD":"COUNTY",
        "ADDNUM":"129",
        "ZIP_CODE":40475
      },
      "geometry":{
        "type":"Point",
        "coordinates":[-84.26567376599093,37.660876106177746]
      }
    }]
  },
  user_data_join: {
    "type":"FeatureCollection",
    "features":[{
      "type":"Feature",
      "properties":{
        "ADDPREFIX":12,
        "ADDNUMBER":129,
        "STREET":"MARKET STREET",
        "NAME":"",
        "ACCESS":" ",
        "TYPE":"SF",
        "LAND_USE":"RESIDENTIAL",
        "STORIES":"1",
        "CITY":"SAN FRANCISCO",
        "PREFIX_DIR":" ",
        "STREET_NAM":"MARKET",
        "ROAD_TYPE":"ST",
        "SUFFIX_DIR":"SW",
        "JURISD":"COUNTY",
        "ADDNUM":"129",
        "ZIP_CODE":94103
      },
      "geometry":{
        "type":"Point",
        "coordinates":[37.7749, 122.4194]
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
  }),
  actions: {
    selectDataSet: function(dataset){
      this.set('selectedDataset', dataset);
    }
  }
});