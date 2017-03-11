import memoize from 'lru-memoize';
import { createValidator, required, maxLength } from '@recipher/validation';

export default memoize(10)(createValidator({
  name: [ required() ]
, bio: [ maxLength(1000) ]
}));
