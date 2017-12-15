import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
  dataURL: null,
  dataFile: null,
  dataSource: true,
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
        this.store.createRecord('submission', {data_url: this.get('dataURL')});
      } else if (this.get('dataFile')){
        this.store.createRecord('submission', {data_file: this.get('dataFile')});
      } else {
        // set up form validation requiring either url or file
        return this.set('dataSource', false);
      }
      this.set('dataSource', true);
      this.transitionToRoute(route);
    }
  }
});
