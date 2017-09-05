import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {

	actions: {
		changeRoute: function(route){
			// debugger;		
			this.transitionToRoute(route);
		}
	}
});