import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

import MaintainerValidator from '../validator/maintainer';

export default Ember.Controller.extend(sharedActions, {
	MaintainerValidator,
	showErrorState: false,
	actions: {
		showError: function () {
			Ember.set(this, 'showErrorState', true);
		},
		changeRoute: function(route, changeset){
			this.model.set('maintainer_name', changeset.get('maintainer_name'));
			this.model.set('maintainer_email', changeset.get('maintainer_email'));
			this.transitionToRoute(route);
		},
		returnToReview: function(){
			this.model.set('maintainer_name', changeset.get('maintainer_name'));
			this.model.set('maintainer_email', changeset.get('maintainer_email'));
			this.transitionToRoute("review");
		}
	}
});