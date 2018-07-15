import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';
import InfoValidator from '../validator/more-info';

export default Ember.Controller.extend(sharedActions, {
  InfoValidator,
  showErrorState: false,
  errorMessages: [],
  licenseType: 'choose',
  attributionSelected: false,
  licenseSelected: false,
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
  checkLicenseError: function (changeset) {
    // This data has license?
    if (this.model.get('license_exists') === true) {
      switch (this.licenseType) {
      case 'provide':
        return this.checkFormErrors(changeset, 'user_submitted_url');
      case 'choose':
        if (this.model.get('license_url')) return new Promise(resolve => resolve([]))
        else return new Promise (resolve => resolve(['Please choose a license to proceed']));
      default:
        return new Promise (resolve => resolve(['Please choose a license to proceed']));
      }
    } else {
      // User didn't interact with license selection at all
      if (!this.licenseSelected) return new Promise (resolve => resolve(['Mark whether the data has a license to proceed.']));
      // This data doesn't have license
      else return new Promise (resolve => resolve([]));
    }
  },
  checkAttributionError: function (changeset) {
    if (this.model.get('attribution') === true) {
      return this.checkFormErrors(changeset, 'attribution_text')
    } else {
      if (!this.attributionSelected) return new Promise (resolve => resolve(['Mark whether the data requires attribution to proceed.']));
      else return new Promise (resolve => resolve([]));
    }
  },
  checkFrequencyError: function () {
    return new Promise (resolve => {
      if (this.model.get('update_frequency')) resolve([]);
      else resolve(['Choose an option for data update frequency to proceed.']);
    })
  },
  checkErrors: function (changeset) {
    let totalErrorMessages = [];
    return this.checkLicenseError(changeset)
      .then((licenseErrorMessages) => licenseErrorMessages.map((eMessage) => totalErrorMessages.push(eMessage)))
      .then(() => this.checkAttributionError(changeset))
      .then((attributionErrorMessages) => attributionErrorMessages.map((eMessage) => totalErrorMessages.push(eMessage)))
      .then(() => this.checkFrequencyError())
      .then((frequencyErrorMessages) => {
        frequencyErrorMessages.map((eMessage) => totalErrorMessages.push(eMessage));
        return totalErrorMessages;
      })
  },
  resetErrorState: function () {
    Ember.set(this, 'showErrorState', false);
    Ember.set(this, 'errorMessages', []);
  },
  actions: {
    licenseExists: function(input) {
      // Check user interacted with attribution at all
      this.licenseSelected = true;
      this.model.set('license_exists', input)
      this.model.set('license', null);
      this.model.set('license_url', null);
      this.model.set('user_submitted_url', null);
      // Confirm this part
      // this.model.set('attribution', null);
      // this.model.set('attribution_text', null);
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
      this.model.set('license', null)
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
      // Check user interacted with attribution at all
      this.attributionSelected = true;
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
    },
    setRadioButton: function(type) {
      this.model.set('share_alike', null);
      this.set('licenseType', type);
    }
  }
});
