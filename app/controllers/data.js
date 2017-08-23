import Ember from 'ember';
import sharedActions from '../mixins/shared-actions';

export default Ember.Controller.extend(sharedActions, {
	dataFormat: null,
	proceed: false,
	formats: ["Direct upload", "ArcGIS server link", "Download link (.zip, etc.)"],
	selectedFormat: null,

	actions: {
		selectDataFormat: function(dataFormat){
			this.set('dataFormat', dataFormat);
		}
	}
});