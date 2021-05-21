import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service('popcorn-store') popcornStore;
  model() {
    const model = {
      buckets: Object.entries(this.popcornStore.buckets)
    };
    console.log(model);
    return model;
  }
}
