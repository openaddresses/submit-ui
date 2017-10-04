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
        "FULL_ADD":"400 E CAPITOL ST NE",
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
  columnHeadings: Ember.computed('user_data', function(){
    return Object.keys(this.user_data.features[0].properties);
  }),
  exampleRows:[{
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
  splitCharacters: Ember.computed('currentField', function(){
    var characters =  this.user_data.features[0].properties[this.model.get('oaFields')[this.get('currentField')].columns[0]].split("");
    var characterPairs = [];
    for (var i = 0; i < characters.length; i++){
      var pair = {
        index: null,
        character: null
      };
      pair.index = i;
      pair.character = characters[i];
      characterPairs.push(pair);
    }
    return characterPairs;
  }),
  splitColumn: null,
  currentField: null,
  actions: {
    chooseColumn: function(heading, column){
      this.set('currentField', heading);
      Ember.set(this.model.get('oaFields')[heading], "columns", []);
      this.model.get('oaFields')[heading].columns[0] = column;
      this.model.get('oaFields')[heading].columns[0] = column;
      for (var i = 0; i < 2; i++){
        Ember.set(this.exampleRows[i], heading, this.user_data.features[i].properties[column]);
      }
    },
    addColumn: function(heading, column){
      this.model.get('oaFields')[heading].columns[1] = column;
      for (var i = 0; i < 2; i++){
        var joined = this.exampleRows[i][heading] + this.model.get('oaFields')[heading].separator + this.user_data.features[i].properties[column];
        Ember.set(this.exampleRows[i], heading, joined);
      }
    },
    addAction: function(field, action){
      Ember.set(this.model.get('oaFields')[field], "action", action);
    },
    removeAction: function(field){
      if (this.model.get('oaFields')[field].action === "join" && this.model.get('oaFields')[field].columns.length > 1){
        this.model.get('oaFields')[field].columns.pop();
      }
      for (var i = 0; i < 2; i++){
        Ember.set(this.exampleRows[i], field, this.user_data.features[i].properties[this.model.get('oaFields')[field].columns[0]]);
      }
      Ember.set(this.model.get('oaFields')[field], "action", null);
      Ember.set(this.model.get('oaFields')[field], "extractionFunction", null);
      Ember.set(this.model.get('oaFields')[field], "separator", " ");
    },
    setExtractionFunction: function(field, extractionFunction, extractionText){
      Ember.set(this.model.oaFields[field], "extractionFunction", extractionFunction);
      Ember.set(this.model.oaFields[field], "extractionText", extractionText);
      for (var i = 0; i < 2; i++){
        var prefix = "";
        var postfix = "";
        var original = this.exampleRows[i][field].split("");
        var splitIndex = original.length;
        for (var j = 0; j < original.length; j++){
          if (j < splitIndex) {
            prefix += original[j];
            if (isNaN(parseInt(original[j+1]))){
              splitIndex = j+1;
            }
          } else {
            if (j === splitIndex && original[j] === " "){
              continue;
            }
            postfix += original[j];
          }
        }
        if (extractionFunction === "removePrefixNumber"){
          Ember.set(this.exampleRows[i], field, postfix);
        } else if (extractionFunction === "removePostfixStreet") {
          Ember.set(this.exampleRows[i], field, prefix);
        }
      }
    },
    removeExtractionFunction: function(field){
      Ember.set(this.model.oaFields[field], "extractionFunction", null);
      for (var i = 0; i < 2; i++){
        Ember.set(this.exampleRows[i], field, this.user_data.features[0].properties[this.model.get('oaFields')[field].columns[0]]);
      }
    }
  }
});