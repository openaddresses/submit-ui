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
  checkDataUrlError: async function (changeset) {
    return new Promise((resolve, reject) =>
      changeset.validate().then(()=> {
        if (changeset.get('isValid')) resolve([]);
        else resolve(changeset.get('errors')
                    .reduce((errorMessages, error) => {
                      error.validation.map((validationMessage) => {
                        errorMessages.push(validationMessage)
                      })
                      return errorMessages;
                    }, []));
      })
      .catch((err) => {reject(err)})
    )
  },
  checkErrors: async function (changeset) {
    // When there is data file, it takes priority
    if (this.checkDataFile()) {
      this.model.set('data_file', this.get('dataFile'));
      return new Promise((resolve) => resolve([]));
    // If there is no data file but url, validate it
    } else if (changeset.get('data_url')) {
      this.model.set('data_url',  changeset.get('data_url'));
      return this.checkDataUrlError(changeset);
    // If there is nothing, throw an error
    } else return new Promise((resolve) => resolve(['You need a file or a url to proceed']));
  },
  resetErrorState: function () {
    Ember.set(this, 'showErrorState', false);
    Ember.set(this, 'errorMessages', []);
  },
  actions: {
    uploadFile: function(){
      this.set('dataURL', null);
      var file = document.getElementById('uploadfile').files[0];
      this.set('dataFile', file);
    },
    changeRoute: function(route){
      // Create new record in store for this submission, with data link or data file.
      if (this.get('dataURL')){
        this.store.createRecord('submission', {
          data_url: this.get('dataURL'),
          share_alike: false,
          oaFields:{
            lon:{
              fields: [],
              function: null,
              separator: " "
            },
            lat:{
              fields: [],
              function: null,
              separator: " ",
            },
            number:{
              fields: [],
              function: null,
              separator: " "
            },
            street:{
              fields: [],
              function: null,
              separator: " ",
              may_contain_units: false
            },
            unit:{
              fields: [],
              function: null,
              separator: " "
            },
            city:{
              fields: [],
              function: null,
              separator: " "
            },
            district:{
              fields: [],
              function: null,
              separator: " "
            },
            region:{
              fields: [],
              function: null,
              separator: " "
            },
            postcode:{
              fields: [],
              function: null,
              separator: " "
            }
          },
          exampleRows:[{
            lon: null,
            lat: null,
            number: null,
            street: null,
            unit: null,
            city: null,
            district: null,
            region: null,
            postcode: null
          },
          {
            lon: null,
            lat: null,
            number: null,
            street: null,
            unit: null,
            city: null,
            district: null,
            region: null,
            postcode: null
          }],
        });
      } else if (this.get('dataFile')){
        this.store.createRecord('submission', {data_file: this.get('dataFile')});
      } else {
        // set up form validation requiring either url or file
      }
      this.transitionToRoute(route);
    },
    changeRoute: function(route, changeset){
      this.checkErrors(changeset)
        .then((errorMsgs) => {
          // When there is any error, show it and do not proceed
          if (errorMsgs.length) {
            Ember.set(this, 'showErrorState', true);
            Ember.set(this, 'errorMessages', errorMsgs);
          // When there is no error message, proceed
          } else {
            this.resetErrorState();
            this.transitionToRoute(route);
          }
        })
      .catch ((err) => {
        const errorMsgs = [err];
        Ember.set(this, 'showErrorState', true);
        Ember.set(this, 'errorMessages', errorMsgs);
      })
    }
  }
});