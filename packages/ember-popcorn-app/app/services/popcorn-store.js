import Service from '@ember/service';
import Bucket from './popcorn-store/bucket';
import { TrackedSet } from "tracked-built-ins";

const LOCALSTORAGE_KEY = 'popcorn';
const SESSIONSTORAGE_KEY = 'popcorn';

export default class LocalStorageService extends Service {
  #ssCache = {
    whoHasGone: [] // String[]
  }

  #lsCache = {
    buckets: new TrackedSet([
      new Bucket('foo', [1, 2, 3])
    ]) // Bucket[]
  }


  // TODO: warm the cache in the constructor

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
    return bucket;
  }

  get buckets() {
    return Array.from(this.#lsCache.buckets);
  }

  getBucket(id) {
    return this.buckets.find((b) => b.id === id);
  }

  destroyBucket(id) {
    delete this.#lsCache.buckets[id];
    this.#persistLocalStorage();
  }
}
