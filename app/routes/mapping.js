import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    // createRecord for development only, delete before merging
    this.store.createRecord('submission');
    return this.get('store').peekAll('submission').get('firstObject');
  }

});
