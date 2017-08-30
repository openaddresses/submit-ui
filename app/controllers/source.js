import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';


export default Ember.Controller.extend(sharedActions, {
	source: null,
	frequency: null,
	sourcePresent: null,
	frequencyPresent: null,

	actions: {
		setDataSource: function(source){
			console.log(source)
		},
		setUpdateFrequency: function(frequency){
			console.log(frequency)
		},
		changeRoute: function(route){
			if (this.get('source')){
				this.set('sourcePresent', true)
			} else {
				this.set('sourcePresent', false)
			}
			if (this.get('frequency')){
				this.set('frequencyPresent', true)
			} else {
				this.set('frequencyPresent', false)
			}
			if (this.get('frequencyPresent') == true && this.get('sourcePresent') == true){
				this.transitionToRoute(route);
			}
		}
	}
});