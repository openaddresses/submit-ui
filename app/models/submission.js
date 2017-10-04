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
  oaFields:{
    number:{
      columns: null,
      action: null,
      separator: " ",
      extractionFunction: null,
      extractionText: null,
      extractionColumn: null
    },
    street:{
      columns: [],
      action: null,
      separator:  " ",
      extractionFunction: null,
      extractionText: null,
      extractionColumn: null
    },
    unit:{
      columns: [],
      action: null,
      separator:  " ",
      extractionFunction: null,
      extractionText: null,
      extractionColumn: null
    },
    city:{
      columns: [],
      action: null,
      separator:  " ",
      extractionFunction: null,
      extractionText: null,
      extractionColumn: null
    },
    district:{
      columns: [],
      action: null,
      separator:  " ",
      extractionFunction: null,
      extractionText: null,
      extractionColumn: null
    },
    region:{
      columns: [],
      action: null,
      separator:  " ",
      extractionFunction: null,
      extractionText: null,
      extractionColumn: null
    },
    postcode:{
      columns: [],
      action: null,
      separator:  " ",
      extractionFunction: null,
      extractionText: null,
      extractionColumn: null
    }
  }
});
