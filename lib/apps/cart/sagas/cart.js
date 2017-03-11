import find from 'lodash/collection/find';

import { call, take, put, select } from 'redux-saga/effects';

import { push } from 'react-router-redux';
import { memberSelector } from '@recipher/member-web';

import { BOOK, save } from '../ducks/bookings';

function generateStripeToken(payment) { 
  Stripe.setPublishableKey('pk_test_kcL6y7tDKPTub7BJmVnijkzK');

  return new Promise((resolve, reject) => {
    return Stripe.createToken({
      name: payment.name
    , number: payment.number
    , exp_month: payment.month
    , exp_year: payment.year
    , cvc: payment.cvc
    }, (status, response) => {
      return resolve(response);
    });    
  });
};

export function* book() {
  while(true) {
    const { payload: { payment }} = yield take(BOOK);
  
    const bookings = yield select(state => state.cart.bookings.data)
        , member = yield select(memberSelector);

    if (member == null) return;

    const products = yield bookings.map(booking => {
      return select(state => state.entities.products[booking.model.product]);
    });

    const brands = yield products.map(product => {
      return select(state => state.entities.brands[product.brand]);
    });

    const data = bookings.map(booking => {
      const product = find(products, 'id', booking.model.product)
          , brand = find(brands, 'id', product.brand);

      return { 
        model: booking.model.id
      , slot: booking.slot.slot
      , info: booking.info
      , product: booking.model.product
      , member: member.id
      , data: { brand, product, model: booking.model }
      };
    });

    yield put(save(data, yield call(generateStripeToken, payment)));
    yield put(push('/brands'));
  }
};
