import memoize from 'lru-memoize';
import { createValidator, required, maxLength } from '@recipher/validation';

export default memoize(10)(createValidator({
  number: [ required() ]
, month: [ required(), maxLength(2) ]
, year: [ required(), maxLength(4) ]
, cvc: [ required(), maxLength(3) ]
}));
