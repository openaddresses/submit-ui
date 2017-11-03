import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
  actions: {
    openModal: function(name) {
      $('.ui.' + name + '.modal').modal('show');
    },
    approveModal: function(element, component) {
      this.get('store').unloadAll('submission');
      this.transitionToRoute("intro");
      return true;
    },
    denyModal: function(element, component) {
      return true;
    },
    changeRoute: function(route){
      this.transitionToRoute(route);
    },
    editField: function(route){
      this.transitionToRoute(route);
    },
    submit: function(){
      // communicate with backend here
      this.transitionToRoute("success");
    }
  }
});
