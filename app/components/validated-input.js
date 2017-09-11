import Ember from 'ember';
import DataValidator from '../validator/data';

export default Ember.Component.extend({
  actions: {
    validateProperty(changeset, property){
      return changeset.validate(property)
    }
  }
});
