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
  checkFormError: function (changeset) {
    return new Promise((resolve, reject) =>
      changeset.validate().then(()=> {
        // NOTE: it is resolving here even with invalid email format
        // NOTE: changeset.get('errors') === []
        if (changeset.get('isValid')) resolve([]);
        else resolve(changeset.get('errors')
          .reduce((errorMessages, error) => {
            error.validation.map((validationMessage) => {
              errorMessages.push(validationMessage)
            })
            return errorMessages;
          }, []));
      })
      .catch((err) => {
        reject(err)
      })
    )
  },
  resetErrorState: function (response) {
    console.log("resetErrorState")
    if (response.statusText === "error"){
      Ember.set(this, 'showErrorState', true);
      Ember.set(this, 'errorMessages', [response.responseText]);
    } else {
      Ember.set(this, 'showErrorState', false);
      Ember.set(this, 'errorMessages', []);
    }
  },
  checkErrors: function (changeset) {
    if (changeset.get('contact_email')) {
      // this.model.set('maintainer_name', changeset.get('maintainer_name'));
      return this.checkFormError(changeset);
    } else return new Promise((resolve) => resolve(['Provide an e-mail address to proceed']));
  },
  actions: {
    openModal: function(name) {
      /*eslint-disable */
      $('.ui.' + name + '.modal').modal('show');
      /*eslint-enable */
    },

    // submitModal: function(element, component) {
    //   this.set('loading', true);
    //   var helpFormData = {
    //       "location": this.get('location'),
    //       "emailAddress": this.get('email'),
    //       "dataUrl": this.get('dataURL'),
    //       "comments": this.get('text'),
    //     }

    //   var request = Ember.$.ajax({
    //     type: "POST",
    //     url:'https://68exp8ppy6.execute-api.us-east-1.amazonaws.com/latest/createIssue',
    //     data: JSON.stringify(helpFormData),
    //     contentType: 'application/json'
    //   });

    //   if (this.get('location') && this.get('email') && this.get('dataURL') && this.get('text')) {
    //     request.then(response => {
    //       this.set('loading', false);
    //       this.resetErrorState(response);
    //       this.model.set('pull_request_url', response.response.url);
    //       $('.ui.modal').modal('toggle', element, component);
    //       this.routeToSuccessPage();
    //     }, response => {
    //       this.set('loading', false);
    //       this.resetErrorState(response);
    //     })
    //   } else {
    //     var response = {
    //       statusText: "error",
    //       responseText: "missing field"
    //     }
    //     this.set('loading', false);
    //     this.resetErrorState(response)
    //   }

    // },
    submitHelp: function(changeset){
      this.checkErrors(changeset).then((errorMsgs) => {
        // NOTE: errorMsgs.length === 0
        console.log(errorMsgs.length)
        if (errorMsgs.length) {
          Ember.set(this, 'showErrorState', true);
          Ember.set(this, 'errorMessages', errorMsgs);
        } else {
          this.resetErrorState(errorMsgs);
          // this.transitionToRoute(route);
        }

      })
      .catch((err) => {
        const errorMsgs = [err]; // We can replace this error message to something vague
        Ember.set(this, 'showErrorState', true);
        Ember.set(this, 'errorMessages', errorMsgs);
      })
    },
    cancelModal: function(name) {
      /*eslint-disable */
      $('.ui.' + name + '.modal').modal('hide');
      return true;
      /*eslint-enable */
    },
    setEmail: function(input) {
      this.set('email', null);
      var email = input.currentTarget.value;
      this.set('email', email);
    },
    setLocation: function(input) {
      this.set('location', null);
      var location = input.currentTarget.value;
      this.set('location', location);
    },
    setText: function(input) {
      this.set('text', null);
      var text = input.currentTarget.value;
      this.set('text', text);
    },
    uploadFile: function(){
      this.set('dataURL', null);
      var file = document.getElementById('uploadSource').files[0];
      this.set('dataFile', file);
    },
    setURL: function(input){
      this.set('dataFile', null);
      var url = input.currentTarget.value;
      this.set('dataURL', url);
    }
  }
});
