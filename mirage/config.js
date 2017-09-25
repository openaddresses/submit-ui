export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.get('/countries', (schema) => {
    // returns all data from mirage/fixtures/countries.js
    return schema.countries.all();
  });
  this.get('/regions/:countryShortCode', (schema, request) => {
    var countryCode = request.params.countryShortCode;
    // returns data from mirage/fixtures/regions.js for country matching the country code provided in the request
    return schema.db.regions.findBy({countryShortCode: countryCode}).regions;
  });
}
