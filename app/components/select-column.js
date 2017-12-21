import Ember from 'ember';

export default Ember.Component.extend({
  field: null,
  user_data: Ember.computed('model.webServiceResponse', function(){
    return this.model.webServiceResponse.source_data.results;
  }),
  actions: {
    sendChooseField: function(heading, column){
      this.sendAction('sendChooseField', heading, column);
    },
    removeField: function(heading){
      var column = this.model.submission.get('oaFields')[heading].fields[0];
      this.model.submission.get('oaFields')[heading].fields.removeObject(column);
      for (var i = 0; i < 2; i++){
        this.model.submission.get('exampleRows')[i][heading].removeObject(this.model.webServiceResponse.source_data.results[i][column]);
      }
    },
  }
});