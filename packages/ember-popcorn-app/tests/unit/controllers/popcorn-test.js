import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | popcorn', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  skip('it exists', function(assert) {
    let controller = this.owner.lookup('controller:popcorn');
    assert.ok(controller);
  });
});
