import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BucketsBucketRoute extends Route {
  @service('popcorn-store') popcornStore;

  model({ bucket_id}) {
    return this.popcornStore.getBucket(bucket_id)
  }
}
