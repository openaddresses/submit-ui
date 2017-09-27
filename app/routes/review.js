import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    // this.store.createRecord('submission', {
    //   country: "USA",
    //   region: "CA",
    //   data_type: "URL",
    //   data_link: "www.test.com",
    //   source_name: "SF MTA",
    //   update_frequency: "Monthly",
    //   edit_mode: false,
    //   license: {name:"MIT", text: "test text"},
    //   maintainer_name: "Thelma",
    //   maintainer_email: "thelma@bus.com",
    // });
    return this.get('store').peekAll('submission').get('firstObject');
  }
});
