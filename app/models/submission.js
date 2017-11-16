import DS from 'ember-data';

export default DS.Model.extend({
  // data_url: DS.attr('string'),
  data_url: 'api/responses',
  data_file: DS.attr(),
  source_name: DS.attr('string'),
  update_frequency: DS.attr(),
  edit_mode: false,
  license: DS.attr(),
  maintainer_name: DS.attr('string'),
  maintainer_email: DS.attr('string'),
  oaFields:{
    number:{
      fields: [],
      function: null,
      separator: " ",
      field_to_remove: null,
    },
    street:{
      fields: [],
      function: null,
      separator: " ",
      field_to_remove: null,
    },
    unit:{
      fields: [],
      function: null,
      separator: " ",
      field_to_remove: null,
    },
    city:{
      fields: [],
      function: null,
      separator: " ",
      field_to_remove: null,
    },
    district:{
      fields: [],
      function: null,
      separator: " ",
      field_to_remove: null,
    },
    region:{
      fields: [],
      function: null,
      separator: " ",
      field_to_remove: null,
    },
    postcode:{
      fields: [],
      function: null,
      separator: " ",
      field_to_remove: null,
    }
  },
  exampleRows:[{
    number: null,
    street: null,
    unit: null,
    city: null,
    district: null,
    region: null,
    postcode: null
  },
  {
    number: null,
    street: null,
    unit: null,
    city: null,
    district: null,
    region: null,
    postcode: null,
  }]
});
