import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('data');
  this.route('source');
  this.route('license');
  this.route('mapping');
  this.route('contact');
  this.route('preview');
  this.route('success');
});

export default Router;
