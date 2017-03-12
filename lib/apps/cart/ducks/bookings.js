import assign from 'lodash/object/assign';
import union from 'lodash/array/union';
import reject from 'lodash/collection/reject';
import { createSelector } from 'reselect';
import { entitiesSelector } from '@recipher/entities';
import { RESOURCE } from '@recipher/resource';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('bookings');

export const FETCH = 'recipher/cart/bookings/FETCH';
export const FETCH_SUCCESS = 'recipher/cart/bookings/FETCH_SUCCESS';
export const FETCH_FAILED = 'recipher/cart/bookings/FETCH_FAILED';

export const SAVE = 'recipher/cart/bookings/SAVE';
export const SAVE_SUCCESS = 'recipher/cart/bookings/SAVE_SUCCESS';
export const SAVE_FAILED = 'recipher/cart/bookings/SAVE_FAILED';

export const ADD = 'recipher/cart/bookings/ADD';
export const CLEAR = 'recipher/cart/bookings/CLEAR';

export const BOOK = 'recipher/cart/bookings/BOOK';

const initialState = { fetching: false, fetched: false
                     , saving: false, saved: false
                     , paying: false, paid: false
                     , error: null, data: [] };

export const bookingsSelector = entitiesSelector(state => state.cart.bookings, 'bookings');

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH:
    return assign({}, state, { fetching: true, fetched: false, error: null });
  case FETCH_SUCCESS:
    return assign({}, state, { fetching: false, fetched: true, error: null, data: action.payload.result });
  case FETCH_FAILED:
    return assign({}, state, { fetching: false, fetched: false, error: action.payload.statusText });

  case SAVE:
    return assign({}, state, { saving: true, saved: false, error: null });

  case SAVE_SUCCESS:
    const { slot, model } = action.payload.result;

    return assign({}, state, { saving: false, saved: true, data: reject(state.data, booking => booking.slot.slot == slot && booking.model.id == model) });

  case SAVE_FAILED:
    return assign({}, state, { saving: false, saved: true, error: action.payload.statusText });

  case ADD:
    return assign({}, state, { data: union([ action.payload.booking ], state.data) });

  case CLEAR:
    const { booking } = action.payload;

    return assign({}, state, { data: reject(state.data, b => booking.slot.id == b.slot.id && booking.model.id == b.model.id) });

  default:
    return state;
  }
};

const byProduct = (state, props) => props.booking.model.product;

export const productSelector = createSelector(
  [ byProduct, state => state.entities ], (product, entities) => {
  if (product == null) return;

  return entities.products && entities.products[product];
});

export const brandSelector = createSelector(
  [ productSelector, state => state.entities ], (product, entities) => {
  if (product == null) return;

  return entities.brands && entities.brands[product.brand];
});

export function fetch(member) {
  return {
    [RESOURCE]: {
      types: [ FETCH, FETCH_SUCCESS, FETCH_FAILED ]
    , payload: {
        url: '/bookings'
      , method: 'get'
      , query: { member }
      , normalize: r => normalize(r.bookings, arrayOf(schema))
      }
    , meta: { member }
    }
  };
};

export function save(bookings, member, payment) {
  return {
    [RESOURCE]: {
      types: [ SAVE, SAVE_SUCCESS, SAVE_FAILED ]
    , payload: {
        url: '/bookings'
      , data: { bookings, member, payment }
      , method: 'post'
      , normalize: r => normalize(r.booking, arrayOf(schema))
      }
    }
  };
};

export function book(payment) {
  return { type: BOOK, payload: { payment } };
};

export function add(booking) {
  return { type: ADD, payload: { booking }};
};

export function clear(booking) {
  return { type: CLEAR, payload: { booking }};
};
