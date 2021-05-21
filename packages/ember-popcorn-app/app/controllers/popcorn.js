import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PopcornController extends Controller {
  @service timer;

  @action
  startTimer() {
    this.timer.start();
  }

  @action
  stopTimer() {
    this.timer.stop();
  }
}
