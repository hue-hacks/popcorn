import sha1 from 'sha1';
import { TrackedSet } from "tracked-built-ins";

export default class Bucket {
  #id;
  #people;
  #name;

  constructor(name, people = []) {
    this.#name = name;
    this.#id = sha1(name + Date.now());
    this.#people = new TrackedSet(people);
  }

  addPerson(person) {
    this.#people.add(person);
  }

  removePerson(person) {
    this.#people.remove(person);
  }

  setName(name) {
    this.#name = name;
  }

  get people() {
    return Array.from(this.#people);
  }

  get name() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }

  toJSON() {
    return {
      people: this.people,
      name: this.name,
      id: this.id
    }
  }
}
