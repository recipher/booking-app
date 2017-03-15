import qs from 'querystring';
import { takeLatest } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
  
import { SEARCH_SUCCESS, bookingsSelector } from '../ducks/bookings';

export function* search() {
  while(true) {
    yield take(SEARCH_SUCCESS);

    const bookings = yield select(bookingsSelector);

    const url = { pathname: '/manage/bookings' }
        , search = { q: bookings.meta.query.q, page: bookings.meta.query.page };

    if (search.page === 1) delete search.page;
    if (search.q == null || search.q === '') delete search.q;

    if (search.page || search.q) url.search = '?' + qs.stringify(search);

    yield put(push(url)); 

    if (bookings.meta.query.q === '') yield put(reset('bookings'));
  }
};
