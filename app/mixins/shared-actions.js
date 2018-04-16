import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    changeRoute: function(route){
      this.transitionToRoute(route);
    },
    previousRoute: function(route){
      if (route === "intro"){
        this.get('store').unloadAll('submission');
        this.transitionToRoute('intro');
      }
      
      this.transitionToRoute(route);
    },
    routeToSuccessPage: function() {
      this.transitionToRoute("success");
    }
  }
});
