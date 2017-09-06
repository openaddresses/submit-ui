import Ember from 'ember';

export default Ember.Route.extend({
	// this.store.peekAll('submission').get('firstObject').set('license', this.get('selectedLicense'));
	
	model: function(){
		return this.get('store').peekAll('submission').get('firstObject');
	}
});
