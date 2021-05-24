import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PersonInputComponent extends Component {
  @tracked value = '';

  constructor() {
    super(...arguments);
    this.value = this.args.value;
  }

  @action
  updateValue(evt) {
    this.value = evt.target.value;
  }
}
