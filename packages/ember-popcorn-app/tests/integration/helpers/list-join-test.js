import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | list-join', function(hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  skip('it renders', async function(assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{list-join inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1234');
  });
});
