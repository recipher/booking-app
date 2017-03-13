import assign from 'lodash/object/assign';
import union from 'lodash/array/union';
import reject from 'lodash/collection/reject';
import filter from 'lodash/collection/filter';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import reduce from 'lodash/collection/reduce';
import pluck from 'lodash/collection/pluck';
import uniqBy from 'lodash.uniqby';
import moment from 'moment';
import { createSelector } from 'reselect';
import { entitiesSelector } from '@recipher/entities';
import { RESOURCE } from '@recipher/resource';
import { Schema, normalize, arrayOf } from 'normalizr';

import { existingDaysSelector, existingBookingCountsSelector } from '../../bookings/ducks/bookings';

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

const FEE = 0.049, PRICE = 10;

const ERRORS = {
  423: 'Payment declined'
, 500: 'Server error'
};

const initialState = { fetching: false, fetched: false
                     , saving: false, saved: false
                     , paying: false, paid: false
                     , error: null, data: [] };

export const bookingsSelector = entitiesSelector(state => state.cart.bookings, 'bookings');
export const existingSelector = entitiesSelector(state => state.bookings.bookings, 'bookings');

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH:
    return assign({}, state, { fetching: true, fetched: false, error: null });
  case FETCH_SUCCESS:
    return assign({}, state, { fetching: false, fetched: true, error: null, data: action.payload.result });
  case FETCH_FAILED:
    return assign({}, state, { fetching: false, fetched: false, error: ERRORS[action.payload.status] });

  case SAVE:
    return assign({}, state, { saving: true, saved: false, error: null });

  case SAVE_SUCCESS:
    const data = reject(state.data, booking => {
      return find(action.payload.result, id => {
        const { model, slot } = action.payload.entities.bookings[id];
        return booking.slot.slot == slot && booking.model.id == model
      });
    });

    return assign({}, state, { saving: false, saved: true, data, error: null });

  case SAVE_FAILED:
    return assign({}, state, { saving: false, saved: true, error: ERRORS[action.payload.status] });

  case ADD:
    const existing = find(state.data, ({ slot, model }) => {
      return slot.id == action.payload.booking.slot.id && model.id === action.payload.booking.model.id;
    }); 

    if (existing) return state;

    return assign({}, state, { data: union([ action.payload.booking ], state.data) });

  case CLEAR:
    const { booking } = action.payload;

    return assign({}, state, { data: reject(state.data, b => booking.slot.id == b.slot.id && booking.model.id === b.model.id) });

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

export const daySelector = (state, props) => {
  return moment(props.slot.slot).dayOfYear();
};

export const daysSelector = createSelector([ state => state.cart.bookings ], (bookings) => {
  const days = pluck(bookings.data, 'slot')
      , unique = uniqBy(days, day => moment(day.slot).dayOfYear());

  return map(unique, day => moment(day.slot).dayOfYear());
});

export const bookingCountsSelector = createSelector(
  [ daysSelector, state => state.cart.bookings ], (days, bookings) => {

  return map(days, day => {
    const bookingCount = filter(bookings.data, booking => {
      return moment(booking.slot.slot).dayOfYear() === day;
    }).length;

    return { day, bookingCount };
  });
});

export const bookingCountSelector = createSelector(
  [ bookingCountsSelector, daySelector ], (counts, day) => {
  
  const bookingCount = find(counts, count => {
    return count.day === day;
  });

  return bookingCount ? bookingCount.bookingCount : 0;
});

export const allBookingsSelector = createSelector(
  [ state => state.cart.bookings, existingSelector ], (bookings, existing) => {
  
  return union(bookings.data, existing.data);
});

export const allDaysSelector = createSelector([ allBookingsSelector ], (bookings) => {
  const days = pluck(bookings, 'slot')
      , unique = uniqBy(days, day => moment(day.slot || day).dayOfYear());

  return map(unique, day => moment(day.slot || day).dayOfYear());
});

export const allBookingCountsSelector = createSelector(
  [ allDaysSelector, allBookingsSelector ], (days, bookings) => {

  return map(days, day => {
    const bookingCount = filter(bookings, booking => {
      return moment(booking.slot.slot || booking.slot).dayOfYear() === day;
    }).length;

    return { day, bookingCount };
  });
});

export const allBookingCountSelector = createSelector(
  [ allBookingCountsSelector, daySelector ], (counts, day) => {
  
  const bookingCount = find(counts, count => {
    return count.day === day;
  });

  return bookingCount ? bookingCount.bookingCount : 0;
});

export const totalCountSelector = createSelector(
  [ allDaysSelector, existingBookingCountsSelector, bookingCountsSelector ]
, (days, existingCounts, counts) => {

  const payments = map(days, day => {

    const existingCount = find(existingCounts, c => c.day === day)
        , count = find(counts, c => c.day === day);

    return (count && count.bookingCount > 0) && (!existingCount || existingCount.bookingCount === 0) ? 1 : 0;
  });

  return reduce(payments, (l, r) => l + r, 0);
});

export const priceSelector = createSelector([ totalCountSelector ], count => {
  return count * PRICE;
});

export const feeSelector = createSelector([ priceSelector ], price => {
  return price * FEE;
});

export const chargeSelector = createSelector([ priceSelector, feeSelector ], (price, fee) => {
  return (price + fee) * 100;
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
      , normalize: r => normalize(r.bookings, arrayOf(schema))
      }
    , meta: { bookings }
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
