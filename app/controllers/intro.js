import config from '../config/environment';
import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';
import AWS from 'npm:aws-sdk';
import DataURLValidator from '../validator/data';

export default Ember.Controller.extend(sharedActions, {
  DataURLValidator,
  key: config.myApiKey,
  showErrorState: false,
  errorMessages: [],
  dataFile: null,
  loading: false,
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
    } else return new Promise((resolve) => {
      this.set('loading', false);
      resolve(['Provide a file or a url to proceed'])
    });
  },
  resetErrorState: function (response) {
    if (response[0] === "error"){
      Ember.set(this, 'showErrorState', true);
      Ember.set(this, 'errorMessages', [response[1]]);
    } else {
      Ember.set(this, 'showErrorState', false);
      Ember.set(this, 'errorMessages', []);
    }
  },
  actions: {
    uploadFile: function(changeset){
      changeset.set('data_url', null)
      this.set('dataURL', null);
      var file = document.getElementById('uploadfile').files[0];
      this.set('dataFile', file);
    },
    clearUploadFile: function(){
      this.set('dataFile', null);
    },
    changeRoute: function(route, changeset){
      this.set('loading', true);

      if (this.get('dataFile')){
        const albumBucketName = 'submit-ui-data.openaddresses.io';
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
        var file = this.get('dataFile');
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
              reject(error);
            } else {
              resolve();
            }
          });
        });   

        uploadToBucket.then(
          function(res) {
            var data_url = 'https://s3.amazonaws.com/submit-ui-data.openaddresses.io/uploads/' + file.name;
            var url = 'https://68exp8ppy6.execute-api.us-east-1.amazonaws.com/latest/sample?source=' + data_url;
            var request = Ember.$.ajax({ url });

            request.then(response => {
              return this.get('store').createRecord('webServiceResponse', {
                data_url: response.data,
                type: response.type,
                source_data: response.source_data,
                conform: {type:response.conform.type}
              })
            }, response => {
              return [response.statusText, response.responseJSON.error.message]
            }).then(response  => {
              this.set('loading', false);
              this.resetErrorState(response);
              if (response[0] !== "error"){
                this.transitionToRoute(route)
              }
            })
          }.bind(this),
          function(err) {
            const errorMsgs = [err];
            Ember.set(this, 'showErrorState', true);
            Ember.set(this, 'errorMessages', errorMsgs);
          }.bind(this)
        );
      } else if (changeset.get('data_url')){
        this.checkErrors(changeset).then((errorMsgs) => {
          // When there is any error, show it and do not proceed
          if (errorMsgs.length) {
            Ember.set(this, 'showErrorState', true);
            Ember.set(this, 'errorMessages', errorMsgs);
          // When there is no error message, proceed
          } else {
            var url = 'https://68exp8ppy6.execute-api.us-east-1.amazonaws.com/latest/sample?source=' + changeset.get('data_url');
            var request = Ember.$.ajax({ url });

            request.then(response => {
              return this.get('store').createRecord('webServiceResponse', {
                data_url: response.data,
                type: response.type,
                source_data: response.source_data,
                conform: {type:response.conform.type}
              })
            }, response => {
              return [response.statusText, response.responseJSON.error.message]
            }).then(response  => {
              this.set('loading', false);
              this.resetErrorState(response);
              if (response[0] !== "error"){
                this.transitionToRoute(route)
              }
            })
          }
        })
        .catch ((err) => {
          const errorMsgs = [err];
          Ember.set(this, 'showErrorState', true);
          Ember.set(this, 'errorMessages', errorMsgs);
        })
      }
    }
  }
});
