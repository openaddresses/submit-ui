import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import SourceValidator from '../validator/source';

export default Ember.Controller.extend(sharedActions, {
  SourceValidator,
  showErrorState: false,
  actions: {
    showError: function () {
      Ember.set(this, 'showErrorState', true);
    },
    changeRoute: function(route, changeset){
      this.model.set('source_name', changeset.get('source_name'));
      this.model.set('update_frequency', changeset.get('update_frequency'));
      this.transitionToRoute(route);
    }
  }
});