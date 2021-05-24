import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { TrackedSet } from "tracked-built-ins";

export default class BucketsNewController extends Controller {

  @tracked name = 'foo';
  people = new TrackedSet();

  @tracked addingPerson = false;

  @service('popcorn-store') popcornStore;

  @action
  updateName(evt) {
    this.name = evt.target.value;
  }

  @action
  activatePersonEntry() {
    this.addingPerson = true;
  }

  @action
  addPerson(name) {
    console.log('add', name);
    this.people.add(name);
  }

  @action
  removePerson(name) {
    this.people.delete(name);
  }

  @action
  saveBucket() {
    this.popcornStore.addBucket
  }
}
