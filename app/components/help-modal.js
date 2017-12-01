import Ember from 'ember';

export default Ember.Component.extend({
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
    },
    denyModal: function() {
      return true;
    }
  }
});
