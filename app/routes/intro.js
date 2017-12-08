import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
     var submission = this.store.createRecord('submission', {data_url: ''});
    return submission;
  }
});
