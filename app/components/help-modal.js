import Ember from 'ember';
import HelpModalValidator from '../validator/help-modal'

export default Ember.Component.extend({
  HelpModalValidator,
  dataURL: null,
  dataFile: null,
  fileName: Ember.computed('dataFile', function(){
    if (this.get('dataFile')){
      return this.get('dataFile').name
    }
  }),
  email: null,
  location: null,
  text: null,
  loading: false,
  showErrorState: false,
  errorMessages: [],
  checkFormError: function (changeset, keyName) {
    const val = (this.model.get(keyName))? this.model.get(keyName): '';
    changeset.set(keyName, val);
    return new Promise((resolve, reject) => {
      changeset.validate().then(()=> {
        resolve(changeset.get('errors')
          .filter ((e) => e.key === keyName)
          .reduce((errorMessages, error) => {
            error.validation.map((validationMessage) => {
              errorMessages.push(validationMessage)
            })
            return errorMessages;
          }, []));
      })
    .catch((err) => {reject(err)})
    })
  },
  resetErrorState: function (response) {
    if (response.statusText === "error"){
      Ember.set(this, 'showErrorState', true);
      Ember.set(this, 'errorMessages', [response.responseText]);
    } else {
      Ember.set(this, 'showErrorState', false);
      Ember.set(this, 'errorMessages', []);
    }
  },
  checkEmailError: function(changeset){
    if (changeset.get('contact_email')) {
      this.model.set('contact_email', changeset.get('contact_email'));
      return this.checkFormError(changeset, 'contact_email');
    } else return new Promise((resolve) => resolve(['Provide an e-mail address to proceed']));
  },
  checkLocationError: function(changeset){
    if (changeset.get('help_location')) {
      this.model.set('help_location', changeset.get('help_location'));
      return this.checkFormError(changeset, 'help_location');
    } else return new Promise((resolve) => resolve(['Provide a location to proceed']));
  },
  checkDataSourceError: function(changeset){
    if (changeset.get('data_url')) {
      this.model.set('data_url', changeset.get('data_url'));
      return this.checkFormError(changeset, 'data_url');
    } else return new Promise((resolve) => resolve(['Provide a data source to proceed']));
  },
  checkExplanationError: function(changeset){
    if (changeset.get('help_explanation')) {
      this.model.set('help_explanation', changeset.get('help_explanation'));
      return this.checkFormError(changeset, 'help_explanation');
    } else return new Promise((resolve) => resolve(['Provide an explanation of the problem to proceed']));
  },
  checkErrors: function (changeset) {
    let totalErrorMessages = [];
    return this.checkEmailError(changeset)
      .then((emailErrorMessages) => emailErrorMessages.map((errorMessage) => totalErrorMessages.push(errorMessage)))
      .then(() => this.checkLocationError(changeset))
      .then((locationErrorMessages) => locationErrorMessages.map((errorMessage) => totalErrorMessages.push(errorMessage)))
      .then(() => this.checkDataSourceError(changeset))
      .then((dataSourceErrorMessages) => dataSourceErrorMessages.map((errorMessage) => totalErrorMessages.push(errorMessage)))
      .then(() => this.checkExplanationError(changeset))
      .then((explanationErrorMessages) => {
        explanationErrorMessages.map((errorMessage) => totalErrorMessages.push(errorMessage));
        return totalErrorMessages
      })
  },
  actions: {
    openModal: function(name) {
      /*eslint-disable */
      $('.ui.' + name + '.modal').modal('show');
      /*eslint-enable */
    },
    cancelModal: function(name) {
      /*eslint-disable */
      $('.ui.' + name + '.modal').modal('hide');
      return true;
      /*eslint-enable */
    },
    uploadFile: function(){
      this.set('dataURL', null);
      var file = document.getElementById('uploadSource').files[0];
      this.set('dataFile', file);
    },
    submitHelp: function(changeset){
      this.set('loading', true);
      this.checkErrors(changeset).then( errorMsgs => {
        if (errorMsgs.length) {
          Ember.set(this, 'showErrorState', true);
          Ember.set(this, 'errorMessages', errorMsgs);
        } else {
          var helpFormData = {
            "location": changeset.get('help_location'),
            "emailAddress": changeset.get('contact_email'),
            "dataUrl": changeset.get('data_url'),
            "comments": changeset.get('help_explanation'),
          };
          var request = Ember.$.ajax({
            type: "POST",
            url:'https://68exp8ppy6.execute-api.us-east-1.amazonaws.com/latest/createIssue',
            data: JSON.stringify(helpFormData),
            contentType: 'application/json'
          });
          
          request.then(response => {
            this.set('loading', false);
            this.resetErrorState(response);
            this.model.set('pull_request_url', response.response.url);
            $('.ui.help-modal.modal').modal('hide');
            this.routeToSuccessPage();
          }, response => {
            this.set('loading', false);
            this.resetErrorState(response);
          })
        }
      })
      .catch((err) => {
        const errorMsgs = [err]; // We can replace this error message to something vague
        this.set('loading', false);
        Ember.set(this, 'showErrorState', true);
        Ember.set(this, 'errorMessages', errorMsgs);
      })
    }
  }
});
