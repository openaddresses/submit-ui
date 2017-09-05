import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
	name: null,
	email: null,
	emailMissing: false,
	emailError: Ember.computed('emailMissing', 'email', function(){
		if (this.get('emailMissing') === true && this.get('email') === null){
			return true;
		} else {
			return false;
		}
	}),

	actions: {
		changeRoute: function(route){
			if (this.get('email')) {
				this.store.peekAll('submission').get('firstObject').set('maintainer_email', this.get('email'));
				if (this.get('name')){
					this.store.peekAll('submission').get('firstObject').set('maintainer_name', this.get('name'));
				}
				this.transitionToRoute(route);
			} else {
				(this.set('emailMissing', true));
			}
		}
	}

});