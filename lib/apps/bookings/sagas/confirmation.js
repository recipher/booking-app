import { take, put, select } from 'redux-saga/effects';
import { info } from 'frieze';

import { SEND_CONFIRMATION_SUCCESS } from '../ducks/confirmation';

export function* confirmed() {
  while(true) {
    yield take(SEND_CONFIRMATION_SUCCESS);
        
    yield put(info('A confirmation email has been sent to your email address.'));
  }
};
