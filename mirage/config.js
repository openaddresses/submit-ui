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
  // passthough whitelists this domain to avoid Mirage error
  // this.passthrough('https://search.mapzen.com/v1/**');
 
  this.get('/responses', () => {
    return {
      responses: [{
        "type":"Feature",
        "properties":{
          "OBJECTID":1001,
          "ADDNUMBER":400,
          "STREET":"CAPITOL ST",
          "TYPE":"SF",
          "LAND_USE":"COMMERCIAL",
          "STORIES":"1",
          "EXTERIOR":"BRICK",
          "FULL_ADD":"400 E CAPITOL ST NE",
          "CITY":"WASHINGTON",
          "ROAD_TYPE":"ST",
          "PREFIX_DIR":"E",
          "SUFFIX_DIR":"NE",
          "UNIT":3,
          "DISTRICT":"DISTRICT OF COLUMBIA",
          "LAST_UPDT":null,
          "UPDT_COMM":" ",
          "newadd":0,
          "oldadd":0,
          "Flood1990":" ",
          "GlobalID":"{C5CF962D-9863-4604-B3F8-BB85731B32F5}",
          "ESN":56,
          "JURISD":"COUNTY",
          "ADDNUM":"400",
          "ZIP_CODE":20003
        },
        "geometry":{
          "type":"Point",
          "coordinates":[-77.0005006,38.8905686]
        }
      },{
        "type":"Feature",
        "properties":{
          "OBJECTID":1001,
          "ADDNUMBER":3001,
          "STREET":"CONNETICUT AVE NW",
          "TYPE":"SF",
          "LAND_USE":"COMMERCIAL",
          "STORIES":"1",
          "EXTERIOR":"BRICK",
          "FULL_ADD":"3001 CONNETICUT AVE NW",
          "CITY":"WASHINGTON",
          "ROAD_TYPE":"AVE",
          "PREFIX_DIR":"",
          "SUFFIX_DIR":"NW",
          "UNIT":null,
          "DISTRICT":"DISTRICT OF COLUMBIA",
          "LAST_UPDT":null,
          "UPDT_COMM":" ",
          "newadd":0,
          "oldadd":0,
          "Flood1990":" ",
          "GlobalID":"{C5CF962D-9863-4604-B3F8-BB85731B32F5}",
          "ESN":56,
          "JURISD":"COUNTY",
          "ADDNUM":"123",
          "ZIP_CODE":20008
        },
        "geometry":{
          "type":"Point",
          "coordinates":[-77.0501754,38.9253589]
        }
      }]
    }
  });
}
