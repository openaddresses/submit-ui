import Ember from 'ember';

export default Ember.Component.extend({
  dataURL: null,
  dataFile: null,
  fileName: Ember.computed('dataFile', function(){
    if (this.get('dataFile')){
      return this.get('dataFile').name
    }
  }),
  email: null,
  text: null,
  actions: {
    openModal: function(name) {
      /*eslint-disable */
      $('.ui.' + name + '.modal').modal('show');
      /*eslint-enable */
    },
    submitModal: function(element, component) {
      /*eslint-disable */
      $('.ui.modal').modal('toggle', element, component);

      /* TODO: create issue with collected information */

      this.get('submit')("success");
      /*eslint-enable */
    },
    cancelModal: function(name) {
      $('.ui.' + name + '.modal').modal('hide');
      return true;
    },
    setEmail: function(input) {
      this.set('email', null);
      var email = input.currentTarget.value;
      this.set('email', email);
    },
    setText: function(text) {
      this.est('text', null);
      var text = input.currentTarget.value;
      this.set('text', text);
    },
    uploadFile: function(){
      this.set('dataURL', null);
      var file = document.getElementById('uploadSource').files[0];
      this.set('dataFile', file);
    },
    setURL: function(input){
      this.set('dataFile', null);
      var url = input.currentTarget.value;
      this.set('dataURL', url);
    }
  }
});
