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
        "STREET":"CONNETICUT AVE NW",
        "TYPE":"SF",
        "LAND_USE":"COMMERCIAL",
        "STORIES":"1",
        "EXTERIOR":"BRICK",
        "FULL_ADD":"3001 CONNETICUT AVE NW",
        "CITY":"WASHINGTON",
        "ROAD_TYPE":"AVE",
        "PREFIX_DIR":"",
        "SUFFIX_DIR":"NW",
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
  currentField: "number",
  nextField: Ember.computed('currentField', function(){
    var nextFields = {
      "number": "street",
      "street": "unit",
      "unit": "city",
      "city": "district",
      "region": "postcode"
    };
    return nextFields[this.get('currentField')];
  }),
  isRequired: Ember.computed('currentField', function(){
    if (this.get('currentField') === "number" || this.get('currentField') === "street"){
      return true;
    } else {
      return false;
    }
  }),
  actions: {
    testAction: function(message){
      console.log(message);
    },
    chooseColumn: function(heading, column){
      Ember.set(this.model.get('oaFields')[heading], "columns", []);
      this.model.get('oaFields')[heading].columns[0] = column;
      this.model.get('oaFields')[heading].columns[0] = column;
      for (var i = 0; i < 2; i++){
        Ember.set(this.model.get('exampleRows')[i], heading, this.user_data.features[i].properties[column]);
      }
    },
    chooseColumnToRemove: function(heading, column){
      Ember.set(this.model.get('oaFields')[heading], "extractionColumn", column);
      for (var i = 0; i < 2; i++){
        var originalColumn = this.model.oaFields[heading].columns[0];
        var originalString = this.user_data.features[i].properties[originalColumn].toString();
        var extractionString = this.user_data.features[i].properties[this.model.get('oaFields')[heading].extractionColumn].toString();
        var newString = originalString.replace(extractionString, "");
        
        if (newString[0] === " "){
          newString = newString.slice(1, newString.length);
        }
        Ember.set(this.model.get('exampleRows')[i], heading, newString);
      }
    },
    addColumn: function(heading, column){
      this.model.get('oaFields')[heading].columns[1] = column;
      for (var i = 0; i < 2; i++){
        var joined = this.model.get('exampleRows')[i][heading] + this.model.get('oaFields')[heading].separator + this.user_data.features[i].properties[column];
        Ember.set(this.model.get('exampleRows')[i], heading, joined);
      }
    },
    addAction: function(field, action){
      Ember.set(this.model.get('oaFields')[field], "action", action);
    },
    removeAction: function(field){
      if (this.model.get('oaFields')[field].action === "join" && this.model.get('oaFields')[field].columns){
        this.model.get('oaFields')[field].columns.pop();
      }
      for (var i = 0; i < 2; i++){
        if (this.model.get('exampleRows')[i][field]){
          Ember.set(this.model.get('exampleRows')[i], field, this.user_data.features[i].properties[this.model.get('oaFields')[field].columns[0]]);
        }
      }
      Ember.set(this.model.get('oaFields')[field], "action", null);
      Ember.set(this.model.get('oaFields')[field], "extractionFunction", null);
      Ember.set(this.model.get('oaFields')[field], "separator", " ");
    },
    setExtractionFunction: function(field, extractionFunction, extractionText){
      Ember.set(this.model.oaFields[field], "extractionFunction", extractionFunction);
      Ember.set(this.model.oaFields[field], "extractionText", extractionText);
      if (extractionFunction !== "removeDuplicateValue"){
        for (var i = 0; i < 2; i++){
          var prefix = "";
          var postfix = "";
          var original = this.model.get('exampleRows')[i][field].split("");
          var splitIndex = original.length;
          if (!isNaN(parseInt(original[0]))){
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
          }
          if (extractionFunction === "removePrefixNumber"){
            Ember.set(this.model.get('exampleRows')[i], field, postfix);
          } else if (extractionFunction === "removePostfixStreet") {
            Ember.set(this.model.get('exampleRows')[i], field, prefix);
          }
        }
      }
    },
    removeExtractionFunction: function(field){
      Ember.set(this.model.oaFields[field], "extractionFunction", null);
      for (var i = 0; i < 2; i++){
        Ember.set(this.model.get('exampleRows')[i], field, this.user_data.features[i].properties[this.model.get('oaFields')[field].columns[0]]);
      }
    },
    goToField: function(field){
      this.set('currentField', field);
    },
    nextField: function(nextField){
      this.set('currentField', this.get('nextField'));
    }
  }
});