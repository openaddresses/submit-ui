import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('intro');
  this.route('more-info');
  this.route('data-format');
  this.route('contact');
  this.route('review');
  this.route('success');
  
});

export default Router;