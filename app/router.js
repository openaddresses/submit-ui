import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('source');
  this.route('mapping', function() {});
  this.route('contact');
  this.route('success');
  this.route('intro');
  this.route('review');
  this.route('more-info');
});

export default Router;
