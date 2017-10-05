import Ember from 'ember';

export function sampleData(params, namedArgs) {
	var heading = namedArgs.heading
	var exampleValue = namedArgs.user_data.features[0].properties[heading];
	if (exampleValue){
		return exampleValue;
	} else {
		return "no example value available for this column"
	}
}

export default Ember.Helper.helper(sampleData);
