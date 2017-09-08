import Ember from 'ember';

export default Ember.Component.extend({
	next: null,
	back: null,
	actions: {
		sendChangeRoute: function(route, changeset){
			if(changeset) {
        changeset.validate().then(()=>{
          if(changeset.get('isValid')) {
            for (const keyName in this.attrs.changeset._changes) {
              changeset.set(keyName, this.attrs.changeset._changes[keyName]);
            }
            this.sendAction('sendChangeRoute', route);
          } else {
            //do something
            console.log('Hi! You cannot proceed with form errors');
          }
        })
      } else {
        this.sendAction('sendChangeRoute', route);
      }
		}
	}
});