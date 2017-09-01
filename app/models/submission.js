import DS from 'ember-data';

export default DS.Model.extend({
	// id
	source_region: DS.attr('string'),
	data_type: DS.attr('string'),
	source_name: DS.attr('string'),
	update_frequency: DS.attr(),
	edit_mode: false,
	license: DS.attr(),
	maintainer_name: DS.attr('string'),
	maintainer_email: DS.attr('string'),
	// columns to map


});
