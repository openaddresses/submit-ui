import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
  showErrorState: false,
  errorMessages: [],
  loading: false,
  actions: {
    openModal: function(name) {
      /*eslint-disable */
      $('.ui.' + name + '.modal').modal('show');
      /*eslint-enable */
    },
    approveModal: function(element, component) {
      /*eslint-disable */
      $('.ui.modal').modal('toggle', element, component);
      /*eslint-enable */
      this.get('store').unloadAll('submission');
      this.transitionToRoute('intro');
    },
    denyModal: function() {
      return true;
    },
    changeRoute: function(route){
      this.transitionToRoute(route);
    },
    editField: function(route){
      this.transitionToRoute(route);
    },
    resetErrorState: function (response) {
      if (response[0] === "error"){
        Ember.set(this, 'showErrorState', true);
        Ember.set(this, 'errorMessages', [response[1]]);
      } else {
        Ember.set(this, 'showErrorState', false);
        Ember.set(this, 'errorMessages', []);
      }
    },
    submit: function(){
      // communicate with backend here
      this.set('loading', true);

      // var url = 'https://68exp8ppy6.execute-api.us-east-1.amazonaws.com/latest/sample?submit';
      
      // var request = Ember.$.ajax({ url });


    //   request.then(response => {
    //     debugger;
    //     return this.get('store').peekAll('webServiceResponse').get('firstObject'), {
          
    //     })
    //   }, response => {
    //     return [response.statusText, response.responseText]
    //   }).then(response  => {
    //     this.set('loading', false);
    //     this.resetErrorState(response);
    //     if (response[0] !== "error"){
    //       this.transitionToRoute("success")
    //     }
    //   })
    }
  }
});
