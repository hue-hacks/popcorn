import Service from '@ember/service';
import Bucket from './popcorn-store/bucket';

const LOCALSTORAGE_KEY = 'popcorn';
const SESSIONSTORAGE_KEY = 'popcorn';

export default class LocalStorageService extends Service {
  #ssCache = {
    whoHasGone: [] // String[]
  }

  #lsCache = {
    buckets: [] // Bucket[]
  }

  #persistLocalStorage() {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.lsCache))
  }

  #persistSessionStorage() {
    window.sessionStorage.setItem(SESSIONSTORAGE_KEY, JSON.stringify(this.ssCache));
  }

  personWent(person) {
    this.#ssCache.whoHasGone.push(person);
  }

  #addBucket(bucket) {
    this.#lsCache.buckets[bucket.id] = bucket;
    this.#persistLocalStorage();
  }

  // Bucket CR(u)D (updates handled but bucket object)
  newBucket(name, people = []) {
    const bucket = new Bucket(name, people);
    this.#addBucket(bucket);
  }

  getAllBuckets() {
    return this.#lsCache.buckets;
  }

  getBucket(id) {
    this.#lsCache.buckets.find((b) => b.id === id);
    return this.#lsCache[id];
  }

  destroyBucket(id) {
    delete this.#lsCache.buckets[id];
    this.#persistLocalStorage();
  }
}
