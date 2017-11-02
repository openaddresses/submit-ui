import DS from 'ember-data';

export default DS.Model.extend({
  country: DS.attr('string'),
  region: DS.attr('string'),
  data_type: DS.attr('string'),
  data_link: DS.attr('string'),
  data_upload: DS.attr(),
  source_name: DS.attr('string'),
  update_frequency: DS.attr(),
  edit_mode: false,
  license: DS.attr(),
  maintainer_name: DS.attr('string'),
  maintainer_email: DS.attr('string'),
  oaFields:{
    number:{
      columns: [],
      action: null,
      separator: " ",
      extractionFunction: null,
      extractionColumn: null
    },
    street:{
      columns: [],
      action: null,
      separator: " ",
      extractionFunction: null,
      extractionColumn: null
    },
    unit:{
      columns: [],
      action: null,
      separator: " ",
      extractionFunction: null,
      extractionColumn: null
    },
    city:{
      columns: [],
      action: null,
      separator: " ",
      extractionFunction: null,
      extractionColumn: null
    },
    district:{
      columns: [],
      action: null,
      separator: " ",
      extractionFunction: null,
      extractionColumn: null
    },
    region:{
      columns: [],
      action: null,
      separator: " ",
      extractionFunction: null,
      extractionColumn: null
    },
    postcode:{
      columns: [],
      action: null,
      separator: " ",
      extractionFunction: null,
      extractionColumn: null
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
