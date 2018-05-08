import DS from 'ember-data';

export default DS.Model.extend({
  data_url: DS.attr('string'),
  source_data: DS.attr(),
  conform: DS.attr('string')
});


