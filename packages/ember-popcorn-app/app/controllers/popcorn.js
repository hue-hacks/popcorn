import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PopcornController extends Controller {
  @service('popcorn-store') popcornStore;
  @service timer;

  get currentItem() {
    return this.popcornStore.currentPopcorn.item;
  }

  get currentQueue() {
    return this.popcornStore.currentPopcorn.queue;
  }

  get isPopcornRunning() {
    return this.currentItem !== undefined;
  }

  @action
  nextItem() {
    this.popcornStore.currentPopcorn.personWent();
    if (this.currentItem) {
      this.timer.start();
    } else {
      this.timer.stop();
    }
  }

  @action
  start() {
    this.popcornStore.currentPopcorn.startPopcorn();
    this.timer.start();
  }

  @action
  end() {
    this.popcornStore.currentPopcorn.endPopcorn();
    this.timer.stop();
  }
}
