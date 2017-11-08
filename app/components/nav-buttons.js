import Ember from 'ember';

export default Ember.Component.extend({
  next: null,
  back: null,
  forwardButtonText: "Next",
  backwardsButtonText: "Back",
  actions: {
    sendChangeRoute: function(route, changeset){
      // If this is navigation with changeset, check the changes are valid
      // Only proceed when changes are valid
      if(changeset) {
        changeset.validate().then(()=> {
          if(changeset.get('isValid')) {
            for (const keyName in this.attrs.changeset._changes) {
              changeset.set(keyName, this.attrs.changeset._changes[keyName]);
            }
            this.sendAction('sendChangeRoute', route, changeset);
          } else {
            this.sendAction('showError');
          }
        })
      } else {
        this.sendAction('sendChangeRoute', route);
      }
    }
  }
});