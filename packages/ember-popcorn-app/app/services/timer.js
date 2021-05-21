import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const OUT_OF_TIME_VOICEOVER = new SpeechSynthesisUtterance("Out of time!");

export default class TimerService extends Service {
  @tracked seconds = 0;

  interval = 15;

  activeCountdown;

  willDestroy() {
    if (this.activeCountdown) {
      clearInterval(this.activeCountdown);
    }
  }

  get timer() {
    const minutes = Math.floor(this.seconds / 60);
    const remainder = this.seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  }

  get isOutOfTime() {
    return this.seconds === 0;
  }

  start() {
    if (this.activeCountdown) {
      this.stop();
    }
    this.seconds = this.interval;
    this.activeCountdown = setInterval(() => {
      this.seconds = Math.max(this.seconds - 1, 0);
      if (this.seconds === 0) {
        window.speechSynthesis.speak(OUT_OF_TIME_VOICEOVER);
        this.stop();
      }
    }, 1000);
  }

  stop() {
    if (!this.activeCountdown) {
      return;
    }
    clearInterval(this.activeCountdown);
    this.activeCountdown = undefined;
    this.seconds = 0;
  }

  setTimeInterval(minutes, seconds) {
    this.interval = (minutes * 60) + seconds;
  }
}
