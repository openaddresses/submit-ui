import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import MaintainerValidator from '../validator/maintainer';

export default Ember.Controller.extend(sharedActions, {
	MaintainerValidator,
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
		changeRoute: function(route, changeset){
			this.model.set('maintainer_email', changeset.get('maintainer_email'));
			this.model.set('maintainer_name', changeset.get('maintainer_name'));
			this.transitionToRoute(route);
		}
	}

});