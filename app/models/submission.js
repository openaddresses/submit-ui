import DS from 'ember-data';

export default DS.Model.extend({
  data_url: DS.attr('string'),
  data_file: DS.attr(),
  source_name: DS.attr('string'),
  update_frequency: DS.attr(),
  edit_mode: false,
  license_exists: DS.attr(),
  license: DS.attr('string'),
  license_url: DS.attr('string'),
  user_submitted_url: DS.attr('string'),
  share_alike: false,
  attribution: DS.attr(),
  attribution_text: DS.attr('string'),
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
