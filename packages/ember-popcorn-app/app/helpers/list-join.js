import { helper } from '@ember/component/helper';

export default helper(function listJoin(params, {list, delimiter = ', '}) {
  return list.join(delimiter);
});
