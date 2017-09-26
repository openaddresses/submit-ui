import DS from 'ember-data';

export default DS.Model.extend({
  source_region: DS.attr('string'),
  data_type: DS.attr('string'),
  data_link: DS.attr('string'),
  data_upload: DS.attr(),
  source_name: DS.attr('string'),
  update_frequency: DS.attr(),
  edit_mode: false,
  license: DS.attr(),
  maintainer_name: DS.attr('string'),
  maintainer_email: DS.attr('string'),
  // columns to map
  // test: DS.attr('string')
  country: DS.attr('string'),
  region: DS.attr('string')


});
