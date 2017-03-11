import { take, put, select } from 'redux-saga/effects';

import { push } from 'react-router-redux';

import { SAVE } from '../ducks/booking';
import { add } from '../../cart/ducks/bookings';

export function* saveInfo() {
  while(true) {
    yield take(SAVE);
    yield put(add(yield select(state => state.booking.booking)));
    yield put(push('/cart'));
  }
};
