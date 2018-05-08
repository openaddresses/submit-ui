import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var submission = this.get('store').peekAll('submission').get('firstObject');
    var webServiceResponse = this.get('store').peekAll('webServiceResponse').get('firstObject');
    return Ember.RSVP.hash({
      submission: submission,
      webServiceResponse: webServiceResponse
    })
  }
});