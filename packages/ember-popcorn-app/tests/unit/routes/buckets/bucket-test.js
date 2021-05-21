import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | buckets/bucket', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:buckets/bucket');
    assert.ok(route);
  });
});
