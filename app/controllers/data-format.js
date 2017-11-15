import Ember from 'ember';

export default Ember.Controller.extend({
  columns: null,
  columnHeadings: Ember.computed('model.webServiceResponse', function(){
    return Object.keys(this.model.webServiceResponse.responses[0].properties);
  }),
  showAdditionalJoinOption: false,
  showAdditionalJoinButton: false,
  actions: {
    chooseColumn: function(heading, column){
      Ember.set(this.model.submission.get('oaFields')[heading], "columns", []);
      this.model.submission.get('oaFields')[heading].columns[0] = {column:column, index:0};
      for (var i = 0; i < 2; i++){
        Ember.set(this.model.submission.get('exampleRows')[i], heading, [this.model.webServiceResponse.responses[i].properties[column]]);
      }
      this.set('showAdditionalJoinOption', true);
    },
    addColumn: function(heading, index, column){
      this.set('showAdditionalJoinOption', false);
      index += 1;
      if (this.model.submission.get('oaFields')[heading].columns[index]){
        Ember.set(this.model.submission.get('oaFields')[heading].columns[index], "column", column);
        for (var i = 0; i < 2; i++){
         this.model.submission.exampleRows[i][heading].replace(index, 1, this.model.webServiceResponse.responses[i].properties[column])
        }
      } else {
        this.model.submission.get('oaFields')[heading].columns.addObject({column:column, index: index})
        for (var i = 0; i < 2; i++){
          this.model.submission.exampleRows[i][heading].addObject(this.model.webServiceResponse.responses[i].properties[column]);
        }
      }
      this.set('showAdditionalJoinButton', true)
    },
    addJoin: function(){
      this.set('showAdditionalJoinOption', true);
      this.set('showAdditionalJoinButton', false);
    },
    addAction: function(field, action){
      Ember.set(this.model.submission.get('oaFields')[field], "action", action);
    },
    removeAction: function(field){
      if (this.model.submission.get('oaFields')[field].action === "join" && this.model.submission.get('oaFields')[field].columns.length > 1){
        this.model.submission.get('oaFields')[field].columns = [this.model.submission.get('oaFields')[field].columns[0]];
        this.set('showAdditionalJoinButton', false);
        for (var i = 0; i < 2; i++){
          if (this.model.submission.get('exampleRows')[i][field]){
            var originalColumn = this.model.submission.get('oaFields')[field].columns[0].column
            Ember.set(this.model.submission.get('exampleRows')[i], field, [this.model.webServiceResponse.responses[i].properties[originalColumn]]);
          }
        }
      }
      Ember.set(this.model.submission.get('oaFields')[field], "action", null);
      Ember.set(this.model.submission.get('oaFields')[field], "extractionFunction", null);
      this.set('showAdditionalJoinOption', false);
    },
  }
});
