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
      columns: [],
      action: null,
      separator: " "
    },
    street:{
      columns: [],
      action: null,
      separator:  " "
    },
    unit:{
      columns: [],
      action: null,
      separator:  " "
    },
    city:{
      columns: [],
      action: null,
      separator:  " "
    },
    district:{
      columns: [],
      action: null,
      separator:  " "
    },
    region:{
      columns: [],
      action: null,
      separator:  " "
    },
    postcode:{
      columns: [],
      action: null,
      separator:  " "
    }
  }
});
