import Ember from 'ember';

export default Ember.Component.extend({
  remainingColumnHeadings: Ember.computed('properties.fields.[]', function(){
    var headings = this.properties.fields;
    var fields = this.model.webServiceResponse.source_data.fields;
    var unselectedFields = [];
    for (var i = 0; i < fields.length; i++){
      if (headings.indexOf(fields[i]) === -1){
        unselectedFields.push(fields[i]);
      }
    }
    return unselectedFields;
  }),
  user_data: Ember.computed('model.webServiceResponse', function(){
    return this.model.webServiceResponse.source_data.results;
  }),
  actions: {
    editField: function(heading, index, column){
      this.model.submission.get('oaFields')[heading].fields.replace(index, 1, column);
      for (var i = 0; i < 2; i++){
        this.model.submission.exampleRows[i][heading].replace(index, 1, this.model.webServiceResponse.source_data.results[i][column])
      }
    },
    removeFunction: function(field){
      Ember.set(this.model.submission.get('oaFields')[field], "function", null);
      for (var i = 0; i < 2; i++){
        var originalColumn = this.model.submission.get('oaFields')[field].fields[0]
        Ember.set(this.model.submission.get('exampleRows')[i], field, [this.model.webServiceResponse.source_data.results[i][originalColumn]]);
      }
    },
    setPrefixPostfixField: function(heading, column){
      Ember.set(this.model.submission.get('oaFields')[heading], "prefix_or_postfix", column);
      // set up logic to remove postfix or prefix from another column using second dropdown selection
      // use OA function to render sample rows here:
      // for (var i = 0; i < 2; i++){
      //   this.model.submission.exampleRows[i][heading].addObject(this.model.webServiceResponse.source_data.results[i][column]);
      // }
    },
  }
});
