import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import DataValidator from '../validator/data';

export default Ember.Controller.extend(sharedActions, {
  DataValidator,
  formats: ["Direct upload", "ArcGIS server link", "Download link (.zip, etc.)"],
  showErrorState: false,
  actions: {
    showError: function () {
      Ember.set(this, 'showErrorState', true);
    },
    changeRoute(route, changeset){
      this.model.set('data_type', this.get('selectedFormat'));
      this.model.set('data_link', changeset.get('data_link'));
      this.transitionToRoute(route);
    }
  }
});