import Service from '@ember/service';
import Bucket from './popcorn-store/bucket';
import { TrackedSet } from "tracked-built-ins";

const LOCALSTORAGE_KEY = 'popcorn';
const SESSIONSTORAGE_KEY = 'popcorn';

export default class PopcornStoreService extends Service {
  constructor() {
    super(...arguments);

    this.#initSSCache();
    this.#initLSCache();
  }

  #ssCache
  #lsCache

  #initSSCache() {
    let ss = window.sessionStorage.getItem(SESSIONSTORAGE_KEY);
    try {
      ss = JSON.parse(ss);
    } catch(e) {
      ss = {
        whoHasGone: [] // String[]
      }
    }
    this.#ssCache = ss;
  }

  #initLSCache() {
    let ls = window.localStorage.getItem(LOCALSTORAGE_KEY);
    try {
      ls = JSON.parse(ls);
      ls.buckets = new TrackedSet(ls.buckets);
    } catch(e) {
      ls = {
        buckets: new TrackedSet() // Bucket[]
      }
    }
    ls.toJSON = function() {
      return {
        buckets: Array.from(this.buckets)
      };
    };
    this.#lsCache = ls;
  }

  #persistLocalStorage() {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.#lsCache))
  }

  #persistSessionStorage() {
    window.sessionStorage.setItem(SESSIONSTORAGE_KEY, JSON.stringify(this.#ssCache));
  }

  personWent(person) {
    this.#ssCache.whoHasGone.push(person);
  }

  #addBucket(bucket) {
    this.#lsCache.buckets.add(bucket);
    this.#persistLocalStorage();
  }

  // Bucket CR(u)D (updates handled but bucket object)
  newBucket(name, people = []) {
    const bucket = new Bucket(name, people);
    this.#addBucket(bucket);
    return bucket;
  }

  get buckets() {
    console.log(this.#lsCache);
    return Array.from(this.#lsCache.buckets);
  }

  getBucket(id) {
    return this.buckets.find((b) => b.id === id);
  }

  destroyBucket(bucket) {
    // could be a bucket id or a bucket itself.
    let b = bucket.id ? bucket : this.getBucket(bucket);
    this.#lsCache.buckets.delete(b);
    this.#persistLocalStorage();
  }
}
