import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ListOBucketsComponent extends Component {
  @service('popcorn-store') popcornStore

  @action
  deleteBucket(bucket) {
    this.popcornStore.destroyBucket(bucket);
  }
}
