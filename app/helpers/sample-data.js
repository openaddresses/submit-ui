import Ember from 'ember';

export function sampleData(params, namedArgs) {
  var heading = namedArgs.heading;
  var exampleValue;
  if (namedArgs.user_data){
    exampleValue = namedArgs.user_data[0][heading];
  }

  if (namedArgs.user_data && exampleValue){
    return exampleValue;
  } else if (namedArgs.user_data) {
    return "no sample value available for this column";
  } else {
    return params;
  }
}

export default Ember.Helper.helper(sampleData);