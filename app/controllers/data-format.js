import Ember from 'ember';

export default Ember.Controller.extend({
  columns: null,
  columnHeadings: Ember.computed('model.webServiceResponse', function(){
    return Object.keys(this.model.webServiceResponse.responses[0].properties);
  }),
  actions: {
    chooseColumn: function(heading, column){
      Ember.set(this.model.submission.get('oaFields')[heading], "columns", []);
      this.model.submission.get('oaFields')[heading].columns[0] = column;
      for (var i = 0; i < 2; i++){
        Ember.set(this.model.submission.get('exampleRows')[i], heading, this.model.webServiceResponse.responses[i].properties[column]);
      }
    },
  }
});
