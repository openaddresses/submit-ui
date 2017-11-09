import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    // for development, remove before merging
    this.store.createRecord('submission');
    // 
    return this.get('store').peekAll('submission').get('firstObject');
  }
});
