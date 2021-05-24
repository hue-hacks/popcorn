import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import CurrentPopcorn from './popcorn-store/current-popcorn';

const LOCALSTORAGE_KEY = 'popcorn';
const SESSIONSTORAGE_KEY = 'popcorn';

export default class LocalStorageService extends Service {
  @tracked currentPopcorn = new CurrentPopcorn(['Item A', 'Item B', 'Item C']);

  #lsCache = {
    buckets: {
      meetingName: ['p1', 'p2']
    } // pojo of arrays
  }

  #persistLocalStorage() {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.lsCache))
  }

  #persistSessionStorage() {
    window.sessionStorage.setItem(SESSIONSTORAGE_KEY, JSON.stringify(this.ssCache));
  }

  addToList(name, people = []) {
    if (!this.lsCache.buckets[name]) {
      this.lsCache.buckets[name] = people;
    } else {
      this.lsCache.buckets[name].push(...people);
    }
  }

  get buckets() {
    return this.#lsCache.buckets;
  }
}
