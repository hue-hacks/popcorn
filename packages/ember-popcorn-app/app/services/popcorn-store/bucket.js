import { sha1 } from 'sha1';

class Bucket {
  #id;
  #people;
  constructor(name, people) {
    this.#id = sha1(name + Date.now());
    if (people) {
      this.#people = people;
    }
  }
}
