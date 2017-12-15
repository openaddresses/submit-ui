import Ember from 'ember';

import LicenseValidator from '../validator/license'

export default Ember.Controller.extend({
  LicenseValidator,
  showErrorState: false,
  errorMessages: [],
  license: '',
  licenses: [{
    name: "Open Data Commons Attribution License (ODC-By)",
    url: "http://opendatacommons.org/licenses/by/1.0/"
  },{
    name: "Open Data Commons Open Database License (ODbL)",
    url: "http://opendatacommons.org/licenses/odbl/1.0/"
  },{
    name: "Creative Commons Attribution (CC BY)",
    url: "https://creativecommons.org/licenses/by/4.0/"
  },{
    name: "Creative Commons Attribution-ShareAlike (CC BY-SA)",
    url: "https://creativecommons.org/licenses/by-sa/4.0/"
  },{
    name: "GNU Free Documentation License",
    url: "http://www.gnu.org/licenses/fdl-1.3.en.html"
  }],
  frequencies: ["daily", "weekly", "monthly", "quarterly", "annually", "Unknown"],
  checkFormErrors: function (changeset, keyName) {
    const val = (this.model.get(keyName))? this.model.get(keyName): '';
    changeset.set(keyName, val);
    return new Promise((resolve, reject) => {
      changeset.validate().then(()=> {
          console.log(changeset.get('errors'));
          resolve(changeset.get('errors')
                          .filter ((e) => e.key === keyName)
                          .reduce((errorMessages, error) => {
                            console.log(errorMessages);
                            error.validation.map((validationMessage) => {
                              errorMessages.push(validationMessage)
                            })
                            return errorMessages;
                          }, []));
        })
      .catch((err) => {reject(err)})
    })
  },
  checkErrors: function (changeset) {
    // return this.checkFormErrors(changeset, 'attribution_text');
    if (this.model.get('license') === 'provide' && !this.model.get('attribution')) return this.checkFormErrors(changeset, 'user_submitted_url');
    if (this.model.get('license') !== 'provide' && this.model.get('attribution')) return this.checkFormErrors(changeset, 'attribution_text');
    if (this.model.get('license') === 'provide' && this.model.get('attribution')) {
        let msgs = [];
        return this.checkFormErrors(changeset, 'user_submitted_url')
        .then((errorMessages) => {
          errorMessages.map((error) => msgs.push(error))
        })
        .then(() => this.checkFormErrors(changeset, 'attribution_text'))
        .then((errorMessages) => {
          console.log(errorMessages);
          errorMessages.map((error) => msgs.push(error))
          return msgs;
        })
      }

    if (this.model.get('license') !== 'provide' && !this.model.get('attribution')) return new Promise(resolve => resolve([]))
  },
  resetErrorState: function () {
    Ember.set(this, 'showErrorState', false);
    Ember.set(this, 'errorMessages', []);
  },
  actions: {
    licenseExists: function(input){
      this.model.set('license_exists', input)
      this.model.set('license', null);
      this.model.set('license_url', null);
      this.model.set('user_submitted_url', null);
      this.model.set('attribution', null);
      this.model.set('attribution_text', null);
    },
    selectLicense: function(license){
      this.model.set('license', null)
      this.model.set('user_submitted_url', null)
      this.model.set('license', license.name)
      this.model.set('license_url', license.url)
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
    },
    userSubmittedLicense: function(input){
      // this.model.set('license', 'provide')
      this.model.set('license_url', null)
      this.model.set('user_submitted_url', input.target.value)
    },
    setShareAlike: function(input){
      if (input === true){
        this.model.set('share_alike', true);
      } else {
        this.model.set('share_alike', null);
      }
    },
    setAttribution: function(input){
      this.model.set('attribution', input);
      if (input === false || input === "unknown"){
        this.model.set('attribution_text', null);
      }
    },
    setAttributionText: function(text){
      this.model.set('attribution_text', text.target.value);
    },
    setFrequency: function(frequency){
      this.model.set('update_frequency', frequency);
    }
  }
});