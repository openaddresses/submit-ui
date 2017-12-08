import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import MaintainerValidator from '../validator/maintainer';

export default Ember.Controller.extend(sharedActions, {
  MaintainerValidator,
  showErrorState: false,
  errorMessages: [],
  checkFormError: function (changeset) {
    if (changeset.get('isValid')) return [];
    else return changeset.get('errors')
                      .reduce((errorMessages, error) => {
                        error.validation.map((validationMessage) => {
                          errorMessages.push(validationMessage)
                        })
                        return errorMessages;
                      }, []);
  },
  resetErrorState: function () {
    Ember.set(this, 'showErrorState', false);
    Ember.set(this, 'errorMessages', []);
  },
  actions: {
    showError: function () {
      Ember.set(this, 'showErrorState', true);
    },
    changeRoute: function(route, changeset){
      const errorMsgs = this.checkFormError(changeset);
      if (errorMsgs.length) {
        Ember.set(this, 'showErrorState', true);
        Ember.set(this, 'errorMessages', errorMsgs);
      } else {
        this.model.set('maintainer_name', changeset.get('maintainer_name'));
        this.model.set('maintainer_email', changeset.get('maintainer_email'));
        this.resetErrorState();
        this.transitionToRoute(route);
      }
    },
    returnToReview: function(changeset){
      this.model.set('maintainer_name', changeset.get('maintainer_name'));
      this.model.set('maintainer_email', changeset.get('maintainer_email'));
      this.transitionToRoute("review");
    }
  }
});