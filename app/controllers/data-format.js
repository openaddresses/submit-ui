import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    requestWebServceData: function() {
        // if (Ember.isBlank(term)) { return []; }
        var url = 'api/responses';
        // view request format in mirage/config.js 
        return Ember.$.ajax({ url }).then(json => json.data);
      }
    }
});
