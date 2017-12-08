import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import DataURLValidator from '../validator/data'

export default Ember.Controller.extend(sharedActions, {
  DataURLValidator,
  showErrorState: false,
  errorMessages: [],
  dataFile: null,
  fileName: Ember.computed('dataFile', function(){
    if (this.get('dataFile')){
      return this.get('dataFile').name
    }
  }),
  checkDataFile: function () {
    // If there is data file uploaded, that takes priority
    return (this.get('dataFile'));
  },
  checkDataUrlError: function (changeset) {
    if (changeset.get('isValid')) return [];
    else return changeset.get('errors')
                .reduce((errorMessages, error) => {
                  error.validation.map((validationMessage) => {
                    errorMessages.push(validationMessage)
                  })
                  return errorMessages;
                }, []);
  },
  checkErrors: function (changeset) {
    if (this.checkDataFile()) {
      this.model.set('data_file', this.get('dataFile'));
      return [];
    } else if (changeset.get('data_url')) {
      this.model.set('data_url',  changeset.get('data_url'));
      return this.checkDataUrlError(changeset);
    } else return ['You need a file or a url to proceed'];
  },
  resetErrorState: function () {
    Ember.set(this, 'showErrorState', false);
    Ember.set(this, 'errorMessages', []);
  },
  actions: {
    showFormError: function () {
      Ember.set(this, 'showErrorState', true);
    },
    setURL: function(input){
      this.set('dataFile', null);
      var url = input.currentTarget.value;
      this.set('dataURL', url);
    },
    uploadFile: function(){
      this.set('dataURL', null);
      var file = document.getElementById('uploadfile').files[0];
      this.set('dataFile', file);
    },
    changeRoute: function(route, changeset){
      const errorMsgs = this.checkErrors(changeset)
      if (errorMsgs.length) {
        Ember.set(this, 'showErrorState', true);
        Ember.set(this, 'errorMessages', errorMsgs);
      } else {
        this.resetErrorState();
        this.transitionToRoute(route);
      }
    }
  }
});