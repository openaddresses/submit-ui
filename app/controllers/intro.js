import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
  dataURL: null,
  dataFile: null,
  fileName: Ember.computed('dataFile', function(){
    if (this.get('dataFile')){
      return this.get('dataFile').name
    }
  }),
  actions: {
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
    }
  }
});