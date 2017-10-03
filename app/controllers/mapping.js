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
  mappings: ["number", "street", "unit", "city", "district", "region", "postcode"],
  number: null,
  street: null,
  unit: null,
  city: null,
  district: null,
  region: null,
  postcode: null,
  samples:[{
    number: null,
    street: null,
    unit: null,
    city: null,
    district: null,
    region: null,
    postcode: null,
  },
  {
    number: null,
    street: null,
    unit: null,
    city: null,
    district: null,
    region: null,
    postcode: null,
  }],
  actions: {
    setColumn: function(heading, column){
      this.set(heading, column);
      for (var i = 0; i < 2; i++){
        Ember.set(this.samples[i], heading, this.user_data.features[i].properties[column]);
      }
    },
    joinColumns: function(column){
      this.set('joinStreet', true);
    },
    addJoin: function(selected){
      this.get(heading).column_two = selected;
      // var joinStreet = this.user_data.features[0].properties[selected];
      // var joinStreetTwo = this.user_data.features[1].properties[selected];
      // var originalStreet = this.get('sampleStreet');
      // var originalStreetTwo = this.get('sampleStreetTwo');
      // this.set('sampleStreet', originalStreet + " " + joinStreet);
      // this.set('sampleStreetTwo', originalStreet + " " + joinStreetTwo);
    }
  }
});