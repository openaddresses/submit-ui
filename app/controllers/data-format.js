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
    addColumn: function(heading, column){
      this.model.submission.get('oaFields')[heading].columns[1] = column;
      for (var i = 0; i < 2; i++){
        var joined = this.model.submission.get('exampleRows')[i][heading] + this.model.submission.get('oaFields')[heading].separator + this.model.webServiceResponse.responses[i].properties[column];
        Ember.set(this.model.submission.get('exampleRows')[i], heading, joined);
      }
    },
    addAction: function(field, action){
      Ember.set(this.model.submission.get('oaFields')[field], "action", action);
    },
    removeAction: function(field){
      if (this.model.submission.get('oaFields')[field].action === "join" && this.model.submission.get('oaFields')[field].columns){
        this.model.submission.get('oaFields')[field].columns.pop();
      }
      for (var i = 0; i < 2; i++){
        if (this.model.submission.get('exampleRows')[i][field]){
          Ember.set(this.model.submission.get('exampleRows')[i], field, this.model.webServiceResponse.responses[i].properties[this.model.submission.get('oaFields')[field].columns[0]]);
        }
      }
      Ember.set(this.model.submission.get('oaFields')[field], "action", null);
      Ember.set(this.model.submission.get('oaFields')[field], "extractionFunction", null);
    },
  }
});
