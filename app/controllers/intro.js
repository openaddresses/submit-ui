import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
  actions: {
    changeRoute: function(route){
      // Create new record in store for this submission.
      this.store.createRecord('submission', {});
      this.transitionToRoute(route);
    }
  }
});