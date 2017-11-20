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
      separator: " "
    },
    street:{
      fields: [],
      function: null,
      separator: " "
    },
    unit:{
      fields: [],
      function: null,
      separator: " "
    },
    city:{
      fields: [],
      function: null,
      separator: " "
    },
    district:{
      fields: [],
      function: null,
      separator: " "
    },
    region:{
      fields: [],
      function: null,
      separator: " "
    },
    postcode:{
      fields: [],
      function: null,
      separator: " "
    },
    lon:{
      fields: [],
      function: null,
      separator: " "
    },
    lat:{
      fields: [],
      function: null,
      separator: " "
    }
  },
  exampleRows:[{
    number: null,
    street: null,
    unit: null,
    city: null,
    district: null,
    region: null,
    postcode: null,
    lon: null,
    lat: null
  },
  {
    number: null,
    street: null,
    unit: null,
    city: null,
    district: null,
    region: null,
    postcode: null,
    lon: null,
    lat: null
  }]
});
