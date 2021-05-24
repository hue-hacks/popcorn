import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BucketsIndexRoute extends Route {
  @service('popcorn-store') popcornStore;
  model() {
    const model = {
      buckets: this.popcornStore.buckets
    };
    return model;
  }
}
