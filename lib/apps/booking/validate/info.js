import memoize from 'lru-memoize';
import { createValidator, required, isChecked } from '@recipher/validation';

export default memoize(10)(createValidator({
  name: [ required() ]
, phone: [ required() ]
, over12: [ isChecked() ]
, emergencyName: [ required() ]
, emergencyPhone: [ required() ]
, height: [ required() ]
, weight: [ required() ]
, helmet: [ isChecked() ]
, photo: [ isChecked() ]
, waiver: [ isChecked() ]
, dob: [ required() ]
, pedals: [ required() ]
, brakes: [ required() ]
}));
