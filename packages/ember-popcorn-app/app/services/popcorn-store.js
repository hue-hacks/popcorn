import Service from '@ember/service';

const LOCALSTORAGE_KEY = 'popcorn';
const SESSIONSTORAGE_KEY = 'popcorn';

export default class LocalStorageService extends Service {
  #ssCache = {
    whoHasGone: [] // String[]
  }

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

  personWent(person) {
    this.ssCache.whoHasGone.push(person);
  }

  get buckets() {
    return this.#lsCache.buckets;
  }
}
