import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removeFunction: function(field){
      Ember.set(this.model.submission.get('oaFields')[field], "function", null);
      for (var i = 0; i < 2; i++){
        var originalColumn = this.model.submission.get('oaFields')[field].fields[0]
        Ember.set(this.model.submission.get('exampleRows')[i], field, [this.model.webServiceResponse.source_data.results[i][originalColumn]]);
      }
    }
  }
});
