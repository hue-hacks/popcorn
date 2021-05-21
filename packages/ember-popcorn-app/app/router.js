import EmberRouter from '@ember/routing/router';
import config from 'ember-popcorn-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('popcorn');
  this.route('buckets', function() {
    this.route('bucket', { path: '/:bucket_id' });
  });
});
