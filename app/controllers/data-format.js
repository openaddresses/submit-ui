import Ember from 'ember';

export default Ember.Controller.extend({
  columns: null,
  columnHeadings: Ember.computed('model.webServiceResponse', function(){
    return this.model.webServiceResponse.source_data.fields;
  }),
  showAdditionalJoinDropdown: false,
  showAdditionalJoinButton: false,
  user_data: Ember.computed('model.webServiceResponse', function(){
    return this.model.webServiceResponse.source_data.results;
  }),
  actions: {
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
    removePrefixNumber: function(field){
      var postfixed_street_pattern = new RegExp('^(?:\\s*(?:[0-9]+(?:[ -]/[0-9]/[0-9])?|[0-9]+-[0-9]+|[0-9]+-?[A-Z])\\s+)?(.*)', 'i');
      for (var i = 0; i < 2; i++){
        var fieldValue =  this.model.webServiceResponse.source_data.results[i][this.model.submission.oaFields[field].fields[0]];
        var valueAfterFunction = postfixed_street_pattern.exec(fieldValue)[1];
        this.model.submission.get('exampleRows')[i][field].replace(0, 1, valueAfterFunction);
      }
    },
    removePostfixStreet: function(field){
      var prefixed_number_pattern = new RegExp('^\\s*(\\d+(?:[ -]\\d/\\d)?|\\d+-\\d+|\\d+-?[A-Z])\\s+', 'i');
      for (var i = 0; i < 2; i++){
        var fieldValue =  this.model.webServiceResponse.source_data.results[i][this.model.submission.oaFields[field].fields[0]];
        var valueAfterFunction = prefixed_number_pattern.exec(fieldValue)[1];
        this.model.submission.get('exampleRows')[i][field].replace(0, 1, valueAfterFunction);
      }
    },
    removePostfixUnit: function(field){
      var postfixed_street_with_units_pattern = new RegExp('\\s((?:(?:UNIT|APARTMENT|APT\\.?|SUITE|STE\\.?|BUILDING|BLDG\\.?|LOT)\\s+|#).+)$', 'i');
      var testString =  this.model.submission.exampleRows[0][field][0];
      var match = postfixed_street_with_units_pattern.exec(testString);
      console.log(match[1]);
    },
    removePrefixUnit: function(field){
      var postfixed_unit_pattern = new RegExp('^(?:\\s*(?:\\d+(?:[ -]\\d/\\d)?|\\d+-\\d+|\\d+-?[A-Z])\\s+)?(.+?)(?:\\s+(?:(?:UNIT|APARTMENT|APT\\.?|SUITE|STE\\.?|BUILDING|BLDG\\.?|LOT)\\s+|#).+)?$', 'i');
      var testString =  this.model.submission.exampleRows[0][field][0];
      var match = postfixed_unit_pattern.exec(testString);
      console.log(match[1]);
    },
    addFunction: function(field, action){
      Ember.set(this.model.submission.get('oaFields')[field], "function", action);
      if (action === "join"){
        this.set('showAdditionalJoinDropdown', true);
      }
    },
    removeFunction: function(field){
      if (this.model.submission.get('oaFields')[field].action === "join" && this.model.submission.get('oaFields')[field].fields.length > 1){
        Ember.set(this.model.submission.get('oaFields')[field], "fields", [this.model.submission.get('oaFields')[field].fields[0]]);
        this.set('showAdditionalJoinButton', false);
        for (var i = 0; i < 2; i++){
          if (this.model.submission.get('exampleRows')[i][field]){
            var originalColumn = this.model.submission.get('oaFields')[field].fields[0]
            Ember.set(this.model.submission.get('exampleRows')[i], field, [this.model.webServiceResponse.source_data.results[i][originalColumn]]);
          }
        }
      }
      Ember.set(this.model.submission.get('oaFields')[field], "function", null);
      Ember.set(this.model.submission.get('oaFields')[field], "extractionFunction", null);
      this.set('showAdditionalJoinDropdown', false);
    },
  }
});
