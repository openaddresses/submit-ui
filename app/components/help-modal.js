import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    openModal: function(name) {
      /*eslint-disable */
      $('.ui.' + name + '.modal').modal('show');
      /*eslint-enable */
    },
    submitModal: function(element, component) {
      /*eslint-disable */
      $('.ui.modal').modal('toggle', element, component);
      this.get('submit')("success");
      /*eslint-enable */
    },
    cancelModal: function() {
      return true;
    }
  }
});
