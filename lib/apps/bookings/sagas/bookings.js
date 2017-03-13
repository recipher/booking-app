import { take, put, select } from 'redux-saga/effects';

import { memberSelector, FETCH_MEMBER_SUCCESS } from '@recipher/member-web';

import { fetch } from '../ducks/bookings';

export function* fetchBookings() {
  while(true) {
    yield take(FETCH_MEMBER_SUCCESS);
    
    const member = yield select(memberSelector);
    
    yield put(fetch(member.id));
  }
};
