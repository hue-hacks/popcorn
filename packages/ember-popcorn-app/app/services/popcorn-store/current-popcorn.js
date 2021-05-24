import { tracked } from '@glimmer/tracking';

function shuffleArray(arr) {
  const len = arr.length;
  if (len === 0) {
    return [];
  }
  const picked = Math.floor(Math.random() * len);
  const remainder = [...arr.slice(0, picked), ...arr.slice(picked + 1)];
  return [arr[picked], ...shuffleArray(remainder)];
}

export default class CurrentPopcorn {
  @tracked queue;

  @tracked index;

  constructor(queue) {
    this.queue = shuffleArray(queue);
  }

  get item() {
    const currentIndex = this.index;
    const currentQueue = this.queue;
    if (currentIndex !== undefined) {
      return currentQueue[currentIndex];
    }
    return undefined;
  }

  personWent() {
    if (this.index === undefined) {
      return;
    }
    this.index++;
    if (this.index >= this.queue.length) {
      this.endPopcorn();
    }
  }

  startPopcorn() {
    this.index = 0;
  }

  endPopcorn() {
    this.index = undefined;
  }
}