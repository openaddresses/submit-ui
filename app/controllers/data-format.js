import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
  columns: null,
  columnHeadings: Ember.computed('model.webServiceResponse', function(){
    return this.model.webServiceResponse.source_data.fields;
  }),
  showAdditionalJoinDropdown: false,
  showAdditionalJoinButton: false,
  user_data: Ember.computed('model.webServiceResponse', function(){
    return this.model.webServiceResponse.source_data.results;
  }),
  currentField: "number",
  actions: {
    goToField: function(field){
      this.set('currentField', field);
    },
    chooseField: function(heading, column){
      Ember.set(this.model.submission.get('oaFields')[heading], "fields", []);
      this.model.submission.get('oaFields')[heading].fields.addObject(column);
      for (var i = 0; i < 2; i++){
        Ember.set(this.model.submission.get('exampleRows')[i], heading, [this.model.webServiceResponse.source_data.results[i][column]]);
      }
      this.set('showAdditionalJoinDropdown', true);
    },
    editField: function(heading, index, column){
      this.model.submission.get('oaFields')[heading].fields.replace(index, 1, column);
      for (var i = 0; i < 2; i++){
        this.model.submission.exampleRows[i][heading].replace(index, 1, this.model.webServiceResponse.source_data.results[i][column])
      }
    },
    addField: function(heading, column){
      this.set('showAdditionalJoinDropdown', false);
      this.model.submission.get('oaFields')[heading].fields.addObject(column)
      for (var i = 0; i < 2; i++){
        this.model.submission.exampleRows[i][heading].addObject(this.model.webServiceResponse.source_data.results[i][column]);
      }
      this.set('showAdditionalJoinButton', true)
    },
    removeField: function(heading, column){
      this.model.submission.get('oaFields')[heading].fields.removeObject(column);
      for (var i = 0; i < 2; i++){
        this.model.submission.exampleRows[i][heading].removeObject(this.model.webServiceResponse.source_data.results[i][column]);
      }
    },
    addJoin: function(){
      this.set('showAdditionalJoinDropdown', true);
      this.set('showAdditionalJoinButton', false);
    },
    extractionFunction: function(extraction_function, field){
      for (var i = 0; i < 2; i++){
        var fieldValue =  this.model.webServiceResponse.source_data.results[i][this.model.submission.oaFields[field].fields[0]];
        var oa_extraction_regExp;
        if (extraction_function === "postfixed_street_pattern"){
          oa_extraction_regExp = new RegExp('^(?:\\s*(?:[0-9]+(?:[ -]/[0-9]/[0-9])?|[0-9]+-[0-9]+|[0-9]+-?[A-Z])\\s+)?(.*)', 'i');
        } else if (extraction_function === "prefixed_number_pattern"){
          oa_extraction_regExp = new RegExp('^\\s*(\\d+(?:[ -]\\d/\\d)?|\\d+-\\d+|\\d+-?[A-Z])\\s+', 'i');
        } else if (extraction_function === "postfixed_street_with_units_pattern"){
          oa_extraction_regExp = new RegExp('\\s((?:(?:UNIT|APARTMENT|APT\\.?|SUITE|STE\\.?|BUILDING|BLDG\\.?|LOT)\\s+|#).+)$', 'i');
        } else if (extraction_function === "postfixed_unit_pattern"){
          oa_extraction_regExp = new RegExp('^(?:\\s*(?:\\d+(?:[ -]\\d/\\d)?|\\d+-\\d+|\\d+-?[A-Z])\\s+)?(.+?)(?:\\s+(?:(?:UNIT|APARTMENT|APT\\.?|SUITE|STE\\.?|BUILDING|BLDG\\.?|LOT)\\s+|#).+)?$', 'i');
        }
        var valueAfterFunction = oa_extraction_regExp.exec(fieldValue);
        if (valueAfterFunction !== null){
          this.model.submission.get('exampleRows')[i][field].replace(0, 1, valueAfterFunction[1]);
        }
      }
      Ember.set(this.model.submission.get('oaFields')[field], "function", extraction_function);
    },
    addFunction: function(field, action){
      Ember.set(this.model.submission.get('oaFields')[field], "function", action);
      if (action === "join"){
        this.set('showAdditionalJoinDropdown', true);
      }
    },
    removeFunction: function(field){
      if (this.model.submission.get('oaFields')[field].function === "join" && this.model.submission.get('oaFields')[field].fields.length > 1){
        Ember.set(this.model.submission.get('oaFields')[field], "fields", [this.model.submission.get('oaFields')[field].fields[0]]);
        this.set('showAdditionalJoinButton', false);
        Ember.set(this.model.submission.get('oaFields')[field], "function", null);
        this.set('showAdditionalJoinDropdown', false);
      } else if (this.model.submission.get('oaFields')[field].function !== "join" && this.model.submission.get('oaFields')[field].function !== "split"){
        Ember.set(this.model.submission.get('oaFields')[field], "function", "split");
      } else {
        Ember.set(this.model.submission.get('oaFields')[field], "function", null);
      }
      for (var i = 0; i < 2; i++){
        var originalColumn = this.model.submission.get('oaFields')[field].fields[0]
        Ember.set(this.model.submission.get('exampleRows')[i], field, [this.model.webServiceResponse.source_data.results[i][originalColumn]]);
      }
    },
    changeRoute: function(route){
      this.transitionToRoute(route);
    }
  }
});
