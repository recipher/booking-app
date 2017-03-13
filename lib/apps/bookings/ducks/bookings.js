import assign from 'lodash/object/assign';
import union from 'lodash/array/union';
import without from 'lodash/array/without';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import find from 'lodash/collection/find';
import pluck from 'lodash/collection/pluck';
import uniqBy from 'lodash.uniqby';
import moment from 'moment';
import { createSelector } from 'reselect';
import { entitiesSelector } from '@recipher/entities';
import { RESOURCE } from '@recipher/resource';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('bookings');

export const FETCH = 'recipher/bookings/bookings/FETCH';
export const FETCH_SUCCESS = 'recipher/bookings/bookings/FETCH_SUCCESS';
export const FETCH_FAILED = 'recipher/bookings/bookings/FETCH_FAILED';

export const CANCEL = 'recipher/bookings/bookings/CANCEL';
export const CANCEL_SUCCESS = 'recipher/bookings/bookings/CANCEL_SUCCESS';
export const CANCEL_FAILED = 'recipher/bookings/bookings/CANCEL_FAILED';

const initialState = { fetching: false, fetched: false, error: null, data: [] };

export const bookingsSelector = entitiesSelector(state => state.bookings.bookings, 'bookings');

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH:
    return assign({}, state, { fetching: true, fetched: false, error: null });
  case FETCH_SUCCESS:
    return assign({}, state, { fetching: false, fetched: true, error: null, data: action.payload.result });
  case FETCH_FAILED:
    return assign({}, state, { fetching: false, fetched: false, error: action.payload.statusText });

  case CANCEL:
    // return assign({}, state, { disconnecting: false, data: without(state.data, action.payload.id) });

  default:
    return state;
  }
};

export const daySelector = (state, props) => {
  return moment(props.slot.slot).dayOfYear();
};

export const existingDaysSelector = createSelector([ bookingsSelector ], (bookings) => {
  const days = pluck(bookings.data, 'slot')
      , unique = uniqBy(days, day => moment(day).dayOfYear());

  return map(unique, day => moment(day).dayOfYear());
});

export const existingBookingCountsSelector = createSelector(
  [ existingDaysSelector, bookingsSelector ], (days, bookings) => {

  return map(days, day => {
    const bookingCount = filter(bookings.data, booking => {
      return moment(booking.slot).dayOfYear() === day;
    }).length;

    return { day, bookingCount };
  });
});

export const existingBookingCountSelector = createSelector(
  [ existingBookingCountsSelector, existingDaysSelector ], (counts, day) => {
  
  const bookingCount = find(counts, count => {
    return count.day === day;
  });

  return bookingCount ? bookingCount.bookingCount : 0;
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

