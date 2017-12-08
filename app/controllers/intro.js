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
      // If there is data file uploaded, that takes priority
      if (this.get('dataFile')){
        this.model.set('data_file', changeset.get('data_file'))
        this.transitionToRoute(route);
      // If there is no data file, but url validate it
      } else if (changeset.get('data_url')){
        changeset.validate().then(()=> {
          if(changeset.get('isValid')) {
            this.model.set('data_url',  changeset.get('data_url'));
            Ember.set(this, 'errorMessage', )
            this.transitionToRoute(route);
          } else {
            const errors = changeset.get('errors')
                        .reduce((errorMessages, error) => {
                          error.validation.map((validationMessage) => {
                            errorMessages.push(validationMessage)
                          })
                          return errorMessages;
                          }, []);
            Ember.set(this, 'showErrorState', true);
            Ember.set(this, 'errorMessages', errors);
          }
        })
      // if there are neither of url, file, throw Error
      } else {
        var errors = ['You need to put a url or a file to proceed.'];
        Ember.set(this, 'showErrorState', true);
        Ember.set(this, 'errorMessages', errors);
      }
    }
  }
});