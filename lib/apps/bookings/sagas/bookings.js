import { take, put, select } from 'redux-saga/effects';

import { info } from 'frieze';

import { memberSelector, FETCH_MEMBER_SUCCESS } from '@recipher/member-web';

import { fetch, CANCELLATION_SUCCESS } from '../ducks/bookings';

export function* fetchBookings() {
  while(true) {
    yield take(FETCH_MEMBER_SUCCESS);
    
    const member = yield select(memberSelector);
    
    yield put(fetch(member.id));
  }
};

export function* cancelled() {
  while(true) {
    yield take(CANCELLATION_SUCCESS);
        
    yield put(info('Your booking has been cancelled.'));
  }
};
