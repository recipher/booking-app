import assign from 'lodash/object/assign';
import find from 'lodash/collection/find';

import { config } from '@recipher/support'

import { call, take, put, select } from 'redux-saga/effects';

import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import { info, warning, error } from 'frieze';
import { memberSelector } from '@recipher/member-web';

import { BOOK, SAVE_SUCCESS, SAVE_FAILED, save, chargeSelector } from '../ducks/bookings';

function generateStripeToken(payment, amount) { 
  Stripe.setPublishableKey(config('stripe').KEY);

  return new Promise((resolve, reject) => {
    if (amount === 0) return resolve();

    return Stripe.createToken({
      name: payment.name
    , number: payment.number
    , exp_month: payment.month
    , exp_year: payment.year
    , cvc: payment.cvc
    }, (status, response) => {
      return resolve(assign({}, response, { amount }));
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
      , data: { brand, product, model: booking.model, slot: booking.slot }
      };
    });

    yield put(save(data, member, yield call(generateStripeToken, payment, yield select(chargeSelector))));
  }
};

export function* success() {
  while(true) {
    const { payload: { result }, meta } = yield take(SAVE_SUCCESS);

    yield put(reset('pay'));

    if (result.length === 0) {
      window.scrollTo(0, 0);
      
      yield put(warning('Your bookings were unsuccessful'));
      yield put(push('/cart'));      
    }

    if (result.length > 0 && result.length < meta.bookings.length) {
      window.scrollTo(0, 0);
      
      yield put(warning('Some of your bookings were unsuccessful'));
      yield put(push('/cart'));      
    }

    if (result.length === meta.bookings.length) {
      window.scrollTo(0, 0);
      
      yield put(info('Your bookings were successful')); 
      yield put(push('/bookings'));      
    }
  }
};

export function* declined() {
  while(true) {
    const { payload } = yield take(SAVE_FAILED);
    yield put(error('The payment was declined, please try with an alternative card'));
  }
};
