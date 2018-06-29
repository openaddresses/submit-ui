import Ember from 'ember';
import HelpModalValidator from '../validator/help-modal';
import config from '../config/environment';
import AWS from 'npm:aws-sdk';

export default Ember.Component.extend({
  HelpModalValidator,
  dataURL: null,
  dataFile: null,
  key: config.myApiKey,
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
  changeset: null,
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
  checkErrors: function(changeset){
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
    setDataUrl: function(changeset, value){
      if (this.get('dataFile')){
        this.set('dataFile', null);
      }
      this.set('dataURL', value.target.value)
    },
    updateChangeset: function(changeset){
      changeset.set('data_url', this.get('dataURL'))
    },
    uploadFile: function(changeset){
      this.set('dataURL', null);
      var file = document.getElementById('uploadSource').files[0];
      this.set('dataFile', file);
      changeset.set('data_url', 'https://s3.amazonaws.com/submit-ui-data.openaddresses.io/uploads/' + file.name);
      changeset.set('file', file);
    },
    clearUploadFile: function(changeset){
      this.set('dataFile', null);
      changeset.set('data_url', null);
    },
    submitHelp: function(changeset){
      this.set('loading', true);
      this.checkErrors(changeset).then(errorMsgs => {
        if (errorMsgs.length) {
          Ember.set(this, 'showErrorState', true);
          Ember.set(this, 'errorMessages', errorMsgs);
          this.set('loading', false);
        } else {
          const albumBucketName = 'data.openaddresses.io';
          const bucketRegion = 'us-east-1';
          const IdentityPoolId = 'us-east-1:' + this.get('key');
          AWS.config.update({
            region: bucketRegion,
            credentials: new AWS.CognitoIdentityCredentials({
              IdentityPoolId: IdentityPoolId
            })
          });
          const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: { Bucket: albumBucketName }
          });
          var file = changeset.get('file');
          var objKey = 'uploads/' + file.name;
          var params = {
            Key: objKey,
            Bucket: albumBucketName,
            ContentType: file.type,
            Body: file,
            ACL: 'public-read'
          };
          
          var uploadToBucket = new Ember.RSVP.Promise(function(resolve, reject){
            s3.putObject(params, function (err, data) {
              if (err) {
                reject(err);
              } else if (data) {
                resolve();
              }
            });
          });   

          uploadToBucket.then(
            function() {
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
                /*eslint-disable */
                $('.ui.help-modal.modal').modal('hide');
                /*eslint-enable */
                this.routeToSuccessPage();
              }, response => {
                this.set('loading', false);
                this.resetErrorState(response);
              })
            }.bind(this),
            function(err) {
              const errorMsgs = [err];
              Ember.set(this, 'showErrorState', true);
              Ember.set(this, 'errorMessages', errorMsgs);
            }.bind(this)
          )
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
