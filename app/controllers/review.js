import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import HelpValidator from '../validator/help-modal';



export default Ember.Controller.extend(sharedActions, {
  HelpValidator,
  showErrorState: false,
  errorMessages: [],
  loading: false,
  resetErrorState: function (response) {
    if (response.statusText === "error"){
      Ember.set(this, 'showErrorState', true);
      Ember.set(this, 'errorMessages', [response.responseText]);
    } else {
      Ember.set(this, 'showErrorState', false);
      Ember.set(this, 'errorMessages', []);
    }
  },
  getSubmission: function(){
    var submission = {
      "type": this.get('store').peekAll('webServiceResponse').get('firstObject').get('type'),
      "data": this.model.get('data_url'),
      "website": {},
      "test": this.get('loading') ? true : false,
      "license": {
        "url": this.model.get('license_url') ? this.model.get('license_url') : null,
        "attribution": this.model.get('attribution') ? this.model.get('attribution') : null,
        "attribution name": this.model.get('attribution_text') ? this.model.get('attribution_text') : null,
        "share-alike": this.model.get('share_alike') ? this.model.get('share_alike') : null,
      },
      "contact": {
        "name": this.model.get('maintainer_name'),
        "email": this.model.get('maintainer_email')
      },
      "note": {
        "update frequency": this.model.get('update_frequency')
      },
      "conform": {
        "type": this.get('store').peekAll('webServiceResponse').get('firstObject').get('conform').type,
        "number": {
          "fields": this.model.get('oaFields').number.fields,
          "function": this.model.get('oaFields').number.function
        },
        "street": {
          "function": this.model.get('oaFields').street.function,
          "fields": this.model.get('oaFields').street.fields,
          "may_contain_units": null
        },
        "unit": {
          "function": this.model.get('oaFields').unit.function,
          "fields": this.model.get('oaFields').unit.fields.length > 0 ? this.model.get('oaFields').unit.fields : null
        },
        "city": {
          "function": this.model.get('oaFields').city.function,
          "fields": this.model.get('oaFields').city.fields.length > 0 ? this.model.get('oaFields').city.fields : null
        },
        "district": {
          "function": this.model.get('oaFields').district.function,
          "fields": this.model.get('oaFields').district.fields.length > 0 ? this.model.get('oaFields').district.fields : null
        },
        "region": {
          "function": this.model.get('oaFields').region.function,
          "fields": this.model.get('oaFields').region.fields.length > 0 ? this.model.get('oaFields').region.fields : null
        },
        "postcode": {
          "function": this.model.get('oaFields').postcode.function,
          "fields": this.model.get('oaFields').postcode.fields.length > 0 ? this.model.get('oaFields').postcode.fields : null
        },
        "lon": {
          "function": this.model.get('oaFields').lon.function,
          "fields": this.model.get('oaFields').lon.fields.length > 0 ? this.model.get('oaFields').lon.fields : null
        },
        "lat": {
          "function": this.model.get('oaFields').lat.function,
          "fields": this.model.get('oaFields').lat.fields.length > 0 ? this.model.get('oaFields').lat.fields : null
        }
      }
    }
    return JSON.stringify(submission);
  },
  actions: {
    openModal: function(name) {
      /*eslint-disable */
      $('.ui.' + name + '.modal').modal('show');
      /*eslint-enable */
    },
    approveModal: function(element, component) {
      /*eslint-disable */
      $('.ui.modal').modal('toggle', element, component);
      /*eslint-enable */
      this.get('store').unloadAll('submission');
      this.get('store').unloadAll('web-service-response');
      this.transitionToRoute('intro');
    },
    denyModal: function() {
      return true;
    },
    changeRoute: function(route){
      this.transitionToRoute(route);
    },
    editField: function(route){
      this.transitionToRoute(route);
    },
    submit: function(){
      this.set('loading', true);

      var request = Ember.$.ajax({
        type: "POST",
        url:'https://68exp8ppy6.execute-api.us-east-1.amazonaws.com/latest/submit?source=',
        data: this.getSubmission(),
        contentType: 'application/json'
      });

      request.then(response => {
        this.set('loading', false);
        this.resetErrorState(response);
        this.model.set('pull_request_url', response.response.url);
        this.transitionToRoute("success")
      }, response => {
        this.set('loading', false);
        this.resetErrorState(response);
      })
    }
  }
});
