import assign from 'lodash/object/assign';
import map from 'lodash/collection/map';
import find from 'lodash/collection/find';
import filter from 'lodash/collection/filter';
import compact from 'lodash/array/compact';
import { createSelector } from 'reselect';
import { RESOURCE } from '@recipher/resource';
import { entitiesReducer } from '@recipher/entities';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('bookings');

export const FETCH = 'recipher/product/bookings/FETCH';
export const SUCCESS = 'recipher/product/bookings/SUCCESS';
export const FAILED = 'recipher/product/bookings/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ]);

const byModel = (state, props) => filter(state.product.bookings, 'model', props.model.id);
const bySlot = (state, props) => props.slot;

export const bookingsSelector = createSelector(
  [ byModel, state => state.entities ], (data, entities) => {
  if (data == null) return initialState;

  return assign({}, data, { data: compact(map(data.data, id => entities.bookings && entities.bookings[id])) });
});

export const bookingSelector = createSelector(
  [ bySlot, (state, props) => props.model, state => state.entities ], (slot, model, entities) => {

  return find(entities.bookings, booking => {
    return booking.slot === slot.id && booking.model === model.id;
  });
});

export function fetch(product) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/bookings'
      , method: 'get'
      , query: { product }
      , normalize: r => normalize(r.bookings, arrayOf(schema))
      }
    , meta: { product }
    }
  };
};
