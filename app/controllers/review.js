import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
  showErrorState: false,
  errorMessages: [],
  loading: false,
  resetErrorState: function (response) {
    if (response.statusText === "error"){
      Ember.set(this, 'showErrorState', true);
      Ember.set(this, 'errorMessages', [response.responseJSON.error.message]);
    } else {
      Ember.set(this, 'showErrorState', false);
      Ember.set(this, 'errorMessages', []);
    }
  },
  getSubmission: function(){
    var submission = {
      "type": this.get('store').peekAll('webServiceResponse').get('firstObject').get('type'),
      "data": this.model.get('data_url') ? this.model.get('data_url') : this.get('store').peekAll('webServiceResponse').get('firstObject').get('data_url'),
      "note": {
        "update frequency": this.model.get('update_frequency')
      },
      "license": {
        "url": this.model.get('license_url') ? this.model.get('license_url') : null,
        "share-alike": this.model.get('share_alike') ? this.model.get('share_alike') : null,
        "attribution": this.model.get('attribution') ? true : false,
      },
      "contact": {
        "name": this.model.get('maintainer_name'),
        "email": this.model.get('maintainer_email')
      },
      
      "conform": {
        "type": this.get('store').peekAll('webServiceResponse').get('firstObject').get('conform').type,
        
      }
    };

    // lat and lon is only needed for csv, and it is a required field
    if (submission.conform.type === "csv"){
      submission.conform.lon = this.model.get('oaFields').lon.fields[0];
      submission.conform.lat = this.model.get('oaFields').lat.fields[0];
    }

    // add attribution_text information to submission
    // since we allow three answers (yes, no, I don't know), if they select “i don’t know”, 
    // we populate those two fields with attribution = true and attribution_text = “unknown”,
    if (submission.license.attribution === true) {
      if (this.model.get('attribution') === true){
        submission.license.attribution_text = this.model.get('attribution_text');
      } else if (this.model.get('attribution')  === 'unknown'){
        submission.license.attribution_text = 'unknown';
      }
    } 

    // add number information to submission
    // the functions available for number are: join, prefixed_number, remove_prefix, remove_postfix
    if (this.model.get('oaFields').number.function){
      submission.conform.number = {
        "function": this.model.get('oaFields').number.function,
      };
      if (this.model.get('oaFields').number.function === "join" || this.model.get('oaFields').number.function === "format"){
        submission.conform.number.fields = this.model.get('oaFields').number.fields;
      } else {
        submission.conform.number.field = this.model.get('oaFields').number.fields[0];
      }
      if (this.model.get('oaFields').number.prefix_or_postfix){
        submission.conform.number.field_to_remove = this.model.get('oaFields').number.prefix_or_postfix;
      }
    } else if (this.model.get('oaFields').number.function === null && this.model.get('oaFields').number.fields.length > 0){
      submission.conform.number = this.model.get('oaFields').number.fields[0];
    }

    // the functions available for street are: join, postfixed_street, remove_prefix, remove_postfix
    // may_contain_units is optional for street only
    if (this.model.get('oaFields').street.function){
      
      submission.conform.street = {
        "function": this.model.get('oaFields').street.function,
      };

      if (this.model.get('oaFields').street.function === "join" || this.model.get('oaFields').street.function === "format"){
        submission.conform.street.fields = this.model.get('oaFields').street.fields;
      } else {
        submission.conform.street.field = this.model.get('oaFields').street.fields[0];
      }
      if (this.model.get('oaFields').street.prefix_or_postfix){
        submission.conform.street.field_to_remove = this.model.get('oaFields').street.prefix_or_postfix;
      }
      if (this.model.get('oaFields').street.may_contain_units){
        submission.conform.street.may_contain_units = this.model.get('oaFields').street.may_contain_units;
      }
    } else if (this.model.get('oaFields').street.function === null && this.model.get('oaFields').street.fields.length > 0){
      submission.conform.street = this.model.get('oaFields').street.fields[0];
    }

    // add unit information to submission
    // the functions available for unit are: join, postfixed_unit, remove_prefix, remove_postfix
    if (this.model.get('oaFields').unit.function){
      submission.conform.unit = {
        "function": this.model.get('oaFields').unit.function,
      };
      if (this.model.get('oaFields').unit.function === "join" || this.model.get('oaFields').unit.function === "format"){
        submission.conform.unit.fields = this.model.get('oaFields').unit.fields;
      } else {
        submission.conform.unit.field = this.model.get('oaFields').unit.fields[0];
      }
      if (this.model.get('oaFields').unit.prefix_or_postfix){
        submission.conform.unit.field_to_remove = this.model.get('oaFields').unit.prefix_or_postfix;
      }
    } else if (this.model.get('oaFields').unit.function === null && this.model.get('oaFields').unit.fields.length > 0){
      submission.conform.unit = this.model.get('oaFields').unit.fields[0];
    }

    // add city information to submission
    // the only function available for city is join
    if (this.model.get('oaFields').city.function){
      submission.conform.city = {
        "function": this.model.get('oaFields').city.function,
        "fields": this.model.get('oaFields').city.fields
      };
    } else if (this.model.get('oaFields').city.function === null && this.model.get('oaFields').city.fields.length > 0){
      submission.conform.city = this.model.get('oaFields').city.fields[0];
    }

    // add district information to submission
    // the only function available for distict is join
    if (this.model.get('oaFields').district.function){
      submission.conform.district = {
        "function": this.model.get('oaFields').district.function,
        "fields": this.model.get('oaFields').district.fields
      };
    } else if (this.model.get('oaFields').district.function === null && this.model.get('oaFields').district.fields.length > 0){
      submission.conform.district = this.model.get('oaFields').district.fields[0];
    }

    // add region information to submission
    // the only function available for region is join
    if (this.model.get('oaFields').region.function){
      submission.conform.region = {
        "function": this.model.get('oaFields').region.function,
        "fields": this.model.get('oaFields').region.fields
      };
    } else if (this.model.get('oaFields').region.function === null && this.model.get('oaFields').region.fields.length > 0){
      submission.conform.region = this.model.get('oaFields').region.fields[0];
    }

    // add postcode information to submission
    // the only function available for postcode is join
    if (this.model.get('oaFields').postcode.function){
      submission.conform.postcode = {
        "function": this.model.get('oaFields').postcode.function,
        "fields": this.model.get('oaFields').postcode.fields
      };
    } else if (this.model.get('oaFields').postcode.function === null && this.model.get('oaFields').postcode.fields.length > 0){
      submission.conform.postcode = this.model.get('oaFields').postcode.fields[0];
    }

    // debugger;
   
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
        this.transitionToRoute("success");
      }, response => {
        this.set('loading', false);
        this.resetErrorState(response);
      });
    }
  }
});
